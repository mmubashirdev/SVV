# State Transition

| State ID | State | Meaning | Entry condition | Exit condition |
|---|---|---|---|---|
| ST-01 | `IDLE` | Robot is switched on and waiting for a delivery request. | Startup completes or robot returns to the warehouse. | A valid `DeliveryRequest` is accepted, or a fault occurs. |
| ST-02 | `NAVIGATING` | Robot travels toward the delivery destination. | A valid delivery request is accepted, or obstacle handling finishes. | Obstacle detected, destination reached, critical condition, or link loss. |
| ST-03 | `AVOIDING_OBSTACLE` | Robot suspends normal navigation to handle an obstacle. | `ObstacleDetected` while navigating. | `ObstacleCleared` allows navigation to resume, unless a safety/link fault intervenes. |
| ST-04 | `DELIVERING` | Robot performs package handover at the destination. | Destination is reached from `NAVIGATING` and delivery is authorised. | `PackageDelivered` or a safety/link fault. |
| ST-05 | `RETURNING` | Robot travels back to the warehouse. | Package delivery completes, or an approved safety policy permits return after an abandoned delivery. | `WarehouseReached` or a safety/link fault. |
| ST-06 | `SAFE_MODE` | Critical safety mode in which normal delivery activity is inhibited. | A CR-01 critical battery or thermal condition is detected. | Critical condition is cleared and recovery is authorised. |
| ST-07 | `LINK_LOST` | Remote communication is unavailable; the robot follows a defined local safe-state policy. | The configured link-loss timeout expires. | Link is restored, validated, and recovery is authorised. |

**Notes**

- CR-01 requires Safe Mode entry within 3 seconds of a critical battery or thermal condition.
- Safe Mode should be reachable from every operational state.
- The exact recovery behaviour for Safe Mode and Link Lost must be defined and approved.
- The original scenario says critical battery during navigation causes the robot to abandon delivery and return to the warehouse. CR-01 additionally requires Safe Mode within 3 seconds. The recovery policy must reconcile these requirements.

## 2. Identify events and conditions

| Event/condition | Meaning | Typical triggering state |
|---|---|---|
| `StartupComplete` | Robot has completed startup checks. | Startup |
| `DeliveryRequest` | A valid delivery request is received. | `IDLE` |
| `ObstacleDetected` | An obstacle is detected on the route. | `NAVIGATING` |
| `ObstacleCleared` | The path is confirmed clear. | `AVOIDING_OBSTACLE` |
| `DestinationReached` | The robot reaches the destination. | `NAVIGATING` |
| `PackageDelivered` | Package handover is confirmed. | `DELIVERING` |
| `CriticalBattery` | Battery capacity reaches the emergency threshold. | Any operational state |
| `CriticalThermalCondition` | Chamber or battery temperature exceeds its critical threshold. | Any operational state |
| `WarehouseReached` | Robot reaches the warehouse. | `RETURNING` |
| `LinkLost` | Remote communication is unavailable for the configured timeout. | Any relevant operational state |
| `LinkRestored` | Communication is restored and validated. | `LINK_LOST` |
| `RecoveryAuthorised` | An approved recovery procedure permits operation to resume. | `SAFE_MODE` or `LINK_LOST` |

## 3. State Transition Table

The format is **Current State + Event/Condition → Next State**. Invalid transitions are included as negative tests.

