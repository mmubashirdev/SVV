# PSVS Defect Log

| Defect ID | Related Requirement | Defect / Ambiguity | Impact | Proposed Resolution |
|---|---|---|---|---|
| D-001 | S7, S8 | Normal temperature limit and maintenance warming exception are not formally distinguished. | Conflicting temperature constraints may make verification impossible. | Define normal and maintenance operating states and their respective temperature rules. |
| D-002 | S10 | The annual withdrawal limit does not define the accounting period or rounding rule. | Different implementations may calculate different withdrawal limits. | Define the annual period and the method for calculating the permitted quantity. |
| D-003 | S9 | "Low viability" and "promptly" are not measurable. | Regeneration alerts cannot be objectively verified. | Specify a viability threshold and a maximum alert delay. |
| D-004 | S5 | Emergency release does not specify authorization evidence or required audit details. | Unauthorized or untraceable emergency releases may occur. | Require authorized emergency approval and record the requesting party, authority, reason, and release details. |
| D-005 | S12 | "Good audit trail" does not specify the events or fields to record. | Audit completeness cannot be verified objectively. | Define mandatory audit fields, event coverage, and record protection requirements. |

**Status:** Initial defect analysis  
**Branch:** defect-analysis
