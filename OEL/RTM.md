# Task 2: Change Requests & Traceability Matrix (RTM)

## 1. Version-Controlled Change Log

**Baseline version:** 1.0\
**Updated version:** 1.1\
**Change status:** Modified

# Task 2: Change Requests & Traceability Matrix (RTM)

## 1. Version-Controlled Change Log

**Baseline version:** 1.0  
**Updated version:** 1.1  
**Change status:** Modified

| CR ID | Req. ID | Version | Status | Old Requirement | New Requirement | Reason |
|---|---|---|---|---|---|---|
| CR-01 | HR-01 | 1.1 | Modified | The robot shall enter Safe Mode when a critical battery or thermal condition is detected. | The robot shall enter Safe Mode within 3 seconds when chamber or battery temperature exceeds the critical threshold or battery capacity falls below the emergency level. | Adds a measurable response-time limit and explicit trigger conditions. |
| CR-02 | NFR-01 | 1.1 | Modified | The system shall support communication with multiple robots simultaneously. | The system shall support at least 20 simultaneously connected robots. | Replaces vague “multiple” with a measurable minimum capacity. |
| CR-03 | FR-01 | 1.1 | Modified | Only authenticated operators shall be permitted to issue robot commands. | The system shall require authenticated and role-authorised operators before accepting any robot command. | Adds role-based authorisation and clarifies that the check occurs before command acceptance. |

## 2. Why the New Wording Is More Testable

| CR ID | Limitation of Original | Improvement | Verification |
|---|---|---|---|
| CR-01 | No response deadline; triggers are broad. | Defines a 3-second deadline and specific temperature/battery triggers. | Inject each trigger and measure time to Safe Mode. |
| CR-02 | “Multiple” has no minimum number. | Defines at least 20 concurrent connections. | Connect 20 robots simultaneously. |
| CR-03 | Authentication does not confirm command permission. | Requires authentication and role authorisation before acceptance. | Test unauthenticated, unauthorised, and permitted operators. |

## 3. Traceability ID Register

| ID Type | ID | Description |
|---|---|---|
| State | ST-01 | Idle |
| State | ST-02 | Navigating |
| State | ST-03 | Obstacle avoidance |
| State | ST-04 | Delivering |
| State | ST-05 | Returning to warehouse |
| State | ST-06 | Safe Mode |
| Transition | TR-01 | Idle → Navigating after a valid command |
| Transition | TR-02 | Active state → Safe Mode after critical battery/thermal trigger |
| Transition | TR-03 | Navigating → Obstacle avoidance after obstacle detection |
| Transition | TR-04 | Navigating → Delivering at the clinic |
| Transition | TR-05 | Delivering → Returning after delivery completion |
| Operation | OP-01 | Authenticate operator |
| Operation | OP-02 | Check role permissions |
| Operation | OP-03 | Validate and accept command |
| Operation | OP-04 | Execute robot action |
| Operation | OP-05 | Report robot status |
| Operation | OP-06 | Write timestamped event log |
| Operation | OP-07 | Monitor battery and chamber temperature |
| Operation | OP-08 | Manage concurrent robot connections |

## 4. Multi-Layer Requirements Traceability Matrix

| Requirement | State / Transition | Operation | Constraint | Test Case | Risk Level |
|---|---|---|---|---|---|
| FR-01 v1.1 | State unchanged if access check fails | OP-01, OP-02, OP-03 | CON-03 | TC-01, TC-02, TC-03 | High |
| FR-02 | State unchanged for invalid command | OP-03, OP-06 | CON-04 | TC-04 | High |
| FR-08 | Status reported after command outcome | OP-05 | CON-05 | TC-05 | Medium |
| FR-09 | Event logged after command outcome | OP-06 | CON-05 | TC-06 | High |
| HR-01 v1.1 | TR-02: active state → ST-06 Safe Mode | OP-07, OP-05, OP-06 | CON-01 | TC-07, TC-08 | Critical |
| NFR-01 v1.1 | Robots remain connected in current states | OP-08, OP-05 | CON-02 | TC-09 | High |
| FR-03 | ST-01 → ST-02 via TR-01 | OP-03, OP-04, OP-05 | Valid command required | TC-05 | High |
| FR-04 | ST-02 → ST-03 via TR-03 | OP-04, OP-05, OP-06 | Stop or avoid obstacle safely | TC-10 | Critical |

