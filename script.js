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


  /* ---------- Categories ---------- */
  var CATEGORIES = [
    { id: "cake",   label: "Cake · 蛋糕",   emoji: "🎂" },
    { id: "pastry", label: "Pastry · 酥點", emoji: "🧁" },
    { id: "bakery", label: "Bakery · 麵包", emoji: "🥯" }
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
    BRANCHES.forEach(function (b) {
      var card = el("article", "branch-card");
      card.setAttribute("data-branch", b.id);
      card.setAttribute("aria-current", "false");
      var phone = b.phone
        ? '<a class="branch-card__phone" href="tel:+852' + esc(b.phone.replace(/\s/g, "")) + '">☏ ' + esc(b.phone) + "</a>"
        : '<span class="branch-card__phone branch-card__phone--none">Pre-order via IG / WhatsApp</span>';
      card.innerHTML =
        '<span class="branch-card__heart" aria-hidden="true">' + esc(b.heart) + "</span>" +
        '<h3 class="branch-card__name">' + esc(b.name) + "</h3>" +
        '<p class="branch-card__sub">' + esc(b.sub) + "</p>" +
        '<p class="branch-card__addr" lang="zh-Hant">' + esc(b.addr) + "</p>" +
        '<p class="branch-card__addr branch-card__addr--en">' + esc(b.addrEn) + "</p>" +
        '<p class="branch-card__note">' + esc(b.note) + "</p>" +
        phone +
        '<button type="button" class="branch-card__cta">' + (b.id === "kaitak" ? "Enter Artemis · 進入啟德專櫃 →" : "View menu · 看餐單 →") + '</button>';
      function activateBranchCard() {
        var nextBranch = activeBranch === b.id ? "all" : b.id;
        selectBranch(nextBranch);
        var targetId = b.id === "kaitak" ? "signature" : "menu";
        smartScroll(document.getElementById(targetId), { block: "start" });
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

    chip(catRow, "all", "All · 全部", function () { selectCategory("all"); }, "cat");
    CATEGORIES.forEach(function (c) {
      chip(catRow, c.id, c.emoji + " " + c.label, function () { selectCategory(c.id); }, "cat");
    });

    chip(brRow, "all", "All branches · 所有分店", function () { selectBranch("all"); }, "br");
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
      if (p.signature) badge = '<span class="product__badge product__badge--sig">Signature · 招牌</span>';
      else if (p.seasonal) badge = '<span class="product__badge product__badge--season">Seasonal · 節日</span>';

      var hearts = p.branches.map(function (id) {
        var b = branchName(id);
        return b ? '<span title="' + esc(b.name) + '">' + esc(b.heart) + "</span>" : "";
      }).join("");
      var avail = p.branches.length === ALL_IDS.length
        ? '<span class="product__avail-all">All branches · 全線供應</span>'
        : '<span class="product__avail-some">' + hearts + " selected · 指定分店</span>";

      var cat = null;
      for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === p.cat) cat = CATEGORIES[i];

      card.innerHTML =
        '<div class="product__media">' +
          badge +
          '<span class="product__cat">' + esc(cat ? cat.emoji + " " + cat.label : "") + "</span>" +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" width="320" height="320" loading="lazy" decoding="async" />' +
        "</div>" +
        '<div class="product__body">' +
          '<div class="product__head"><h3>' + esc(p.name) + "</h3></div>" +
          "<p class=\"product__desc\">" + esc(p.desc) + "</p>" +
          '<div class="product__foot">' +
            '<span class="product__price">' + esc(p.price) + "</span>" +
            '<span class="product__avail">' + avail + "</span>" +
            '<button type="button" class="product__open">View details · 查看詳情 →</button>' +
            '<span class="product__order-hint">Pre-order now · 立即預訂</span>' +
          "</div>" +
        "</div>";
      var detailsButton = card.querySelector(".product__open");
      if (detailsButton) detailsButton.addEventListener("click", function () { openProductModal(p, detailsButton); });
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
        renderMenu();
        var menu = document.getElementById("menu");
        smartScroll(menu, { block: "start" });
      });
      input.addEventListener("input", function () {
        activeSearch = input.value.trim().toLowerCase();
        if (document.activeElement === input && (activeSearch.length >= 2 || activeSearch.length === 0)) renderMenu();
      });
    }
    document.querySelectorAll("[data-hero-filter]").forEach(function (link) {
      link.addEventListener("click", function () {
        activeSearch = "";
        if (input) input.value = "";
        selectCategory(link.getAttribute("data-hero-filter"));
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

  function wireSignatureProducts() {
    document.querySelectorAll("[data-signature-product]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        showProductFromSignature(btn.getAttribute("data-signature-product"));
      });
    });
  }

  /* ---------- Init ---------- */
  renderBranches();
  renderFilters();
  renderMenu();
  renderFooterBranches();
  renderSocialGrid();
  wireHeroSearch();
  wireMobileNav();
  wireSignatureProducts();
  wireAnchors();
  onScroll();
})();
