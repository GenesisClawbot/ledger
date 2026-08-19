- Fixed an issue where the Cursor ACP agent would fail to start ([#62825](https://github.com/zed-industries/zed/pull/62825))
- Git: Fixed the GPG passphrase modal appearing on every commit for users whose configured pinentry (e.g. pinentry-mac with the macOS Keychain) can supply the passphrase without Zed's help. Zed now only prompts when gpg cannot obtain the passphrase on its own. ([#62783](https://github.com/zed-industries/zed/pull/62783))
- Fixed array merging for extensions case ([#62722](https://github.com/zed-industries/zed/pull/62722))
- Fixed project search not working in some non-Unicode files ([#62591](https://github.com/zed-industries/zed/pull/62591))

