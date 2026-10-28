# Peer-Review Comparison

**Project:** VV-Lab-124-PSVS  
**Reviewer:** Mubashir / Roll No. 124  
**Classmate:** [Enter classmate name and roll number]  
**Exchange date:** [YYYY-MM-DD]  
**Status:** Pending actual peer exchange

## Procedure

1. Exchange defect logs with a classmate.
2. Compare findings against the same source requirements S1–S12.
3. Match findings by underlying issue, not just by wording or defect ID.
4. Count a finding as shared only when both logs identify substantially the same issue.
5. Add peer-only findings to the table below and decide whether they are valid, duplicates, or out of scope.

## Comparison table

| Finding / underlying issue | My defect ID(s) | Peer defect ID(s) | Classification |
|---|---|---|---|
| [Issue 1] | [D-xxx or None] | [Peer ID or None] | Shared / Missed by me / Missed by peer / Disputed |
| [Issue 2] | [D-xxx or None] | [Peer ID or None] | Shared / Missed by me / Missed by peer / Disputed |
| [Issue 3] | [D-xxx or None] | [Peer ID or None] | Shared / Missed by me / Missed by peer / Disputed |

## Detection-rate calculation

Use unique, valid underlying defects after deduplication.

- **A = My unique valid defects**
- **B = Peer’s unique valid defects**
- **I = Defects identified by both reviewers**
- **Union = A + B − I**
- **My detection rate = I ÷ Union × 100%**

If the instructor defines “yours ÷ union” as the number of your findings divided by the union, use `A ÷ Union × 100%` instead and label it exactly that way. The conventional capture/recall rate for your findings is `I ÷ Union × 100%`; confirm which interpretation the instructor expects.

### Results (complete after exchange)

| Measure | Count |
|---|---:|
| My unique valid findings (A) | [Enter] |
| Peer unique valid findings (B) | [Enter] |
| Shared findings (I) | [Enter] |
| Union (A + B − I) | [Enter] |
| My detection rate (I ÷ Union × 100%) | [Enter]% |

**Reflection:** [Record which defect types were missed, why they were missed, and what review technique you will change next time.]
