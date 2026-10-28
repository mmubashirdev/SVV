# PSVS System Constraints

## 1. Chamber Capacity

- Chambers 1, 2, and 3 shall each contain no more than 50,000 boxes.
- Chamber 4 shall contain no more than 20,000 boxes.
- The number of boxes in a chamber shall never be negative.

## 2. Ownership

- Each stored box shall have exactly one registered depositor as its owner.
- Normal withdrawal shall require authorization from the box's owner.
- Emergency release shall follow the separate authorization policy defined for the vault authority.

## 3. Temperature

- During normal operation, each chamber shall remain at or below -18°C.
- Authorized maintenance may permit warming up to 0°C, subject to a formally defined maintenance policy.
- The temperature exception shall be explicitly represented in the system model.

## 4. Withdrawal Limits

- Withdrawals shall be tracked per depositor, species, and annual accounting period.
- The permitted withdrawal quantity shall not exceed 20% of the relevant box count, once the reference count and rounding policy have been formally defined.

## 5. Redeposit

- A withdrawn box shall not return to storage until re-inspection has been completed and accepted.

## 6. Auditability

- System actions shall generate traceable audit records.
- Audit records should identify the action, timestamp, affected box or chamber, actor, and outcome where applicable.

## Verification Note

These constraints are preliminary. Ambiguous requirements must be clarified before the constraints can serve as complete formal proof obligations.
