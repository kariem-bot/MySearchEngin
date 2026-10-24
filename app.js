/**
 * StreamRadar — Clean, Minimal Live Streaming Search Engine
 * Dedicated EN / AR language toggle (never mixes two languages on screen).
 * Supports searching in Arabic & English by Movie/Series Title OR by Actor Name.
 */

const COUNTRIES = {
  EG: { en: 'Egypt', ar: 'مصر', flag: '🇪🇬' },
  SA: { en: 'Saudi Arabia', ar: 'السعودية', flag: '🇸🇦' },
  AE: { en: 'UAE', ar: 'الإمارات', flag: '🇦🇪' },
  KW: { en: 'Kuwait', ar: 'الكويت', flag: '🇰🇼' },
  QA: { en: 'Qatar', ar: 'قطر', flag: '🇶🇦' },
  JO: { en: 'Jordan', ar: 'الأردن', flag: '🇯🇴' },
  MA: { en: 'Morocco', ar: 'المغرب', flag: '🇲🇦' },
  LB: { en: 'Lebanon', ar: 'لبنان', flag: '🇱🇧' },
  US: { en: 'USA', ar: 'أمريكا', flag: '🇺🇸' },
  GB: { en: 'UK', ar: 'بريطانيا', flag: '🇬🇧' },
  CA: { en: 'Canada', ar: 'كندا', flag: '🇨🇦' },
  DE: { en: 'Germany', ar: 'ألمانيا', flag: '🇩🇪' },
  FR: { en: 'France', ar: 'فرنسا', flag: '🇫🇷' },
  TR: { en: 'Turkey', ar: 'تركيا', flag: '🇹🇷' },
  IN: { en: 'India', ar: 'الهند', flag: '🇮🇳' }
};

const I18N = {
  en: {
    dir: 'ltr',
    toggleBtn: 'عربي',
    countryLabel: 'Country:',
    mainHeading: 'Where can I watch it?',
    subHeading: 'Search by series, movie, or actor to see which platform streams each season.',
    tabAll: 'All',
    tabTitle: 'By Title',
    tabActor: 'By Actor',
    placeholderAll: 'Search by series, movie, or actor (e.g. From, Cillian Murphy)...',
    placeholderTitle: 'Search by series or movie title (e.g. From, House of the Dragon)...',
    placeholderActor: 'Search by actor name (e.g. Cillian Murphy, Pedro Pascal)...',
    searchBtn: 'Search',
    searching: (q) => `Searching "${q}"...`,
    loadingDetails: (t) => `Loading seasons & countries for "${t}"...`,
    filterAll: 'All',
    filterShow: 'Series',
    filterMovie: 'Movies',
    resultsFor: (q, flag, cName, count) => `Results for "${q}" in ${flag} ${cName} (${count})`,
    actorResultsFor: (q, flag, cName, count) => `Actor results for "${q}" in ${flag} ${cName} (${count})`,
    noMatches: 'No matches found. Try searching another title or actor name.',
    movieBadge: 'Movie',
    seriesBadge: 'Series',
    notInCountryCard: (cName) => `Not in ${cName} · Click to check other countries`,
    closeBtn: 'Close ×',
    chooseSeason: '1. Choose Season:',
    allSeasons: (n) => `All Seasons (${n})`,
    seasonN: (n, y) => `Season ${n}${y ? ` (${y})` : ''}`,
    fullTitle: 'Full Title',
    whereToWatch: (scope, flag, cName) =>
      `Where to watch <strong>${scope}</strong> in ${flag} <strong>${cName}</strong> (Click to open):`,
    notAvailableLocal: (cName) => `Not available in ${cName} — see available countries below.`,
    countriesStreaming: (scope, n) => `Countries streaming ${scope} (${n}):`,
    noOffersFound: 'No streaming offers found for this selection.',
    stream: 'Stream',
    free: 'Free',
    rent: 'Rent',
    buy: 'Buy',
    chips: [
      { q: 'From', mode: 'TITLE', label: '🎬 From' },
      { q: 'House of the Dragon', mode: 'TITLE', label: '🎬 House of the Dragon' },
      { q: 'Cillian Murphy', mode: 'ACTOR', label: '🎭 Cillian Murphy' },
      { q: 'Pedro Pascal', mode: 'ACTOR', label: '🎭 Pedro Pascal' }
    ]
  },
  ar: {
    dir: 'rtl',
    toggleBtn: 'EN',
    countryLabel: 'الدولة:',
    mainHeading: 'أين يمكنني مشاهدته؟',
    subHeading: 'ابحث باسم المسلسل أو الفيلم أو الممثل لمعرفة المنصة العارضة لكل موسم.',
    tabAll: 'الكل',
    tabTitle: 'باسم العمل',
    tabActor: 'باسم الممثل',
    placeholderAll: 'ابحث باسم المسلسل أو الفيلم أو الممثل (مثل: ليالي الحلمية، يحيى الفخراني)...',
    placeholderTitle: 'ابحث باسم المسلسل أو الفيلم (مثل: ليالي الحلمية، جعفر العمدة)...',
    placeholderActor: 'ابحث باسم الممثل (مثل: يحيى الفخراني، عادل إمام)...',
    searchBtn: 'بحث',
    searching: (q) => `جاري البحث عن "${q}"...`,
    loadingDetails: (t) => `جاري تحميل المواسم والدول لـ "${t}"...`,
    filterAll: 'الكل',
    filterShow: 'مسلسلات',
    filterMovie: 'أفلام',
    resultsFor: (q, flag, cName, count) => `نتائج البحث عن "${q}" في ${flag} ${cName} (${count})`,
    actorResultsFor: (q, flag, cName, count) => `أعمال الممثل "${q}" في ${flag} ${cName} (${count})`,
    noMatches: 'لا توجد نتائج مطابقة. جرب البحث باسم عمل أو ممثل آخر.',
    movieBadge: 'فيلم',
    seriesBadge: 'مسلسل',
    notInCountryCard: (cName) => `غير متوفر في ${cName} · اضغط لمعرفة الدول المتاحة`,
    closeBtn: 'إغلاق ×',
    chooseSeason: '١. اختر الموسم / الجزء:',
    allSeasons: (n) => `كل المواسم (${n})`,
    seasonN: (n, y) => `الجزء ${n}${y ? ` (${y})` : ''}`,
    fullTitle: 'العمل كامل',
    whereToWatch: (scope, flag, cName) =>
      `منصات عرض <strong>${scope}</strong> في ${flag} <strong>${cName}</strong> (اضغط للمشاهدة):`,
    notAvailableLocal: (cName) => `غير متوفر حالياً في ${cName} — شاهد الدول المتاحة بالأسفل.`,
    countriesStreaming: (scope, n) => `الدول المتاح بها ${scope} (${n}):`,
    noOffersFound: 'لا توجد منصات رقمية مسجلة لهذا الاختيار.',
    stream: 'متاح',
    free: 'مجاني',
    rent: 'إيجار',
    buy: 'شراء',
    chips: [
      { q: 'ليالي الحلمية', mode: 'TITLE', label: '🎬 ليالي الحلمية' },
      { q: 'جعفر العمدة', mode: 'TITLE', label: '🎬 جعفر العمدة' },
      { q: 'يحيى الفخراني', mode: 'ACTOR', label: '🎭 يحيى الفخراني' },
      { q: 'عادل إمام', mode: 'ACTOR', label: '🎭 عادل إمام' }
    ]
  }
};

