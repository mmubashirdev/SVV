# Requirement Elicitation

## 1. Functional Requirements (FRs)

| Req. ID | Requirement | Type | Priority | Verification Method |
|---|---|---|---|---|
| FR-01 | Authenticate operators and verify role permissions before accepting commands. | FR | Critical | Security Test |
| FR-02 | Reject unauthorised, malformed, expired, or invalid-state commands. | FR | Critical | Negative Testing |
| FR-03 | Manage robot states: idle, navigating, obstacle avoidance, delivering, and returning. | FR | High | State Transition Test |
| FR-04 | Detect obstacles and stop or manoeuvre around them safely. | FR | Critical | Simulation Test |
| FR-05 | Monitor temperature, humidity, vibration, door status, and power for each batch. | FR | Critical | Sensor Integration Test |
| FR-06 | Activate heating or cooling correction when temperature exceeds permitted limits. | FR | Critical | Thermal Test |
| FR-07 | Alert Mission Control when temperature remains outside permitted limits after correction. | FR | High | Fault Injection Test |
| FR-08 | Transmit telemetry, command acknowledgements, and events to Mission Control. | FR | High | Integration Test |
| FR-09 | Record timestamped commands, operator IDs, state changes, alarms, and delivery outcomes. | FR | High | Audit Test |
| FR-10 | Obtain ARLCCS crossing permission before entering a railway crossing. | FR | Critical | Interface Test |

## 2. NFRs

| Req. ID | Requirement | Type | Priority | Verification Method |
|---|---|---|---|---|
| NFR-01 | Support at least 20 robots concurrently during the pilot. | NFR - Scalability | High | Load Test |
| NFR-02 | Display 95% of telemetry updates within 10 seconds under normal link conditions. | NFR - Performance | High | Performance Test |
| NFR-03 | Enforce authentication and authorisation for 100% of commands and encrypt data in transit. | NFR - Security | Critical | Security Test |
| NFR-04 | Achieve at least 99.5% monthly service availability, excluding planned maintenance. | NFR - Reliability | High | Availability Test |
| NFR-05 | Allow operators to identify robot state, active alarms, and last telemetry time within 3 interactions. | NFR - Usability | Medium | Usability Test |

## 3. High-Risk Requirements

| Req. ID | Requirement | Type | Priority | Verification Method |
|---|---|---|---|---|
| HR-01 | Enter Safe Mode within 2 seconds when battery charge reaches the critical threshold. | Safety | Critical | Battery Fault Injection |
| HR-02 | Enter Safe Mode within 2 seconds of a critical thermal limit or chamber-control fault. | Safety | Critical | Thermal Fault Injection |
| HR-03 | After 15 seconds of link loss, reject remote movement commands and execute the approved local safe-state procedure. | Safety | Critical | Link-Loss Test |
| HR-04 | Remain stopped before a railway crossing unless valid ARLCCS permission is received. | Safety | Critical | Interface Fault Injection |

