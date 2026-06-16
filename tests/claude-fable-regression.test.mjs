import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const homeCopy = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const menuHtml = readFileSync(new URL('../menu.html', import.meta.url), 'utf8');
const cakesHtml = readFileSync(new URL('../cakes.html', import.meta.url), 'utf8');
const pastriesHtml = readFileSync(new URL('../pastries.html', import.meta.url), 'utf8');
const breadsHtml = readFileSync(new URL('../breads.html', import.meta.url), 'utf8');
const bakeryRedirectHtml = readFileSync(new URL('../bakery.html', import.meta.url), 'utf8');
const js = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const siteCss = readFileSync(new URL('../site.css', import.meta.url), 'utf8');

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
    process.exitCode = 1;
  }
}

test('branch and product cards avoid invalid nested interactive controls', () => {
  assert.doesNotMatch(js, /el\("button", "branch-card"\)/, 'branch-card should not be rendered as a <button> wrapper');
  assert.doesNotMatch(js, /el\("button", "product"\)/, 'product card should not be rendered as a <button> wrapper');
  assert.doesNotMatch(js, /onclick="event\.stopPropagation\(\)"/, 'generated inline onclick workaround should be removed');
  assert.match(js, /class="branch-card__cta"/, 'branch cards should use an explicit CTA button instead of a button wrapper');
  assert.doesNotMatch(js, /<button[^>]+class="product__open"/, 'product cards should not contain a nested details button when the whole card opens details');
  assert.doesNotMatch(js, /product__media product__media-button/, 'product media should not be a nested button inside the clickable product card');
});

test('top-left brand mark uses the real DÉESSES Instagram profile logo', () => {
  assert.match(html, /<img class="nav__mark nav__logo site-brand__logo" src="assets\/deesses-instagram-logo-safe\.jpg" alt="DÉESSES Bakery logo" width="68" height="68"/, 'top-left nav mark should use the safe DÉESSES logo asset with enough whitespace');
  assert.doesNotMatch(html + menuHtml + cakesHtml + pastriesHtml + breadsHtml, /deesses-instagram-logo-crop16\.jpg/, 'header logos should not use the cropped asset that cuts into the logo text');
  assert.doesNotMatch(html, /class="nav__mark ig-mark ig-mark--brand"/, 'top-left nav mark should not use the generic Instagram glyph');
  assert.doesNotMatch(html, /class="nav__mark"[^>]*>❀</, 'top-left nav mark should not use the old flower glyph');
  assert.match(siteCss, /\.site-brand__logo[\s\S]*width:\s*64px[\s\S]*height:\s*64px[\s\S]*object-fit:\s*contain[\s\S]*box-shadow/, 'Brand logo image should be styled as a larger noticeable profile icon without cropping the text');
});

test('social preview links are not hidden from assistive tech', () => {
  assert.doesNotMatch(html, /id="socialGrid"[^>]*aria-hidden="true"/, 'socialGrid must not hide focusable preview links');
});

test('search input re-renders when the search is cleared', () => {
  assert.match(js, /activeSearch\.length\s*===\s*0[^\n]+renderMenu\(\)|!activeSearch[^\n]+renderMenu\(\)/, 'input handler should renderMenu() when activeSearch becomes empty');
});

test('mobile navigation has a replacement when desktop links collapse', () => {
  assert.match(html, /nav__toggle|data-nav-toggle/, 'HTML should include a mobile nav toggle');
  assert.match(css, /nav__links--open|\[data-nav-open/, 'CSS should expose opened mobile nav links');
  assert.match(js, /data-nav-toggle|nav__toggle/, 'JS should wire the mobile nav toggle');
});

test('mobile top bar stays inside narrow viewports', () => {
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.nav\s*\{[\s\S]*padding-inline:\s*max\(10px,\s*env\(safe-area-inset-left\)\)/, 'mobile nav should reduce horizontal padding for narrow screens');
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.nav__inner\s*\{[\s\S]*max-width:\s*100%[\s\S]*gap:\s*8px[\s\S]*min-width:\s*0/, 'mobile nav inner should not exceed the viewport');
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.nav__brand\s*\{[\s\S]*flex:\s*1 1 auto[\s\S]*min-width:\s*0/, 'mobile brand should be allowed to shrink instead of forcing overflow');
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.nav__cta\s*\{\s*display:\s*none;\s*\}/, 'desktop Instagram CTA should be hidden from the cramped mobile top bar');
});

