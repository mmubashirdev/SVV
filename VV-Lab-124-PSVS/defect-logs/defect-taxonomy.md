# Defect Taxonomy — Polar Seed Vault System

**Project:** VV-Lab-124-PSVS  
**Source:** Informal requirements S1–S12  
**Purpose:** Classify defects that can prevent requirements from being understood, implemented consistently, or verified objectively.

| Category | Definition | Example |
|---|---|---|
| Ambiguity | A statement permits two or more materially different interpretations. | S5 says “in an emergency” but does not define who declares an emergency or what qualifies. |
| Vagueness | A statement uses imprecise terms without measurable thresholds. | S6 says “safe temperature” without specifying a range or conditions. |
| Incompleteness | Information needed to implement or verify a requirement is missing. | S9 does not state the viability threshold or maximum time to flag a sample. |
| Contradiction | Two requirements prescribe incompatible behavior under the same stated conditions. | S7 says temperature shall never rise above -18°C, while S8 permits warming to 0°C during maintenance; the operating-state exception is not formalized. |
| Non-verifiability | Compliance cannot be determined objectively from the requirement as written. | S12 requires a “good” audit trail without defining completeness or acceptance criteria. |
| Redundancy | Requirements repeat or overlap without adding distinct, necessary behavior. | S6 and S7 both address safe temperature, but S6 adds no measurable criterion beyond S7 as currently written. This is potential redundancy, not necessarily a defect if S6 is later defined more broadly. |
| Infeasibility | A requirement cannot reliably be met with the specified resources, conditions, or physical constraints. | A strict “never” temperature rule may be infeasible during sensor failure or unavoidable equipment faults unless fault handling and tolerances are specified. |
| Untraceability | A requirement or derived rule lacks a stable link to its source, rationale, owner, or verification evidence. | A future regeneration-alert rule added to the design without linking it to S9 or a change request. |
| Missing exception handling | A requirement omits behavior for an important exceptional condition. | S1 does not state what happens if depositor registration expires or is suspended during a deposit. |
| Missing data definition | Required quantities or entities are not defined precisely enough for consistent processing. | S10 does not define the denominator for the 20% withdrawal calculation. |

## Classification guidance

- Assign the primary category that best describes the defect; add a secondary category in the description if needed.
- A cross-requirement defect should cite every affected requirement in the Req ID column, for example `S4, S5`.
- Do not count every possible consequence of one underlying issue as a separate defect. Separate entries should represent distinct missing decisions or verification failures.
- “Potential redundancy” and “infeasibility risk” are explicitly qualified because the short informal requirements do not prove that the design is impossible or that two requirements are fully redundant.
