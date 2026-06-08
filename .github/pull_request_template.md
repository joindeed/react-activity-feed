## What this fixes
- **Primary CVE:** 
- **Bundled CVEs:** 
- **Severity:** 
- **Affected package:** 
- **Fixed by upgrading:** x.x.x → x.x.x
- **CVSS Score:** 
- **Scanner:** Snyk

## Verification
- [ ] CVE researched — vulnerable function and PoC documented (.security/cve-research-*)
- [ ] Bundle scan run — all closeable CVEs in this package included
- [ ] Pre-fix baseline established (Step 4.5)
- [ ] Regression test written and confirmed FAILING before fix
- [ ] Regression test PASSES after fix
- [ ] Full test suite passes
- [ ] Build is clean
- [ ] Snyk confirms all bundled CVEs closed on this branch
- [ ] No new vulnerabilities introduced
- [ ] No secrets detected (gitleaks clean)
- [ ] Dependency diff reviewed

## Breaking change risk
- [ ] Low — patch version bump
- [ ] Medium — minor version bump, changelog reviewed
- [ ] High — major version bump, manual review required

## Pre-existing findings not closed by this PR
<!-- Auto-populated from .security/dep-diff summary. "None" if all high/critical closed. -->
| CVE | Severity | Reason |
|-----|----------|--------|
|     |          |        |

## Dependency changes
<!-- Auto-populated by Claude Code from .security/dep-diff summary -->

## Regression test locations
`test/security/cve-*.test.js` (one file per bundled CVE)

## Notes for reviewer
<!-- Flag anything unusual: false positive assessment, major transitive bumps, unreachable code paths -->