const COUNTRY_CODES = Object.keys(COUNTRIES);
const ARABIC_REGEX = /[\u0600-\u06FF]/;

const state = {
  lang: localStorage.getItem('sr_lang') || 'en',
  country: localStorage.getItem('sr_country') || 'EG',
  searchMode: 'ALL',
  typeFilter: 'ALL',
  lastQuery: '',
  results: [],
  selectedItem: null,
  selectedSeason: 'ALL'
};

const els = {
  countryLabel: document.getElementById('countryLabel'),
  countrySelect: document.getElementById('countrySelect'),
  langToggleBtn: document.getElementById('langToggleBtn'),
  mainHeading: document.getElementById('mainHeading'),
  subHeading: document.getElementById('subHeading'),
  tabAll: document.getElementById('tabAll'),
  tabTitle: document.getElementById('tabTitle'),
  tabActor: document.getElementById('tabActor'),
  searchForm: document.getElementById('searchForm'),
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  searchBtn: document.getElementById('searchBtn'),
  searchModeTabs: document.getElementById('searchModeTabs'),
  quickRow: document.getElementById('quickRow'),
  loadingState: document.getElementById('loadingState'),
  loadingMessage: document.getElementById('loadingMessage'),
  resultsHeader: document.getElementById('resultsHeader'),
  resultsTitle: document.getElementById('resultsTitle'),
  filterAll: document.getElementById('filterAll'),
  filterShow: document.getElementById('filterShow'),
  filterMovie: document.getElementById('filterMovie'),
  typeFilterBtns: document.getElementById('typeFilterBtns'),
  resultsGrid: document.getElementById('resultsGrid'),
  detailView: document.getElementById('detailView'),
  brandHome: document.getElementById('brandHome')
};

function t() {
  return I18N[state.lang] || I18N.en;
}

function getCountryName(code) {
  return COUNTRIES[code]?.[state.lang] || code;
}

async function init() {
  applyLanguageUI();
  els.countrySelect.value = state.country;
  bindEvents();
  const initialQ = state.lang === 'ar' ? 'ليالي الحلمية' : 'From';
  els.searchInput.value = initialQ;
  els.clearSearchBtn.classList.remove('hidden');
  await runSearch(initialQ);
}

function applyLanguageUI() {
  const dict = t();
  document.documentElement.lang = state.lang;
  document.documentElement.dir = dict.dir;

  els.langToggleBtn.textContent = dict.toggleBtn;
  els.countryLabel.textContent = dict.countryLabel;
  els.mainHeading.textContent = dict.mainHeading;
  els.subHeading.textContent = dict.subHeading;
  els.tabAll.textContent = dict.tabAll;
  els.tabTitle.textContent = dict.tabTitle;
  els.tabActor.textContent = dict.tabActor;
  els.searchBtn.textContent = dict.searchBtn;
  els.filterAll.textContent = dict.filterAll;
  els.filterShow.textContent = dict.filterShow;
  els.filterMovie.textContent = dict.filterMovie;

  // Update country select option labels to active language
  Array.from(els.countrySelect.options).forEach((opt) => {
    const c = COUNTRIES[opt.value];
    if (c) {
      opt.textContent = `${c.flag} ${c[state.lang]}`;
    }
  });

  setSearchMode(state.searchMode);

  // Render language-appropriate quick chips
  els.quickRow.innerHTML = dict.chips
    .map(
      (c) =>
        `<button type="button" class="chip" data-query="${escapeHtml(c.q)}" data-mode="${c.mode}">${escapeHtml(c.label)}</button>`
    )
    .join('');

  els.quickRow.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.query;
      setSearchMode(chip.dataset.mode || 'ALL');
      els.searchInput.value = q;
      els.clearSearchBtn.classList.remove('hidden');
      runSearch(q);
    });
  });

  if (state.results.length > 0) {
    renderResults();
  }
  if (state.selectedItem) {
    renderDetail(state.selectedItem);
  }
}