test('Floating social menu keeps Instagram reachable on mobile', () => {
  assert.match(html, /class="social-float site-social-float"[\s\S]*data-social-trigger[\s\S]*class="social-menu"[\s\S]*https:\/\/www\.instagram\.com\/deesses_bakery\/[\s\S]*https:\/\/wa\.me\/85268128098/, 'floating social menu should expose Instagram and WhatsApp');
  assert.match(html, /class="site-social-trigger__icon"[\s\S]*class="social-trigger__label"/, 'floating social trigger should expose an icon and label');
  assert.doesNotMatch(html, /class="social-trigger__avatar"[\s\S]*deesses-instagram-logo\.jpg/, 'floating social trigger should not put the business/profile logo on the button');
  assert.match(siteCss, /\.site-social-trigger\s*\{[\s\S]*linear-gradient\(135deg, #df8490, #c75d70\)/, 'Floating social trigger should use the Brand gradient');
  assert.match(css, /\.social-float\s*\{\s*position:\s*fixed;[\s\S]*bottom:\s*max\(10px,\s*env\(safe-area-inset-bottom\)\)/, 'social menu should float from the lower-right corner');
  assert.match(css, /\.social-float:hover \.social-menu[\s\S]*\.social-float:focus-within \.social-menu[\s\S]*\.social-float\.social-float--open \.social-menu[\s\S]*opacity:\s*1[\s\S]*pointer-events:\s*auto/, 'social menu should expand on hover, focus, and tap-open state');
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*\.social-trigger\s*\{[\s\S]*width:\s*48px[\s\S]*height:\s*48px/, 'mobile floating social trigger should collapse to a compact round button');
  assert.match(js, /function wireSocialFloat\(\)[\s\S]*data-social-trigger[\s\S]*aria-expanded[\s\S]*social-float--open/, 'floating social trigger should be tap-toggleable and update aria-expanded');
  assert.match(js, /wireSocialFloat\(\)/, 'init should wire the floating social menu');
});

test('entire product cards open details and remain keyboard accessible', () => {
  assert.match(js, /card\.setAttribute\("role", "button"\)/, 'product card should expose one full-card click target');
  assert.match(js, /card\.setAttribute\("tabindex", "0"\)/, 'product card should be keyboard focusable');
  assert.match(js, /card\.addEventListener\("click"[\s\S]*openProductModal\(p, card\)/, 'clicking anywhere on the product card should open the modal');
  assert.match(js, /card\.addEventListener\("keydown"[\s\S]*e\.key !== "Enter"[\s\S]*e\.key !== " "[\s\S]*openProductModal\(p, card\)/, 'Enter and Space should open the product modal from the focused card');
  assert.match(css, /\.product:focus-visible/, 'full-card product button should have a visible keyboard focus style');
});

test('selected product modal branch buttons keep light text while focused or pressed', () => {
  assert.match(css, /product-modal__branch-choice--on\s*\{[\s\S]*color:\s*#fff\s*!important[\s\S]*-webkit-text-fill-color:\s*#fff\s*!important/, 'selected branch choices should force white text at rest');
  assert.match(css, /product-modal__branch-choice--on:hover[\s\S]*product-modal__branch-choice--on:focus[\s\S]*color:\s*#fff\s*!important[\s\S]*-webkit-text-fill-color:\s*#fff\s*!important/, 'selected branch choices should keep white text on hover/focus/active');
  assert.match(css, /product-modal__branch-choice:focus-visible/, 'branch choices should have explicit focus styling instead of relying on browser defaults');
});

test('product modal traps and restores focus', () => {
  assert.match(js, /lastModalTrigger|previousFocus|previousModalFocus|modalTrigger/, 'opening modal should store the trigger/previous focus');
  assert.match(js, /trapModalFocus[\s\S]*focusable[\s\S]*shiftKey/, 'modal should trap Tab and Shift+Tab within the dialog');
  assert.match(js, /\.focus\(\{?\s*preventScroll|\.focus\(\)/, 'closing modal should restore focus');
});

test('pickup date cannot be set in the past', () => {
  assert.match(js, /min="|setAttribute\("min"|todayIso/, 'pickup date input should receive a min date');
});

test('filter chips expose aria-pressed state', () => {
  assert.match(js, /\.chip\[data-group="cat"\][\s\S]*setAttribute\("aria-pressed"/, 'category chips should sync aria-pressed');
  assert.match(js, /\.chip\[data-group="br"\][\s\S]*setAttribute\("aria-pressed"/, 'branch chips should sync aria-pressed');
});

test('SEO/social sharing metadata and structured bakery data exist', () => {
  assert.match(html, /rel="canonical"/, 'canonical URL missing');
  assert.match(html, /property="og:title"/, 'Open Graph tags missing');
  assert.match(html, /name="twitter:card"/, 'Twitter card tags missing');
  assert.match(html, /rel="icon"/, 'favicon missing');
  assert.match(html, /application\/ld\+json[\s\S]*Bakery/, 'Bakery JSON-LD missing');
});

test('images and responsive viewport are optimized', () => {
  assert.match(html, /fetchpriority="high"|rel="preload"[^>]+as="image"/, 'hero LCP image should be prioritized');
  assert.match(js, /loading="lazy"[^>]*width=|width="\d+"[^>]*height="\d+"[^>]*loading="lazy"/, 'product images should lazy-load with dimensions');
  assert.match(css, /100svh|100dvh|86svh|86dvh/, 'mobile viewport should use svh/dvh fallback');
});

test('README reflects local assets and implemented features', () => {
  assert.doesNotMatch(readFileSync(new URL('../README.md', import.meta.url), 'utf8'), /public Instagram CDN URLs/, 'README should no longer claim CDN images');
  assert.doesNotMatch(readFileSync(new URL('../README.md', import.meta.url), 'utf8'), /reveal-on-scroll/i, 'README should not advertise missing reveal-on-scroll');
});

test('hero intro panel stays bright while the opening gallery remains visible', () => {
  assert.match(css, /\.hero\s*\{[\s\S]*background:\s*linear-gradient\(180deg,\s*#fff6ee[\s\S]*#fffaf4/, 'hero section should open on a brighter pastry-toned base rather than a near-black slab');
  assert.match(css, /\.hero--gallery::before\s*\{[\s\S]*rgba\(83,\s*49,\s*75,\s*0\.24\)/, 'hero gallery overlay should be much lighter than the previous dark wash');
  assert.match(css, /\.hero-gallery__tile img\s*\{[\s\S]*brightness\(1\.18\)/, 'hero gallery images should be lifted so the front page does not feel too dark');
  assert.match(css, /\.hero-center\s*\{[\s\S]*width:\s*min\(860px,\s*100%\)[\s\S]*padding:\s*clamp\(10px,\s*2\.4vw,\s*22px\)/, 'hero content should stay readable without using a visible framed panel');
  assert.match(css, /\.hero-category-nav a\s*\{[\s\S]*background:\s*rgba\(255,255,255,0\.42\)/, 'hero quick links should stay translucent but easier to read');
});

test('top bar navigation text stays larger and legible', () => {
  assert.match(siteCss, /\.site-nav__links\s*\{[\s\S]*font-size:\s*0\.9rem/, 'desktop top bar nav links should be larger than the previous small labels');
  assert.match(siteCss, /\.site-nav__links a\s*\{[\s\S]*font-weight:\s*800/, 'top bar nav links should use a stronger readable weight');
  assert.match(siteCss, /\.site-order-pill\s*\{[\s\S]*min-height:\s*40px[\s\S]*font-size:\s*0\.88rem/, 'top bar order pill text should scale with the larger nav');
  assert.match(siteCss, /@media \(max-width:\s*1120px\)[\s\S]*\.site-nav__links\s*\{[\s\S]*font-size:\s*0\.82rem/, 'tablet top bar should stay larger without forcing desktop nav wrap');
});

test('mobile homepage hero keeps the bakery photo visible behind a readable translucent panel', () => {
  assert.match(siteCss, /@media \(max-width:\s*760px\)[\s\S]*\.site-hero\s*\{[\s\S]*rgba\(255, 249, 246, 0\.86\)[\s\S]*rgba\(255, 249, 246, 0\.18\)[\s\S]*front-page-bakery-scene\.jpg/, 'mobile site hero should lighten its wash without hiding the cake background image');
  assert.match(siteCss, /@media \(max-width:\s*760px\)[\s\S]*\.site-hero__content\s*\{[\s\S]*rgba\(255, 252, 249, 0\.64\)[\s\S]*rgba\(255, 244, 239, 0\.38\)[\s\S]*backdrop-filter:\s*blur\(3px\) saturate\(118%\)/, 'mobile site hero text panel should be translucent but still readable');
});

test('Root homepage is active with language switch available', () => {
  assert.match(html, /<body class="site">/, 'root index should render the active website');
  assert.match(html, /class="language-switch site-language"[\s\S]*data-language="en"[\s\S]*data-language="zh"/, 'nav language switch should expose EN and Traditional Chinese buttons');
  assert.doesNotMatch(html, />legacy<|href="index\.html">legacy/i, 'root navigation should not expose a legacy version link');
  assert.match(js, /LANGUAGE_STORAGE_KEY\s*=\s*"deesses-bakery-language"/, 'language preference should persist');
  assert.match(js, /function getInitialLanguage\(\)[\s\S]*new URLSearchParams\(window\.location\.search\)\.get\("lang"\)[\s\S]*localStorage\.getItem\(LANGUAGE_STORAGE_KEY\)/, 'language should initialize from ?lang= or saved preference');
  assert.match(js, /document\.documentElement\.lang\s*=\s*currentLanguage === "zh" \? "zh-Hant-HK" : "en"/, 'document lang should update for accessibility');
  assert.match(js, /function setLanguage\(lang\)[\s\S]*localizeStatic\(\)[\s\S]*renderBranches\(\)[\s\S]*renderFilters\(\)[\s\S]*renderMenu\(\)/, 'language switch should localize static and dynamic content');
  assert.match(css, /\.language-switch\s*\{[\s\S]*border-radius:\s*999px[\s\S]*backdrop-filter:\s*blur\(12px\)/, 'language switch should use pill styling');
});

test('Pineapple-style scroll reveal animations are wired with reduced-motion support', () => {
  assert.match(js, /function wireScrollReveal\(\)/, 'scroll reveal wiring function missing');
  assert.match(js, /IntersectionObserver[\s\S]*threshold:\s*0\.16[\s\S]*rootMargin:\s*"0px 0px -8% 0px"/, 'scroll reveal should use IntersectionObserver with Pineapple-style threshold/root margin');
  assert.match(js, /\.branch-card[\s\S]*\.site-product-spotlight__section[\s\S]*\.product[\s\S]*\.site-how li[\s\S]*\.social-tile/, 'scroll reveal should target spotlight sections, branch cards, product cards, how-it-works cards and social tiles');
  assert.match(js, /--reveal-delay[\s\S]*Math\.min\(index % 5, 4\) \* 65/, 'scroll reveal should stagger targets');
  assert.match(js, /wireScrollReveal\(\)/, 'init should call scroll reveal wiring');
  assert.match(siteCss, /\.site \.reveal-on-scroll\s*\{[\s\S]*opacity:\s*0[\s\S]*translateY\(34px\) scale\(0\.985\)[\s\S]*filter:\s*blur\(8px\)/, 'current site reveal hidden state should fade, rise and unblur');
  assert.match(siteCss, /\.site \.reveal-on-scroll\.is-visible\s*\{[\s\S]*opacity:\s*1[\s\S]*translateY\(0\) scale\(1\)[\s\S]*filter:\s*blur\(0\)/, 'current site visible reveal state missing');
  assert.doesNotMatch(siteCss, /\.site \.reveal-on-scroll,[\s\S]*opacity:\s*1;[\s\S]*transform:\s*none;[\s\S]*filter:\s*none;[\s\S]*\.site-nav/, 'current site CSS must not flatten scroll reveal animations before the nav styles');
  assert.match(siteCss, /prefers-reduced-motion:\s*reduce[\s\S]*\.site \.reveal-on-scroll\s*\{[\s\S]*opacity:\s*1[\s\S]*transform:\s*none\s*!important[\s\S]*filter:\s*none/, 'current site reveal must be disabled for reduced motion');
});

test('cake craft placeholder appears only on the front page', () => {
  assert.match(html, /id="craft"[\s\S]*Layer-by-layer cake craft[\s\S]*deconstructed-cake-placeholder\.jpg/, 'front page should keep the layer-by-layer cake craft section');
  assert.match(html, /data-cake-action="explode"/, 'front-page craft section should keep accessible controls');
  assert.match(html, /aria-live="polite"[^>]*id="cakeStatus"|id="cakeStatus"[^>]*aria-live="polite"/, 'cake status should announce state changes');
  assert.doesNotMatch(menuHtml + cakesHtml + pastriesHtml + breadsHtml, /id="craft"|Layer-by-layer cake craft|deconstructed-cake-placeholder\.jpg/, 'layer-by-layer cake craft should not appear on menu or category pages');
  assert.match(siteCss, /\.site-cake-placeholder[\s\S]*\.site-cake-placeholder img/, 'Cake placeholder styles should remain for the front-page craft section');
  assert.match(js, /wireCakeAssembly[\s\S]*__cakeAssemblyStatus/, 'cake assembly JS wiring/status missing');
});

test('language toggle localizes current visible site sections', () => {
  assert.match(js, /home:\s*"Home"[\s\S]*home:\s*"首頁"/, 'nav home label should have English and Chinese copy');
  assert.match(js, /homeHeroTitle:\s*"Order Your<br \/>Sweet Moments"[\s\S]*homeHeroTitle:\s*"把心意焗成<br \/>甜蜜時刻"/, 'homepage hero should have more polished Chinese copy');
  assert.match(js, /productSpotlightTitle:[\s\S]*為今天挑一份甜/, 'product spotlight should have more polished Chinese copy');
  assert.match(js, /breadPageTitle:[\s\S]*每日出爐，一口柔軟/, 'breads page hero should have more polished Chinese copy');
  assert.match(js, /function localizeCurrentSite\(\)[\s\S]*localizeNavigation\(\)[\s\S]*localizeHomePage\(\)[\s\S]*localizeMenuPage\(\)/, 'language toggle should localize duplicated current-site sections beyond data-i18n nodes');
  assert.match(js, /pageCategory === 'cake'[\s\S]*category-page--cake[\s\S]*pageCategory === 'pastry'[\s\S]*category-page--pastry[\s\S]*pageCategory === 'bakery'[\s\S]*category-page--breads/, 'category page localization should detect cakes, pastries and breads consistently instead of falling back to Shop menu');
  assert.match(js, /document\.querySelectorAll\('\.site-nav__links a\[data-hero-filter="cake"\]'\)[\s\S]*cakesPlural/, 'language toggle should localize static category nav labels');
  assert.match(js, /localizeStatic\(\)[\s\S]*syncLanguageButtons\(\)[\s\S]*renderBranches\(\)[\s\S]*renderFilters\(\)[\s\S]*renderMenu\(\)/, 'setLanguage should refresh static and generated content');
  assert.match(html + menuHtml + cakesHtml + pastriesHtml + breadsHtml, /Noto\+Serif\+TC:wght@500;700;900/, 'pages should load a dedicated Chinese serif display font');
  assert.match(siteCss, /\.site:lang\(zh-Hant-HK\) h1[\s\S]*Noto Serif TC|--site-zh-heading:\s*"Noto Serif TC"/, 'Chinese headings should use a dedicated display face');
  assert.match(siteCss, /\.site:lang\(zh-Hant-HK\) \.site-script[\s\S]*letter-spacing:\s*0\.18em/, 'Chinese eyebrow labels should receive a designed typographic treatment');
});

test('root loads the current scripts and motion layer progressively', () => {
  assert.match(html, /script\.js\?v=brand-logo-1/, 'site script should be loaded on the root');
  assert.match(html, /site\.css\?v=concept-15/, 'root should load the current site stylesheet cache key');
  assert.match(js, /function initGsapTasteMotion\(\)/, 'motion initializer should remain available as progressive enhancement');
  assert.match(js, /prefersReducedMotion\(\) \|\| !gsap/, 'motion should disable itself for reduced-motion users or when GSAP is unavailable');
  assert.match(js, /__deessesGsapMotion\s*=\s*\{ enabled:\s*true/, 'motion status should be exposed for browser verification when active');
});

test('design taste refinements keep the page polished without adding clutter', () => {
  assert.match(css, /::selection\s*\{[\s\S]*rgba\(201, 50, 120, 0\.18\)/, 'selection color should be brand-tinted');
  assert.match(css, /\.section__sub\s*\{[\s\S]*max-width:\s*62ch/, 'body copy should have a restrained readable line length');
  assert.match(css, /\.hero::after\s*\{[\s\S]*radial-gradient\(closest-side at 50% 100%/, 'hero should have a subtle grounded glow rather than extra decorative clutter');
  assert.doesNotMatch(css, /\.hero-center::before|\.hero-center[\s\S]{0,260}border:\s*1px solid|\.hero-center[\s\S]{0,260}backdrop-filter/, 'front-page hero content should not have a visible framed panel');
  assert.match(css, /@media \(min-width:\s*1024px\)\s*\{[\s\S]*\.hero__title\s*\{[\s\S]*font-size:\s*clamp\(5\.7rem,\s*9\.8vw,\s*7\.75rem\)/, 'desktop hero title should scale up without making the mobile hero oversized');
  assert.match(css, /\.hero__title\s*\{[\s\S]*text-shadow:\s*0 1px 0 rgba\(255,250,244,0\.92\)/, 'hero title should carry a readable light lift without adding a panel');
  assert.match(css, /\.branch-card[\s\S]*linear-gradient\(180deg, rgba\(255,255,255,0\.96\), var\(--surface\)\)/, 'branch cards should use subtle depth instead of flat slabs');
  assert.match(css, /\.product__media img[\s\S]*transition:\s*transform 0\.75s var\(--ease\), filter 0\.75s var\(--ease\)/, 'product imagery should feel smoother and intentional');
});

test('Homepage separates category spotlights and cake-only custom ordering', () => {
  assert.doesNotMatch(html, /class="site-category-dock hero-category-nav"|aria-label="Quick order categories"/, 'root homepage should not render the deleted quick category strip');
  assert.doesNotMatch(homeCopy, /class="skip-link"/, 'Homepage should not show a confusing skip-link pill in the visible UI');
  assert.doesNotMatch(menuHtml, /class="skip-link"/, 'Menu page should not show a confusing skip-link pill in the visible UI');
  assert.doesNotMatch(css + siteCss, /\.skip-link/, 'Skip-link styling should be removed when the control is removed');
  assert.doesNotMatch(homeCopy, /id="menuGrid"|id="branches"|id="branchGrid"|Choose a pickup branch/, 'Homepage should not render product grid or pickup branch selection');
  assert.doesNotMatch(homeCopy, /id="order"|data-custom-order|Custom Cake Order|Design your perfect cake|custom cake/i, 'Homepage should not render or promote the custom cake order flow');
  assert.doesNotMatch(homeCopy, /full menu|Browse full menu/i, 'Homepage should not imply there is a full menu');
  assert.match(homeCopy, /href="cakes\.html#order"[^>]*data-i18n="order"/, 'Homepage Order nav should send shoppers to the cakes custom-order flow');
  assert.match(homeCopy, /href="cakes\.html"[^>]*>Cakes[\s\S]*href="pastries\.html"[^>]*>Pastries[\s\S]*href="breads\.html"[^>]*>Breads/, 'Homepage top nav category links should open dedicated category pages');
  assert.match(homeCopy, /class="site-product-spotlight"[\s\S]*Choose a spotlight collection[\s\S]*site-product-spotlight__section--cake[\s\S]*site-product-spotlight__photos[\s\S]*site-product-spotlight__copy[\s\S]*View cakes[\s\S]*site-product-spotlight__section--pastry site-product-spotlight__section--reverse[\s\S]*site-product-spotlight__copy[\s\S]*View pastries[\s\S]*site-product-spotlight__photos[\s\S]*site-product-spotlight__section--breads[\s\S]*site-product-spotlight__photos[\s\S]*site-product-spotlight__copy[\s\S]*View breads/, 'Homepage product spotlight should present three horizontal alternating category sections with direct category buttons');
  assert.doesNotMatch(homeCopy, /A cake worth stopping for|View cake spotlight|Browse full menu/, 'Old confusing single-product spotlight copy should be removed');
  assert.match(siteCss, /\.site-product-spotlight__stack[\s\S]*\.site-product-spotlight__section[\s\S]*grid-template-columns:\s*minmax\(0, 1\.12fr\) minmax\(320px, 0\.88fr\)[\s\S]*\.site-product-spotlight__section--reverse[\s\S]*grid-template-columns:\s*minmax\(320px, 0\.88fr\) minmax\(0, 1\.12fr\)/, 'Product spotlight should use horizontal alternating image/text sections on desktop');

  assert.match(menuHtml, /<body class="site menu-page">/, 'separate product menu page should have the menu page body class');
  assert.match(menuHtml, /class="menu site-menu" id="menu"[\s\S]*id="categoryFilters"[\s\S]*id="branchFilters"[\s\S]*id="menuGrid"/, 'separate product menu page should keep filters and product grid');
  assert.doesNotMatch(menuHtml + pastriesHtml + breadsHtml, /id="order"|href="#order"|data-custom-order|Custom Cake Order|Design your perfect cake|Send Custom Order/, 'Custom cake ordering should only appear on the cakes category page and other pages should not link to missing #order anchors');
  assert.match(menuHtml + pastriesHtml + breadsHtml, /href="cakes\.html#order"/, 'Non-cake pages should send Order links to the cakes custom-order flow');
  assert.match(bakeryRedirectHtml, /url=breads\.html|location\.replace\("breads\.html/, 'Old bakery URL should redirect to renamed Breads category page');
  assert.match(cakesHtml, /id="order"[\s\S]*data-custom-order[\s\S]*Custom Cake Order[\s\S]*Send Custom Order/, 'Cakes page should keep the custom cake order flow');
  assert.ok(cakesHtml.indexOf('id="order"') < cakesHtml.indexOf('id="hero"'), 'Cakes page should open with the custom cake order screen before the category hero');
  assert.ok(cakesHtml.indexOf('id="order"') < cakesHtml.indexOf('id="menu"'), 'Cakes page should not show existing product listings above custom cake order');

  [
    ['cake', 'Cake Collection', cakesHtml],
    ['pastry', 'Pastry Collection', pastriesHtml],
    ['bakery', 'Bread Collection', breadsHtml]
  ].forEach(([cat, heading, page]) => {
    assert.match(page, new RegExp(`data-category-page="${cat}"`), `${heading} page should declare its fixed category`);
    assert.doesNotMatch(page, /class="skip-link"|Skip to products|Skip to menu/, `${heading} page should not show a confusing skip-link pill`);
    assert.doesNotMatch(page, /id="categoryFilters"|Filter by category|>Category<|>分類</, `${heading} page should remove the category filter row entirely`);
    assert.doesNotMatch(page, />[^<]*\bonly\.[^<]*</i, `${heading} page should not use awkward "only" section headings`);
    assert.match(page, /<h2>Shop (cakes|pastries|breads)<\/h2>/, `${heading} page should promote the shop label to the main section heading`);
    assert.match(page, new RegExp(`${heading}[\\s\\S]*id="branchFilters"`), `${heading} page should keep branch filtering`);
  });
  assert.match(siteCss, /\.category-page #menu \.site-section-head h2[\s\S]*font-family:\s*"Allura"[\s\S]*::after/, 'category shop headings should use a polished handwritten typography treatment');
  assert.match(siteCss, /\.site-menu-hero[\s\S]*\.menu-page \.site-menu/, 'menu page should have a dedicated compact menu hero');
  assert.match(js, /function menuUrl\(params\)/, 'JS should build filtered menu URLs for cross-page navigation');
  assert.match(js, /CATEGORY_ROUTES\s*=\s*\{ cake:\s*"cakes\.html", pastry:\s*"pastries\.html", bakery:\s*"breads\.html" \}/, 'JS should map product categories to dedicated static pages');
  assert.match(js, /function fixedCategoryPage\(\)[\s\S]*data-category-page|body\.getAttribute\("data-category-page"\)/, 'category pages should lock the active category from body data');
  assert.match(js, /if \(!brRow\) return/, 'filter rendering should still work on category pages without a category row');
  assert.match(js, /function applyInitialMenuParams\(\)[\s\S]*fixedCategoryPage\(\)[\s\S]*params\.get\("branch"\)[\s\S]*params\.get\("q"\)/, 'menu/category pages should read route/category plus branch/search params on load');
});
