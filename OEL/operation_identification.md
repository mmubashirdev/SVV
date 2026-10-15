# Operation Identification

## 1. Identified Operations

| Operation ID | Operation Name | Purpose |
|---|---|---|
| OP-01 | `performPowerOnSelfCheck()` | Check essential sensors at startup. |
| OP-02 | `validateEssentialSensors()` | Verify that all essential sensors work. |
| OP-03 | `identifyMedicineBatch(batchId)` | Identify the medicine batch. |
| OP-04 | `loadConservationProfile(batchId)` | Load the required temperature and humidity limits. |
| OP-05 | `verifyDoorClosed()` | Confirm that the chamber door is closed. |
| OP-06 | `startConservation()` | Start conservation when all required conditions pass. |
| OP-07 | `readEnvironmentalSensors()` | Read temperature and humidity. |
| OP-08 | `correctTemperature()` | Correct temperature when it is out of range. |
| OP-09 | `correctHumidity()` | Correct humidity when it is out of range. |
| OP-10 | `verifyEnvironmentalRecovery()` | Verify through sensor readings that conditions are back in range. |
| OP-11 | `activateProtectionResponse()` | Activate protection when correction fails. |
| OP-12 | `reduceLightExposure()` | Reduce light exposure during protection. |

## 2. Operation Schemas

### OP-01: `performPowerOnSelfCheck()`

- **Description:** Check essential sensors and components at startup.
- **Inputs:** Startup signal, sensor status.
- **Outputs:** Self-check result.
- **Reads:** Sensor diagnostics, component status.
- **Changes:** Records startup-check status.
- **Sends/Alerts:** Startup fault alert if a check fails.
- **Assumes (precondition):** Chamber has powered on.
- **Result (postcondition):** Monitoring starts only if all essential sensors work; otherwise, monitoring remains disabled and the fault is reported.

### OP-03: `identifyMedicineBatch(batchId)`

- **Description:** Identify the medicine batch placed inside the chamber.
- **Inputs:** Batch identifier or identification data.
- **Outputs:** Batch identity and identification result.
- **Reads:** Batch identification input or registered batch record.
- **Changes:** Stores the active batch identity after successful identification.
- **Sends/Alerts:** Identification failure alert if the batch cannot be identified.
- **Assumes (precondition):** Batch has been placed inside and identification data is available.
- **Result (postcondition):** Active batch identity is stored only after successful identification.

### OP-04: `loadConservationProfile(batchId)`

- **Description:** Load required temperature and humidity limits for the batch.
- **Inputs:** Batch identifier.
- **Outputs:** Conservation profile.
- **Reads:** Registered batch profile.
- **Changes:** Stores acceptable temperature and humidity ranges.
- **Sends/Alerts:** Profile-loading failure alert if no valid profile exists.
- **Assumes (precondition):** Batch has been identified.
- **Result (postcondition):** Profile is marked loaded only when valid limits are available.

### OP-06: `startConservation()`

- **Description:** Begin active conservation.
- **Inputs:** Door status, profile status, sensor health, environmental readings.
- **Outputs:** Start result.
- **Reads:** Door sensor, profile status, sensor diagnostics, temperature and humidity readings.
- **Changes:** Activates conservation when all conditions pass.
- **Sends/Alerts:** Start-denied alert if any required condition fails.
- **Assumes (precondition):** Batch is identified, profile is loaded, door is closed, and essential sensors work.
- **Result (postcondition):** Conservation starts only when all preconditions are verified.

### OP-10: `verifyEnvironmentalRecovery()`

- **Description:** Verify that temperature and humidity have returned to their required ranges.
- **Inputs:** Sensor readings, loaded profile, recovery deadline.
- **Outputs:** Recovery pass/fail result.
- **Reads:** Temperature sensor, humidity sensor, profile limits, recovery timer.
- **Changes:** Records whether environmental recovery is verified.
- **Sends/Alerts:** Recovery-failure alert if values remain out of range after the recovery period.
- **Assumes (precondition):** A valid profile is loaded and a correction attempt has occurred.
- **Result (postcondition):** Recovery succeeds only when sensor readings confirm both values are within range. Otherwise, protection mode is activated after the recovery period expires.

### OP-11: `activateProtectionResponse()`

- **Description:** Activate protection when environmental correction fails.
- **Inputs:** Recovery-failure result.
- **Outputs:** Protection activation result.
- **Reads:** Recovery status, chamber operating mode.
- **Changes:** Activates protection mode and restricts normal operation.
- **Sends/Alerts:** Alerts the operator about the failure.
- **Assumes (precondition):** Temperature or humidity correction failed before the recovery deadline.
- **Result (postcondition):** Protection mode is active, normal operation is restricted, and the incident is reported.

## 3. Operations That Change Chamber State

The chamber states below are separate from the robot states defined in Task 3.

| Operation | Trigger | State Before | State After | Task 3 Connection |
|---|---|---|---|---|
| `startConservation()` | Profile loaded, door closed, sensors verified | `MONITORING` | `CONSERVING` | Guarded transition: move only when preconditions pass. |
| `handleDoorOpening()` | Door opens during conservation | `CONSERVING` | `CONSERVATION_SUSPENDED` | Similar to `NAVIGATING → AVOIDING_OBSTACLE`, where normal activity is suspended. |
| `activateProtectionResponse()` | Correction fails within recovery period | `CORRECTING_ENVIRONMENT` | `PROTECTION_MODE` | Similar to a safety transition into `SAFE_MODE`. |
| `handlePowerLoss()` | Main power is lost | Current chamber state | `EMERGENCY_POWER_OPERATION` or `SAFE_SHUTDOWN` | Fault-triggered transition takes priority over normal operation. |
| `verifySafeResumptionConditions()` | Door closed and checks completed | `CONSERVATION_SUSPENDED` | `CONSERVING` if checks pass | Similar to `AVOIDING_OBSTACLE → NAVIGATING`, which requires verification before resumption. |

## 4. Operations Requiring Sensor Verification

### 1. `verifyEnvironmentalRecovery()`

A correction command does not prove that temperature or humidity has returned to range. The system must read the sensors and compare actual values against the loaded profile. If the values remain out of range after the recovery period, protection mode must be activated.

### 2. `verifyVibrationStability()`

A command to reduce vibration does not prove that vibration is safe. Sensor readings must confirm that vibration remains below the threshold for the full stabilisation period before risky activities resume.

**Reason:** Commands request physical actions; sensor readings verify whether the required physical conditions have actually been achieved.