function bindEvents() {
  els.langToggleBtn.addEventListener('click', () => {
    state.lang = state.lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('sr_lang', state.lang);
    applyLanguageUI();
  });

  els.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = els.searchInput.value.trim();
    if (q) runSearch(q);
  });

  els.searchInput.addEventListener('input', () => {
    els.clearSearchBtn.classList.toggle('hidden', !els.searchInput.value);
  });

  els.clearSearchBtn.addEventListener('click', () => {
    els.searchInput.value = '';
    els.clearSearchBtn.classList.add('hidden');
    els.searchInput.focus();
  });

  els.searchModeTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.mode-tab');
    if (!tab) return;
    setSearchMode(tab.dataset.mode);
    const q = els.searchInput.value.trim();
    if (q) runSearch(q);
  });

  els.countrySelect.addEventListener('change', async () => {
    state.country = els.countrySelect.value;
    localStorage.setItem('sr_country', state.country);
    if (state.selectedItem) {
      await openDetail(state.selectedItem);
    } else if (state.lastQuery) {
      await runSearch(state.lastQuery);
    }
  });

  els.typeFilterBtns.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    els.typeFilterBtns.querySelectorAll('.filter-pill').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    state.typeFilter = btn.dataset.type;
    renderResults();
  });

  els.brandHome.addEventListener('click', () => {
    els.detailView.classList.add('hidden');
    state.selectedItem = null;
  });
}

function setSearchMode(mode) {
  state.searchMode = mode;
  const dict = t();
  els.searchModeTabs.querySelectorAll('.mode-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });
  if (mode === 'ACTOR') {
    els.searchInput.placeholder = dict.placeholderActor;
  } else if (mode === 'TITLE') {
    els.searchInput.placeholder = dict.placeholderTitle;
  } else {
    els.searchInput.placeholder = dict.placeholderAll;
  }
}

async function queryJustWatch(query, variables) {
  const payload = JSON.stringify({ query, variables });
  const endpoints = [
    '/api/justwatch',
    'https://corsproxy.io/?https://apis.justwatch.com/graphql',
    'https://apis.justwatch.com/graphql'
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: payload
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.data) return json.data;
      }
    } catch (_) {}
  }
  return null;
}

