# StreamRadar — MENA & Global Streaming Season Search Engine

A dedicated search engine built to solve fragmented streaming rights across **Netflix, TOD, OSN+, Shahid, Prime Video, Disney+, Apple TV+, Watch IT, Starzplay, and Max**, broken down by **individual season** and **country**.

## How to Run (Zero Installation Required)

### Option 1: One-Click Local Server + Live JustWatch Proxy (Recommended)
Double-click **[start.bat](file:///e:/AI/MysearchEngin/start.bat)** (or run `powershell -ExecutionPolicy Bypass -File .\server.ps1`).
- Uses Windows' built-in PowerShell HTTP server (`http://localhost:8080`) with **zero external installs** (no Python or Node required).
- Automatically opens your browser and proxies live GraphQL requests to `https://apis.justwatch.com/graphql` for real-time multi-country & season-level streaming offers without browser CORS blocks.

### Option 2: Direct Browser Mode
Open **[index.html](file:///e:/AI/MysearchEngin/index.html)** directly in any web browser.
- Automatically connects to **TVMaze's live CORS API** (for real-time season breakdowns, episode counts, release dates, and original network data) + **Apple iTunes Movie API** + the **MENA & Global Split-Rights Licensing Engine**.

---

## Key Features
1. **Season-by-Season Streaming Breakdown**: See which platform carries Season 1 vs. Season 2 vs. Season 3 in your selected country.
2. **14-Country MENA & Global Matrix (VPN / Geo-Check)**: Compare **Egypt (`EG`), Saudi Arabia (`SA`), UAE (`AE`), Kuwait (`KW`), Qatar (`QA`), Jordan (`JO`), Morocco (`MA`), USA (`US`), UK (`GB`), Canada (`CA`), Germany (`DE`), France (`FR`), Turkey (`TR`), and India (`IN`)** side by side.
3. **MENA Split-Rights Advisory**: Explains regional licensing splits (e.g., HBO/Max originals on **OSN+ & TOD** in MENA, FX/Hulu shows on **Disney+**, MGM+/Paramount+ split seasons across **Netflix, OSN+, TOD, and Starzplay**).
4. **1-Click Live Catalog Deep-Search**: Jump directly into the search page of **Netflix, TOD, OSN+, Shahid, Prime Video, Disney+, Apple TV+, Watch IT, or Starzplay** for brand-new episode drops.
5. **Watchlist & Release Radar**: Save shows locally to track upcoming episode release dates and re-check availability anytime.
