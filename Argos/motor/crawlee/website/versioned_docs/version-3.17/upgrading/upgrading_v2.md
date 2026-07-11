---
id: upgrading-to-v2
title: Upgrading to v2
tipo: doc-site
area: Argos
up: "[[Argos/_MOC-argos]]"
relacionado:
  - "[[Argos/motor/crawlee/website/versioned_docs/version-3.17/upgrading/upgrading_v1|upgrading_v1]]"
  - "[[Argos/motor/crawlee/website/versioned_docs/version-3.17/upgrading/upgrading_v3|upgrading_v3]]"
---

- **BREAKING**: Require Node.js >=15.10.0 because HTTP2 support on lower Node.js versions is very buggy.
- **BREAKING**: Bump `cheerio` to `1.0.0-rc.10` from `rc.3`. There were breaking changes in `cheerio` between the versions so this bump might be breaking for you as well.
- Remove `LiveViewServer` which was deprecated before release of SDK v1.
