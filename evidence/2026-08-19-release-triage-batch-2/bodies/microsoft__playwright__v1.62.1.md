### Bug Fixes

- #41989 [Regression]: tsconfig "extends" bare specifier isn't resolved via node_modules walk-up like tsc (fatal since 1.62)
- #41998 [Regression]: directory-form tsconfig project references ("path": "../pkg") fail to resolve (fatal since 1.62)
- #41985 Accessibility snapshot drops button name when text is nested inside spans with aria-hidden SVG
- #42000 [Regression]: page.evaluate() arg of a branded primitive type (string & { brand }) no longer type-checks since 1.62
- #42013 [BUG]Image-type actionable elements are not presented in the snapshot.
