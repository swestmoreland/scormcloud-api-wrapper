# Course Service

#### .getCoursePreviewUrl(courseid, [versionid]) {#getCoursePreviewUrl}

Get the preview url for the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `versionid` - The version of the package which will be used. If omitted, use the most recent version.

```js
let previewUrl = api.getCoursePreviewUrl('810348d9-318e-48d5-b352-a1f6eb3a92cd');
```

#### .courseExists(courseid, callback) {#courseExists}

Check whether or not the specified course exists.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `callback`

```js
api.courseExists('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result);
  /* true */
});
```

#### .deleteCourse(courseid, [options], callback) {#deleteCourse}

Delete the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `email` - If this parameter is included, user information will be attached to this event in the event history on the SCORM Cloud website.

```js
api.deleteCourse('bd16aa80-f042-44b2-94a8-dd18a5484740', function (error, result) {
  console.log(result);
  /* true */
});
```

#### .getCourseAttributes(courseid, callback) {#getCourseAttributes}

Get attributes for the specified course. See [SCORM Cloud Course Attributes](lib/attributes.md).

Parameters:

 * `courseid` - The unique identifier for the course.
 * `callback`

```js
api.getCourseAttributes('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result);
  /*
  {
    allowCompleteStatusChange: false,
    alwaysFlowToFirstSco: true,
    applyRollupStatusToSuccess: false,
    commCommitFrequency: 10000,
    commMaxFailedSubmissions: 2,
    completionStatOfFailedSuccessStat: 'unknown',
    courseStructureStartsOpen: false,
    courseStructureWidth: 0,
    debugControl: 'off',
    debugIncludeTimestamps: true,
    debugLookAhead: 'audit',
    debugRuntime: 'detailed',
    debugSequencing: 'detailed',
    desiredFullScreen: false,
    desiredHeight: 600,
    desiredWidth: 960,
    enableChoiceNavigation: false,
    enablePrevNext: false,
    finishCausesImmediateCommit: true,
    firstScoIsPretest: false,
    ieCompatibilityMode: 'none',
    invalidMenuItemAction: 3,
    launchCompletedRegsAsNoCredit: true,
    logoutCausesPlayerExit: true,
    logoutFinalNotSatAction: 1,
    logoutFinalSatAction: 1,
    logoutIntNotSatAction: 2,
    logoutIntSatAction: 2,
    lookaheadSequencerMode: 3,
    normalFinalNotSatAction: 1,
    normalFinalSatAction: 1,
    normalIntNotSatAction: 4,
    normalIntSatAction: 3,
    numberOfScoringObjects: 0,
    playerLaunchType: 1,
    preventRightClick: false,
    preventWindowResize: false,
    registrationInstancingOption: 'never',
    requiredFullScreen: false,
    requiredHeight: 0,
    requiredWidth: 0,
    resetRunTimeDataTiming: 1,
    returnToLmsAction: 'legacy',
    rollupEmptySetToUnknown: false,
    rsopSynchMode: 2,
    scaleRawScore: false,
    scoLaunchType: 2,
    scoreOverridesStatus: false,
    scoreRollupMode: 3,
    scormVersion: 'scorm_12',
    showCloseItem: false,
    showCourseStructure: false,
    showFinishButton: false,
    showHelp: false,
    showNavBar: false,
    showProgressBar: false,
    showTitleBar: false,
    statusDisplay: 4,
    statusRollupMode: 3,
    suspendDataMaxLength: 4096,
    suspendFinalNotSatAction: 1,
    suspendFinalSatAction: 1,
    suspendIntNotSatAction: 4,
    suspendIntSatAction: 4,
    thresholdScore: 0,
    timeLimit: 0,
    timeoutFinalNotSatAction: 1,
    timeoutFinalSatAction: 1,
    timeoutIntNotSatAction: 4,
    timeoutIntSatAction: 4,
    title: 'Example Course',
    validateInteractionResponses: true,
    wrapScoWindowWithApi: false
  }
  */
});
```