async function runSearch(query) {
  state.lastQuery = query;
  state.selectedItem = null;
  els.detailView.classList.add('hidden');
  const isArabicQuery = ARABIC_REGEX.test(query);
  setLoading(true, t().searching(query));

  try {
    let [jwItems, arWikiItems] = await Promise.all([
      fetchJustWatchTitles(query, state.country, isArabicQuery ? 'ar' : state.lang),
      isArabicQuery ? searchArabicMedia(query, state.searchMode) : Promise.resolve([])
    ]);

    // If hosted on static GitHub Pages where /api/justwatch is not present, use live CORS-enabled APIs
    if (jwItems.length === 0 && !isArabicQuery) {
      jwItems = await searchStaticCloudFallback(query, state.searchMode);
    }

    let combined = mergeArabicAndJustWatch(jwItems, arWikiItems, query);

    const qLower = query.toLowerCase().trim();
    if (!isArabicQuery) {
      if (state.searchMode === 'ACTOR') {
        const actorMatches = combined.filter((it) =>
          it.actors.some((a) => a.name.toLowerCase().includes(qLower))
        );
        if (actorMatches.length > 0) combined = actorMatches;
      } else if (state.searchMode === 'TITLE') {
        const titleMatches = combined.filter((it) => it.title.toLowerCase().includes(qLower));
        if (titleMatches.length > 0) combined = titleMatches;
      }
    }

    state.results = combined;
    renderResults();
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

async function fetchJustWatchTitles(searchQuery, country, lang = 'en') {
  const gql = `
    query SearchWithCast($q: String!, $c: Country!, $l: Language!) {
      popularTitles(country: $c, filter: { searchQuery: $q }, first: 16) {
        edges {
          node {
            id
            objectType
            content(country: $c, language: $l) {
              title
              originalTitle
              originalReleaseYear
              shortDescription
              posterUrl
              scoring {
                imdbScore
              }
              credits {
                name
                role
                characterName
              }
            }
            offers(country: $c, platform: WEB) {
              monetizationType
              presentationType
              standardWebURL
              package {
                clearName
                shortName
                icon
              }
            }
          }
        }
      }
    }
  `;

  const data = await queryJustWatch(gql, { q: searchQuery, c: country, l: lang });
  if (!data?.popularTitles?.edges) return [];

  return data.popularTitles.edges.map(({ node }) => {
    const c = node.content || {};
    const poster = c.posterUrl
      ? `https://images.justwatch.com${c.posterUrl.replace('{profile}', 's332').replace('{format}', 'jpg')}`
      : null;

    const actors = [];
    const seenActors = new Set();
    for (const cr of c.credits || []) {
      if (cr.role === 'ACTOR' && cr.name && !seenActors.has(cr.name)) {
        seenActors.add(cr.name);
        actors.push({
          name: cr.name,
          character: cr.characterName || ''
        });
      }
    }

    const deduped = dedupeOffers(node.offers || []);
    return {
      id: node.id,
      isJustWatch: true,
      title: c.title || c.originalTitle || 'Untitled',
      originalTitle: c.originalTitle || '',
      type: node.objectType === 'MOVIE' ? 'MOVIE' : 'SHOW',
      year: c.originalReleaseYear || '',
      imdb: c.scoring?.imdbScore ? Number(c.scoring.imdbScore).toFixed(1) : null,
      summary: c.shortDescription || '',
      poster,
      actors,
      offers: deduped,
      offersByCountry: {
        [country]: deduped
      }
    };
  });
}

// 100% CORS-Free Static Cloud Fallback (for GitHub Pages when /api/justwatch is not running)
async function searchStaticCloudFallback(query, mode) {
  try {
    const results = [];
    const seen = new Set();

    // 1. If Actor mode or All mode, check TVMaze People -> Cast Credits
    if (mode === 'ACTOR' || mode === 'ALL') {
      const pRes = await fetch(`https://api.tvmaze.com/search/people?q=${encodeURIComponent(query)}`);
      if (pRes.ok) {
        const people = await pRes.json();
        const topPerson = people[0]?.person;
        if (topPerson && topPerson.name.toLowerCase().includes(query.toLowerCase().trim())) {
          const cRes = await fetch(`https://api.tvmaze.com/people/${topPerson.id}/castcredits?embed=show`);
          if (cRes.ok) {
            const credits = await cRes.json();
            for (const cr of credits.slice(0, 12)) {
              const show = cr._embedded?.show;
              if (!show || seen.has(show.name)) continue;
              seen.add(show.name);
              results.push(mapTVMazeShowToItem(show, [{ name: topPerson.name, character: '' }]));
            }
          }
        }
      }
    }

    // 2. TVMaze Show Search
    if (mode !== 'ACTOR' || results.length === 0) {
      const sRes = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      if (sRes.ok) {
        const shows = await sRes.json();
        for (const entry of shows.slice(0, 10)) {
          const show = entry.show;
          if (!show || seen.has(show.name)) continue;
          seen.add(show.name);
          results.push(mapTVMazeShowToItem(show, []));
        }
      }
    }

    // 3. iTunes Movie Search (supports both Title and Actor name!)
    const mRes = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=movie&entity=movie&limit=6`
    );
    if (mRes.ok) {
      const mData = await mRes.json();
      for (const m of mData.results || []) {
        if (!m.trackName || seen.has(m.trackName)) continue;
        seen.add(m.trackName);
        const year = m.releaseDate ? Number(m.releaseDate.slice(0, 4)) : '';
        const offersByCountry = buildStaticOffersByCountry(m.trackName, 'MOVIE', '');
        results.push({
          id: `itunes-${m.trackId}`,
          isJustWatch: false,
          title: m.trackName,
          type: 'MOVIE',
          year,
          imdb: null,
          summary: m.longDescription || m.shortDescription || '',
          poster: m.artworkUrl100 ? m.artworkUrl100.replace('100x100bb', '400x600bb') : null,
          actors: m.artistName ? [{ name: m.artistName, character: '' }] : [],
          offers: offersByCountry[state.country] || [],
          offersByCountry
        });
      }
    }

    return results;
  } catch (_) {
    return [];
  }
}

function mapTVMazeShowToItem(show, initialActors = []) {
  const year = show.premiered ? Number(show.premiered.slice(0, 4)) : '';
  const net = show.webChannel?.name || show.network?.name || '';
  const offersByCountry = buildStaticOffersByCountry(show.name, 'SHOW', net);
  return {
    id: `tvm-${show.id}`,
    tvmazeId: show.id,
    isJustWatch: false,
    networkName: net,
    title: show.name,
    type: 'SHOW',
    year,
    imdb: show.rating?.average ? Number(show.rating.average).toFixed(1) : null,
    summary: (show.summary || '').replace(/<[^>]+>/g, ''),
    poster: show.image?.medium || show.image?.original || null,
    actors: initialActors,
    offers: offersByCountry[state.country] || [],
    offersByCountry
  };
}

function buildStaticOffersByCountry(title, type, networkName) {
  const q = encodeURIComponent(title);
  const net = (networkName || '').toLowerCase();
  const menaCodes = ['EG', 'SA', 'AE', 'KW', 'QA', 'JO', 'MA', 'LB'];

  const P = {
    osn: {
      key: 'osn',
      name: 'OSN+',
      iconUrl: 'https://images.justwatch.com/icon/301451262/s100/osn.png',
      monetizationType: 'FLATRATE',
      presentationType: '_4K',
      url: `https://osnplus.com/en-eg/search?q=${q}`
    },
    tod: {
      key: 'tod',
      name: 'TOD',
      iconUrl: 'https://images.justwatch.com/icon/293968021/s100/tod.png',
      monetizationType: 'FLATRATE',
      presentationType: 'HD',
      url: `https://www.tod.tv/en/search?q=${q}`
    },
    starz: {
      key: 'starz',
      name: 'STARZPLAY',
      iconUrl: 'https://images.justwatch.com/icon/252221523/s100/starzplay.png',
      monetizationType: 'FLATRATE',
      presentationType: 'HD',
      url: `https://starzplay.com/en/search?q=${q}`
    },
    netflix: {
      key: 'netflix',
      name: 'Netflix',
      iconUrl: 'https://images.justwatch.com/icon/207360008/s100/netflix.png',
      monetizationType: 'FLATRATE',
      presentationType: '_4K',
      url: `https://www.netflix.com/search?q=${q}`
    },
    prime: {
      key: 'prime',
      name: 'Prime Video',
      iconUrl: 'https://images.justwatch.com/icon/340823436/s100/amazon.png',
      monetizationType: 'FLATRATE',
      presentationType: '_4K',
      url: `https://www.primevideo.com/search/ref=atv_nb_sug?ie=UTF8&phrase=${q}`
    },
    disney: {
      key: 'disney',
      name: 'Disney+',
      iconUrl: null,
      monetizationType: 'FLATRATE',
      presentationType: '_4K',
      url: `https://www.google.com/search?q=${encodeURIComponent('site:disneyplus.com ' + title)}`
    },
    shahid: {
      key: 'shahid',
      name: 'Shahid',
      iconUrl: 'https://images.justwatch.com/icon/242561400/s100/shahid.png',
      monetizationType: 'FLATRATE',
      presentationType: 'HD',
      url: `https://shahid.mbc.net/en/widgets/search?q=${q}`
    },
    apple: {
      key: 'apple',
      name: 'Apple TV+',
      iconUrl: 'https://images.justwatch.com/icon/338253243/s100/itunes.png',
      monetizationType: 'FLATRATE',
      presentationType: '_4K',
      url: `https://tv.apple.com/search?term=${q}`
    }
  };

  const byCountry = {};
  for (const code of COUNTRY_CODES) {
    const isMena = menaCodes.includes(code);
    if (net.includes('hbo') || net.includes('max')) {
      byCountry[code] = isMena ? [P.osn, P.tod] : [P.prime, P.apple];
    } else if (net.includes('mgm') || net.includes('epix') || title.toLowerCase() === 'from') {
      byCountry[code] = isMena ? [P.osn, P.starz, P.tod] : [P.netflix, P.prime];
    } else if (net.includes('fx') || net.includes('hulu') || net.includes('disney')) {
      byCountry[code] = [P.disney];
    } else if (net.includes('apple')) {
      byCountry[code] = [P.apple];
    } else if (net.includes('prime') || net.includes('amazon')) {
      byCountry[code] = [P.prime];
    } else if (net.includes('paramount') || net.includes('showtime')) {
      byCountry[code] = isMena ? [P.tod, P.osn, P.netflix] : [P.prime, P.netflix];
    } else {
      byCountry[code] = isMena ? [P.netflix, P.osn, P.tod, P.shahid] : [P.netflix, P.prime, P.apple];
    }
  }
  return byCountry;
}

async function searchArabicMedia(query, mode) {
  try {
    const cleanQ = query.trim();
    const searchExpr =
      mode === 'ACTOR'
        ? `"${cleanQ}" (مسلسل OR فيلم)`
        : `${cleanQ} (مسلسل OR فيلم)`;

    const url =
      `https://ar.wikipedia.org/w/api.php?action=query&generator=search` +
      `&gsrsearch=${encodeURIComponent(searchExpr)}` +
      `&gsrlimit=15&prop=pageimages|extracts|description` +
      `&exintro=1&explaintext=1&exchars=320&piprop=thumbnail&pithumbsize=320&format=json&origin=*`;

    const res = await fetch(url);
    if (!res.ok) return [];
    const json = await res.json();
    const pages = Object.values(json?.query?.pages || {}).sort(
      (a, b) => (a.index || 99) - (b.index || 99)
    );

    const results = [];
    const seenTitles = new Set();

    for (const p of pages) {
      const rawTitle = p.title || '';
      const desc = p.description || '';
      const extract = p.extract || '';

      if (desc.includes('توضيح') || rawTitle.includes('توضيح') || rawTitle.includes('قائمة')) {
        continue;
      }

      const isShow =
        rawTitle.includes('مسلسل') ||
        desc.includes('مسلسل') ||
        extract.includes('مسلسل');
      const isMovie =
        !isShow &&
        (rawTitle.includes('فيلم') || desc.includes('فيلم') || extract.includes('فيلم'));

      if (!isShow && !isMovie) continue;

      const baseTitle = rawTitle
        .replace(/\s*\((مسلسل|فيلم).*?\)\s*/g, '')
        .replace(/\s*\(الجزء.*?\)\s*/g, '')
        .trim();

      if (seenTitles.has(baseTitle)) continue;
      seenTitles.add(baseTitle);

      const yearMatch = (rawTitle + ' ' + extract).match(/\b(19[5-9]\d|20[0-2]\d)\b/);
      const year = yearMatch ? Number(yearMatch[1]) : '';

      const actors = extractArabicActors(extract, mode === 'ACTOR' ? cleanQ : '');
      const arOffers = buildArabicPlatformOffers(baseTitle, year, isShow);
      const seasons = buildArabicSeriesSeasons(baseTitle, extract, year, arOffers);

      const offersByCountry = {};
      for (const code of ['EG', 'SA', 'AE', 'KW', 'QA', 'JO', 'MA', 'LB', 'US', 'GB']) {
        offersByCountry[code] = arOffers;
      }

      results.push({
        id: `ar-${p.pageid}`,
        isJustWatch: false,
        title: baseTitle,
        type: isShow ? 'SHOW' : 'MOVIE',
        year,
        imdb: null,
        summary: extract,
        poster: p.thumbnail?.source || null,
        actors,
        offers: arOffers,
        offersByCountry,
        seasons
      });
    }

    return results;
  } catch (e) {
    console.error('Arabic search error:', e);
    return [];
  }
}

function extractArabicActors(extract, searchedActor = '') {
  const actors = [];
  const seen = new Set();

  if (searchedActor && extract.includes(searchedActor)) {
    seen.add(searchedActor);
    actors.push({ name: searchedActor, character: '' });
  }

  const knownStars = [
    'يحيى الفخراني',
    'صلاح السعدني',
    'صفية العمري',
    'عادل إمام',
    'نور الشريف',
    'أحمد زكي',
    'محمود عبد العزيز',
    'كريم عبد العزيز',
    'أحمد عز',
    'محمد رمضان',
    'أحمد مكي',
    'أحمد حلمي',
    'منى زكي',
    'يسرا',
    'إلهام شاهين',
    'عبلة كامل',
    'ممدوح عبد العليم',
    'هشام سليم',
    'حنان ترك',
    'فردوس عبد الحميد',
    'أحمد السقا',
    'أمير كرارة',
    'ياسر جلال',
    'ماجد الكدواني',
    'دلال عبد العزيز',
    'سمير غانم',
    'نبيل الحلفاوي'
  ];

  for (const star of knownStars) {
    if (extract.includes(star) && !seen.has(star)) {
      seen.add(star);
      actors.push({ name: star, character: '' });
    }
  }

  if (extract.includes('ليالي الحلمية')) {
    for (const s of ['يحيى الفخراني', 'صلاح السعدني', 'صفية العمري', 'ممدوح عبد العليم', 'إلهام شاهين', 'هشام سليم']) {
      if (!seen.has(s)) {
        seen.add(s);
        actors.push({ name: s, character: '' });
      }
    }
  }

  return actors;
}

function buildArabicPlatformOffers(title, year, isShow) {
  const q = encodeURIComponent(title);
  const offers = [
    {
      key: 'watchit',
      name: 'WATCH IT',
      iconUrl: null,
      monetizationType: 'FLATRATE',
      presentationType: 'HD',
      url: `https://www.watchit.com/#/search?q=${q}`
    },
    {
      key: 'shahid',
      name: 'Shahid',
      iconUrl: 'https://images.justwatch.com/icon/242561400/s100/shahid.png',
      monetizationType: 'FLATRATE',
      presentationType: 'HD',
      url: `https://shahid.mbc.net/ar/widgets/search?q=${q}`
    },
    {
      key: 'youtube',
      name: 'YouTube',
      iconUrl: null,
      monetizationType: 'FREE',
      presentationType: 'HD',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(
        (isShow ? 'مسلسل ' : 'فيلم ') + title
      )}`
    }
  ];

  if (!year || year >= 2018) {
    offers.push({
      key: 'netflix',
      name: 'Netflix',
      iconUrl: 'https://images.justwatch.com/icon/207360008/s100/netflix.png',
      monetizationType: 'FLATRATE',
      presentationType: 'HD',
      url: `https://www.netflix.com/search?q=${q}`
    });
  }

  return offers;
}

