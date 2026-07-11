---
tipo: checklist
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/checklists/agent-quality-gate|agent-quality-gate]]"
  - "[[Prometeu/.aiox-core/development/checklists/brownfield-compatibility-checklist|brownfield-compatibility-checklist]]"
  - "[[Prometeu/.aiox-core/development/checklists/memory-audit-checklist|memory-audit-checklist]]"
  - "[[Prometeu/.aiox-core/development/checklists/self-critique-checklist|self-critique-checklist]]"
---

# Issue Triage Checklist

## Per-Issue Checklist

For each issue being triaged, verify:

### Classification
- [ ] Issue has been read and understood
- [ ] ONE `type:` label applied (bug/feature/enhancement/docs/test/chore)
- [ ] ONE `priority:` label applied (P1/P2/P3/P4)
- [ ] At least ONE `area:` label applied
- [ ] `status: needs-triage` removed

### Status Resolution
- [ ] Status set to `status: confirmed` OR `status: needs-info`
- [ ] If `status: needs-info` — comment posted asking for specific details
- [ ] If duplicate — labeled `duplicate`, closed with reference to original issue

### Community
- [ ] Assessed for `community: good first issue` (clear scope, isolated, well-documented)
- [ ] Assessed for `community: help wanted` (valid but team lacks bandwidth)

### Quality
- [ ] Issue has sufficient information to act on (or `status: needs-info` applied)
- [ ] Related issues cross-referenced if applicable
- [ ] No sensitive information in issue (API keys, credentials)

## Session Checklist

After completing a triage session:

- [ ] All `status: needs-triage` issues reviewed
- [ ] Triage report generated
- [ ] Story GHIM-001 updated with triage count
- [ ] High-priority issues (P1/P2) flagged for immediate attention
