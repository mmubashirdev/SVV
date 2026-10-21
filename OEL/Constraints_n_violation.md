# Constraints, Formalisation & Violations railway

## 1. System Constraints

| Constraint ID | Constraint | Why Necessary |
|---|---|---|
| CON-01 | If a train is present or approaching, the barrier must not be open. | Prevents collisions. |
| CON-02 | The robot must not enter the crossing unless the barrier is open and no train is approaching. | Ensures safe crossing. |
| CON-03 | The barrier must remain closed while a train occupies the crossing. | Prevents train-robot collisions. |
| CON-04 | The barrier may open only when the crossing is confirmed clear. | Prevents premature opening. |
| CON-05 | If a train-detection sensor fails, the crossing must be treated as unsafe. | Prevents reliance on faulty readings. |
| CON-06 | If barrier operation fails, the robot must be prevented from entering the crossing. | Prevents entry when protection is unavailable. |
| CON-07 | If communication with ARLCCS is lost, the robot must not enter the crossing. | Prevents decisions based on unavailable safety information. |
| CON-08 | If train sensors give conflicting or invalid readings, the crossing must be treated as unsafe. | Prevents unsafe decisions from incorrect data. |
| CON-09 | When a crossing safety violation is detected, the system must raise an alarm and log the event. | Supports rapid response and investigation. |
| CON-10 | The robot must not enter `DELIVERING` while the chamber door is open. | Protects the medicine during delivery operations. |

## 2. Formalisation of Constraints

Let:

- `T` = Train present or approaching
- `B` = Barrier open
- `R` = Robot entering the crossing
- `C` = Crossing confirmed clear
- `S` = Train sensor failure
- `F` = Barrier failure
- `L` = Communication link lost
- `I` = Sensor readings invalid or conflicting
- `A` = Safety alarm raised
- `E` = Safety event logged
- `D` = Robot in `DELIVERING`
- `O` = Chamber door open

| Constraint ID | Logical Expression |
|---|---|
| CON-01 | `T → ¬B` |
| CON-02 | `R → (B ∧ ¬T)` |
| CON-03 | `T → ¬B` |
| CON-04 | `B → C` |
| CON-05 | `S → ¬R` |
| CON-06 | `F → ¬R` |
| CON-07 | `L → ¬R` |
| CON-08 | `I → ¬R` |
| CON-09 | `Violation → (A ∧ E)` |
| CON-10 | `D → ¬O` |

## 3. Violation Scenarios and Expected Responses

| Constraint ID | Violation Scenario (Variable Values) | Detection | Expected Response |
|---|---|---|---|
| CON-01 | `T = TRUE`, `B = TRUE` | Train sensor detects an approaching train while the barrier-open sensor reports open. | Close barrier if possible, raise alarm, stop robot, log event. |
| CON-02 | `R = TRUE`, `B = FALSE`, `T = FALSE` | Robot entry request occurs while the barrier is closed. | Reject entry, stop robot, log event. |
| CON-03 | `T = TRUE`, `B = TRUE` | Train detection conflicts with barrier status. | Command barrier closed, stop robot, raise alarm, log event. |
| CON-04 | `B = TRUE`, `C = FALSE` | Barrier-open status is detected before crossing clearance is confirmed. | Command barrier closed, raise alarm, log event. |
| CON-05 | `S = TRUE`, `R = TRUE` | Sensor diagnostic reports failure while the robot requests entry. | Block entry, keep crossing unsafe, alert operator, log event. |
| CON-06 | `F = TRUE`, `R = TRUE` | Barrier actuator or position feedback reports failure during an entry request. | Block entry, stop robot, raise alarm, log event. |
| CON-07 | `L = TRUE`, `R = TRUE` | Communication timeout occurs while the robot requests crossing entry. | Reject entry, stop before crossing, alert operator, log event. |
| CON-08 | `I = TRUE`, `R = TRUE` | Train sensors report conflicting or invalid values during an entry request. | Treat crossing as unsafe, reject entry, raise alarm, log event. |

## 4. Additional Robot–Chamber Constraint

For **CON-10**, the monitor checks whether the robot is in `DELIVERING` while the chamber door is open.

**Example violation:**

- `D = TRUE`
- `O = TRUE`

**Detection:** Compare the robot's operating state with the chamber door sensor.

**Expected response:** Suspend delivery, stop the relevant operation safely, alert the operator, and log the event.

## 5. Verification Note

Each constraint can be verified by monitoring its variables and checking whether its logical expression holds. When a safety sensor fails, readings conflict, or communication is lost, the system must default to preventing crossing entry until safety is confirmed.