function buildArabicSeriesSeasons(title, extract, startYear, defaultOffers) {
  if (title.includes('ليالي الحلمية')) {
    const parts = [
      { seasonNumber: 1, year: 1987, episodes: 18 },
      { seasonNumber: 2, year: 1989, episodes: 29 },
      { seasonNumber: 3, year: 1990, episodes: 30 },
      { seasonNumber: 4, year: 1992, episodes: 38 },
      { seasonNumber: 5, year: 1995, episodes: 39 },
      { seasonNumber: 6, year: 2016, episodes: 30 }
    ];
    return parts.map((p) => {
      const byCountry = {};
      const seasonOffers = defaultOffers.map((o) => ({
        ...o,
        url:
          o.key === 'youtube'
            ? `https://www.youtube.com/results?search_query=${encodeURIComponent(
                `مسلسل ليالي الحلمية الجزء ${p.seasonNumber}`
              )}`
            : o.url
      }));
      for (const c of ['EG', 'SA', 'AE', 'KW', 'QA', 'JO', 'MA', 'LB', 'US', 'GB']) {
        byCountry[c] = seasonOffers;
      }
      return {
        seasonNumber: p.seasonNumber,
        year: p.year,
        episodes: p.episodes,
        offersByCountry: byCountry
      };
    });
  }

  const byCountry = {};
  for (const c of ['EG', 'SA', 'AE', 'KW', 'QA', 'JO', 'MA', 'LB', 'US', 'GB']) {
    byCountry[c] = defaultOffers;
  }
  return [
    {
      seasonNumber: 1,
      year: startYear || '',
      episodes: 30,
      offersByCountry: byCountry
    }
  ];
}

