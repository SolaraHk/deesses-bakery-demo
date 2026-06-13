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

test('branch and product cards are not invalid nested interactive buttons', () => {
  assert.doesNotMatch(js, /el\("button", "branch-card"\)/, 'branch-card should not be rendered as a <button> wrapper');
  assert.doesNotMatch(js, /el\("button", "product"\)/, 'product card should not be rendered as a <button> wrapper');
  assert.doesNotMatch(js, /onclick="event\.stopPropagation\(\)"/, 'generated inline onclick workaround should be removed');
  assert.match(js, /class="branch-card__cta"/, 'branch cards should use an explicit CTA button instead of a button wrapper');
  assert.match(js, /class="product__open"/, 'product cards should use an explicit details button instead of making the whole article a pseudo-button');
  assert.doesNotMatch(js, /card\.setAttribute\("role", "button"\)/, 'product articles should not be masqueraded as buttons');
  assert.doesNotMatch(js, /card\.setAttribute\("tabindex", "0"\)/, 'product articles should not use tabindex when an inner button is available');
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

test('product photo areas open details directly and remain accessible', () => {
  assert.match(js, /product__media product__media-button/, 'product media/photo area should be rendered as a clickable button');
  assert.match(js, /mediaButton[\s\S]*openProductModal\(p, mediaButton\)/, 'media/photo button should open the same product modal');
  assert.match(js, /aria-label="View details for /, 'media/photo button should expose an accessible details label');
  assert.match(css, /product__media:focus-visible/, 'media/photo button should have a visible keyboard focus style');
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
