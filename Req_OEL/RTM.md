# Task 2: Change Requests & Traceability Matrix (RTM)

## 1. Version-Controlled Change Log

**Baseline version:** 1.0\
**Updated version:** 1.1\
**Change status:** Modified

  -----------------------------------------------------------------------------------------------
  CR ID      Req. ID    Version    Status     Old Requirement   New Requirement   Reason
  ---------- ---------- ---------- ---------- ----------------- ----------------- ---------------
  CR-01      HR-01      1.1        Modified   The robot shall   The robot shall   Adds a
                                              enter Safe Mode   enter Safe Mode   measurable
                                              when a critical   within 3 seconds  response time
                                              battery or        when chamber or   limit and
                                              thermal condition battery           explicit
                                              is detected.      temperature       trigger
                                                                exceeds the       conditions.
                                                                critical          
                                                                threshold or      
                                                                battery capacity  
                                                                falls below the   
                                                                emergency level.  

  CR-02      NFR-01     1.1        Modified   The system shall  The system shall  Replaces vague
                                              support           support at least  "multiple" with
                                              communication     20 simultaneously a measurable
                                              with multiple     connected robots. minimum
                                              robots                              capacity.
                                              simultaneously.                     

  CR-03      FR-01      1.1        Modified   Only              The system shall  Adds role-based
                                              authenticated     require           authorisation
                                              operators shall   authenticated and and clarifies
                                              be permitted to   role-authorised   the check
                                              issue robot       operators before  occurs before
                                              commands.         accepting any     command
                                                                robot command.    acceptance.
  -----------------------------------------------------------------------------------------------

## 2. Why the New Wording Is More Testable

  ----------------------------------------------------------------------------
  CR ID             Limitation of     Improvement           Verification
                    Original                                
  ----------------- ----------------- --------------------- ------------------
  CR-01             No response       Defines a 3-second    Inject each
                    deadline;         deadline and specific trigger and
                    triggers are      temperature/battery   measure time to
                    broad.            triggers.             Safe Mode.

  CR-02             "Multiple" has no Defines at least 20   Connect 20 robots
                    minimum number.   concurrent            simultaneously.
                                      connections.          

  CR-03             Authentication    Requires              Test
                    does not confirm  authentication and    unauthenticated,
                    command           role authorisation    unauthorised, and
                    permission.       before acceptance.    permitted
                                                            operators.
  ----------------------------------------------------------------------------

## 3. Traceability ID Register

  -----------------------------------------------------------------------
  ID Type                 ID                      Description
  ----------------------- ----------------------- -----------------------
  State                   ST-01                   Idle

  State                   ST-02                   Navigating

  State                   ST-03                   Obstacle avoidance

  State                   ST-04                   Delivering

  State                   ST-05                   Returning to warehouse

  State                   ST-06                   Safe Mode

  Transition              TR-01                   Idle → Navigating after
                                                  a valid command

  Transition              TR-02                   Active state → Safe
                                                  Mode after critical
                                                  battery/thermal trigger

  Transition              TR-03                   Navigating → Obstacle
                                                  avoidance after
                                                  obstacle detection

  Transition              TR-04                   Navigating → Delivering
                                                  at the clinic

  Transition              TR-05                   Delivering → Returning
                                                  after delivery
                                                  completion

  Operation               OP-01                   Authenticate operator

  Operation               OP-02                   Check role permissions

  Operation               OP-03                   Validate and accept
                                                  command

  Operation               OP-04                   Execute robot action

  Operation               OP-05                   Report robot status

  Operation               OP-06                   Write timestamped event
                                                  log

  Operation               OP-07                   Monitor battery and
                                                  chamber temperature

  Operation               OP-08                   Manage concurrent robot
                                                  connections

  -----------------------------------------------------------------------

