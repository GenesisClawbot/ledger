### Patch Changes

-   [#17724](https://github.com/withastro/astro/pull/17724) [`97140b2`](https://github.com/withastro/astro/commit/97140b23f4f8d5dae1b2bfe6c69bd602e262eee9) Thanks [@ematipico](https://github.com/ematipico)! - Fixes an issue where Astro could run out of memory when `experimental.collectionStorage` is set to `chunked` and there are multiple concurrent updates to the same collection.

-   [#17636](https://github.com/withastro/astro/pull/17636) [`51723b1`](https://github.com/withastro/astro/commit/51723b100a37d6dd6df793957d35d9216e872cef) Thanks [@matthewp](https://github.com/matthewp)! - Fixes the dev server sometimes matching against stale routes after pages were added, removed, or renamed, requiring a dev server restart to pick up the change

-   [#17636](https://github.com/withastro/astro/pull/17636) [`51723b1`](https://github.com/withastro/astro/commit/51723b100a37d6dd6df793957d35d9216e872cef) Thanks [@matthewp](https://github.com/matthewp)! - Fixes the composable request helpers (`astro/fetch`) throwing an error when used on a request that had been rewritten with `Astro.rewrite()` or `next()`

-   [#17636](https://github.com/withastro/astro/pull/17636) [`51723b1`](https://github.com/withastro/astro/commit/51723b100a37d6dd6df793957d35d9216e872cef) Thanks [@matthewp](https://github.com/matthewp)! - Refactors Astro's internal server-side request handling. This is an internal change: all documented public APIs, including `App` and `NodeApp`, keep their existing signatures and behavior.

    The undocumented internal `app.pipeline` property and the `AppPipeline` export from `astro/app` have been removed. Adapters that used `app.pipeline.getLogger()` to wait for the configured log destination can call the new `app.getLogger()` instead.

    As a result of this refactor, `new FetchState(request)` from `astro/fetch` now works anywhere inside a built Astro server — including custom `src/fetch.ts` entrypoints — without the request needing to first pass through `app.render()`. Previously this threw an error, breaking patterns like the Cloudflare adapter's advanced custom-worker setup.

-   [#17723](https://github.com/withastro/astro/pull/17723) [`c3b9aed`](https://github.com/withastro/astro/commit/c3b9aed88d9a9b21015bab5cc6de95d1663869cf) Thanks [@florian-lefebvre](https://github.com/florian-lefebvre)! - Fixes a link in font providers JSDoc annotations

-   [#17699](https://github.com/withastro/astro/pull/17699) [`e28d227`](https://github.com/withastro/astro/commit/e28d22782bdc641261d0eca8ad00ba248a93d640) Thanks [@ArmandPhilippot](https://github.com/ArmandPhilippot)! - Fixes several documentation issues related to the JSDoc for configuration options.

    -   When hovering over the `server` and `fonts` options, the JSDoc for the nested options was displayed instead of the JSDoc for the top-level property.
    -   Two i18n configuration options were being used incorrectly in the examples.
    -   The indentation of some code blocks was broken on hover.

-   [#17572](https://github.com/withastro/astro/pull/17572) [`2066f39`](https://github.com/withastro/astro/commit/2066f39c60707a100531b4ef4bb5dab8feafa7f2) Thanks [@matthewp](https://github.com/matthewp)! - Fixes a crash when a request arrives with a malformed port in the `Host` header (for example `example.com:65536` or `example.com:8080:8080`). Such a host made the constructed request URL invalid, and the fallback that was meant to recover reused the same invalid host and threw again. The request URL now degrades to a host the server controls when the incoming host cannot be parsed, so the request is handled instead of erroring.

-   [#17685](https://github.com/withastro/astro/pull/17685) [`9f15609`](https://github.com/withastro/astro/commit/9f156094ca89d1474fbf1c471354dc94e69398a9) Thanks [@astrobot-houston](https://github.com/astrobot-houston)! - Fixes a dev server error where an SSR full reload triggered by a third-party Vite plugin (such as `@tailwindcss/vite`) could fail with `Failed to load url astro:server-app.js`

-   [#17636](https://github.com/withastro/astro/pull/17636) [`51723b1`](https://github.com/withastro/astro/commit/51723b100a37d6dd6df793957d35d9216e872cef) Thanks [@matthewp](https://github.com/matthewp)! - Improves error handling for custom log destinations. When the configured logger fails to load, Astro now reports the error and continues with the default console logger instead of failing the first request.

-   [#17631](https://github.com/withastro/astro/pull/17631) [`cf29bec`](https://github.com/withastro/astro/commit/cf29bec66124bc7059ffe7013df040860bd197c5) Thanks [@matthewp](https://github.com/matthewp)! - Fixes `getCollection()` and `getEntry()` throwing `DataCloneError` when a collection schema transform returns a `Temporal.PlainDate` or other class instance.

-   Updated dependencies \[[`8c193f6`](https://github.com/withastro/astro/commit/8c193f67cce77cf2e41fb702c88ca46f788f1277)]:
    -   @astrojs/internal-helpers@0.10.3
    -   @astrojs/markdown-remark@7.2.3
    -   @astrojs/markdown-satteri@0.3.6
