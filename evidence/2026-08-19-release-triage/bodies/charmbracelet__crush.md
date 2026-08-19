# A couple QoL goodies

We're releasing a few Quality of Life :tm: enhacements for you. They're simple, but these simple improvements compound with time to make Crush better and better.

## Hint on quitting Crush

When quitting Crush, you'll see a splash screen with a hind on how to quickly continue from the session you left.

<img width="468" height="351" alt="Screenshot 2026-08-12 at 16 41 43" src="https://github.com/user-attachments/assets/1b483466-f784-4176-9622-d3e4ca269839" />

## Bash tool syntax highlighting

When displaying what Crush is running using the Bash tool, the shell command will now have syntax highlighting. It's a small addition, but definitely improves legibility.

> Moo :cow:

<img width="862" height="561" alt="Screenshot 2026-08-12 at 16 47 25" src="https://github.com/user-attachments/assets/9a8a4523-7a50-4b27-a63c-fb96406f8c9b" />

## ctrl+end to jump to bottom + follow

If you want to quickly jump to the bottom of the chat, you can now just press <kbd>ctrl+end</kbd>. This will also ensure Crush will follow the chat as new messages arrive.

## MCP improvements

We enhanced things to make it more stable and fix a couple of edge-case bugs.

That's all for today. See you in the next release!
Charm 💌 

## Changelog
### New!
* 804324fb80a1133f678b0d8c3d74f32c16988c12: feat(session): print session id on exit (#3398) (@BrunoKrugel)
* b82d7d05d8883e3f05c9cb86a6f47bfa3b2ec59b: feat(session): restore last used provider/model from session (@meowgorithm)
* 90b48cda0991c37d3202327e20680f262c798c24: feat(ux): add bash syntax highlighting to bash tool (@andreynering)
* 36a4f79ac0e4056d8b5396bb741d91832998a785: feat(ux): strip redundant cd-to-project prefix from bash tool display (@andreynering)
* 25bf6a2551df8c5baefb94ff6d77c4105a2ce8c3: feat: ctrl+end to go to the bottom and follow (#3535) (@andrinoff)
* 01da7bc6a8cb3f3d5fe6bf68734fc22c43e4458b: feat: use anthropic sdk from upstream (#3544) (@andreynering)
### Fixed
* c78cc67457a027b4e774904240446ed4f28d8b95: fix(mcp): only wait for slow MCP servers in non-interactive runs (@meowgorithm)
* 48768f8b3d37dcbde70a5d1e1c1b8d5021c656f8: fix(ui): don't block interactive prompts on MCP initialization (@meowgorithm)
* ec2fe4379f84efa91ad42cddcd02ac5784a5fbcd: fix: send hyper api key when fetching provider catalog (#3546) (@andreynering)
### Other stuff
* f50509d460badf3c914341ac367c91cd708d9131: chore(mcp): log how long each MCP server takes to connect (@meowgorithm)
* 2e024135e8bef2c929ff0a6e6ffc5837204c9e70: chore: auto-update files (@charmcli)
* feb63006e9452be370721c22a0c2a3be008fd475: telemetry: differentiate invocation types (#3533) (@Amolith)

---

<details>
<summary>Verifying the artifacts</summary>

First, download the [`checksums.txt` file](https://github.com/charmbracelet/crush/releases/download/v0.89.0/checksums.txt) and the [`checksums.txt.sigstore.json` file](https://github.com/charmbracelet/crush/releases/download/v0.89.0/checksums.txt.sigstore.json) files, for example, with `wget`:

```bash
wget 'https://github.com/charmbracelet/crush/releases/download/v0.89.0/checksums.txt'
wget 'https://github.com/charmbracelet/crush/releases/download/v0.89.0/checksums.txt.sigstore.json'
```

Then, verify it using [`cosign`](https://github.com/sigstore/cosign):

```bash
cosign verify-blob \
  --certificate-identity 'https://github.com/charmbracelet/meta/.github/workflows/goreleaser.yml@refs/heads/main' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com' \
  --bundle 'checksums.txt.sigstore.json' \
  ./checksums.txt
```

If the output is `Verified OK`, you can safely use it to verify the checksums of other artifacts you downloaded from the release using `sha256sum`:

```bash
sha256sum --ignore-missing -c checksums.txt
```

Done! You artifacts are now verified!

</details>

<a href="https://charm.land/"><img alt="The Charm logo" src="https://stuff.charm.sh/charm-banner-next.jpg" width="400"></a>

Thoughts? Questions? We love hearing from you. Feel free to reach out on [X](https://x.com/charmcli), [Discord](https://charm.land/discord), [Slack](https://charm.land/slack), [The Fediverse](https://mastodon.social/@charmcli), [Bluesky](https://bsky.app/profile/charm.land).

