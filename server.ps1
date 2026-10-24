# StreamRadar Local Web Server & JustWatch GraphQL CORS Proxy
# Uses TcpListener on 127.0.0.1:8080 so it accepts both localhost AND public tunnel Host headers!
param([switch]$NoBrowser)

$port = 8080
$url = "http://localhost:$port/"
$root = $PSScriptRoot

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$endpoint = New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Loopback, $port)
$listener = New-Object System.Net.Sockets.TcpListener($endpoint)
$listener.Start()

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  StreamRadar Server Running at $url" -ForegroundColor Green
Write-Host "  Public Tunnel & UTF-8 GraphQL Proxy: ENABLED" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not $NoBrowser) {
  Start-Process $url
}

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".ico"  = "image/x-icon"
}

function Send-HttpResponse($stream, [int]$statusCode, [string]$statusText, [string]$contentType, [byte[]]$bodyBytes) {
  $header = "HTTP/1.1 $statusCode $statusText`r`n" +
            "Content-Type: $contentType`r`n" +
            "Content-Length: $($bodyBytes.Length)`r`n" +
            "Access-Control-Allow-Origin: *`r`n" +
            "Access-Control-Allow-Methods: GET, POST, OPTIONS`r`n" +
            "Access-Control-Allow-Headers: Content-Type`r`n" +
            "Connection: close`r`n`r`n"
  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
  $stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($bodyBytes.Length -gt 0) {
    $stream.Write($bodyBytes, 0, $bodyBytes.Length)
  }
  $stream.Flush()
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $client.ReceiveTimeout = 10000
      $client.SendTimeout = 10000
      $stream = $client.GetStream()

      # Read HTTP request headers
      $buffer = New-Object byte[] 65536
      $ms = New-Object System.IO.MemoryStream
      $headerEndIndex = -1

      while ($headerEndIndex -eq -1) {
        $read = $stream.Read($buffer, 0, $buffer.Length)
        if ($read -le 0) { break }
        $ms.Write($buffer, 0, $read)
        $currentBytes = $ms.ToArray()
        $asciiStr = [System.Text.Encoding]::ASCII.GetString($currentBytes)
        $headerEndIndex = $asciiStr.IndexOf("`r`n`r`n")
      }

      if ($headerEndIndex -eq -1) {
        $client.Close()
        continue
      }

      $allBytes = $ms.ToArray()
      $headerStr = [System.Text.Encoding]::ASCII.GetString($allBytes, 0, $headerEndIndex)
      $lines = $headerStr -split "`r`n"
      $requestLine = $lines[0] -split " "
      $method = $requestLine[0]
      $rawPath = $requestLine[1]
      $path = ($rawPath -split "\?")[0]

      $contentLength = 0
      foreach ($line in $lines) {
        if ($line -match "^Content-Length:\s*(\d+)") {
          $contentLength = [int]$matches[1]
        }
      }

      $bodyStart = $headerEndIndex + 4
      $alreadyReadBody = $allBytes.Length - $bodyStart
      $bodyMs = New-Object System.IO.MemoryStream
      if ($alreadyReadBody -gt 0) {
        $bodyMs.Write($allBytes, $bodyStart, $alreadyReadBody)
      }
      while ($bodyMs.Length -lt $contentLength) {
        $read = $stream.Read($buffer, 0, $buffer.Length)
        if ($read -le 0) { break }
        $bodyMs.Write($buffer, 0, $read)
      }
      $reqBodyBytes = $bodyMs.ToArray()

      if ($method -eq "OPTIONS") {
        Send-HttpResponse $stream 204 "No Content" "text/plain" ([byte[]]@())
        $client.Close()
        continue
      }

      if ($path -eq "/api/health") {
        $b = [System.Text.Encoding]::UTF8.GetBytes('{"status":"ok","proxy":"tcp-utf8"}')
        Send-HttpResponse $stream 200 "OK" "application/json; charset=utf-8" $b
        $client.Close()
        continue
      }

      if ($path -eq "/api/justwatch" -and $method -eq "POST") {
        try {
          $wc = New-Object System.Net.WebClient
          $wc.Headers.Add("Content-Type", "application/json; charset=utf-8")
          $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) StreamRadar/2.0")
          $respBytes = $wc.UploadData("https://apis.justwatch.com/graphql", "POST", $reqBodyBytes)
          Send-HttpResponse $stream 200 "OK" "application/json; charset=utf-8" $respBytes
        } catch {
          $errMsg = $_.Exception.Message -replace '"', '\"'
          $b = [System.Text.Encoding]::UTF8.GetBytes("{`"error`":`"$errMsg`"}")
          Send-HttpResponse $stream 502 "Bad Gateway" "application/json; charset=utf-8" $b
        }
        $client.Close()
        continue
      }

      if ($path -eq "/") { $path = "/index.html" }
      $relativePath = $path.TrimStart('/').Replace('/', '\')
      $filePath = Join-Path $root $relativePath

      if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $ct = $mimeTypes[$ext]
        if (-not $ct) { $ct = "application/octet-stream" }
        $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
        Send-HttpResponse $stream 200 "OK" $ct $fileBytes
      } else {
        $b = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        Send-HttpResponse $stream 404 "Not Found" "text/plain; charset=utf-8" $b
      }
    } catch {
      # Ignore individual connection errors
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