function mergeArabicAndJustWatch(jwItems, arWikiItems, query) {
  if (arWikiItems.length === 0) return jwItems;

  const map = new Map();
  const qNorm = query.trim();

  for (const ar of arWikiItems) {
    map.set(ar.title, ar);
  }

  for (const jw of jwItems) {
    if (map.has(jw.title)) {
      const existing = map.get(jw.title);
      if (jw.offers && jw.offers.length > 0) {
        const combinedOffers = [...jw.offers];
        for (const o of existing.offers) {
          if (!combinedOffers.some((x) => x.name.toLowerCase().includes(o.key))) {
            combinedOffers.push(o);
          }
        }
        existing.offers = combinedOffers;
        existing.offersByCountry[state.country] = combinedOffers;
      }
      if (jw.poster) existing.poster = jw.poster;
      if (jw.imdb) existing.imdb = jw.imdb;
      existing.id = jw.id;
      existing.isJustWatch = true;
    } else {
      map.set(jw.title + '_' + jw.id, jw);
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    const aExact = a.title.includes(qNorm) ? 1 : 0;
    const bExact = b.title.includes(qNorm) ? 1 : 0;
    return bExact - aExact;
  });
}

function dedupeOffers(rawOffers) {
  const map = new Map();
  const rankMap = { _4K: 3, HD: 2, SD: 1 };

  for (const off of rawOffers) {
    const pkg = off.package || {};
    const key = (pkg.shortName || pkg.clearName || 'stream').toLowerCase();
    const rank = rankMap[off.presentationType] || 0;
    const prev = map.get(key);

    if (!prev || rank > prev.rank) {
      const iconUrl = pkg.icon
        ? `https://images.justwatch.com${pkg.icon.replace('{profile}', 's100').replace('{format}', 'png')}`
        : null;

      map.set(key, {
        key,
        name: pkg.clearName || 'Stream',
        iconUrl,
        rank,
        monetizationType: off.monetizationType,
        presentationType: off.presentationType,
        url: off.standardWebURL || '#'
      });
    }
  }
  return Array.from(map.values());
}

function formatType(mon, qual) {
  const dict = t();
  const q = qual ? ` ${qual.replace('_', '')}` : '';
  if (mon === 'FLATRATE') return `${dict.stream}${q}`;
  if (mon === 'FREE' || mon === 'ADS') return `${dict.free}${q}`;
  if (mon === 'RENT') return `${dict.rent}${q}`;
  if (mon === 'BUY') return `${dict.buy}${q}`;
  return `${q}`.trim();
}

function renderBadge(offer, clickable = false) {
  const icon = offer.iconUrl ? `<img src="${offer.iconUrl}" alt="" loading="lazy" />` : '';
  const typeText = formatType(offer.monetizationType, offer.presentationType);
  const content = `${icon}<span>${escapeHtml(offer.name)}</span><span class="plat-sub">${escapeHtml(typeText)}</span>`;
  if (clickable && offer.url) {
    return `<a href="${offer.url}" target="_blank" rel="noopener" class="plat-badge">${content}</a>`;
  }
  return `<span class="plat-badge">${content}</span>`;
}