| Current state | Event/condition | Next state | Requirement ID | Valid? | Verification evidence |
|---|---|---|---|---|---|
| Startup | `StartupComplete` | `IDLE` | FR-03 | Yes | Startup test confirms the initial operational state is `IDLE`. |
| `IDLE` | Valid `DeliveryRequest` | `NAVIGATING` | FR-03 | Yes | State log confirms navigation begins after a valid request. |
| `IDLE` | `DestinationReached` | `DELIVERING` | FR-03, INV-01 | **No** | Negative test confirms no delivery occurs and the invalid transition is rejected. |
| `IDLE` | `ObstacleDetected` | `AVOIDING_OBSTACLE` | FR-04 | **No** | Confirm obstacle handling cannot be entered through this event without navigation. |
| `NAVIGATING` | `ObstacleDetected` | `AVOIDING_OBSTACLE` | FR-04 | Yes | Verify navigation suspends and obstacle handling begins. |
| `AVOIDING_OBSTACLE` | `ObstacleCleared` | `NAVIGATING` | FR-04 | Yes | Verify the path is confirmed clear before navigation resumes. |
| `AVOIDING_OBSTACLE` | `DestinationReached` | `DELIVERING` | FR-03, FR-04, INV-02 | **No** | Confirm delivery remains inhibited while the robot handles an obstacle. |
| `NAVIGATING` | `DestinationReached` | `DELIVERING` | FR-03 | Yes | Verify delivery starts only after reaching the destination from navigation. |
| `DELIVERING` | `PackageDelivered` | `RETURNING` | FR-03 | Yes | Confirm package handover completion initiates the return trip. |
| `RETURNING` | `WarehouseReached` | `IDLE` | FR-03 | Yes | Verify the robot returns to its waiting state. |
| `NAVIGATING` | `CriticalBattery` | `SAFE_MODE` within 3 seconds | CR-01 | Yes | Timestamp the event and Safe Mode entry; confirm normal delivery activity is inhibited. |
| `AVOIDING_OBSTACLE` | `CriticalBattery` | `SAFE_MODE` within 3 seconds | CR-01 | Yes; safety policy required | Verify Safe Mode entry within 3 seconds and safe handling of the obstacle. |
| `DELIVERING` | `CriticalBattery` | `SAFE_MODE` within 3 seconds | CR-01 | Yes | Verify delivery is interrupted and Safe Mode is entered within 3 seconds. |
| `RETURNING` | `CriticalBattery` | `SAFE_MODE` within 3 seconds | CR-01 | Yes | Verify Safe Mode entry and that unsafe movement is inhibited. |
| Any operational state | `CriticalThermalCondition` | `SAFE_MODE` within 3 seconds | CR-01 | Yes | Verify temperature fault, Safe Mode entry time, alarm, and event log. |
| `IDLE` | `LinkLost` | `LINK_LOST` | HR-03* | Proposed | Simulate link timeout and verify remote commands are rejected. |
| `NAVIGATING` | `LinkLost` | `LINK_LOST` | HR-03* | Proposed | Verify remote movement commands are rejected and local safe-state behaviour occurs. |
| `AVOIDING_OBSTACLE` | `LinkLost` | `LINK_LOST` | HR-03* | Proposed | Verify obstacle handling does not result in unsafe movement. |
| `DELIVERING` | `LinkLost` | `LINK_LOST` | HR-03* | Proposed | Verify the robot does not continue unsafe delivery activity. |
| `RETURNING` | `LinkLost` | `LINK_LOST` | HR-03* | Proposed | Verify remote commands are rejected and the local safe-state policy applies. |
| `SAFE_MODE` | `LinkLost` | Remain in `SAFE_MODE` and record the link fault | CR-01, HR-03* | Proposed | Verify link loss cannot override the critical safety state. |
| `LINK_LOST` | `LinkRestored` only | Remain in `LINK_LOST` | HR-03* | Proposed | Confirm reconnection alone does not restart robot movement. |
| `LINK_LOST` | `LinkRestored` + `RecoveryAuthorised` + safety checks pass | Approved recovery state, normally `IDLE` | HR-03* | Proposed | Verify connection, command validity, and safety checks before resumption. |
| `SAFE_MODE` | Critical condition cleared + `RecoveryAuthorised` | Approved recovery state, normally `IDLE` | CR-01 | Proposed | Confirm the critical condition is cleared and recovery is authorised before operation resumes. |

\* Confirm the exact wording and timeout of HR-03 against the approved requirements baseline. Confirm FR-03 and FR-04 wording as well.

### Requirement and invariant references

- **FR-03:** Robot lifecycle/state behaviour: navigation, delivery, return, and idle on warehouse arrival. Confirm the exact wording against the approved Task 1 baseline.
- **FR-04:** Obstacle detection and handling while navigating.
- **CR-01:** Robot enters Safe Mode within 3 seconds when chamber/battery temperature exceeds the critical threshold or battery capacity falls below the emergency level.
- **HR-03:** Link-loss behaviour; confirm the approved timeout and wording.
- **INV-01 — No direct delivery from IDLE:** `IDLE` must never transition directly to `DELIVERING`.
- **INV-02 — No delivery during obstacle handling:** `AVOIDING_OBSTACLE` must never transition directly to `DELIVERING`.

## 4. Extend the model with Safe Mode and Link Lost

### Safe Mode

`SAFE_MODE` should be reachable from all operational states: `IDLE`, `NAVIGATING`, `AVOIDING_OBSTACLE`, `DELIVERING`, and `RETURNING`, when a CR-01 critical condition is detected.


### Link Lost

`LINK_LOST` should be reachable from all relevant operational states, including `IDLE`, `NAVIGATING`, `AVOIDING_OBSTACLE`, `DELIVERING`, and `RETURNING`, if loss of the remote link affects safe operation.


If the link is restored while the robot is in `LINK_LOST`, it should not automatically resume its previous action. The system must validate the connection and the safety of resuming first. If a CR-01 critical condition occurs while the link is lost, `SAFE_MODE` takes priority in this proposed model.