#### .setCourseAttributes(courseid, attributes, callback) {#setCourseAttributes}

Set attributes for the specified course. See [SCORM Cloud Course Attributes](lib/attributes.md).

Parameters:

 * `courseid` - The unique identifier for the course.
 * `attributes` - Object with course attributes.
 * `callback`

```js
api.setCourseAttributes('810348d9-318e-48d5-b352-a1f6eb3a92cd', { "desiredWidth": 1024, "desiredHeight": 768 }, function (error, result) {
  console.log(result);
  /*
  {
    desiredHeight: 768,
    desiredWidth: 1024
  }
  */
});
```

#### .getCourseList([options], callback) {#getCourseList}

Retrieve a list of courses associated with the `appid`.

Parameters:

 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `filter` - A regular expression that will be used to filter the list of courses. Specifically only those courses whose courseid’s match the given expression will be returned in the list.
 * `tags` - A comma separated list of tags to filter results by. Results will include only courses which are tagged with every tag in the list.

```js
api.getCourseList(function (error, result) {
  console.log(result);
  /*
  [
    {
      id: '810348d9-318e-48d5-b352-a1f6eb3a92cd',
      title: 'Example Course',
      registrations: 1,
      size: 3023399,
      tags: ['example', 'course'],
      learningStandard: 'scorm_12',
      createDate: '2017-11-10T16:30:00.000+0000'
    },
    ...
  ]
  */
});
```

```js
api.getCourseList({ "tags": "golf" }, function (error, result) {
  console.log(result);
  /*
  [
    {
      id: 'ContentPackagingSingleSCO_SCORM1234f80555-c4ae-45d3-8099-1910f91f1fc9',
      title: 'Golf Explained - CP Single SCO',
      registrations: 0,
      size: 452996,
      tags: [ 'golf' ],
      learningStandard: 'scorm_12',
      createDate: '2017-11-13T02:43:27.000+0000'
    },
    {
      id: 'RuntimeBasicCalls_SCORM12e9bd020e-a513-49e1-bd46-15c6989c8173',
      title: 'Golf Explained - Run-time Basic Calls',
      registrations: 0,
      size: 469563,
      tags: [ 'golf' ],
      learningStandard: 'scorm_12',
      createDate: '2017-11-13T02:43:56.000+0000'
    }
  ]
  */
});
```

#### .getCourseDetail(courseid, callback) {#getCourseDetail}

Retrieve details about the specified course. Includes version information; see [Course Versioning and Overwriting](https://cloud.scorm.com/docs/advanced/versioning.html).

Parameters:

 * `courseid` - The unique identifier for the course.
 * `callback`

```js
api.getCourseDetail('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result);
  /*
    {
      id: '810348d9-318e-48d5-b352-a1f6eb3a92cd',
      title: 'Example Course',
      versions: [
        { versionId: '0', updateDate: '2017-11-10T16:30:00.000+0000' },
        { versionId: '1', updateDate: '2017-11-13T08:15:00.000+0000' }
      ],
      registrations: 1,
      size: 3023399,
      tags: ['example', 'course'],
      learningStandard: 'scorm_12',
      createDate: '2017-11-10T16:30:00.000+0000'
    }
  */
});
```

#### .importCourse(courseid, path, callback) {#importCourse}

Import a course. If the import is successful, the imported course will be registered using the courseid provided. If the courseid refers to an existing course, a new version of the course will be created; see [Course Versioning and Overwriting](https://cloud.scorm.com/docs/advanced/versioning.html).

Parameters:

 * `courseid` - The unique identifier for the course.
 * `path` - The path for the course to be imported.
 * `callback`

```js
api.importCourse('c2cbb917-c5b2-4b43-a9c3-5b7561e519b9', 'Archive.zip', function (error, result) {
  console.log(result);
  /*
    {
      status: 'finished',
      message: 'Finished',
      importresult: [
        { successful: 'true', title: 'Personal Protective Equipment Knowledge Assessment', message: 'Import Successful' }
      ]
    }
  */
});
```