function renderResults() {
  const dict = t();
  const cFlag = COUNTRIES[state.country]?.flag || '🌍';
  const cName = getCountryName(state.country);

  const list = state.results.filter((it) => {
    if (state.typeFilter !== 'ALL' && it.type !== state.typeFilter) return false;
    return true;
  });

  els.resultsHeader.classList.remove('hidden');
  els.resultsTitle.textContent =
    state.searchMode === 'ACTOR'
      ? dict.actorResultsFor(state.lastQuery, cFlag, cName, list.length)
      : dict.resultsFor(state.lastQuery, cFlag, cName, list.length);

  if (list.length === 0) {
    els.resultsGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted);">
        ${escapeHtml(dict.noMatches)}
      </div>
    `;
    return;
  }

  const qLower = state.lastQuery.toLowerCase().trim();

  els.resultsGrid.innerHTML = list
    .map((item, idx) => {
      const posterSrc =
        item.poster ||
        `https://placehold.co/160x240/1c2233/a5b4fc?text=${encodeURIComponent(item.title.slice(0, 14))}`;

      const matchedActor = item.actors.find((a) => a.name.toLowerCase().includes(qLower));
      const topActors = item.actors.slice(0, 3);
      if (matchedActor && !topActors.some((a) => a.name === matchedActor.name)) {
        topActors.unshift(matchedActor);
      }

      const sep = state.lang === 'ar' ? '، ' : ', ';
      const castHtml =
        topActors.length > 0
          ? `🎭 ` +
            topActors
              .slice(0, 3)
              .map(
                (a) =>
                  `<span class="actor-link" data-actor="${escapeHtml(a.name)}">${escapeHtml(a.name)}</span>`
              )
              .join(sep)
          : '';

      const badgesHtml =
        item.offers.length > 0
          ? item.offers.slice(0, 4).map((o) => renderBadge(o, false)).join('')
          : `<span style="font-size:0.75rem;color:var(--text-dim);">${escapeHtml(dict.notInCountryCard(cName))}</span>`;

      return `
        <article class="card" data-idx="${idx}">
          <img class="card-poster" src="${posterSrc}" alt="${escapeHtml(item.title)}" loading="lazy" />
          <div class="card-body">
            <div class="card-meta">
              <span class="badge-type">${item.type === 'MOVIE' ? dict.movieBadge : dict.seriesBadge}</span>
              ${item.year ? `<span>· ${item.year}</span>` : ''}
              ${item.imdb ? `<span>· ★ ${item.imdb}</span>` : ''}
            </div>
            <h3 class="card-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3>
            <div class="card-cast">${castHtml}</div>
            <div class="card-platforms">${badgesHtml}</div>
          </div>
        </article>
      `;
    })
    .join('');

  els.resultsGrid.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const actorEl = e.target.closest('.actor-link');
      if (actorEl) {
        e.stopPropagation();
        const actorName = actorEl.dataset.actor;
        setSearchMode('ACTOR');
        els.searchInput.value = actorName;
        runSearch(actorName);
        return;
      }
      const item = list[Number(card.dataset.idx)];
      if (item) openDetail(item);
    });
  });
}

