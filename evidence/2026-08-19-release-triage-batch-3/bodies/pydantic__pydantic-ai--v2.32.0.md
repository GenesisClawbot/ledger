<!-- Release notes generated using configuration in .github/release.yml at main -->

## What's Changed
### 🚀 Features
* Suggest known model names for invalid identifiers by @dsfaccini in https://github.com/pydantic/pydantic-ai/pull/7325
* Support xAI attachment search lifecycle by @colesmcintosh in https://github.com/pydantic/pydantic-ai/pull/7156
* Surface OpenRouter web-search sources in `provider_details["annotations"]` by @dsfaccini in https://github.com/pydantic/pydantic-ai/pull/7458
* Add instrumentation version 6, emitting tool results under `role: 'tool'` by @dsfaccini in https://github.com/pydantic/pydantic-ai/pull/7582
### 🐛 Bug Fixes
* Run sync hooks in a thread pool and enforce `timeout=` for blocking sync tools and hooks by @adtyavrdhn in https://github.com/pydantic/pydantic-ai/pull/7557
* Record `RunContext.cancel()` from setup-phase `for_run` hooks instead of raising `UserError` by @adtyavrdhn in https://github.com/pydantic/pydantic-ai/pull/7567
* Treat a response containing only empty text parts as having no text output by @adtyavrdhn in https://github.com/pydantic/pydantic-ai/pull/7568
* Only list available tools in the unknown-tool retry message by @adtyavrdhn in https://github.com/pydantic/pydantic-ai/pull/7572
* Sort tool results ahead of tool availability announcements so Bedrock accepts turns revealing multiple tools by @adtyavrdhn in https://github.com/pydantic/pydantic-ai/pull/7571
* Drop native tool calls the replayed payload has no result block for by @dsfaccini in https://github.com/pydantic/pydantic-ai/pull/7504
### 📦 Dependencies
* Use `httpx2` for compatible HTTP clients by @dsfaccini in https://github.com/pydantic/pydantic-ai/pull/7351


**Full Changelog**: https://github.com/pydantic/pydantic-ai/compare/v2.31.1...v2.32.0