## 5. Verifier investigation: behavioural problems

### (a) Can `IDLE → DELIVERING` happen?

**No. This is an invalid transition.**

The scenario states that a delivery request starts navigation. The robot must reach its destination before delivering the package.

- **Requirement violated:** FR-03, the lifecycle/state-flow requirement.
- **Invariant violated:** INV-01.
- **Risk:** The robot could attempt package handover without travelling to the destination.
- **Test:** Inject `DestinationReached` while the robot is in `IDLE`. Expected result: the transition is rejected, delivery does not begin, and the invalid event is logged.

### (b) What if `AVOIDING_OBSTACLE` has no transition back?

The robot may remain stuck in `AVOIDING_OBSTACLE`. It cannot resume navigation and may never reach the destination.

This is a **missing-transition defect and a liveness problem**: the system may fail to make progress even after the obstacle has been cleared.

- **Requirement violated:** FR-04 (obstacle handling and resumption) and the intended lifecycle flow in FR-03.
- **Risk:** Delivery never completes, or the robot remains indefinitely in obstacle handling.
- **Test:** Trigger `ObstacleDetected`, then `ObstacleCleared`. Confirm the sequence:

  `NAVIGATING → AVOIDING_OBSTACLE → NAVIGATING`

The system should also define a timeout or escalation behaviour if the obstacle cannot be cleared.

### (c) Can `AVOIDING_OBSTACLE → DELIVERING` occur?

**No. This is an invalid and potentially unsafe transition.**

The robot must finish handling the obstacle, resume navigation, and then reach the destination before delivery begins.

- **Requirement violated:** FR-03 and FR-04.
- **Invariant violated:** INV-02.
- **Risk:** The robot could start package handover while still handling an obstacle.
- **Test:** Inject `DestinationReached` while the robot is in `AVOIDING_OBSTACLE`. Expected result: delivery remains inhibited and the invalid transition is rejected and logged.

### (d) What happens on `CriticalBattery` while in `AVOIDING_OBSTACLE` or `DELIVERING`?

If the transition table defines `CriticalBattery` only from `NAVIGATING`, then both states have **missing transitions**. The behaviour becomes unspecified at a time when the robot needs a safe response.

**Required correction:**

- Add `AVOIDING_OBSTACLE → SAFE_MODE` for `CriticalBattery`.
- Add `DELIVERING → SAFE_MODE` for `CriticalBattery`.
- Add equivalent critical-condition handling to every other operational state for completeness.
- Verify Safe Mode entry within 3 seconds, inhibition of normal delivery activity, and event logging.

The two situations require special care:

- **During obstacle handling:** The robot must not continue an unsafe manoeuvre just to resume its return trip. The local safe response must account for the obstacle.
- **During delivery:** The robot must not continue normal package handover despite the critical battery condition.

The original scenario's return-to-warehouse behaviour and CR-01's Safe Mode requirement must be reconciled through an approved recovery policy. Do not silently skip Safe Mode to return directly.

## 6. Additional defects a verifier should investigate

| Potential defect | Why it matters | Verification approach |
|---|---|---|
| An event has no transition in a state | The robot may deadlock or behave unpredictably. | Test events in every state and confirm each is handled or explicitly rejected. |
| Navigation resumes before the obstacle is confirmed clear | The robot could collide with the obstacle. | Keep the obstacle detected and verify navigation remains suspended. |
| `PackageDelivered` is missing or unconfirmed | The robot may return without delivery or repeat the handover. | Test missing and duplicate delivery confirmations. |
| `WarehouseReached` has no transition | The robot may never return to `IDLE`. | Verify warehouse arrival completes the lifecycle. |
| Link restoration automatically restarts movement | Stale commands or changed surroundings may create danger. | Restore the link in `LINK_LOST` and verify recovery checks are required. |
| Another event overrides Safe Mode | The robot might start delivery while a critical fault remains active. | Inject `DestinationReached` and `PackageDelivered` while in `SAFE_MODE`; verify neither bypasses the safety state. |
| Simultaneous events have no priority rule | A destination event could conflict with a critical battery event. | Trigger events together and verify safety events take priority. |

## 7. Final verification conclusions

1. `IDLE → DELIVERING` is invalid because the robot must navigate to the destination first.
2. Missing `AVOIDING_OBSTACLE → NAVIGATING` can trap the robot and prevent delivery.
3. `AVOIDING_OBSTACLE → DELIVERING` is invalid because delivery must not occur during obstacle handling.
4. `CriticalBattery` must be handled during obstacle handling and delivery, not only during navigation.
5. Safe Mode and Link Lost require explicit entry, priority, and recovery rules.
6. Every transition should be verified with test evidence, not simply assumed correct because it appears in a table.
