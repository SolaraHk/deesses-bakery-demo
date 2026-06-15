/* =========================================================
   DÉESSES Bakery — multi-branch static demo
   - Data-driven branches + product menu with category/branch filters
   - Sticky glass nav, scroll-driven warm theme, accessible modal/order flow
   NOTE: image files are temporary local-preview references and
   should be replaced with approved assets before delivery.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Temporary public-preview image references ---------- */
  var IMG = {
    mini:       "assets/mini.jpg",
    sourdough:  "assets/sourdough.jpg",
    croissant:  "assets/croissant.jpg",
    strawberry: "assets/strawberry.jpg",
    rose:       "assets/rose.jpg",
    unicorn:    "assets/unicorn.jpg",
    orange:     "assets/orange.jpg"
  };

  /* ---------- Branches ---------- */
  var BRANCHES = [
    {
      id: "kaitak",
      heart: "💜",
      name: "啟德 Kai Tak",
      sub: "Artemis · AIRSIDE",
      addr: "九龍啟德協調道2號 Airside B132C",
      addrEn: "Shop B132C, B1/F, AIRSIDE, 2 Concorde Road, Kai Tak",
      phone: "6812 8981",
      note: "High-quality bread baked fresh daily, elegant vibe. Brand's signature & gift counter."
    },
    {
      id: "kennedytown",
      heart: "🧡",
      name: "西環 Kennedy Town",
      sub: "Bernice",
      addr: "堅尼地城卑路乍街聯威新樓地下",
      addrEn: "G/F, Luen Wai Building, Belcher's Street, Kennedy Town",
      phone: null,
      note: "Neighbourhood counter for daily cakes, pastries and bakery."
    },
    {
      id: "tinshuiwai",
      heart: "💖",
      name: "天水圍 Tin Shui Wai",
      sub: "Wetland Seasons Bay",
      addr: "Wetland Seasons Bay 地下10號",
      addrEn: "Shop 10, G/F, Wetland Seasons Bay, 1 Wetland Park Road",
      phone: "6812 8908",
      note: "Bayside counter by Hong Kong Wetland Park."
    },
    {
      id: "sheungshui",
      heart: "💓",
      name: "上水 Sheung Shui",
      sub: "Sheung Shui Plaza",
      addr: "上水廣場5樓512號",
      addrEn: "Shop 512, 5/F, Sheung Shui Plaza",
      phone: "6812 8980",
      note: "Mall counter for cakes, pastries and bakery."
    }
  ];

  var ALL_IDS = BRANCHES.map(function (b) { return b.id; });
  var WHATSAPP_NUMBER = "85268128098";
  var LANGUAGE_KEYS = ["en", "zh"];
  var LANGUAGE_STORAGE_KEY = "deesses-bakery-language";
  var LANGUAGES = [
    { code: "en", label: "EN", name: "English" },
    { code: "zh", label: "繁", name: "繁體中文" }
  ];
  var COPY = {
    en: {
      languageLabel: "Language",
      openNav: "Open navigation",
      quickSocialLinks: "Quick social links",
      socialLabel: "Social",
      socialInstagramHint: "Latest cakes / DM pre-order",
      socialWhatsappHint: "Message to pre-order",
      socialGalleryTitle: "Social gallery",
      socialGalleryHint: "Preview posts and updates",
      skipMenu: "Skip to menu",
      searchMenu: "Search menu",
      searchButton: "Search",
      chooseBranch: "Choose branch",
      cakeCraft: "Cake craft",
      cakes: "Cakes",
      pastries: "Pastries",
      bakery: "Bakery",
      preOrder: "Pre-order",
      branches: "Branches",
      craft: "Craft",
      menu: "Menu",
      order: "Order",
      heroEyebrow: "DÉESSES · Artemis by Deesses Bakery · Hong Kong",
      heroTitle: "Goddess-made<br />cakes & pastries.",
      heroSub: "French cakes · handmade croissants · natural sourdough",
      heroFine: "Unofficial preview using temporary images · replace with approved assets before delivery.",
      branchEyebrow: "Choose Your Branch",
      branchTitle: "Four counters, one brand.",
      branchSub: "Tap <strong>Artemis at Kai Tak</strong> to jump into the purple signature counter first; the other branch cards take you straight to their filtered menu.",
      signatureEyebrow: "Artemis · Kai Tak signature",
      signatureLead: "At <strong>AIRSIDE, Kai Tak</strong>, Artemis pairs high-quality bread baked fresh daily with an elegant, gift-ready vibe — a stronger pink-and-purple, Instagram aesthetic and a handful of signature bakes.",
      viewArtemis: "View Artemis products",
      craftTitle: "Tap to pull the celebration cake apart.",
      craftSub: "A playful exploded-view moment shows how celebration cakes come together — candle, berries, cream, sponge and plate — before everything snaps back into a gift-ready finish.",
      explode: "Explode",
      assemble: "Assemble",
      replay: "Replay",
      cakeAssembled: "Cake assembled",
      cakeExploded: "Cake exploded view",
      menuEyebrow: "The Menu",
      menuTitle: "Cakes, pastries & bakery.",
      menuSub: "Filter by category and by branch. Prices marked <em>“from public posts”</em> come from older social posts and may have changed.",
      category: "Category",
      branch: "Branch",
      noItems: "No items match this filter.",
      noteAssets: "Images are temporary local preview files and should be replaced with approved assets before delivery. Seasonal prices are past examples, not current pricing.",
      orderEyebrow: "Pre-order",
      orderTitle: "Reserve before you visit.",
      orderSub: "Cakes and festive bakes are made to order in limited daily batches — message ahead to reserve.",
      dmHint: "Send a direct message",
      waHint: "Message to pre-order",
      orderNote: "Pre-order channel per the brand's public Instagram bio. Availability and lead times vary by branch and season.",
      follow: "Follow",
      socialLead: "<strong>DÉESSES</strong> — Artemis by Deesses Bakery. Bakery. New flavours, seasonal cakes and branch updates land on Instagram first.",
      socialCounts: "<strong>436</strong> posts · <strong>~6,250</strong> followers",
      openInstagram: "Open Instagram",
      footerTag: "Artemis by Deesses Bakery · Hong Kong",
      footerFine: "<strong>Static demo site.</strong> This is an unofficial design demo built for presentation. Branch names, addresses, phone numbers and the pre-order contact are taken from the brand's public Instagram bio and public listings (OpenRice / AIRSIDE) for illustration. Seasonal prices shown are drawn from older public posts and may have changed. Product images are temporary local preview files and should be replaced with approved assets before client delivery. Please confirm all hours, pricing and availability with the business directly.",
      all: "All",
      allBranches: "All branches",
      signature: "Signature",
      seasonal: "Seasonal",
      allBranchAvail: "All branches",
      selectedBranchAvail: "selected branch(es)",
      viewDetails: "View details",
      preOrderNow: "Pre-order now",
      enterArtemis: "Enter Artemis →",
      viewMenu: "View menu →",
      preorderVia: "Pre-order via IG / WhatsApp"
    },
    zh: {
      languageLabel: "語言",
      openNav: "開啟選單",
      quickSocialLinks: "快速社交連結",
      socialLabel: "社交",
      socialInstagramHint: "最新蛋糕／私訊預訂",
      socialWhatsappHint: "WhatsApp 查詢預訂",
      socialGalleryTitle: "社交相集",
      socialGalleryHint: "查看帖文與最新消息",
      skipMenu: "跳到餐單",
      searchMenu: "搜尋餐單",
      searchButton: "搜尋",
      chooseBranch: "選擇分店",
      cakeCraft: "蛋糕層次",
      cakes: "蛋糕",
      pastries: "酥點",
      bakery: "麵包",
      preOrder: "立即預訂",
      branches: "分店",
      craft: "製作",
      menu: "餐單",
      order: "訂購",
      heroEyebrow: "DÉESSES · Artemis by Deesses Bakery · 香港",
      heroTitle: "女神系<br />蛋糕與法式酥點",
      heroSub: "法式蛋糕 · 手工牛角酥 · 天然酸種包",
      heroFine: "非官方網站示意 · 圖片為臨時預覽素材，交付前請換成正式授權圖片。",
      branchEyebrow: "選擇分店",
      branchTitle: "四間分店，一個品牌。",
      branchSub: "點選 <strong>啟德 Artemis</strong> 可先看紫調招牌專櫃；其他分店卡會直接帶你到已篩選餐單。",
      signatureEyebrow: "Artemis · 啟德招牌",
      signatureLead: "位於 <strong>AIRSIDE 啟德</strong> 的 Artemis，每日新鮮焗製高質麵包，配合更精緻、送禮感的粉紫 Instagram 風格及多款招牌產品。",
      viewArtemis: "睇啟德產品",
      craftTitle: "點一下，拆開睇蛋糕層次。",
      craftSub: "用互動拆解效果展示慶祝蛋糕如何由蠟燭、莓果、忌廉、蛋糕胚和底碟組成，再合成送禮完成品。",
      explode: "拆開",
      assemble: "組裝",
      replay: "重播",
      cakeAssembled: "蛋糕已組裝",
      cakeExploded: "蛋糕已拆開睇層次",
      menuEyebrow: "餐單",
      menuTitle: "蛋糕、酥點與麵包。",
      menuSub: "可按分類和分店篩選。標示 <em>「公開帖文參考」</em> 的價錢來自較早前社交帖文，或已更改。",
      category: "分類",
      branch: "分店",
      noItems: "沒有符合的產品。",
      noteAssets: "圖片為臨時本地預覽素材，交付前請換成正式授權圖片。節日價錢屬過往示例，並非現行定價。",
      orderEyebrow: "訂購方法",
      orderTitle: "到店前先預留。",
      orderSub: "蛋糕及節日產品每日限量製作，建議提前私訊預訂。",
      dmHint: "私訊落單",
      waHint: "WhatsApp 訂購",
      orderNote: "預訂渠道按品牌公開 Instagram 簡介整理；供應、預訂時間及取貨安排會因分店及季節而不同。",
      follow: "追蹤我們",
      socialLead: "<strong>DÉESSES</strong> — Artemis by Deesses Bakery。新口味、節日蛋糕和分店消息會率先在 Instagram 更新。",
      socialCounts: "<strong>436</strong> 篇帖文 · <strong>約 6,250</strong> 位追蹤者",
      openInstagram: "前往 Instagram",
      footerTag: "Artemis by Deesses Bakery · 香港",
      footerFine: "<strong>靜態網站示意。</strong> 這是非官方設計示範網站。分店名稱、地址、電話和預訂聯絡方式取自品牌公開 Instagram 簡介及公開列表（OpenRice / AIRSIDE）作展示用途。節日價錢來自較早前公開帖文，或已更改。產品圖片為臨時本地預覽素材，交付客戶前請換成正式授權圖片。所有營業時間、價錢及供應請直接向店舖確認。",
      all: "全部",
      allBranches: "所有分店",
      signature: "招牌",
      seasonal: "節日限定",
      allBranchAvail: "全線供應",
      selectedBranchAvail: "指定分店",
      viewDetails: "查看詳情",
      preOrderNow: "立即預訂",
      enterArtemis: "進入啟德專櫃 →",
      viewMenu: "看餐單 →",
      preorderVia: "經 IG / WhatsApp 預訂"
    }
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function smartScroll(target, options) {
    if (!target) return;
    var opts = options || {};
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : (opts.behavior || "smooth"), block: opts.block || "start" });
  }

  function todayIso() {
    var now = new Date();
    var local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function getInitialLanguage() {
    var requested = new URLSearchParams(window.location.search).get("lang");
    if (LANGUAGE_KEYS.indexOf(requested) !== -1) return requested;
    try {
      var saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (LANGUAGE_KEYS.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var browserLanguages = [navigator.language].concat(navigator.languages || []).filter(Boolean);
    return browserLanguages.some(function (lang) { return String(lang).toLowerCase().indexOf("zh") === 0; }) ? "zh" : "en";
  }

  var currentLanguage = getInitialLanguage();

  function tx(key) {
    return (COPY[currentLanguage] && COPY[currentLanguage][key]) || COPY.en[key] || key;
  }

  function localizeStatic() {
    document.documentElement.lang = currentLanguage === "zh" ? "zh-Hant-HK" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      node.innerHTML = tx(key);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
      node.setAttribute("aria-label", tx(node.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
      node.setAttribute("placeholder", tx(node.getAttribute("data-i18n-placeholder")));
    });
    var toggleLabel = document.querySelector("[data-nav-toggle] .sr-only");
    if (toggleLabel) toggleLabel.textContent = tx("openNav");
    window.__deessesLanguage = currentLanguage;
  }

  function syncLanguageButtons() {
    document.querySelectorAll("[data-language]").forEach(function (btn) {
      var on = btn.getAttribute("data-language") === currentLanguage;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setLanguage(lang) {
    if (LANGUAGE_KEYS.indexOf(lang) === -1 || lang === currentLanguage) return;
    currentLanguage = lang;
    try { window.localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage); } catch (e) {}
    localizeStatic();
    syncLanguageButtons();
    renderBranches();
    renderFilters();
    renderMenu();
    renderFooterBranches();
    var status = document.getElementById("cakeStatus");
    var craft = document.getElementById("craft");
    if (status && craft) status.textContent = craft.getAttribute("data-cake-mode") === "exploded" ? tx("cakeExploded") : tx("cakeAssembled");
  }


  /* ---------- Categories ---------- */
  var CATEGORIES = [
    { id: "cake",   labelEn: "Cake",   labelZh: "蛋糕", emoji: "🎂" },
    { id: "pastry", labelEn: "Pastry", labelZh: "酥點", emoji: "🧁" },
    { id: "bakery", labelEn: "Bakery", labelZh: "麵包", emoji: "🥯" }
  ];

  /* ---------- Products ----------
     branches: ids where item is offered (all four unless noted).
     priceNote: "current" facts are described conservatively; festive/seasonal
     prices are explicitly flagged as past public-post examples. */
  var PRODUCTS = [
    {
      name: "Mini Cakes · 散水餅",
      cat: "cake",
      img: IMG.mini,
      desc: "Rotating single-serve cakes — a green apple mini cake among the recent flavours.",
      price: "From public posts · 售價或有變動",
      size: "Assorted mini size · 散水/派對款",
      serves: "Best for office sharing / party box",
      lead: "Reserve 1–2 days ahead · 建議提前1–2日預訂",
      options: ["Green apple mini cake", "Rotating seasonal flavours", "Gift / party box"],
      branches: ALL_IDS
    },
    {
      name: "Natural Sourdough · 天然酸種包",
      cat: "bakery",
      img: IMG.sourdough,
      desc: "Slow-fermented sourdough with no additives, preservatives or artificial colour.",
      price: "Ask in branch · 門市查詢",
      size: "Loaf size varies daily · 每日款式不同",
      serves: "Slice for breakfast / sharing",
      lead: "Same-day stock varies · 即日供應視乎門市",
      options: ["Natural sourdough", "No additives", "Daily baked"],
      branches: ALL_IDS
    },
    {
      name: "Croissants · 牛角酥",
      cat: "pastry",
      img: IMG.croissant,
      desc: "Handmade, hand-folded and double-fermented. Flavours include chocolate custard cream, raspberry-strawberry and black sesame mochi.",
      price: "Ask in branch · 門市查詢",
      size: "Single pastry · 單件裝",
      serves: "1 person",
      lead: "Best to reserve before pickup · 建議先預留",
      options: ["Chocolate custard", "Raspberry-strawberry", "Black sesame mochi"],
      branches: ALL_IDS
    },
    {
      name: "Strawberry Cake · 士多啤梨蛋糕",
      cat: "cake",
      img: IMG.strawberry,
      desc: "Fresh strawberry cake. A public Instagram post listed a limited special price HK$318 (regular HK$368), with pickup before 2026-06-10 — shown as a past example only.",
      price: "Past example: $318 / reg $368 · 已過期",
      size: "Approx. 5–6 inch cake · 約5–6吋（示例）",
      serves: "4–6 people · 約4–6人",
      lead: "Reserve 2–3 days ahead · 建議提前2–3日預訂",
      options: ["Birthday message card", "Pickup branch", "Candle request"],
      seasonal: true,
      branches: ALL_IDS
    },
    {
      name: "Rose Cake · 玫瑰蛋糕",
      cat: "cake",
      img: IMG.rose,
      desc: "Mother's Day creation: rose-raspberry cream, strawberry jam, sponge, raspberry chocolate mousse and handmade chocolate rose petals under a red glaze.",
      price: "Seasonal · 節日限定",
      size: "Approx. 5 inch seasonal cake · 約5吋節日蛋糕",
      serves: "4–6 people · 約4–6人",
      lead: "Seasonal pre-order · 節日前預訂",
      options: ["Rose-raspberry cream", "Strawberry jam", "Chocolate message card"],
      seasonal: true,
      branches: ALL_IDS
    },
    {
      name: "Déesses Unicorn · 獨角獸蛋糕",
      cat: "cake",
      img: IMG.unicorn,
      desc: "3D chocolate unicorn over a white-peach cake with peach jam and mousse. A festive limited bake (20 only) — example only.",
      price: "Seasonal · 節日限定",
      size: "Limited celebration cake · 限量慶祝蛋糕",
      serves: "4–6 people · 約4–6人",
      lead: "Limited batch, ask Artemis · 啟德限定查詢",
      options: ["White peach mousse", "3D chocolate unicorn", "Gift-ready box"],
      seasonal: true,
      branches: ["kaitak"]
    },
    {
      name: "Orange Cake · 香橙蛋糕",
      cat: "cake",
      img: IMG.orange,
      desc: "Lunar New Year cake: orange mousse, praline chocolate mousse, chocolate-orange sponge and semi-confit mandarin.",
      price: "Seasonal · 節日限定",
      size: "Approx. 5 inch seasonal cake · 約5吋節日蛋糕",
      serves: "4–6 people · 約4–6人",
      lead: "Seasonal pre-order · 節日前預訂",
      options: ["Orange mousse", "Praline chocolate mousse", "Mandarin garnish"],
      seasonal: true,
      branches: ALL_IDS
    },
    {
      id: "pistachio-mochi-croissant",
      name: "Pistachio Mochi Croissant · 開心果麻糬牛角酥",
      cat: "pastry",
      img: IMG.croissant,
      desc: "Artemis signature — buttery croissant with pistachio and chewy mochi.",
      price: "Ask in branch · 門市查詢",
      size: "Single signature pastry · 單件招牌酥點",
      serves: "1 person",
      lead: "Reserve same day if available · 可即日查詢預留",
      options: ["Pistachio filling", "Chewy mochi", "Artemis Kai Tak pickup"],
      signature: true,
      branches: ["kaitak"]
    },
    {
      id: "50cm-sausage-pastry",
      name: "50cm Sausage Pastry · 50cm 腸仔酥",
      cat: "pastry",
      img: IMG.croissant,
      desc: "Artemis signature long sausage pastry — a fun sharing bake from the Kai Tak counter.",
      price: "Ask in branch · 門市查詢",
      size: "50cm signature pastry · 50cm 招牌酥點",
      serves: "2–4 people sharing · 2–4人分享",
      lead: "Reserve same day if available · 可即日查詢預留",
      options: ["50cm sausage pastry", "Cut for sharing", "Artemis Kai Tak pickup"],
      signature: true,
      branches: ["kaitak"]
    },
    {
      id: "mini-rainbow-croissants",
      name: "Mini Rainbow Croissants · 迷你彩虹牛角酥",
      cat: "pastry",
      img: IMG.croissant,
      desc: "Colourful mini croissants from Artemis — designed for gifting, photos and sharing boxes.",
      price: "Ask in branch · 門市查詢",
      size: "Mini croissant box · 迷你牛角酥盒",
      serves: "Sharing box · 分享裝",
      lead: "Reserve before pickup · 建議先預留",
      options: ["Rainbow mini croissants", "Gift box", "Artemis Kai Tak pickup"],
      signature: true,
      branches: ["kaitak"]
    },
    {
      id: "bear-cake",
      name: "Bear Cake · 小熊蛋糕",
      cat: "cake",
      img: IMG.unicorn,
      desc: "Cute bear-themed celebration cake from the Artemis signature counter.",
      price: "Ask in branch · 門市查詢",
      size: "Celebration cake · 慶祝蛋糕",
      serves: "Ask in branch · 門市查詢",
      lead: "Reserve 2–3 days ahead · 建議提前2–3日預訂",
      options: ["Bear cake design", "Birthday message card", "Artemis Kai Tak pickup"],
      signature: true,
      branches: ["kaitak"]
    },
    {
      name: "Filled Bagels · 麻糬貝果",
      cat: "bakery",
      img: IMG.sourdough,
      desc: "Mochi-filled bagels — matcha mochi red bean, earl grey mochi lychee, taro mochi.",
      price: "From public posts · $15–$19 · 售價或有變動",
      size: "Single bagel · 單個貝果",
      serves: "1 person",
      lead: "Same-day stock varies · 即日供應視乎門市",
      options: ["Matcha mochi red bean", "Earl grey mochi lychee", "Taro mochi"],
      branches: ALL_IDS
    },
    {
      name: "Wheel Croissant · 圓酥",
      cat: "pastry",
      img: IMG.croissant,
      desc: "Round laminated pastry — pistachio, Lotus sea-salt caramel, lemon yuzu.",
      price: "From public posts · $26–$29 · 售價或有變動",
      size: "Single wheel croissant · 單件圓酥",
      serves: "1 person",
      lead: "Best to reserve before pickup · 建議先預留",
      options: ["Pistachio", "Lotus sea-salt caramel", "Lemon yuzu"],
      branches: ALL_IDS
    }
  ];

  /* =========================================================
     Render helpers
     ========================================================= */
  var body = document.body;
  var nav = document.getElementById("nav");
  var activeBranch = "all";
  var activeCategory = "all";
  var activeSearch = "";
  var previousModalFocus = null;

  function hasProductMenu() {
    return !!document.getElementById("menuGrid");
  }

  function menuUrl(params) {
    params = params || {};
    var q = new URLSearchParams();
    if (params.cat && params.cat !== "all") q.set("cat", params.cat);
    if (params.branch && params.branch !== "all") q.set("branch", params.branch);
    if (params.search) q.set("q", params.search);
    var query = q.toString();
    return "menu.html" + (query ? "?" + query : "") + "#menu";
  }

  function goToMenu(params) {
    if (hasProductMenu()) {
      if (params && params.cat) activeCategory = params.cat;
      if (params && params.branch) activeBranch = params.branch;
      if (params && Object.prototype.hasOwnProperty.call(params, "search")) activeSearch = params.search || "";
      syncChips();
      renderMenu();
      var input = document.getElementById("heroSearchInput");
      if (input) input.value = activeSearch;
      smartScroll(document.getElementById("menu"), { block: "start" });
      return;
    }
    window.location.href = menuUrl(params);
  }

  function applyInitialMenuParams() {
    if (!hasProductMenu()) return;
    var params = new URLSearchParams(window.location.search);
    var cat = params.get("cat");
    var branch = params.get("branch");
    var search = params.get("q");
    if (cat === "cake" || cat === "pastry" || cat === "bakery") activeCategory = cat;
    if (branchName(branch)) activeBranch = branch;
    if (search) activeSearch = search.trim().toLowerCase();
    var input = document.getElementById("heroSearchInput");
    if (input) input.value = activeSearch;
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function branchName(id) {
    for (var i = 0; i < BRANCHES.length; i++) if (BRANCHES[i].id === id) return BRANCHES[i];
    return null;
  }

  /* ---------- Branch cards ---------- */
  function renderBranches() {
    var grid = document.getElementById("branchGrid");
    if (!grid) return;
    grid.innerHTML = "";
    BRANCHES.forEach(function (b) {
      var card = el("article", "branch-card");
      card.setAttribute("data-branch", b.id);
      card.setAttribute("aria-current", "false");
      var phone = b.phone
        ? '<a class="branch-card__phone" href="tel:+852' + esc(b.phone.replace(/\s/g, "")) + '">☏ ' + esc(b.phone) + "</a>"
        : '<span class="branch-card__phone branch-card__phone--none">' + esc(tx("preorderVia")) + '</span>';
      card.innerHTML =
        '<span class="branch-card__heart" aria-hidden="true">' + esc(b.heart) + "</span>" +
        '<h3 class="branch-card__name">' + esc(b.name) + "</h3>" +
        '<p class="branch-card__sub">' + esc(b.sub) + "</p>" +
        '<p class="branch-card__addr" lang="zh-Hant">' + esc(b.addr) + "</p>" +
        '<p class="branch-card__addr branch-card__addr--en">' + esc(b.addrEn) + "</p>" +
        '<p class="branch-card__note">' + esc(b.note) + "</p>" +
        phone +
        '<button type="button" class="branch-card__cta">' + (b.id === "kaitak" ? tx("enterArtemis") : tx("viewMenu")) + '</button>';
      function activateBranchCard() {
        var nextBranch = activeBranch === b.id ? "all" : b.id;
        if (!hasProductMenu()) {
          goToMenu({ branch: nextBranch });
          return;
        }
        selectBranch(nextBranch);
        smartScroll(document.getElementById("menu"), { block: "start" });
      }
      card.addEventListener("click", function (event) {
        if (event.target && event.target.closest && event.target.closest("a")) return;
        activateBranchCard();
      });
      grid.appendChild(card);
    });
  }

  /* ---------- Filter chips ---------- */
  function renderFilters() {
    var catRow = document.getElementById("categoryFilters");
    var brRow = document.getElementById("branchFilters");
    if (!catRow || !brRow) return;
    catRow.querySelectorAll("button").forEach(function (node) { node.remove(); });
    brRow.querySelectorAll("button").forEach(function (node) { node.remove(); });
    var catLabel = catRow.querySelector(".filters__label");
    var brLabel = brRow.querySelector(".filters__label");
    if (catLabel) catLabel.textContent = tx("category");
    if (brLabel) brLabel.textContent = tx("branch");

    function chip(row, key, label, onClick, group) {
      var c = el("button", "chip", label);
      c.type = "button";
      c.setAttribute("data-key", key);
      c.setAttribute("data-group", group);
      c.setAttribute("aria-pressed", "false");
      c.addEventListener("click", onClick);
      row.appendChild(c);
      return c;
    }

    chip(catRow, "all", tx("all"), function () { selectCategory("all"); }, "cat");
    CATEGORIES.forEach(function (c) {
      chip(catRow, c.id, c.emoji + " " + (currentLanguage === "zh" ? c.labelZh : c.labelEn), function () { selectCategory(c.id); }, "cat");
    });

    chip(brRow, "all", tx("allBranches"), function () { selectBranch("all"); }, "br");
    BRANCHES.forEach(function (b) {
      chip(brRow, b.id, b.heart + " " + b.name, function () { selectBranch(b.id); }, "br");
    });

    syncChips();
  }

  function syncChips() {
    document.querySelectorAll('.chip[data-group="cat"]').forEach(function (c) {
      var on = c.getAttribute("data-key") === activeCategory;
      c.classList.toggle("chip--on", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll('.chip[data-group="br"]').forEach(function (c) {
      var on = c.getAttribute("data-key") === activeBranch;
      c.classList.toggle("chip--on", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    document.querySelectorAll(".branch-card").forEach(function (c) {
      var on = c.getAttribute("data-branch") === activeBranch;
      c.classList.toggle("branch-card--on", on);
      c.setAttribute("aria-current", on ? "true" : "false");
    });
  }

  function selectCategory(id) { activeCategory = id; syncChips(); renderMenu(); }
  function selectBranch(id) { activeBranch = id; syncChips(); renderMenu(); }

  function getActiveBranchForOrder(p) {
    if (activeBranch !== "all" && p.branches.indexOf(activeBranch) !== -1) return branchName(activeBranch);
    return branchName(p.branches[0]);
  }

  function findProductById(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  function orderSummaryLines(p, branch, extras) {
    extras = extras || {};
    var lines = [
      "產品/Product: " + p.name,
      "分店/Branch: " + (branch ? branch.name : "To be confirmed"),
      "款式/Option: " + (extras.variant || "To be confirmed"),
      "尺寸/Size: " + (extras.size || p.size || "To be confirmed"),
      "數量/Quantity: " + (extras.quantity || "1"),
      "取貨日期/Pickup date: " + (extras.pickupDate || "To be confirmed")
    ];
    if (p.cat === "cake") {
      lines.push("蠟燭/Candles: " + (extras.candles ? "Yes" : "No / to be confirmed"));
      lines.push("蛋糕牌/Message card: " + (extras.messageText || "None / to be confirmed"));
    }
    if (extras.remarks) lines.push("備註/Remarks: " + extras.remarks);
    return lines;
  }

  function productWhatsAppUrl(p, branch, extras) {
    extras = extras || {};
    var lines = ["你好 DÉESSES Bakery，我想查詢/預訂：" + p.name]
      .concat(orderSummaryLines(p, branch, extras))
      .concat([
        "價錢/Price: " + p.price,
        "請確認供應、最終價錢及取貨安排，謝謝。"
      ]);
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  function renderOrderSummary(p, branch, extras) {
    return orderSummaryLines(p, branch, extras).map(function (line) {
      var parts = line.split(": ");
      return '<div><span>' + esc(parts[0]) + '</span><strong>' + esc(parts.slice(1).join(": ")) + '</strong></div>';
    }).join("");
  }

  function detailOptions(p) {
    return (p.options || ["Pickup branch", "Quantity", "Message card"])
      .map(function (x) { return '<span class="product-modal__pill">' + esc(x) + '</span>'; })
      .join("");
  }

  function detailBranches(p) {
    return p.branches.map(function (id) {
      var b = branchName(id);
      return b ? '<span class="product-modal__branch">' + esc(b.heart + " " + b.name) + '</span>' : "";
    }).join("");
  }

  function detailBranchChoices(p, selectedId) {
    return p.branches.map(function (id) {
      var b = branchName(id);
      if (!b) return "";
      var on = id === selectedId ? " product-modal__branch-choice--on" : "";
      return '<button class="product-modal__branch-choice' + on + '" type="button" data-order-branch="' + esc(id) + '">' + esc(b.heart + " " + b.name) + '</button>';
    }).join("");
  }

  function optionTags(options) {
    return (options || []).map(function (x) {
      return '<option value="' + esc(x) + '">' + esc(x) + '</option>';
    }).join("");
  }

  function defaultSizeChoices(p) {
    if (p.cat === "cake") return [p.size || "Standard cake", "4 inch · 2–3 people", "5 inch · 4–6 people", "6 inch · 6–8 people"];
    if (p.cat === "pastry") return [p.size || "Single pastry", "Single item · 單件", "Box of 4 · 四件裝", "Box of 6 · 六件裝"];
    return [p.size || "Single item", "Single item · 單件", "Half dozen · 半打", "One dozen · 一打"];
  }

  function orderConfigurator(p) {
    var sizeChoices = defaultSizeChoices(p).filter(function (value, index, arr) { return value && arr.indexOf(value) === index; });
    var cakeFields = p.cat === "cake"
      ? '<label class="product-modal__toggle"><input type="checkbox" data-order-field="candles"> Add candles · 需要蠟燭</label>' +
        '<input class="product-modal__field" data-message-card type="text" placeholder="Cake plaque wording · 蛋糕牌寫字（可留空）" />'
      : '';
    return '<div class="product-modal__section product-modal__config"><span>Step 2 · Choose order details · 選擇設定</span>' +
      '<div class="product-modal__form-grid">' +
        '<label class="product-modal__control">款式/Option<select data-order-field="variant">' + optionTags(p.options || [p.name]) + '</select></label>' +
        '<label class="product-modal__control">尺寸/Size<select data-order-field="size">' + optionTags(sizeChoices) + '</select></label>' +
        '<label class="product-modal__control">數量/Quantity<select data-order-field="quantity"><option>1</option><option>2</option><option>3</option><option>4</option><option>6</option><option>12</option></select></label>' +
        '<label class="product-modal__control">取貨日期/Pickup date<input data-order-field="pickupDate" type="date" min="' + todayIso() + '" /></label>' +
      '</div>' + cakeFields +
      '<input class="product-modal__field" data-order-field="remarks" type="text" placeholder="Remarks · 備註（可留空）" />' +
      '<p class="product-modal__fine">Only the main order details are shown here. Other special requests can go in remarks or be confirmed in WhatsApp.</p>' +
    '</div>';
  }

  function collectOrderExtras(modal) {
    function val(name) {
      var field = modal.querySelector('[data-order-field="' + name + '"]');
      if (!field) return "";
      return field.type === "checkbox" ? field.checked : field.value;
    }
    return {
      variant: val("variant"),
      size: val("size"),
      quantity: val("quantity"),
      pickupDate: val("pickupDate"),
      remarks: val("remarks"),
      candles: val("candles"),
      messageText: (modal.querySelector("[data-message-card]") || {}).value || ""
    };
  }

  function bindOrderBranchChoices(modal, product) {
    var orderBtn = modal.querySelector(".product-modal__order");
    var branchNote = modal.querySelector(".product-modal__branch-note strong");
    var selectedChoice = modal.querySelector(".product-modal__branch-choice--on");
    var currentBranch = branchName(selectedChoice ? selectedChoice.getAttribute("data-order-branch") : "") || getActiveBranchForOrder(product);

    function refreshOrderUrl() {
      var extras = collectOrderExtras(modal);
      if (orderBtn) orderBtn.href = productWhatsAppUrl(product, currentBranch, extras);
      var summary = modal.querySelector("[data-order-summary]");
      if (summary) summary.innerHTML = renderOrderSummary(product, currentBranch, extras);
    }

    modal.querySelectorAll("[data-order-branch]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var branch = branchName(btn.getAttribute("data-order-branch"));
        if (!branch || !orderBtn) return;
        currentBranch = branch;
        refreshOrderUrl();
        if (branchNote) branchNote.textContent = branch.name;
        modal.querySelectorAll("[data-order-branch]").forEach(function (other) {
          other.classList.toggle("product-modal__branch-choice--on", other === btn);
        });
      });
    });
    modal.querySelectorAll("[data-message-card], [data-order-field]").forEach(function (control) {
      control.addEventListener("input", refreshOrderUrl);
      control.addEventListener("change", refreshOrderUrl);
    });
    refreshOrderUrl();
  }

  /* ---------- Menu ---------- */
  function renderMenu() {
    var grid = document.getElementById("menuGrid");
    var empty = document.getElementById("menuEmpty");
    if (!grid) return;
    grid.innerHTML = "";

    var items = PRODUCTS.filter(function (p) {
      var catOk = activeCategory === "all" || p.cat === activeCategory;
      var brOk = activeBranch === "all" || p.branches.indexOf(activeBranch) !== -1;
      var searchText = (p.name + " " + p.desc + " " + p.price + " " + (p.options || []).join(" ")).toLowerCase();
      var searchOk = !activeSearch || searchText.indexOf(activeSearch) !== -1;
      return catOk && brOk && searchOk;
    });

    if (activeBranch === "kaitak") {
      items = items.slice().sort(function (a, b) {
        function artemisRank(p) {
          if (p.signature) return 0;
          if (p.branches.length === 1 && p.branches[0] === "kaitak") return 1;
          return 2;
        }
        return artemisRank(a) - artemisRank(b);
      });
    }

    if (empty) empty.hidden = items.length > 0;

    items.forEach(function (p) {
      var card = el("article", "product");
      if (p.id) card.setAttribute("data-product-id", p.id);
      var badge = "";
      if (p.signature) badge = '<span class="product__badge product__badge--sig">' + esc(tx("signature")) + '</span>';
      else if (p.seasonal) badge = '<span class="product__badge product__badge--season">' + esc(tx("seasonal")) + '</span>';

      var hearts = p.branches.map(function (id) {
        var b = branchName(id);
        return b ? '<span title="' + esc(b.name) + '">' + esc(b.heart) + "</span>" : "";
      }).join("");
      var avail = p.branches.length === ALL_IDS.length
        ? '<span class="product__avail-all">' + esc(tx("allBranchAvail")) + '</span>'
        : '<span class="product__avail-some">' + hearts + " " + esc(tx("selectedBranchAvail")) + "</span>";

      var cat = null;
      for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === p.cat) cat = CATEGORIES[i];

      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "View details for " + p.name);
      card.innerHTML =
        '<div class="product__media" aria-hidden="true">' +
          badge +
          '<span class="product__cat">' + esc(cat ? cat.emoji + " " + (currentLanguage === "zh" ? cat.labelZh : cat.labelEn) : "") + "</span>" +
          '<img src="' + esc(p.img) + '" alt="" width="320" height="320" loading="lazy" decoding="async" />' +
        "</div>" +
        '<div class="product__body">' +
          '<div class="product__head"><h3>' + esc(p.name) + "</h3></div>" +
          "<p class=\"product__desc\">" + esc(p.desc) + "</p>" +
          '<div class="product__foot">' +
            '<span class="product__price">' + esc(p.price) + "</span>" +
            '<span class="product__avail">' + avail + "</span>" +
            '<span class="product__open" aria-hidden="true">' + esc(tx("viewDetails")) + ' →</span>' +
            '<span class="product__order-hint">' + esc(tx("preOrderNow")) + '</span>' +
          "</div>" +
        "</div>";
      card.addEventListener("click", function () { openProductModal(p, card); });
      card.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        openProductModal(p, card);
      });
      grid.appendChild(card);
    });
  }

  /* ---------- Product detail modal + WhatsApp prefill ---------- */
  function ensureModal() {
    var existing = document.getElementById("productModal");
    if (existing) return existing;
    var m = el("div", "product-modal");
    m.id = "productModal";
    m.setAttribute("aria-hidden", "true");
    m.innerHTML = '<div class="product-modal__backdrop" data-close-modal></div>' +
      '<section class="product-modal__panel" role="dialog" aria-modal="true" aria-labelledby="productModalTitle">' +
        '<button class="product-modal__close" type="button" aria-label="Close product details" data-close-modal>×</button>' +
        '<div class="product-modal__content" id="productModalContent"></div>' +
      '</section>';
    m.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute("data-close-modal")) closeProductModal();
    });
    document.addEventListener("keydown", function (e) {
      if (!m.classList.contains("product-modal--open")) return;
      if (e.key === "Escape") closeProductModal();
      if (e.key === "Tab") trapModalFocus(e, m);
    });
    document.body.appendChild(m);
    return m;
  }

  function trapModalFocus(event, modal) {
    var focusable = modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusable = Array.prototype.filter.call(focusable, function (node) {
      return node.offsetParent !== null || node === document.activeElement;
    });
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openProductModal(p, trigger) {
    var modal = ensureModal();
    previousModalFocus = trigger || document.activeElement;
    var content = document.getElementById("productModalContent");
    var branch = getActiveBranchForOrder(p);
    var orderUrl = productWhatsAppUrl(p, branch);
    content.innerHTML =
      '<div class="product-modal__image"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" width="320" height="320" /></div>' +
      '<div class="product-modal__details">' +
        '<p class="eyebrow">Product details · 產品詳情</p>' +
        '<h2 id="productModalTitle">' + esc(p.name) + '</h2>' +
        '<p class="product-modal__desc">' + esc(p.desc) + '</p>' +
        '<div class="product-modal__specs product-modal__specs--compact">' +
          '<div><span>Price · 價錢</span><strong>' + esc(p.price) + '</strong></div>' +
          '<div><span>Lead time · 預訂</span><strong>' + esc(p.lead || "Ask in branch") + '</strong></div>' +
        '</div>' +
        '<div class="product-modal__branch-note">Step 1 · Pickup branch: <strong>' + esc(branch ? branch.name : "To be confirmed") + '</strong></div>' +
        '<div class="product-modal__section product-modal__pickup"><div class="product-modal__branch-choices">' + detailBranchChoices(p, branch ? branch.id : p.branches[0]) + '</div></div>' +
        orderConfigurator(p) +
        '<div class="product-modal__section product-modal__review"><span>Step 3 · Review WhatsApp enquiry · 檢查訊息</span><div class="product-modal__summary" data-order-summary></div></div>' +
        '<a class="btn btn--primary product-modal__order" href="' + orderUrl + '" target="_blank" rel="noopener">Send configured enquiry · 發送已選設定</a>' +
        '<p class="product-modal__fine">This is an enquiry, not payment checkout. The shop will confirm availability, exact price and pickup arrangement in WhatsApp.</p>' +
      '</div>';
    modal.classList.add("product-modal--open");
    bindOrderBranchChoices(modal, p);
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    var closeBtn = modal.querySelector(".product-modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function showProductFromSignature(productId) {
    var product = findProductById(productId);
    if (!product) return;
    if (!hasProductMenu()) {
      goToMenu({ branch: "kaitak", cat: product.cat });
      return;
    }
    activeSearch = "";
    var searchInput = document.getElementById("heroSearchInput");
    if (searchInput) searchInput.value = "";
    activeBranch = "kaitak";
    activeCategory = product.cat;
    syncChips();
    renderMenu();
    window.setTimeout(function () {
      var card = document.querySelector('[data-product-id="' + productId + '"]');
      var target = card || document.getElementById("menu");
      if (!target) return;
      smartScroll(target, { block: "center" });
      if (card) {
        card.classList.add("product--spotlight");
        card.focus({ preventScroll: true });
        window.setTimeout(function () { card.classList.remove("product--spotlight"); }, 1800);
      }
    }, 60);
  }

  function closeProductModal() {
    var modal = document.getElementById("productModal");
    if (!modal) return;
    modal.classList.remove("product-modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (previousModalFocus && previousModalFocus.focus) previousModalFocus.focus({ preventScroll: true });
    previousModalFocus = null;
  }

  /* ---------- Footer branch contacts ---------- */
  function renderFooterBranches() {
    var wrap = document.getElementById("footerBranches");
    if (!wrap) return;
    wrap.innerHTML = "";
    BRANCHES.forEach(function (b) {
      var c = el("div", "footer-branch");
      c.innerHTML =
        '<p class="footer-branch__name">' + esc(b.heart + " " + b.name) + "</p>" +
        '<p class="footer-branch__addr">' + esc(b.addrEn) + "</p>" +
        (b.phone ? '<p class="footer-branch__phone">☏ ' + esc(b.phone) + "</p>" : '<p class="footer-branch__phone">Pre-order: IG / WhatsApp 6812 8098</p>');
      wrap.appendChild(c);
    });
  }

  /* ---------- Instagram preview tiles ---------- */
  function renderSocialGrid() {
    var grid = document.getElementById("socialGrid");
    if (!grid) return;
    var imgs = [IMG.mini, IMG.croissant, IMG.rose, IMG.unicorn, IMG.orange, IMG.strawberry];
    imgs.forEach(function (src) {
      var a = el("a", "social-tile");
      a.href = "https://www.instagram.com/deesses_bakery/";
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = '<img loading="lazy" width="320" height="320" src="' + esc(src) + '" alt="DÉESSES Bakery Instagram preview" />';
      grid.appendChild(a);
    });
  }

  /* =========================================================
     Scroll behaviour (nav + warm theme + reveal)
     ========================================================= */
  body.setAttribute("data-theme", "dawn");

  function onScrollNav() {
    if (window.scrollY > 24) nav.classList.add("nav--scrolled");
    else nav.classList.remove("nav--scrolled");
  }

  var themes = ["dawn", "midday", "golden", "dusk"];
  function onScrollTheme() {
    var doc = document.documentElement;
    var max = (doc.scrollHeight - window.innerHeight) || 1;
    var progress = Math.min(1, Math.max(0, window.scrollY / max));
    var index = Math.min(themes.length - 1, Math.floor(progress * themes.length));
    var next = themes[index];
    if (body.getAttribute("data-theme") !== next) body.setAttribute("data-theme", next);
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScrollNav();
        onScrollTheme();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Smooth anchor focus ---------- */
  function wireAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          smartScroll(target, { block: "start" });
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  function wireHeroSearch() {
    var form = document.querySelector("[data-hero-search]");
    var input = document.getElementById("heroSearchInput");
    if (form && input) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        activeSearch = input.value.trim().toLowerCase();
        goToMenu({ search: activeSearch });
      });
      input.addEventListener("input", function () {
        activeSearch = input.value.trim().toLowerCase();
        if (hasProductMenu() && document.activeElement === input && (activeSearch.length >= 2 || activeSearch.length === 0)) renderMenu();
      });
    }
    document.querySelectorAll("[data-hero-filter]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        activeSearch = "";
        if (input) input.value = "";
        var cat = link.getAttribute("data-hero-filter");
        if (!hasProductMenu()) return;
        event.preventDefault();
        goToMenu({ cat: cat });
      });
    });
  }

  function wireMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var links = document.getElementById("primaryNavLinks");
    if (!toggle || !links) return;
    function setOpen(open) {
      document.body.setAttribute("data-nav-open", open ? "true" : "false");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      links.classList.toggle("nav__links--open", open);
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
  }

  function wireLanguageSwitch() {
    document.querySelectorAll("[data-language]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-language"));
      });
    });
    syncLanguageButtons();
  }

  function wireSocialFloat() {
    var float = document.querySelector(".social-float");
    var trigger = document.querySelector("[data-social-trigger]");
    if (!float || !trigger) return;
    function setOpen(open) {
      float.classList.toggle("social-float--open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(!float.classList.contains("social-float--open"));
    });
    document.addEventListener("click", function (event) {
      if (!float.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
    float.querySelectorAll(".social-menu a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
    window.__deessesSocialFloat = { links: float.querySelectorAll(".social-menu a").length };
  }

  function wireCakeAssembly() {
    var craft = document.getElementById("craft");
    if (!craft) return;
    var status = document.getElementById("cakeStatus");
    var buttons = {
      explode: craft.querySelector('[data-cake-action="explode"]'),
      assemble: craft.querySelector('[data-cake-action="assemble"]'),
      replay: craft.querySelector('[data-cake-action="replay"]')
    };
    var replayTimer = null;
    function stopReplay() {
      if (replayTimer) window.clearInterval(replayTimer);
      replayTimer = null;
      craft.removeAttribute("data-cake-replay");
      craft.classList.remove("craft--replaying");
    }
    function setMode(mode, keepReplay) {
      if (!keepReplay) stopReplay();
      craft.setAttribute("data-cake-mode", mode);
      if (buttons.explode) buttons.explode.disabled = mode === "exploded";
      if (buttons.assemble) buttons.assemble.disabled = mode === "assembled";
      if (status) status.textContent = mode === "exploded" ? tx("cakeExploded") : tx("cakeAssembled");
      window.__cakeAssemblyStatus = { mode: mode, pieces: craft.querySelectorAll(".cake-piece").length };
    }
    if (buttons.explode) buttons.explode.addEventListener("click", function () { setMode("exploded"); });
    if (buttons.assemble) buttons.assemble.addEventListener("click", function () { setMode("assembled"); });
    if (buttons.replay) buttons.replay.addEventListener("click", function () {
      stopReplay();
      craft.setAttribute("data-cake-replay", "true");
      craft.classList.add("craft--replaying");
      setMode("exploded", true);
      replayTimer = window.setInterval(function () {
        setMode(craft.getAttribute("data-cake-mode") === "exploded" ? "assembled" : "exploded", true);
      }, 2200);
    });
    setMode("assembled");
    window.setTimeout(function () {
      if (!prefersReducedMotion()) {
        setMode("exploded");
        window.setTimeout(function () { setMode("assembled"); }, 1700);
      }
    }, 500);
  }

  function wireSignatureProducts() {
    document.querySelectorAll("[data-signature-product]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        showProductFromSignature(btn.getAttribute("data-signature-product"));
      });
    });
  }

  function wireScrollReveal() {
    var targets = document.querySelectorAll([
      ".section__head",
      ".branch-card",
      ".signature__copy > *",
      ".signature__visual",
      ".signature-list li",
      ".craft__copy > *",
      ".craft__panel",
      ".filters__row",
      ".product",
      ".order-card",
      ".social__text > *",
      ".social-tile",
      ".footer-branch",
      ".footer__inner > *"
    ].join(", "));

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      targets.forEach(function (node) { node.classList.add("reveal-on-scroll", "is-visible"); });
      window.__deessesScrollReveal = { enabled: false, targetCount: targets.length };
      return;
    }

    targets.forEach(function (node, index) {
      node.classList.add("reveal-on-scroll");
      node.style.setProperty("--reveal-delay", Math.min(index % 5, 4) * 65 + "ms");
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else if (entry.boundingClientRect.top > window.innerHeight * 0.9) {
          entry.target.classList.remove("is-visible");
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(function (node) { observer.observe(node); });
    window.__deessesScrollReveal = { enabled: true, targetCount: targets.length };
  }

  function initGsapTasteMotion() {
    var gsap = window.gsap;
    var hero = document.querySelector(".hero");
    var center = document.querySelector(".hero-center");
    var tiles = Array.prototype.slice.call(document.querySelectorAll(".hero-gallery__tile"));
    if (prefersReducedMotion() || !gsap || !hero || !center) {
      window.__deessesGsapMotion = { enabled: false, reason: prefersReducedMotion() ? "reduced-motion" : "gsap-unavailable" };
      return;
    }

    body.classList.add("has-gsap-motion");
    var intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .fromTo(tiles, { autoAlpha: 0, y: 30, scale: 1.035 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.08 }, 0)
      .fromTo(center, { autoAlpha: 0, y: 22, scale: 0.985, filter: "blur(10px)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9 }, 0.18)
      .fromTo(".hero-category-nav a", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.045 }, 0.62)
      .fromTo(".social-trigger", { autoAlpha: 0, y: 14, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 }, 0.76);

    var tileOffsets = [18, -12, 8, -10, 16];
    var parallaxTicking = false;
    function updateHeroParallax() {
      var rect = hero.getBoundingClientRect();
      var progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      tiles.forEach(function (tile, index) {
        gsap.to(tile, { y: tileOffsets[index % tileOffsets.length] * progress, duration: 0.35, overwrite: "auto", ease: "power2.out" });
      });
      parallaxTicking = false;
    }
    function requestHeroParallax() {
      if (!parallaxTicking) {
        window.requestAnimationFrame(updateHeroParallax);
        parallaxTicking = true;
      }
    }
    window.addEventListener("scroll", requestHeroParallax, { passive: true });
    updateHeroParallax();

    window.__deessesGsapMotion = { enabled: true, animatedTiles: tiles.length, hasIntroTimeline: true };
  }

  /* ---------- Init ---------- */
  localizeStatic();
  applyInitialMenuParams();
  renderBranches();
  renderFilters();
  renderMenu();
  renderFooterBranches();
  renderSocialGrid();
  wireHeroSearch();
  wireMobileNav();
  wireLanguageSwitch();
  wireSocialFloat();
  wireCakeAssembly();
  wireSignatureProducts();
  wireScrollReveal();
  initGsapTasteMotion();
  wireAnchors();
  onScroll();
})();
