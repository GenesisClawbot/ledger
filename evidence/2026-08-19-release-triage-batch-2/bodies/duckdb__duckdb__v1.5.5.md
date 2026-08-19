This is a bug fix release for various issues discovered after we released v1.5.4.

## What's Changed
* backport the out-of-bounds security fixes made in #23100 by @Tishj in https://github.com/duckdb/duckdb/pull/23197
* Remove checked_array_iterator from fmt dep (1.4) by @carlopi in https://github.com/duckdb/duckdb/pull/23261
* Remove checked_array_iterator from fmt dep (1.4) by @staticlibs in https://github.com/duckdb/duckdb/pull/23239
* [Dev] Add LLDB scripts to help with debugging by @Tishj in https://github.com/duckdb/duckdb/pull/23297
* Add support for test config extending by @NiclasHaderer in https://github.com/duckdb/duckdb/pull/23145
* bump iceberg again  by @Tmonster in https://github.com/duckdb/duckdb/pull/23311
* Correctly get typed value stats for fully shredded variants by @Mytherin in https://github.com/duckdb/duckdb/pull/23325
* bump unity to include backfill fix by @benfleis in https://github.com/duckdb/duckdb/pull/23326
* Add request body length to http logs by @DinosL in https://github.com/duckdb/duckdb/pull/23316
* Show transport errors in HTTP log by @DinosL in https://github.com/duckdb/duckdb/pull/23327
* Dispatch Rust nightly build by @mlafeldt in https://github.com/duckdb/duckdb/pull/23352
* parquet: reject DATA_PAGE_V2 pages with inconsistent compressed_page_size by @benfleis in https://github.com/duckdb/duckdb/pull/23279
* Fix deadlock in `TemporaryMemoryManager` by @lnkuiper in https://github.com/duckdb/duckdb/pull/23351
* Register `oid` of dependencies in the `DependencyManager` so that we can track if an object was re-created with the same name by @Mytherin in https://github.com/duckdb/duckdb/pull/23348
* [Dev] Fix recursion issue with `scripts/lldb/pointer_print` by @Tishj in https://github.com/duckdb/duckdb/pull/23362
* [MultiFileReader] Prevent NULL MAP keys because of (likely missing) default value by @Tishj in https://github.com/duckdb/duckdb/pull/23354
* Propagate lambda bindings into `try` operator by @Mytherin in https://github.com/duckdb/duckdb/pull/23375
* Bump Julia to v1.5.4 by @carlopi in https://github.com/duckdb/duckdb/pull/23398
* Add additional guards to `DICT_FSST` to prevent exception during compression with small block size by @sebastiaan-dev in https://github.com/duckdb/duckdb/pull/23341
* fix out-of-bounds read in json path ReadKey lookahead by @jmestwa-coder in https://github.com/duckdb/duckdb/pull/23371
* fix out-of-bounds read in string to struct cast by @jmestwa-coder in https://github.com/duckdb/duckdb/pull/23384
* Issue #23383: Common Aggregate CTEs by @hawkfish in https://github.com/duckdb/duckdb/pull/23409
* Use correct start time when verifying dependencies by @Mytherin in https://github.com/duckdb/duckdb/pull/23430
* Fix false RLE corruption error by @DinosL in https://github.com/duckdb/duckdb/pull/23458
* [v1.5] No cache if file doesn't contain version information by @dentiny in https://github.com/duckdb/duckdb/pull/23434
* Improve rle corruption error messages by @DinosL in https://github.com/duckdb/duckdb/pull/23480
* Issue #23457: Ordered FIRST_VALUE Framing  by @hawkfish in https://github.com/duckdb/duckdb/pull/23499
* Enabled `ALP` and `ALP_RD` for storage version v1.5.0 and up when using smaller block sizes by @sebastiaan-dev in https://github.com/duckdb/duckdb/pull/23483
* [v1.5] Backport PR #23444: fix eviction node memleak when external fi… by @dentiny in https://github.com/duckdb/duckdb/pull/23479
* [v1.5] Fix min/max aggregate stats when row groups filtered by @dentiny in https://github.com/duckdb/duckdb/pull/23517
* Backport #23468 and #23510 by @artjomPlaunov in https://github.com/duckdb/duckdb/pull/23529
* Fix arrow type extension bugs by @evertlammerts in https://github.com/duckdb/duckdb/pull/23534
* Issue #23500: JSON TIMESTAMP_TZ Formatting by @hawkfish in https://github.com/duckdb/duckdb/pull/23513
* fix out-of-bounds read in dictionary string decompression by @jmestwa-coder in https://github.com/duckdb/duckdb/pull/23549
* Merge v1.4 into v1.5 by @carlopi in https://github.com/duckdb/duckdb/pull/23560
* [ADBC] Add support for duckdb:// URI scheme in URI option by @amoeba in https://github.com/duckdb/duckdb/pull/21293
* Fix/capi scalar bind subquery crash by @krleonid in https://github.com/duckdb/duckdb/pull/23566
* [variegata] Bump extensions by @carlopi in https://github.com/duckdb/duckdb/pull/23562
* Fix filter combiner not pruning unsatisfiable bounds by @DinosL in https://github.com/duckdb/duckdb/pull/23563
* fix out-of-bounds read on empty byte array decimals by @jmestwa-coder in https://github.com/duckdb/duckdb/pull/23567
* [v1.5] Quickfix `ALTER TABLE ADD COLUMN IF NOT EXISTS ... DEFAULT` regression by @yan-alex in https://github.com/duckdb/duckdb/pull/23507
* Bump version map to include v1.5.5 by @carlopi in https://github.com/duckdb/duckdb/pull/23629
* backport #23548 to v1.5 by @myrrc in https://github.com/duckdb/duckdb/pull/23587
* Issue #23641: CUME_DIST Underflow by @hawkfish in https://github.com/duckdb/duckdb/pull/23651
* Fixed unsafe iteration when parent is `NULL` in string cast by @sebastiaan-dev in https://github.com/duckdb/duckdb/pull/23593
* Bump HTTPFS by @lnkuiper in https://github.com/duckdb/duckdb/pull/23648
* backport #23573 by @artjomPlaunov in https://github.com/duckdb/duckdb/pull/23672
* fix(adbc): support the ADBC Statistics API by @eitsupi in https://github.com/duckdb/duckdb/pull/23230
* Issue #23664: RANGE ZERO  by @hawkfish in https://github.com/duckdb/duckdb/pull/23710
* Fix DROP COLUMN corrupting per-column metadata block bookkeeping by @ywelsch in https://github.com/duckdb/duckdb/pull/23714
* Include extension header in libduckdb archives by @mlafeldt in https://github.com/duckdb/duckdb/pull/23752
* Correctly promote `SUGGEST_NEW` to `REQUIRE_NEW` for variant / geometry columns by @Mytherin in https://github.com/duckdb/duckdb/pull/23763
* Fix lance build on Rust 1.97: patch its Cargo.lock to ethnum 1.5.3 by @carlopi in https://github.com/duckdb/duckdb/pull/23770
* Bump Postgres, MySQL and SQLite in 1.5 by @staticlibs in https://github.com/duckdb/duckdb/pull/23780
* Fix segfault in external hash aggregate when radix bits grow after going external by @carlopi in https://github.com/duckdb/duckdb/pull/23757
* Add HTTPUtil::ShouldRetry(request, response) retry-classification hook by @carlopi in https://github.com/duckdb/duckdb/pull/23793
* Bump azure, unity_catalog extensions to v1.5-variegata HEAD by @benfleis in https://github.com/duckdb/duckdb/pull/23800
* Bump extensions in preparation for v1.5.5 by @carlopi in https://github.com/duckdb/duckdb/pull/23794
* bump iceberg by @lnkuiper in https://github.com/duckdb/duckdb/pull/23735
* Fix for malformed JSON when rendering via duckbox by @sebastiaan-dev in https://github.com/duckdb/duckdb/pull/23803
* [v1.5] Backport a few fix PRs for v1.5.5 release by @dentiny in https://github.com/duckdb/duckdb/pull/23804
* bound alp/alprd exception positions to vector size by @jmestwa-coder in https://github.com/duckdb/duckdb/pull/23778
* Fix swapped min/max for multi-row-group 128-bit DECIMAL in RETURN_STATS by @sfc-gh-okalaci in https://github.com/duckdb/duckdb/pull/23693
* [variegata] Bump quack to 8e715ebb by @carlopi in https://github.com/duckdb/duckdb/pull/23820
* backport #22198 by @artjomPlaunov in https://github.com/duckdb/duckdb/pull/23810
* [v1.5] Backport two more fixes by @dentiny in https://github.com/duckdb/duckdb/pull/23841
* [DependencyManager] Fix ALTER dependency preservation by @Tishj in https://github.com/duckdb/duckdb/pull/23808
* TryLookupEntry now uses default schema as fallback by @okruitho in https://github.com/duckdb/duckdb/pull/23790
* Fix concurrent ALTER and INSERT crash by @Tishj in https://github.com/duckdb/duckdb/pull/23861
* Bump Postgres extension for 1.5 by @staticlibs in https://github.com/duckdb/duckdb/pull/23930
* [v1.5 backport] Fix: reset empty_range in the TIMESTAMP range() table function by @wmTJc9IK0Q in https://github.com/duckdb/duckdb/pull/23879
* Bump extensions for v1.5.5: quack, httpfs and aws by @carlopi in https://github.com/duckdb/duckdb/pull/23892
* Expose destructors, so they are callable module boundaries by @carlopi in https://github.com/duckdb/duckdb/pull/23953
* Bump DuckLake by @pdet in https://github.com/duckdb/duckdb/pull/23962
* Fix OSX ci by @Tmonster in https://github.com/duckdb/duckdb/pull/23963
* Bump lance pin to upstream ethnum fix, drop local patch by @carlopi in https://github.com/duckdb/duckdb/pull/23969
* Add missing statement types to capi by @hrl20 in https://github.com/duckdb/duckdb/pull/23407
* Bump httpfs by @lnkuiper in https://github.com/duckdb/duckdb/pull/24003

**Full Changelog**: https://github.com/duckdb/duckdb/compare/v1.5.4...v1.5.5