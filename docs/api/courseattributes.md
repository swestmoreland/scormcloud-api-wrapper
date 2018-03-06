# Course Attributes

| Property | Description | Values |
| :------- | :---------- | :----- |
| allowCompleteStatusChange | Allow a once-complete status to become incomplete again | true, false |
| alwaysFlowToFirstSco | Should the SCP always launch the first SCO when the course is launched regardless of sequencing rules. | true, false |
| applyRollupStatusToSuccess | Apply the rudimentary rollup status rules also to the success status | true, false |
| commCommitFrequency | How often to send commit runtime data updates (in milliseconds) | integer |
| commMaxFailedSubmissions | Maximum number of retries when updating runtime data before declaring failure | integer |
| courseStructureStartsOpen | If the course structure is displayed, should it default to being open or closed? | true, false |
| courseStructureWidth | If the course structure is displayed, how many pixels should be allocated for it? | integer |
| debugControl | What debug level should be recorded for the SCORM Engine control module? | audit, detailed, off |
| debugIncludeTimestamps | Record timestamps in the debug log | true, false |
| debugLookAhead | What debug level should be recorded for the SCORM Engine control module? | audit, detailed, off |
| debugRuntime | What debug level should be recorded for the SCORM Engine Runtime Data? | audit, detailed, off |
| debugSequencing | What debug level should be recorded for the SCORM Engine Sequencer? | audit, detailed, off |
| desiredFullScreen | If true, indicates that the SCO would like to be launched as a full screen window. | true, false |
| desiredHeight | If greater than 0, the number of horizontal pixels the SCOs in this package would like to have available during delivery. | integer |
| desiredWidth | If the course structure is displayed, how many pixels should be allocated for it? | integer |
| enableChoiceNavigation | Should the SCP allow the learner to navigate by selecting an item from the table of contents? | true, false |
| enablePrevNext | Should the SCP allow the user to navigate using previous and next commands? | true, false |
| finishCausesImmediateCommit | Will force the SCP to immediately persist data to the server when the SCO calls Finish/Terminate rather than waiting for the next periodic commit. Useful for SCOs that only save data on unload and require the player to be launched in a new window. | true, false |
| firstScoIsPretest | This parameter indicates that if the first SCO achieves a lesson status of passed, then the rest of the SCOs in the course will be marked complete. | true, false |
| ieCompatibilityMode | Renders an X-UA-Compatible Meta Tag in the deliver frameset, api wrapper frameset, and intermediate page which can distate the way content in child frames render for IE browsers. | |
| invalidMenuItemAction | Defines how to handle menu item links that won't succeed (show, hide or disable).  | integer repsenting Invalid Menu Item Action Values |
| launchCompletedRegsAsNoCredit | Once complete, relaunched registrations launch as no credit | true, false |
| logoutCausesPlayerExit | Should the SCP allow a cmi.exit request of logout to exit the entire player | true, false |
| logoutFinalNotSatAction | The navigation behavior the SCP should display when a SCO at the end of the course that has not been satisfied exits with an exit type of logout.  | integer representing exit action values |
| logoutFinalSatAction | The navigation behavior the SCP should display when a SCO at the end of the course that has been satisfied exits with an exit type of logout. | integer representing exit action values |
| logoutIntNotSatAction | The navigation behavior the SCP should display when a SCO that has not been satisfied in the middle of a course exits with an exit type of logout. | integer representing exit action values |
| logoutIntSatAction | The navigation behavior the SCP should display when a SCO that has been satisfied in the middle of a course exits with an exit type of logout | integer representing exit action values |
| lookaheadSequencerMode | Determines if or how lookahead sequencer is enabled client-side.  | integer repsenting sequencer modes |
| normalFinalNotSatAction | The navigation behavior the SCP should display when a SCO at the end of the course that has not been satisfied exits with an exit type of normal. | integer representing exit action values |
| normalFinalSatAction | The navigation behavior the SCP should display when a SCO at the end of the course that has been satisfied exits with an exit type of normal. | integer representing exit action values |
| normalIntNotSatAction | The navigation behavior the SCP should display when a SCO in the middle of a course that has not been satisfied exits with an exit type of normal. | integer representing exit action values |
| normalIntSatAction | The navigation behavior the SCP should display when a SCO that has been satisfied in the middle of a course exits with an exit type of normal. | integer representing exit action values |
| numberOfScoringObjects | If the Score Rollup Mode is Fixed Average, this parameter indicates how many SCOs should be reporting a score. | integer |
| playerLaunchType | How should the SCP player itself be launched (frameset or popup window)? | integer representing launch type values |
| preventRightClick | Should the SCP prevent users from right clicking in its navigation frames? | true, false |
| preventWindowResize | Should the SCP prevent users from resizing its window? | true, false |
| registrationInstancingOption | When should a registration be restarted? | never, incomplete, complete, failed, passed, always |
| requiredFullScreen | If true, then the SCOs in this package require that they occupy the entire screen during delivery. | true, false |
| requiredHeight | If greater than 0, the then SCOs in this package require this many pixels of screen width to play correctly. If this width is not available, the SCO may not be delivered correctly. | integer |
| requiredWidth | If greater than 0, the then SCOs in this package require this many pixels of screen height to play correctly. If this height is not available, the SCO may not be delivered correctly. | integer |
| resetRunTimeDataTiming | Should the SCP always persist runtime data when the exit type is suspend, or should this be left up to the sequencer?  | integer representing reset runtime data values |
| rollupEmptySetToUnknown |  | true, false |
| scaleRawScore | For SCORM 2004, if SCO sets a raw score but not a scaled score, determines if the raw score should count as the normative score for the SCO | true, false |
| scoLaunchType | How should the SCP launch individual SCOs (frameset or popup window)? | integer representing launch type values |
| scoreOverridesStatus | Should the score override the status? | true, false |
| scoreRollupMode | Determines how scores are rolled up to the course level. | integer representing score rollup mode values |
| scormVersion | Returns the version set for the current package. This value can be updated from one version of SCORM 2004 to another. This value cannot be modified for any other values. | scorm11, scorm12, scorm20042ndedition, scorm20043rdedition, scorm20044thedition, aicc, tincan |
| showCloseItem | Should the SCP show the Close Item button? | true, false |
| showCourseStructure | Should the SCP show the course tree structure during delivery? | true, false |
| showFinishButton | Should the SCP show the Return to LMS button? | true, false |
| showHelp | Should the SCP show the help button during delivery? | true, false |
| showNavBar | Should the SCP show the navigation bar containing the navigation buttons? | true, false |
| showProgressBar | Should the SCP show the progress bar during course delivery? | true, false |
| showTitleBar | Should the SCP show the title bar? | true, false |
| statusDisplay | How the SCP should graphically represent the current status of individual scorm objects during delivery. | integer represeting Status Display values |
| statusRollupMode | Determines how completion status is rolled up to the course level. | integer repsenting Status Rollup Mode Values |
| suspendDataMaxLength | Maximum length of suspend data to save | integer |
| suspendFinalNotSatAction | The navigation behavior the SCP should display when a SCO at the end of the course that has not been satisfied exits with an exit type of suspend. | integer representing exit action values |
| suspendFinalSatAction | The navigation behavior the SCP should display when a SCO at the end of the course that has been satisfied exits with an exit type of suspend. | integer representing exit action values |
| suspendIntNotSatAction | The navigation behavior the SCP should display when a SCO that has not been satisfied in the middle of a course exits with an exit type of suspend. | integer representing exit action values |
| suspendIntSatAction | The navigation behavior the SCP should display when a SCO that has been satisfied in the middle of a course exits with an exit type of suspend. | integer representing exit action values |
| thresholdScore | If the Status Rollup Mode is Complete When Threshold Score is Met, this parameter indicates what the threshold score for completion is. | decimal between 0-1. |
| timeLimit | Maximum length of time a user can spend taking a course | integer representing minutes |
| timeoutFinalNotSatAction | The navigation behavior the SCP should display when a SCO at the end of the course that has not been satisfied exits with an exit type of timeout. | integer representing exit action values |
| timeoutFinalSatAction | The navigation behavior the SCP should display when a SCO at the end of the course that has been satisfied exits with an exit type of timeout. | integer representing exit action values |
| timeoutIntNotSatAction | The navigation behavior the SCP should display when a SCO that has not been satisfied in the middle of a course exits with an exit type of timeout. | integer representing exit action values |
| timeoutIntSatAction | The navigation behavior the SCP should display when a SCO that has been satisfied in the middle of a course exits with an exit type of timeout. | integer representing exit action values |
| title | Title of the course. | String |
| validateInteractionResponses | Determines whether the format of SCORM responses are validated client-side | true, false |
| wrapScoWindowWithApi | Will put an API relay object in a frameset around a SCO that is launched in a new window. This is useful for SCOs that incorrectly use the ADL API Finder algorithm from spawned windows. | true, false |

