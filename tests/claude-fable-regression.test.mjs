import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const js = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');

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
  assert.match(html, /<img class="nav__mark nav__logo" src="assets\/deesses-instagram-logo\.jpg" alt="DÉESSES Bakery logo" width="36" height="36"/, 'top-left nav mark should use the downloaded DÉESSES Instagram profile logo asset');
  assert.doesNotMatch(html, /class="nav__mark ig-mark ig-mark--brand"/, 'top-left nav mark should not use the generic Instagram glyph');
  assert.doesNotMatch(html, /class="nav__mark"[^>]*>❀</, 'top-left nav mark should not use the old flower glyph');
  assert.match(css, /\.nav__logo[\s\S]*border-radius:\s*50%[\s\S]*object-fit:\s*cover/, 'brand logo image should be styled as a circular profile icon');
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

test('cake assembly animation and Dribbble-inspired design cues are implemented accessibly', () => {
  assert.match(html, /id="craft"/, 'craft section missing');
  assert.match(html, /cake-assembly/, 'cake assembly SVG missing');
  assert.match(html, /data-cake-action="explode"/, 'explode control missing');
  assert.match(html, /aria-live="polite"[^>]*id="cakeStatus"|id="cakeStatus"[^>]*aria-live="polite"/, 'cake status should announce state changes');
  assert.match(css, /data-cake-mode="exploded"[\s\S]*cake-candle/, 'exploded-view motion styles missing');
  assert.match(css, /craft__shot-meta/, 'Dribbble-style compact shot metadata missing');
  assert.match(js, /wireCakeAssembly[\s\S]*__cakeAssemblyStatus/, 'cake assembly JS wiring/status missing');
});