## 5. Test Cases

| Test Case ID | Scenario / Steps | Expected Result | Related Requirement | Risk Level |
|---|---|---|---|---|
| TC-01 | Submit a command without logging in. | Reject command; no action; log rejection. | FR-01 v1.1 | High |
| TC-02 | Authenticated operator without permission submits a command. | Reject before acceptance; no action; log rejection. | FR-01 v1.1 | High |
| TC-03 | Permitted operator submits a valid command. | Accept command and pass it to execution. | FR-01 v1.1 | High |
| TC-04 | Submit malformed, expired, or invalid-state command. | Reject command; preserve safe state; log rejection. | FR-02 | High |
| TC-05 | Submit valid navigation command and observe execution/status. | Robot changes Idle → Navigating; Mission Control receives status. | FR-03, FR-08 | High |
| TC-06 | Complete a command and inspect the event log. | Log contains timestamp, operator identity, command, outcome, and state change. | FR-09 | High |
| TC-07 | Inject critical chamber temperature while navigating. | Safe Mode within 3 seconds; alarm and state update reported and logged. | HR-01 v1.1 | Critical |
| TC-08 | Reduce battery capacity below emergency level while robot is active. | Safe Mode within 3 seconds; normal movement commands inhibited; event logged. | HR-01 v1.1 | Critical |
| TC-09 | Connect 20 robots concurrently and exchange telemetry with each. | All 20 remain connected; telemetry is handled without capacity failure. | NFR-01 v1.1 | High |
| TC-10 | Place an obstacle on the planned route. | Robot detects it, stops or manoeuvres safely, and reports/logs the event. | FR-04 | Critical |

## 6. Regression Tests Required for Each Change Request

| Change Request | Tests to Re-run | Reason |
|---|---|---|
| CR-01 | TC-07, TC-08, TC-04, TC-05, TC-06 | Verify both triggers, the 3-second deadline, command inhibition, status reporting, and logging. |
| CR-02 | TC-09, TC-05, TC-06 | Verify 20 concurrent connections and command/status/logging behaviour under load. |
| CR-03 | TC-01, TC-02, TC-03, TC-04, TC-06 | Verify authentication, role permissions, invalid-command rejection, and audit records. |

## 7. Scenario-Step Traceability

| Scenario Step | Operation | Test Case |
|---|---|---|
| Command received | OP-03 | TC-03, TC-04 |
| Operator authenticated | OP-01 | TC-01, TC-03 |
| Role permission checked | OP-02 | TC-02, TC-03 |
| Command executed | OP-04 | TC-05 |
| Status reported | OP-05 | TC-05, TC-07, TC-08 |
| Event logged | OP-06 | TC-01, TC-02, TC-04, TC-06, TC-07, TC-08 |

## 8. Version Control Record

| Version | Date | Change | Status |
|---|---|---|---|
| 1.0 | Baseline approval date | Initial requirements baseline. | Baseline |
| 1.1 | 2026-10-14 | Applied CR-01, CR-02, and CR-03; updated traceability and regression tests. | Modified |

## Assumptions and Review Notes

- Align `HR-01`, `NFR-01`, and `FR-01` with the exact IDs in your approved Task 1 baseline if they differ.
- `TC-01` to `TC-10` are proposed IDs to reuse in later tasks.
- Measure the 3-second limit from detection of a critical condition to confirmed Safe Mode entry.
- Agree on telemetry rate and test duration before executing the 20-robot test.
- Confirm Safe Mode actions and command inhibition with the system safety design.
