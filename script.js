/* =========================================================
   Deesses Bakery — concept demo
   - Sticky glass nav: condenses after scroll
   - Scroll-driven theme shifts (dawn → midday → golden → dusk)
   - Reveal-on-scroll via IntersectionObserver
   ========================================================= */

(function () {
  "use strict";

  var body = document.body;
  var nav = document.getElementById("nav");

  // Default theme
  body.setAttribute("data-theme", "dawn");

  /* ---- Sticky glass nav: add blur/shadow once scrolled ---- */
  function onScrollNav() {
    if (window.scrollY > 24) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }
  }

  /* ---- Scroll-driven theme ----
     Map page progress to a warm "time of day" palette. */
  var themes = ["dawn", "midday", "golden", "dusk"];

  function onScrollTheme() {
    var doc = document.documentElement;
    var max = (doc.scrollHeight - window.innerHeight) || 1;
    var progress = Math.min(1, Math.max(0, window.scrollY / max));
    var index = Math.min(themes.length - 1, Math.floor(progress * themes.length));
    var next = themes[index];
    if (body.getAttribute("data-theme") !== next) {
      body.setAttribute("data-theme", next);
    }
  }

  /* ---- rAF-throttled scroll handler ---- */
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
  onScroll(); // set initial state

  /* ---- Presentation-safe reveal styling ----
     Keep all content visible. For this sales demo, screenshots and screen-share
     reliability matter more than hiding content for scroll reveals. */
  var revealTargets = document.querySelectorAll(
    ".section__head, .story__lead, .card, .bake, .artemis__inner, .visit__card, .visit__cta"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  /* ---- Smooth anchor focus for accessibility ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });
})();
