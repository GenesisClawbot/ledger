SECURITY ADVISORIES:

* Previous releases in the v1.12 series could be affected by several vulnerabilities:
  * The Encrypted Client Hello implementation (which is used by OpenTofu through the go stdlib) would leak the pre-shared key identities during the handshake, 
    allowing a passive network observer who can collect handshakes to de-anonymize the hostname of the server, even when ECH was being used.

  This is fixed now by ([#4363](https://github.com/opentofu/opentofu/pull/4363))

BUG FIXES:
- Fixed bug where implicit moves and provider address changes would incorrectly cause providers.MovedResourceState to be used in place of providers.UpgradeResourceState ([#4375](https://github.com/opentofu/opentofu/pull/4375))


**Full Changelog**: https://github.com/opentofu/opentofu/compare/v1.12.4...v1.12.5

