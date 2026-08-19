## 2.5.9

### Patch Changes

- [#11321](https://github.com/biomejs/biome/pull/11321) [`41386f3`](https://github.com/biomejs/biome/commit/41386f38935b299f1a1f759a2c7fdd5c2050bded) Thanks [@dyc3](https://github.com/dyc3)! - Fixed [#11315](https://github.com/biomejs/biome/issues/11315): The CSS parser now recovers at declaration boundaries after bogus declarations, allowing subsequent valid declarations to be parsed.

- [#11248](https://github.com/biomejs/biome/pull/11248) [`57b197e`](https://github.com/biomejs/biome/commit/57b197e6d5a2432ff6904afff24125e4d8ec01cd) Thanks [@yanthomasdev](https://github.com/yanthomasdev)! - Expanded the environment variable metadata used by `biome rage` to include `BIOME_BINARY`, `BIOME_LOG_FILE`, and `RUST_BACKTRACE` as well as reworded explanations for better readability.

- [#11377](https://github.com/biomejs/biome/pull/11377) [`a8798ea`](https://github.com/biomejs/biome/commit/a8798ea9f2569fab4524704c99a8e2fe45c2ca32) Thanks [@Netail](https://github.com/Netail)! - Added a new nursery rule [`useNamedLayer`](https://biomejs.dev/linter/rules/use-named-layer) which disallows anonymous cascade layers.

  ```css
  @layer {
    a {
      color: red;
    }
  }
  ```

- [#11327](https://github.com/biomejs/biome/pull/11327) [`6771cf5`](https://github.com/biomejs/biome/commit/6771cf5bd2e64f256468a33b811adec8e793d933) Thanks [@dyc3](https://github.com/dyc3)! - The HTML formatter now preserves meaningful blank lines in HTML, including spacing after elements with trailing spaces and blank lines between comment groups.

  ```diff
   <div>
     <!-- first group -->
  +
     <!-- second group -->
   </div>
  ```

- [#10312](https://github.com/biomejs/biome/pull/10312) [`ba8aa18`](https://github.com/biomejs/biome/commit/ba8aa183371b3080691ed80e5a9f6f0239cf451b) Thanks [@dyc3](https://github.com/dyc3)! - Added the nursery rule [`useTailwindShorthandClasses`](https://biomejs.dev/linter/rules/use-tailwind-shorthand-classes/), which suggests shorter Tailwind utility classes. For example, the rule suggests replacing `w-4 h-4` with `size-4`.

- [#11333](https://github.com/biomejs/biome/pull/11333) [`715e0cd`](https://github.com/biomejs/biome/commit/715e0cd1b3e6c88d153554901a659378c728e408) Thanks [@kkkhs](https://github.com/kkkhs)! - Fixed [#11328](https://github.com/biomejs/biome/issues/11328): `lint/nursery/useExpect` now recognizes Vitest Browser Mode `expect.element()` calls as assertions.

- [#11343](https://github.com/biomejs/biome/pull/11343) [`9b98211`](https://github.com/biomejs/biome/commit/9b982113dba8b37c163662d59611ecba0fc02f5a) Thanks [@johncarmack1984](https://github.com/johncarmack1984)! - Fixed [#11311](https://github.com/biomejs/biome/issues/11311): the CSS parser now accepts Tailwind container-query variant names in `@variant`, such as `@xl` and `@max-xl`. These previously produced a parse error and a [`noUnknownAtRules`](https://biomejs.dev/linter/rules/no-unknown-at-rules/) diagnostic.

  ```css
  @variant @xl {
    div {
      background: red;
    }
  }
  ```

- [#11220](https://github.com/biomejs/biome/pull/11220) [`3e8c488`](https://github.com/biomejs/biome/commit/3e8c4887c4ef87df45f56aafa4fbc5f497dae42f) Thanks [@santichausis](https://github.com/santichausis)! - Fixed [#9541](https://github.com/biomejs/biome/issues/9541): [`noUndeclaredVariables`](https://biomejs.dev/linter/rules/no-undeclared-variables/), [`noUnusedImports`](https://biomejs.dev/linter/rules/no-unused-imports/), and [`noUnusedVariables`](https://biomejs.dev/linter/rules/no-unused-variables/) now correctly recognise exported variables and functions declared in one embedded `<script>` block as usable from a sibling `<script>` block, in Svelte's `<script module>`/`<script>` pair and Vue's non-`setup` `<script>` blocks.

  For example, Biome no longer reports `greet` as undeclared in the following Svelte component:

  ```svelte
  <script module>
    export function greet() {
      console.log("Hello!");
    }
  </script>

  <script>
    greet();
  </script>
  ```

- [#11300](https://github.com/biomejs/biome/pull/11300) [`36430eb`](https://github.com/biomejs/biome/commit/36430ebb9679d1ca5d9c231a36b709a4b5eab9b3) Thanks [@dyc3](https://github.com/dyc3)! - Fixed the HTML formatter's whitespace handling for `marquee`, `noscript`, `video`, `audio`, and `object` elements.

  ```diff
  - <marquee behavior="alternate"> This text will bounce </marquee>
  + <marquee behavior="alternate">This text will bounce</marquee>
  ```

- [#11299](https://github.com/biomejs/biome/pull/11299) [`6559e6c`](https://github.com/biomejs/biome/commit/6559e6ced6d4ebe8c26e818931df15d02829130d) Thanks [@jp-knj](https://github.com/jp-knj)! - Added the nursery rule `useAstroClientOnlyDirectiveValue`, which reports Astro `client:only` directives without an initializer.

  For example, `<Component client:only />` triggers the rule.

- [#11365](https://github.com/biomejs/biome/pull/11365) [`7529811`](https://github.com/biomejs/biome/commit/7529811358079edb5a2a9d4a5f67a9f639a63f3a) Thanks [@MHJahanbakhsh](https://github.com/MHJahanbakhsh)! - Fixed [#11229](https://github.com/biomejs/biome/issues/11229): The [`useGenericFontNames`](https://biomejs.dev/linter/rules/use-generic-font-names/) rule now treats `math` as a valid generic font family.

- [#11346](https://github.com/biomejs/biome/pull/11346) [`674f5f4`](https://github.com/biomejs/biome/commit/674f5f4b4e6923b6c7fd12d76e366f82ffe6405b) Thanks [@Jayllyz](https://github.com/Jayllyz)! - Fixed [#11335](https://github.com/biomejs/biome/issues/11335): [`noComponentHookFactories`](https://biomejs.dev/linter/rules/no-component-hook-factories/) now reports a `use`-prefixed variable only when a function is assigned to it directly.

  ```js
  function factory() {
    const useColors = true; // no longer reported
    const useStore = createStore({ count: 0 }); // no longer reported
    const useData = () => useState(null); // still reported
    return useColors;
  }
  ```

- [#11334](https://github.com/biomejs/biome/pull/11334) [`c87c46a`](https://github.com/biomejs/biome/commit/c87c46ab350a40fd38b2288887e2d6e930a2d62d) Thanks [@zkasuran](https://github.com/zkasuran)! - Fixed [#11317](https://github.com/biomejs/biome/issues/11317): [`noSvgWithoutTitle`](https://biomejs.dev/linter/rules/no-svg-without-title/) no longer reports an `svg` that uses the boolean shorthand `aria-hidden` (equivalent to `aria-hidden={true}` in React).

- [#11364](https://github.com/biomejs/biome/pull/11364) [`13853b1`](https://github.com/biomejs/biome/commit/13853b16685d96bfb9158de7d5f4c101d114ba32) Thanks [@ematipico](https://github.com/ematipico)! - Fixed a bug where [`useJsxKeyInIterable`](https://biomejs.dev/linter/rules/use-jsx-key-in-iterable/) incorrectly flagged Astro files.

- [#11321](https://github.com/biomejs/biome/pull/11321) [`41386f3`](https://github.com/biomejs/biome/commit/41386f38935b299f1a1f759a2c7fdd5c2050bded) Thanks [@dyc3](https://github.com/dyc3)! - Fixed [#11315](https://github.com/biomejs/biome/issues/11315): Invalid CSS declarations in HTML `style` attributes now produce parser diagnostics instead of causing a panic.

- [#11325](https://github.com/biomejs/biome/pull/11325) [`67c3bf0`](https://github.com/biomejs/biome/commit/67c3bf01131c0c079fa058eef96dc28d52c2c59f) Thanks [@dyc3](https://github.com/dyc3)! - Fixed HTML text wrapping to account for the width of an adjacent closing tag, avoiding lines that exceed the configured width when the final word and tag must move together.

  ```diff
   <a-long-long-long-element
  -  >foo bar foo bar foo bar foo bar foo bar foo bar foo bar</a-long-long-long-element
  +  >foo bar foo bar foo bar foo bar foo bar foo
  +  bar</a-long-long-long-element
   >
  ```

- [#11367](https://github.com/biomejs/biome/pull/11367) [`fe5b5d4`](https://github.com/biomejs/biome/commit/fe5b5d41c863d5e2f3b58570e15f483c189d2825) Thanks [@ematipico](https://github.com/ematipico)! - Fixed TypeScript `compilerOptions.paths` resolution when mapping targets omit `./`. Biome now resolves these targets relative to their configured path base.

- [#11316](https://github.com/biomejs/biome/pull/11316) [`17e48d6`](https://github.com/biomejs/biome/commit/17e48d6088f23ec30a1e17e315b52369f1e4836c) Thanks [@wanxiankai](https://github.com/wanxiankai)! - Fixed [#11289](https://github.com/biomejs/biome/issues/11289): the safe fix for [`noExtraBooleanCast`](https://biomejs.dev/linter/rules/no-extra-boolean-cast/) now preserves parentheses around nested conditional expressions.

- [#11254](https://github.com/biomejs/biome/pull/11254) [`d25d113`](https://github.com/biomejs/biome/commit/d25d113aed23ca9b5ee9b7cdedb208d8a0b2cd00) Thanks [@dyc3](https://github.com/dyc3)! - Fixed [#11242](https://github.com/biomejs/biome/issues/11242): Biome no longer crashes with an access violation when analysing files on Windows ARM64.

- [#11221](https://github.com/biomejs/biome/pull/11221) [`85aac73`](https://github.com/biomejs/biome/commit/85aac73d32a5f4a0db7bab3ebd195e35b32d513d) Thanks [@freeatnet](https://github.com/freeatnet)! - Added the nursery rule [`noUnsafeTypeAssertion`](https://biomejs.dev/linter/rules/no-unsafe-type-assertion/), which disallows TypeScript type assertions while allowing const assertions.

  ```ts
  const value = input as SomeType;
  ```

- [#11314](https://github.com/biomejs/biome/pull/11314) [`7ffb677`](https://github.com/biomejs/biome/commit/7ffb677159c96f072a508e58bfad26ca9c301ac4) Thanks [@ematipico](https://github.com/ematipico)! - Fixed [#11310](https://github.com/biomejs/biome/issues/11310): Restored the performance of [`noMisusedPromises`](https://biomejs.dev/linter/rules/no-misused-promises/) and [`noFloatingPromises`](https://biomejs.dev/linter/rules/no-floating-promises/) when analyzed expressions share deep imported type paths.

- [#11356](https://github.com/biomejs/biome/pull/11356) [`6cd3263`](https://github.com/biomejs/biome/commit/6cd32636f463551b8dfe46aeefb1191d437b4694) Thanks [@johncarmack1984](https://github.com/johncarmack1984)! - The Tailwind parser now understands modifiers on bare utilities (`@container/sidebar`, `shadow/50`).

- [#11318](https://github.com/biomejs/biome/pull/11318) [`76059e9`](https://github.com/biomejs/biome/commit/76059e9f03f5962a18f3569714f8f207ef7c1d91) Thanks [@johncarmack1984](https://github.com/johncarmack1984)! - The Tailwind parser now understands container-query variants (`@sm:`, `@max-lg:`, `@min-[400px]:`) and child and descendant variants (`*:`, `**:`).

- [#11357](https://github.com/biomejs/biome/pull/11357) [`faa2074`](https://github.com/biomejs/biome/commit/faa2074472bc0f4a11f4e80cb4d2b0e55883226a) Thanks [@johncarmack1984](https://github.com/johncarmack1984)! - The Tailwind parser now accepts the legacy leading `!` important marker (`!flex`, `hover:!p-4`).

- [#11344](https://github.com/biomejs/biome/pull/11344) [`f34e15c`](https://github.com/biomejs/biome/commit/f34e15c946511d998c01b6c6e410f0c220c2943e) Thanks [@johncarmack1984](https://github.com/johncarmack1984)! - The Tailwind parser now understands combinator selectors in arbitrary variants (`has-[>svg]:`, `has-[+p]:`), modifiers on variants (`group-hover/menu:`, `@sm/main:`), and arbitrary container-query sizes (`@[400px]:`).

- [#11324](https://github.com/biomejs/biome/pull/11324) [`2f5d452`](https://github.com/biomejs/biome/commit/2f5d452015ee80a02d4e50c4bb2ba930092048a2) Thanks [@dyc3](https://github.com/dyc3)! - Fixed HTML formatting that inserted rendered whitespace between an element and touching text when the line wrapped.

  ```diff
    <div>
  -   before<meter value=".5"></meter>
  -   after
  +   before<meter value=".5"></meter
  +   >after
    </div>
  ```

- [#11312](https://github.com/biomejs/biome/pull/11312) [`e65f07e`](https://github.com/biomejs/biome/commit/e65f07e06342c7d8d74b98ff219d72c7e081b4f2) Thanks [@xosnos](https://github.com/xosnos)! - Added a new nursery rule [`useControlLabel`](https://biomejs.dev/linter/rules/use-control-label/) for both HTML and JSX, which reports interactive control elements (`button`, `menuitem`) without an accessible label.

  ```jsx
  <button />
  ```

- [#11364](https://github.com/biomejs/biome/pull/11364) [`13853b1`](https://github.com/biomejs/biome/commit/13853b16685d96bfb9158de7d5f4c101d114ba32) Thanks [@ematipico](https://github.com/ematipico)! - Fixed SVG parsing for files with an XML declaration followed by a `PUBLIC` doctype, such as `<?xml version="1.0"?><!DOCTYPE svg PUBLIC "a" "b">`.

- [#11301](https://github.com/biomejs/biome/pull/11301) [`610ee28`](https://github.com/biomejs/biome/commit/610ee282989ac73908e0f8bd6e49bc40cccfef77) Thanks [@dyc3](https://github.com/dyc3)! - Fixed parent tag wrapping when an HTML element starts or ends with a block-like or hidden child such as `source`, `track`, or `param`.

  ```diff
  - <video src="brave.webm"><track kind="subtitles" src="brave.en.vtt"></video>
  + <video src="brave.webm">
  +   <track kind="subtitles" src="brave.en.vtt">
  + </video>
  ```



## What's Changed
* fix(deps): revert mimalloc to older version to mitigate access violation errors by @dyc3 in https://github.com/biomejs/biome/pull/11254
* chore(deps): update github-actions by @renovate[bot] in https://github.com/biomejs/biome/pull/11288
* feat(flags): add missing flags and reword metadata by @yanthomasdev in https://github.com/biomejs/biome/pull/11248
* feat(useSortedClasses): sort custom properties and reject invalid modifiers in sort_v4 by @johncarmack1984 in https://github.com/biomejs/biome/pull/11274
* fix(format/html): correct whitespace display classifications by @dyc3 in https://github.com/biomejs/biome/pull/11300
* fix(noExtraBooleanCast): preserve conditional parentheses by @wanxiankai in https://github.com/biomejs/biome/pull/11316
* fix(parse/css): handle bogus declarations slightly more gracefully by @dyc3 in https://github.com/biomejs/biome/pull/11321
* fix(format/html): keep block edge children structural by @dyc3 in https://github.com/biomejs/biome/pull/11301
* fix(format/html): preserve touching text adjacency by @dyc3 in https://github.com/biomejs/biome/pull/11324
* fix(format/html): include closing tags in fill width by @dyc3 in https://github.com/biomejs/biome/pull/11325
* fix(lint): recognize expect.element assertions by @kkkhs in https://github.com/biomejs/biome/pull/11333
* docs: address changes on CLI rework by @yanthomasdev in https://github.com/biomejs/biome/pull/11151
* fix(linter): noSvgWithoutTitle allows svg with shorthand aria-hidden by @zkasuran in https://github.com/biomejs/biome/pull/11334
* fix(md/parse): remove inline node from html comments by @ematipico in https://github.com/biomejs/biome/pull/11337
* refactor: store projects in salsa db by @ematipico in https://github.com/biomejs/biome/pull/11330
* fix(css/parser): allow Tailwind variant names to reference container-query variants by @johncarmack1984 in https://github.com/biomejs/biome/pull/11343
* fix(noMisusedPromises): perf regression by @ematipico in https://github.com/biomejs/biome/pull/11314
* feat(useSortedClasses): parse and sort container-query and child variants by @johncarmack1984 in https://github.com/biomejs/biome/pull/11318
* feat(useSortedClasses): parse combinator selectors and variant modifiers by @johncarmack1984 in https://github.com/biomejs/biome/pull/11344
* fix(js_analyze): recognize exported bindings across embedded script blocks by @santichausis in https://github.com/biomejs/biome/pull/11220
* fix(noComponentHookFactories): don't report non-function use* bindings by @Jayllyz in https://github.com/biomejs/biome/pull/11346
* fix(format/html): preserve meaningful blank lines by @dyc3 in https://github.com/biomejs/biome/pull/11327
* feat(lint): add `useTailwindShorthandClasses` by @dyc3 in https://github.com/biomejs/biome/pull/10312
* fix(inference): skip return arguments lookup by @ematipico in https://github.com/biomejs/biome/pull/11347
* test(noUnnecessaryConditions): add regression fixture for #10704 by @Jayllyz in https://github.com/biomejs/biome/pull/11350
* feat(useSortedClasses): sort `@container` and other bare utilities with modifiers by @johncarmack1984 in https://github.com/biomejs/biome/pull/11356
* feat(lint): nursery useControlLabel by @xosnos in https://github.com/biomejs/biome/pull/11312
* fix: html and svg bugs, plus false positive on lint rule by @ematipico in https://github.com/biomejs/biome/pull/11364
* fix(lint/css): treat math as a generic font family by @MHJahanbakhsh in https://github.com/biomejs/biome/pull/11365
* fix(resolver): relative paths without dot prefix by @ematipico in https://github.com/biomejs/biome/pull/11367
* chore(deps): update github-actions by @renovate[bot] in https://github.com/biomejs/biome/pull/11369
* chore(deps): update pnpm to v11.21.0 by @renovate[bot] in https://github.com/biomejs/biome/pull/11371
* fix(useSortedClasses): match Tailwind on ties, handle the legacy `!` by @johncarmack1984 in https://github.com/biomejs/biome/pull/11357
* feat(lint): add `noUnsafeTypeAssertion` rule by @freeatnet in https://github.com/biomejs/biome/pull/11221
* feat: useNamedLayer by @Netail in https://github.com/biomejs/biome/pull/11377
* feat: adds the `useAstroClientOnlyDirectiveValue` rule for .astro files by @jp-knj in https://github.com/biomejs/biome/pull/11299
* refactor(lint): put `impl Rule` blocks first by @dyc3 in https://github.com/biomejs/biome/pull/11382
* ci: release by @github-actions[bot] in https://github.com/biomejs/biome/pull/11309

## New Contributors
* @wanxiankai made their first contribution in https://github.com/biomejs/biome/pull/11316
* @kkkhs made their first contribution in https://github.com/biomejs/biome/pull/11333
* @zkasuran made their first contribution in https://github.com/biomejs/biome/pull/11334
* @santichausis made their first contribution in https://github.com/biomejs/biome/pull/11220
* @xosnos made their first contribution in https://github.com/biomejs/biome/pull/11312
* @MHJahanbakhsh made their first contribution in https://github.com/biomejs/biome/pull/11365
* @freeatnet made their first contribution in https://github.com/biomejs/biome/pull/11221
* @jp-knj made their first contribution in https://github.com/biomejs/biome/pull/11299

**Full Changelog**: https://github.com/biomejs/biome/compare/@biomejs/biome@2.5.8...@biomejs/biome@2.5.9