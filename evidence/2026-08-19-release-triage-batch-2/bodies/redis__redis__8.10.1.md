Update urgency: `SECURITY`: There are security fixes in the release.

### Security fixes

- (CVE-2026-62356) Miscalculated buffer size in `CMSketch` RDB loading may lead to heap OOB write
- Out-of-bounds access in TopK heap cleanup path (MOD-15410)
- Use-after-free in the TLS pending-data list when a command closes another pending connection
- A malicious RDB payload with an out-of-range `SLOT_INFO` slot id causes memory corruption during RDB loading, which may lead to Remote Code Execution
- Vector Sets: missing node level validation when loading a vector set from RDB may lead to out-of-bounds access
- Vector Sets: use-after-free when `VREM` mutates the HNSW graph while background `VSIM` threads are still running
- Vector Sets: a negative `hnsw_search()` return was treated as a huge unsigned count, reading past the end of the result arrays
- TLS client certificate authentication bypass: a Common Name containing an embedded NUL byte was truncated, allowing a client to authenticate as another (possibly privileged) ACL user
- #15594 Use-after-free in the blocked-client list when reprocessing a command evicts another client blocked on the same key
