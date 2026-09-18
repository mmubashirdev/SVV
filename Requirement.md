# Mars Rover Mission Control

## Functional Requirements

### FR-1
The system shall receive movement commands from authenticated Mission Control operators.

### FR-2
The rover shall execute valid movement commands received from Mission Control.

### FR-3
The rover shall report its current position, battery level, temperature, and communication status to Mission Control.

### FR-4
The rover shall enter Safe Mode within 3 seconds when
battery temperature exceeds the critical threshold or
battery capacity falls below the defined emergency level.

### FR-5
The rover shall enter Safe Mode when a critical battery or thermal condition is detected.

### FR-6
Mission Control shall receive the execution status of each command sent to a rover.

## Non-Functional Requirements

### NFR-1
The system shall record all commands and critical rover events with a timestamp and operator ID.

### NFR-2


### NFR-3
The rover shall normally complete command processing within 5 seconds after receiving a valid command.

### NFR-4
The system shall support connect rovers