#### Exit Action Values

| Name | Value | Summary |
| :--- | :---- | :------ |
| `UNDEFINED` | 0 | The value has not been specified. This NULL value corresponds to RusticiSoftware.ScormContentPlayer.Logic.NullConstants.UndefinedEnum. |
| `EXIT_COURSE` | 1 | Exit the entire course player |
| `EXIT_COURSE_AFTER_CONFIRM` | 2 | Exit the entire course player after asking the learner's permission |
| `GO_TO_NEXT_SCO` | 3 | Immediately go to the next SCO |
| `DISPLAY_MESSAGE` | 4 | Display a status message to the learner |
| `DO_NOTHING` | 5 | Do not take any action |

#### Invalid Menu Item Actions

| Name | Value | Summary |
| :--- | :---- | :------ |
| `UNDEFINED` | 0 | The value has not been specified. This NULL value corresponds to RusticiSoftware.ScormContentPlayer.Logic.NullConstants.UndefinedEnum. |
| `SHOW` | 1 | Show the menu item and have it fully enabled |
| `HIDE` | 2 | Hide the menu item completely |
| `DISABLE` | 3 | Show the menu item, but disable its link |

#### Launch Type Values

| Name | Value | Summary |
| :--- | :---- | :------ |
| `UNDEFINED` | 0 | The value has not been specified. This NULL value corresponds to RusticiSoftware.ScormContentPlayer.Logic.NullConstants.UndefinedEnum. |
| `FRAMESET` | 1 | Display the player or SCO in a child frameset. |
| `NEW_WINDOW` | 2 | Display the player or SCO in a popup window. |
| `NEW_WINDOW_AFTER_CLICK` | 3 | Display the player or SCO in a popup window after prompting the user to click a link to avoid popup blocker restrictions. |
| `NEW_WINDOW_WITHOUT_BROWSER_TOOLBAR` | 4 | Display the player or SCO in a popup window (without toolbar). |
| `NEW_WINDOW_AFTER_CLICK_WITHOUT_BROWSER_TOOLBAR` | 5 | Display the player or SCO in a popup window (without toolbar) after prompting the user to click a link to avoid popup blocker restrictions. |