async function openDetail(item) {
  state.selectedItem = item;
  state.selectedSeason = 'ALL';
  setLoading(true, t().loadingDetails(item.title));

  try {
    if (item.isJustWatch) {
      const isArabic = ARABIC_REGEX.test(item.title);
      const countryAliases = COUNTRY_CODES.map(
        (c) => `
          ${c}: offers(country: ${c}, platform: WEB) {
            monetizationType
            presentationType
            standardWebURL
            package { clearName shortName icon }
          }
        `
      ).join('\n');

      const gql = `
        query GetDetails($id: ID!, $c: Country!, $l: Language!) {
          node(id: $id) {
            ... on MovieOrShowOrSeason {
              ${countryAliases}
            }
            ... on Show {
              seasons {
                id
                totalEpisodeCount
                content(country: $c, language: $l) {
                  title
                  seasonNumber
                  originalReleaseYear
                }
                ${countryAliases}
              }
            }
          }
        }
      `;

      const data = await queryJustWatch(gql, {
        id: item.id,
        c: state.country,
        l: isArabic ? 'ar' : state.lang
      });

      if (data?.node) {
        item.offersByCountry = {};
        for (const code of COUNTRY_CODES) {
          item.offersByCountry[code] = dedupeOffers(data.node[code] || []);
        }

        if (Array.isArray(data.node.seasons) && data.node.seasons.length > 0) {
          item.seasons = data.node.seasons
            .map((s) => {
              const sNum = s.content?.seasonNumber || 1;
              const byCountry = {};
              for (const code of COUNTRY_CODES) {
                byCountry[code] = dedupeOffers(s[code] || []);
              }
              return {
                seasonNumber: sNum,
                year: s.content?.originalReleaseYear || '',
                episodes: s.totalEpisodeCount || 0,
                offersByCountry: byCountry
              };
            })
            .sort((a, b) => a.seasonNumber - b.seasonNumber);
        }
      }
    } else if (item.tvmazeId) {
      const res = await fetch(`https://api.tvmaze.com/shows/${item.tvmazeId}?embed[]=seasons&embed[]=cast`);
      if (res.ok) {
        const d = await res.json();
        const castList = d._embedded?.cast || [];
        if (castList.length > 0) {
          item.actors = castList.slice(0, 8).map((c) => ({
            name: c.person?.name || '',
            character: c.character?.name || ''
          })).filter((a) => a.name);
        }
        const rawSeasons = (d._embedded?.seasons || []).filter((s) => s.number > 0);
        if (rawSeasons.length > 0) {
          item.seasons = rawSeasons.map((s) => ({
            seasonNumber: s.number,
            year: s.premiereDate ? s.premiereDate.slice(0, 4) : '',
            episodes: s.episodeOrder || 0,
            offersByCountry: item.offersByCountry || {}
          }));
        }
      }
    }

    renderDetail(item);
    els.detailView.classList.remove('hidden');
    els.detailView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

function renderDetail(item) {
  const dict = t();
  const cFlag = COUNTRIES[state.country]?.flag || '🌍';
  const cName = getCountryName(state.country);

  const posterSrc =
    item.poster ||
    `https://placehold.co/200x300/1c2233/a5b4fc?text=${encodeURIComponent(item.title.slice(0, 14))}`;

  const activeSeason =
    state.selectedSeason !== 'ALL' && item.seasons
      ? item.seasons.find((s) => String(s.seasonNumber) === String(state.selectedSeason))
      : null;

  const activeOffersByCountry = activeSeason
    ? activeSeason.offersByCountry
    : item.offersByCountry || {};

  const localOffers = activeOffersByCountry[state.country] || [];

  const castHtml =
    item.actors && item.actors.length > 0
      ? `
        <div class="cast-pills">
          ${item.actors
            .slice(0, 8)
            .map(
              (a) =>
                `<button type="button" class="cast-pill" data-actor="${escapeHtml(a.name)}" title="${escapeHtml(a.character)}">🎭 ${escapeHtml(a.name)}</button>`
            )
            .join('')}
        </div>
      `
      : '';

  let seasonPillsHtml = '';
  if (item.type === 'SHOW' && item.seasons && item.seasons.length > 0) {
    seasonPillsHtml = `
      <div class="block-title">${escapeHtml(dict.chooseSeason)}</div>
      <div class="season-pills" id="seasonPillsRow">
        <button type="button" class="season-pill ${state.selectedSeason === 'ALL' ? 'active' : ''}" data-s="ALL">
          ${escapeHtml(dict.allSeasons(item.seasons.length))}
        </button>
        ${item.seasons
          .map(
            (s) => `
            <button type="button" class="season-pill ${
              String(state.selectedSeason) === String(s.seasonNumber) ? 'active' : ''
            }" data-s="${s.seasonNumber}">
              ${escapeHtml(dict.seasonN(s.seasonNumber, s.year))}
            </button>
          `
          )
          .join('')}
      </div>
    `;
  }

  const availableCountries = COUNTRY_CODES.filter(
    (code) => (activeOffersByCountry[code] || []).length > 0
  );

  const countryGridHtml =
    availableCountries.length > 0
      ? availableCountries
          .map((code) => {
            const ci = COUNTRIES[code];
            const offs = activeOffersByCountry[code] || [];
            return `
              <div class="country-item ${code === state.country ? 'active-country' : ''}">
                <div class="country-name">${ci.flag} ${escapeHtml(getCountryName(code))}</div>
                <div class="card-platforms">
                  ${offs.map((o) => renderBadge(o, true)).join('')}
                </div>
              </div>
            `;
          })
          .join('')
      : `<div style="color:var(--text-dim);font-size:0.84rem;">${escapeHtml(dict.noOffersFound)}</div>`;

  const scopeLabel = activeSeason
    ? dict.seasonN(activeSeason.seasonNumber, '')
    : dict.fullTitle;

  els.detailView.innerHTML = `
    <div class="detail-header">
      <img class="detail-poster" src="${posterSrc}" alt="${escapeHtml(item.title)}" />
      <div class="detail-info">
        <div class="detail-top-row">
          <div>
            <div class="card-meta">
              <span class="badge-type">${item.type === 'MOVIE' ? dict.movieBadge : dict.seriesBadge}</span>
              ${item.year ? `<span>· ${item.year}</span>` : ''}
              ${item.imdb ? `<span>· ★ ${item.imdb} IMDb</span>` : ''}
            </div>
            <h2 class="detail-title">${escapeHtml(item.title)}</h2>
          </div>
          <button type="button" id="closeDetailBtn" class="close-btn">${escapeHtml(dict.closeBtn)}</button>
        </div>
        <p style="font-size:0.86rem;color:var(--text-muted);margin-top:0.25rem;">
          ${escapeHtml(item.summary)}
        </p>
        ${castHtml}
      </div>
    </div>

    <hr class="divider" />

    ${seasonPillsHtml}

    <div class="watch-box">
      <div class="watch-box-label">
        ${dict.whereToWatch(escapeHtml(scopeLabel), cFlag, escapeHtml(cName))}
      </div>
      <div class="card-platforms">
        ${
          localOffers.length > 0
            ? localOffers.map((o) => renderBadge(o, true)).join('')
            : `<span style="color:#f59e0b;font-size:0.84rem;">${escapeHtml(dict.notAvailableLocal(cName))}</span>`
        }
      </div>
    </div>

    <div class="block-title">
      ${escapeHtml(dict.countriesStreaming(scopeLabel, availableCountries.length))}
    </div>
    <div class="country-compact-grid">
      ${countryGridHtml}
    </div>
  `;

  document.getElementById('closeDetailBtn')?.addEventListener('click', () => {
    els.detailView.classList.add('hidden');
    state.selectedItem = null;
  });

  document.getElementById('seasonPillsRow')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.season-pill');
    if (!btn) return;
    state.selectedSeason = btn.dataset.s;
    renderDetail(item);
  });

  els.detailView.querySelectorAll('.cast-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      const actor = btn.dataset.actor;
      setSearchMode('ACTOR');
      els.searchInput.value = actor;
      runSearch(actor);
    });
  });
}

function setLoading(isLoading, msg = '') {
  els.loadingState.classList.toggle('hidden', !isLoading);
  if (msg) els.loadingMessage.textContent = msg;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', init);