## 4. Multi-Layer Requirements Traceability Matrix

  ---------------------------------------------------------------------------
  Requirement   State /      Operation   Constraint   Test Case   Risk Level
                Transition                                        
  ------------- ------------ ----------- ------------ ----------- -----------
  FR-01 v1.1    State        OP-01,      CON-03       TC-01,      High
                unchanged if OP-02,                   TC-02,      
                access check OP-03                    TC-03       
                fails                                             

  FR-02         State        OP-03,      CON-04       TC-04       High
                unchanged    OP-06                                
                for invalid                                       
                command                                           

  FR-08         Status       OP-05       CON-05       TC-05       Medium
                reported                                          
                after                                             
                command                                           
                outcome                                           

  FR-09         Event logged OP-06       CON-05       TC-06       High
                after                                             
                command                                           
                outcome                                           

  HR-01 v1.1    TR-02:       OP-07,      CON-01       TC-07,      Critical
                active state OP-05,                   TC-08       
                → ST-06 Safe OP-06                                
                Mode                                              

  NFR-01 v1.1   Robots       OP-08,      CON-02       TC-09       High
                remain       OP-05                                
                connected in                                      
                current                                           
                states                                            

  FR-03         ST-01 →      OP-03,      Valid        TC-05       High
                ST-02 via    OP-04,      command                  
                TR-01        OP-05       required                 

  FR-04         ST-02 →      OP-04,      Stop or      TC-10       Critical
                ST-03 via    OP-05,      avoid                    
                TR-03        OP-06       obstacle                 
                                         safely                   
  ---------------------------------------------------------------------------

## 5. Test Cases

  -------------------------------------------------------------------------------
  Test Case ID   Scenario / Steps    Expected       Related        Risk Level
                                     Result         Requirement    
  -------------- ------------------- -------------- -------------- --------------
  TC-01          Submit a command    Reject         FR-01 v1.1     High
                 without logging in. command; no                   
                                     action; log                   
                                     rejection.                    

  TC-02          Authenticated       Reject before  FR-01 v1.1     High
                 operator without    acceptance; no                
                 permission submits  action; log                   
                 a command.          rejection.                    

  TC-03          Permitted operator  Accept command FR-01 v1.1     High
                 submits a valid     and pass it to                
                 command.            execution.                    

  TC-04          Submit malformed,   Reject         FR-02          High
                 expired, or         command;                      
                 invalid-state       preserve safe                 
                 command.            state; log                    
                                     rejection.                    

  TC-05          Submit valid        Robot changes  FR-03, FR-08   High
                 navigation command  Idle →                        
                 and observe         Navigating;                   
                 execution/status.   Mission                       
                                     Control                       
                                     receives                      
                                     status.                       

  TC-06          Complete a command  Log contains   FR-09          High
                 and inspect the     timestamp,                    
                 event log.          operator                      
                                     identity,                     
                                     command,                      
                                     outcome, and                  
                                     state change.                 

  TC-07          Inject critical     Safe Mode      HR-01 v1.1     Critical
                 chamber temperature within 3                      
                 while navigating.   seconds; alarm                
                                     and state                     
                                     update                        
                                     reported and                  
                                     logged.                       

  TC-08          Reduce battery      Safe Mode      HR-01 v1.1     Critical
                 capacity below      within 3                      
                 emergency level     seconds;                      
                 while robot is      normal                        
                 active.             movement                      
                                     commands                      
                                     inhibited;                    
                                     event logged.                 

  TC-09          Connect 20 robots   All 20 remain  NFR-01 v1.1    High
                 concurrently and    connected;                    
                 exchange telemetry  telemetry is                  
                 with each.          handled                       
                                     without                       
                                     capacity                      
                                     failure.                      

  TC-10          Place an obstacle   Robot detects  FR-04          Critical
                 on the planned      it, stops or                  
                 route.              manoeuvres                    
                                     safely, and                   
                                     reports/logs                  
                                     the event.                    
  -------------------------------------------------------------------------------

## 6. Regression Tests Required for Each Change Request

  ------------------------------------------------------------------------
  Change Request          Tests to Re-run         Reason
  ----------------------- ----------------------- ------------------------
  CR-01                   TC-07, TC-08, TC-04,    Verify both triggers,
                          TC-05, TC-06            3-second deadline,
                                                  command inhibition,
                                                  status reporting, and
                                                  logging.

  CR-02                   TC-09, TC-05, TC-06     Verify 20 concurrent
                                                  connections and
                                                  command/status/logging
                                                  behaviour under load.

  CR-03                   TC-01, TC-02, TC-03,    Verify authentication,
                          TC-04, TC-06            role permissions,
                                                  invalid-command
                                                  rejection, and audit
                                                  records.
  ------------------------------------------------------------------------

## 7. Scenario-Step Traceability

  Scenario Step             Operation   Test Case
  ------------------------- ----------- ------------------------------------------
  Command received          OP-03       TC-03, TC-04
  Operator authenticated    OP-01       TC-01, TC-03
  Role permission checked   OP-02       TC-02, TC-03
  Command executed          OP-04       TC-05
  Status reported           OP-05       TC-05, TC-07, TC-08
  Event logged              OP-06       TC-01, TC-02, TC-04, TC-06, TC-07, TC-08