#### Lookahead Sequencer Modes

| Name | Value | Summary |
| :--- | :---- | :------ |
| `UNKNOWN` | 0 | The value has not been specified. This NULL value corresponds to RusticiSoftware.ScormContentPlayer.Logic.NullConstants.UndefinedEnum. |
| `DISABLED` | 1 | Completely Disabled |
| `ENABLED` | 2 | Fully Enabled |
| `REALTIME` | 3 | Enabled, with real-time status updates |

#### Reset Runtime Values

| Name | Value | Summary |
| :--- | :---- | :------ |
| `UNDEFINED` | 0 | The value has not been specified. This NULL value corresponds to RusticiSoftware.ScormContentPlayer.Logic.NullConstants.UndefinedEnum. |
| `NEVER` | 1 | Never reset the runtime data |
| `WHEN_EXIT_IS_NOT_SUSPEND` | 2 | Use the RunTime data's exit flag to determine when to reset the data |
| `ON_EACH_NEW_SEQUENCING_ATTEMPT` | 3 | Reset the data whenever a new sequencing attempt begins |

#### Score Rollup Mode Values

| Name | Value | Summary |
| :--- | :---- | :------ |
| `UNDEFINED` | 0 | The value has not been specified. This NULL value corresponds to RusticiSoftware.ScormContentPlayer.Logic.NullConstants.UndefinedEnum. |
| `SCORE_PROVIDED_BY_COURSE` | 1 | For use with single SCO courses, uses whatever score is provided by the SCO. |
| `AVERAGE_SCORE_OF_ALL_UNITS` | 2 | Adds up all reported scores and divides by the number of SCOs in the course. |
| `AVERAGE_SCORE_OF_ALL_UNITS_WITH_SCORES` | 3 | Adds up all reported scores and divides by the number of SCOs that actually reported a score. |
| `FIXED_AVERAGE` | 4 | Adds up all reported scores and divides by a fixed number. |
| `AVERAGE_SCORE_OF_ALL_UNITS_WITH_NONZERO_SCORES` | 5 | Adds up all reported scores and divides by the number of SCOs that reported a score greater than zero. |
| `LAST_SCO_SCORE` | 6 | Use the score of the last SCO. |

#### Status Display Values

| Name | Value | Summary |
| :--- | :---- | :------ |
| `UNDEFINED` | 0 | The value has not been specified. This NULL value corresponds to RusticiSoftware.ScormContentPlayer.Logic.NullConstants.UndefinedEnum. |
| `SUCCESS_ONLY` | 1 | Only display an icon to represent the success status of the activity. |
| `COMPLETION_ONLY` | 2 | Only display an icon to represent the completion status of the activity. |
| `SEPARATE` | 3 | Display two icons, one to represent the completion status of the activity, another to represent the success status. |
| `COMBINED` | 4 | Display a single icon that represents both the success and completion status of an activity. |
| `NONE` | 5 | Do not display any status representation icons. |

#### Status Rollup Mode Values

| Name | Value | Summary |
| :--- | :---- | :------ |
| `UNDEFINED` | 0 | The value has not been specified. This NULL value corresponds to RusticiSoftware.ScormContentPlayer.Logic.NullConstants.UndefinedEnum. |
| `STATUS_PROVIDED_BY_COURSE` | 1 | For use with single SCO courses, just takes whatever status is reported by the course. |
| `COMPLETE_WHEN_ALL_UNITS_COMPLETE` | 2 | Marks the course complete whenever all of the SCOs are complete, even if the SCO is failed. |
| `COMPLETE_WHEN_ALL_UNITS_COMPLETE_AND_NOT_FAILED` | 3 | Marks the course complete whenever all of the SCOs are complete and not failed. |
| `COMPLETE_WHEN_THRESHOLD_SCORE_IS_MET` | 4 | Marks the course complete whenever a certain score has been obtained as calculated by the Score Rollup Method. |
| `COMPLETE_WHEN_ALL_UNITS_COMPLETE_AND_THRESHOLD_SCORE_IS_MET` | 5 | Marks the course complete whenever all of the SCOs are complete and not failed and a certain score has been obtained as calculated by the Score Rollup Method. |
| `COMPLETE_WHEN_ALL_UNITS_ARE_PASSED` | 6 | Marks the course complete whenever all of the SCOs are satisfied(passed). In 1.2, any SCO that is passed will also be complete (but not necessarily the other way around). |
