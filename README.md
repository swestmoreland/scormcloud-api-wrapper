<p align="center">
  <a href="https://stevenwestmoreland.com/projects/scormcloud-api-wrapper.html">
    <img src="https://stevenwestmoreland.com/img/scormcloud.png" width="250">
  </a>
</p>

<h3 align="center">scormcloud-api-wrapper</h3>

<p align="center">
  Node.js client for the <a href="https://cloud.scorm.com/docs/index.html">SCORM Cloud API</a>.
  <br>
  <a href="https://stevenwestmoreland.com/2017/11/nodejs-client-for-scormcloud-api.html"><strong>Getting Started</strong></a> / <a href="https://stevenwestmoreland.com/projects/scormcloud-api-wrapper.html#api"><strong>API Documentation</strong></a>
</p>

<p align="center">
  <a href="https://badge.fury.io/js/scormcloud-api-wrapper">
    <img src="https://badge.fury.io/js/scormcloud-api-wrapper.svg" alt="npm version badge">
  </a>
</p>

## Installation

To install via npm:

```sh
npm install scormcloud-api-wrapper --save
```

## Usage

Construct an instance of the API client with your Application ID and secret key.

```js
// Import the module.
var SCORMCloud = require('scormcloud-api-wrapper');

// Create an instance with your API credentials.
var api = new SCORMCloud('appid', 'secretKey');
```

Use the [`authPing`](https://stevenwestmoreland.com/projects/scormcloud-api-wrapper.html#authPing) method to verify that your credentials are valid and that the web service is reachable.

```js
// Verify credentials are valid and service is reachable.
api.authPing(function (error, result) {
  if (error) throw error; console.log(result);
  /* true */
});
```

Asynchronous functions use [error-first callbacks](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/). The first argument is reserved for an error object, and the second for response data.

```js
// Retrieve a list of courses associated with the appid.
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

For more information, see [Getting started with the Node.js client for the SCORM Cloud API](https://stevenwestmoreland.com/2017/11/nodejs-client-for-scormcloud-api.html).

## API

### Debug Service

<h4 id="#authPing">.authPing(callback)</h4>

Verifies that your credentials are valid and that the web service is reachable.

Parameters:

 * `callback`

```js
api.authPing(function (error, result) {
  console.log(result);
  /* true */
});
```

### Course Service

<h4 id="#getCoursePreviewUrl">.getCoursePreviewUrl(courseid, [versionid, [redirectUrl]])</h4>

Get the preview url for the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `versionid` - The version of the package which will be used. If omitted, use the most recent version.
 * `redirecturl` - The redirect url for when the client exits course preview. The following keywords are available:
    * “closer” - Redirect to a page that automatically tries to close the browser window.
    * “blank” - Redirect to a blank page.
    * “message” - Redirect to a page with a simple message about the course being complete.

```js
let previewUrl = api.getCoursePreviewUrl('810348d9-318e-48d5-b352-a1f6eb3a92cd');
```

<h4 id="#courseExists">.courseExists(courseid, callback)</h4>

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

<h4 id="#deleteCourse">.deleteCourse(courseid, [options], callback)</h4>

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

<h4 id="#getCourseAttributes">.getCourseAttributes(courseid, callback)</h4>

Get attributes for the specified course. See [Course Attributes](http://scorm.com/wp-content/assets/cloud_docs/scorm_cloud_api_properties.xlsx).

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

<h4 id="#setCourseAttributes">.setCourseAttributes(courseid, attributes, callback)</h4>

Set attributes for the specified course. See [Course Attributes](http://scorm.com/wp-content/assets/cloud_docs/scorm_cloud_api_properties.xlsx).

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

<h4 id="#getCourseList">.getCourseList([options], callback)</h4>

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

<h4 id="#getCourseDetail">.getCourseDetail(courseid, callback)</h4>

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

<h4 id="#importCourse">.importCourse(courseid, path, callback)</h4>

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

### Registration Service

<h4 id="#createRegistration">.createRegistration(courseid, regid, fname, lname, learnerid, [options], callback)</h4>

Create a new registration.

Parameters:

 * `courseid` - The course for which this registration is being created.
 * `regid` - The id used to identify this registration (must be unique).
 * `fname` - The first name of the learner associated with this registration.
 * `lname` - The first name of the learner associated with this registration.
 * `learnerid` - The learner id associated with this registration.
 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `email` - If the email parameter is included, this registration will be attached to a SCORM Cloud website user (an “empty” user will be created if none with this email exists).
 * `postbackurl` - Specifies a URL for which to post activity and status data in real time as the course is completed. See [Registration Postbacks](https://cloud.scorm.com/docs/advanced/postback.html).
 * `authtype` - Optional parameter to specify how to authorize against the given postbackurl, can be “form” or “httpbasic”.
 * `urlname` - You can optionally specify a login name to be used for credentials when posting to the URL specified in postbackurl.
 * `urlpass` - If credentials for the postbackurl are provided, this must be included, it is the password to be used in authorizing the postback of data to the URL specified by postbackurl.
 * `resultsformat` - This parameter allows you to specify a level of detail in the information that is posted back while the course is being taken. It may be one of three values: “course” (course summary), “activity” (activity summary, or “full” (full detail), and is set to “course” by default.

```js
api.createRegistration(
  '810348d9-318e-48d5-b352-a1f6eb3a92cd',
  '09e6c1c5-1f20-4df0-b9a5-145364d0003b',
  'John',
  'Doe',
  'john.doe@example.com',
  {
    email: 'john.doe@example.com'
  },
  function (error, result) {
    console.log(result);
    /* true */
  }
);
```

<h4 id="#registrationExists">.registrationExists(regid, callback)</h4>

Check whether or not the specified registration exists.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

```js
api.registrationExists('09e6c1c5-1f20-4df0-b9a5-145364d0003b', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#deleteRegistration">.deleteRegistration(regid, callback)</h4>

Delete the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

```js
api.deleteRegistration('09e6c1c5-1f20-4df0-b9a5-145364d0003b', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#resetRegistration">.resetRegistration(regid, callback)</h4>

Reset the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

```js
api.resetRegistration('09e6c1c5-1f20-4df0-b9a5-145364d0003b', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#getRegistrationList">.getRegistrationList([options], callback)</h4>

Retrieve a list of registrations associated with the `appid`.

Parameters:

 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `courseid` - Limit search to only registrations for the course specified by this courseid.
 * `learnerid` - Limit search to only registrations for the learner specified by this learnerid.
 * `after` - Return registrations updated (strictly) after this timestamp.
 * `until` - Return registrations updated up to and including this timestamp.

```js
api.getRegistrationList(function (error, result) {
  console.log(result);
  /*
  [
    {
      id: '2ffab123-cb7c-4744-af8e-493a6c74e65b',
      courseId: '810348d9-318e-48d5-b352-a1f6eb3a92cd',
      courseTitle: 'Example Course',
      lastCourseVersionLaunched: '0',
      learnerId: 'jane.doe@example.com',
      learnerFirstName: 'Jane',
      learnerLastName: 'Doe',
      email: 'jane.doe@example.com',
      createDate: '2017-11-09T20:00:00.000+0000',
      firstAccessDate: '2017-11-10T21:40:00.000+0000',
      lastAccessDate: '2017-11-10T21:44:47.000+0000',
      completedDate: '2017-11-10T21:44:47.000+0000'
    },
    ...
  ]
  */
});
```

<h4 id="#getRegistrationDetail">.getRegistrationDetail(regid, callback)</h4>

Retrieve details about the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

```js
api.getRegistrationDetail('2ffab123-cb7c-4744-af8e-493a6c74e65b', function (error, result) {
  console.log(result);
  /*
  {
    id: '2ffab123-cb7c-4744-af8e-493a6c74e65b',
    courseId: '810348d9-318e-48d5-b352-a1f6eb3a92cd',
    courseTitle: 'Example Course',
    lastCourseVersionLaunched: '0',
    learnerId: 'jane.doe@example.com',
    learnerFirstName: 'Jane',
    learnerLastName: 'Doe',
    email: 'jane.doe@example.com',
    createDate: '2017-11-09T20:00:00.000+0000',
    firstAccessDate: '2017-11-10T21:40:00.000+0000',
    lastAccessDate: '2017-11-10T21:44:47.000+0000',
    completedDate: '2017-11-10T21:44:47.000+0000',
    tinCanRegistrationId: '6fdbf7f4-e17e-4396-98b1-8d5949540994',
    instances: [
      { instanceId: '0', courseVersion: '0', updateDate: '2017-11-10T21:44:47.000+0000' }
    ]
  }
  */
});
```

<h4 id="#getRegistrationResult">.getRegistrationResult(regid, [options], callback)</h4>

Retrieve details about the results of the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

```js
api.getRegistrationResult('2ffab123-cb7c-4744-af8e-493a6c74e65b', function (error, result) {
  console.log(result);
  /*
  {
    format: 'course',
    regid: '2ffab123-cb7c-4744-af8e-493a6c74e65b',
    instanceid: '0',
    complete: 'complete',
    success: 'passed',
    totaltime: '30',
    score: 'unknown'
  }
  */
});
```

<h4 id="#getRegistrationListResults">.getRegistrationListResults([options], callback)</h4>

Combination of `getRegistrationList` and `getRegistrationResult` methods; can be used for basic reporting functionality.

Parameters:

 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `courseid` - Limit search to only registrations for the course specified by this courseid.
 * `learnerid` - Limit search to only registrations for the learner specified by this learnerid.
 * `after` - Return registrations updated (strictly) after this timestamp.
 * `until` - Return registrations updated up to and including this timestamp.

```js
api.getRegistrationListResults(function (error, result) {
  console.log(result);
  /*
  [
    {
      id: '2ffab123-cb7c-4744-af8e-493a6c74e65b',
      courseId: '810348d9-318e-48d5-b352-a1f6eb3a92cd',
      courseTitle: 'Example Course',
      lastCourseVersionLaunched: '0',
      learnerId: 'jane.doe@example.com',
      learnerFirstName: 'Jane',
      learnerLastName: 'Doe',
      email: 'jane.doe@example.com',
      createDate: '2017-11-09T20:00:00.000+0000',
      firstAccessDate: '2017-11-10T21:40:00.000+0000',
      lastAccessDate: '2017-11-10T21:44:47.000+0000',
      completedDate: '2017-11-10T21:44:47.000+0000',
      registrationreport: {
        format: 'course',
        regid: '2ffab123-cb7c-4744-af8e-493a6c74e65b',
        instanceid: '0',
        complete: 'complete',
        success: 'passed',
        totaltime: '30',
        score: 'unknown'
      }
    },
    ...
  ]
  */
});
```

<h4 id="#getLaunchUrl">.getLaunchUrl(regid, redirecturl, [options])</h4>

Get the launch url for the specified registration

Parameters:

 * `regid` - The unique identifier for the registration.
 * `redirecturl` - The redirect url for when the registration has been completed. The following keywords are available:
   * “closer” - Redirect to a page that automatically tries to close the browser window.
   * “blank” - Redirect to a blank page.
   * “message” - Redirect to a page with a simple message about the course being complete.
 * `options` - Object with optional parameters; see options below.

Options:

 * `cssurl` - An absolute URL to a custom stylesheet that will be used to style the navigational menus and header of the SCORM “player” that displays the course content.
 * `learnerTags` - Comma-delimited list of tags to associate with the learner who is launching the course.
 * `courseTags` - Comma-delimited list of tags to associate with the launched course.
 * `registrationTags` - Comma-delimited list of tags to associate the the launched registration.
 * `disableTracking` - If set to “true”, the registration will be launched with tracking disabled, and the launch will not result in any changes to the registration.

```js
let launchUrl = api.getLaunchUrl('2819b19c-bbe6-4d27-b3c0-70c80a56dc66', 'blank');
```

<h4 id="#getLaunchHistory">.getLaunchHistory(regid, callback)</h4>

Retrieve historical list of launches for the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

```js
api.getLaunchHistory('2ffab123-cb7c-4744-af8e-493a6c74e65b', function (error, result) {
  console.log(result);
  /*
  [
    {
      id: '66461586',
      completion: 'complete',
      satisfaction: 'passed',
      measure_status: '0',
      normalized_measure: '0.0',
      experienced_duration_tracked: '1630',
      launch_time: '2017-11-13T19:10:56.000+0000',
      exit_time: '2017-11-13T19:11:05.000+0000',
      update_dt: '2017-11-13T19:11:05.000+0000'
    },
    ...
  ]
  */
});
```

<h4 id="#getLaunchInfo">.getLaunchInfo(launchid, callback)</h4>

Retrieve historical data for the specified launch.

Parameters:

 * `launchid` - The unique identifier for the launch.
 * `callback`

```js
api.getLaunchInfo('66461586', function (error, result) {
  console.log(result);
  /*
  {
    id: '66461586',
    completion: 'complete',
    satisfaction: 'passed',
    measure_status: '0',
    normalized_measure: '0.0',
    experienced_duration_tracked: '1630',
    launch_time: '2017-11-13T19:10:56.000+0000',
    exit_time: '2017-11-13T19:11:05.000+0000',
    update_dt: '2017-11-13T19:11:05.000+0000',
    log: {
      browser: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
      trackingEnabled: true,
      version: '2017.1.12.348',
      events: [
        {
          attemptNo: '1',
          event: 'AttemptStart',
          id: '1',
          itemIdentifier: 'Example_Course_SCO',
          timestamp: '13:10:28.829',
          title: 'Test Course'
        },
        ...
      ]
    }
  }
  */
});
```

<h4 id="#resetGlobalObjectives">.resetGlobalObjectives(regid, callback)</h4>

Reset all global objectives associated with this registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

```js
api.resetGlobalObjectives('0247b487-c3ab-4404-9103-70373ac11ef3', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#updateLearnerInfo">.updateLearnerInfo(learnerid, fname, lname, [options], callback)</h4>

Update learner information that was given during previous `createRegistration` calls.

Parameters:

 * `learnerid` -  The id of the learner whose information is being updated.
 * `fname` - The first name of the learner.
 * `lname` - The last name of the learner.
 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `newid` - The new id to assign to this learner.
 * `email` - The email of the learner.

<h4 id="#getPostbackInfo">.getPostbackInfo(regid, callback)</h4>

This method provides a way to retrieve the postback attributes that were set with `createRegistration` or `updatePostbackInfo` calls. See [Registration Postbacks](https://cloud.scorm.com/docs/advanced/postback.html).

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

<h4 id="#updatePostbackInfo">.updatePostbackInfo(regid, postbackUrl, options, callback)</h4>

This method provides a way to update the postback settings for a registration created with the `createRegistration` call. If you wish to change an authenticated postback to an unauthenticated postback, call this method with only a url specified.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `postbackUrl` - URL for registation results to be posted to.
 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `authtype` - Optional parameter to specify how to authorize against the given postbackurl, can be “form” or “httpbasic”.
 * `urlname` - You can optionally specify a login name to be used for credentials when posting to the URL specified in postbackurl.
 * `urlpass` - If credentials for the postbackurl are provided, this must be included, it is the password to be used in authorizing the postback of data to the URL specified by postbackurl.
 * `resultsformat` - This parameter allows you to specify a level of detail in the information that is posted back while the course is being taken. It may be one of three values: “course” (course summary), “activity” (activity summary, or “full” (full detail), and is set to “course” by default.

<h4 id="#deletePostbackInfo">.deletePostbackInfo(regid, callback)</h4>

Clear postback settings so that registration results no longer invoke a postback url.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

<h4 id="#testRegistrationPostbackUrl">.testRegistrationPostbackUrl(postbackUrl, options, callback)</h4>

This method provides a way to test a URL for posting registration results back to, as they would be posted when using the postbackurl in the createRegistration call. When called, an example registration result will be posted to the URL given, or else an error will be reported regarding why the post failed.

Parameters:

 * `postbackUrl` - URL for registation results to be posted to.
 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `authtype` - Optional parameter to specify how to authorize against the given postbackurl, can be “form” or “httpbasic”.
 * `urlname` - You can optionally specify a login name to be used for credentials when posting to the URL specified in postbackurl.
 * `urlpass` - If credentials for the postbackurl are provided, this must be included, it is the password to be used in authorizing the postback of data to the URL specified by postbackurl.
 * `resultsformat` - This parameter allows you to specify a level of detail in the information that is posted back while the course is being taken. It may be one of three values: “course” (course summary), “activity” (activity summary, or “full” (full detail), and is set to “course” by default.

### Invitation Service

<h4 id="#createInvitation">.createInvitation(courseid, public, [options], callback)</h4>

Create a new invitation.

Parameters:

 * `courseid` - The id of the course for which the invitation will be created.
 * `public` - A boolean specifying whether the invitation is public or private.
 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `emailSubject` - The subject of the email that will be sent to any addresses provided (for private invitations).
 * `emailBody` - The text that will be sent in the body of emails sent to any addresses provided (for private invitations).
 * `addresses` - A comma separated list of email addresses for which registrations will be created for private invitations.
 * `send` - A boolean (“true” or “false” only, default “false”) parameter specifying whether the private invitations will be emailed to the provided addresses or not.
 * `creatingUserEmail` - The email of the user who is creating the invitation. This value is required in order to send private invitations.
 * `registrationCap` - Integer value of limit of public invitation registrations to allow.
 * `postbackurl` - Specifies a URL for which to post activity and status data in real time as the course is completed.
 * `authtype` - Optional parameter to specify how to authorize against the given postbackurl, can be “form” or “httpbasic”.
 * `urlname` - You can optionally specify a login name to be used for credentials when posting to the URL specified in postbackurl.
 * `urlpass` - If credentials for the postbackurl are provided, this must be included, it is the password to be used in authorizing the postback of data to the URL specified by postbackurl.
 * `resultsformat` - This parameter allows you to specify a level of detail in the information that is posted back while the course is being taken. It may be one of three values: “course” (course summary), “activity” (activity summary, or “full” (full detail), and is set to “course” by default.
 * `expirationdate` - The date this invitation will expire and can not be launched (formatted yyyyMMddHHmmss in UTC time).

The following tags can be added to the `emailSubject` or `emailBody` options:

 * [COURSE] - Course name
 * [COURSE_DESCRIPTION] - Course description
 * [COURSE_DURATION] - Course duration
 * [USER] - Recipient's name
 * [URL] - Course launch url
 * [URL:name] - Link to the launch URL with text 'name'

```js
api.createInvitation('810348d9-318e-48d5-b352-a1f6eb3a92cd', true, function (error, result) {
  console.log(result);
  /* '237cd2a4-1828-42ed-b30d-5b6c6f534b82' */
});
```

<h4 id="#getInvitationInfo">.getInvitationInfo(invitationid, [options], callback)</h4>

Retrieve details about the specified invitation.

Parameters:

 * `invitationid` - The unique identifier for the invitation.
 * `callback`

```js
api.getInvitationInfo('b4a6b1f2-1e00-41cc-a7bd-dce896ed3e08', function (error, result) {
  console.log(result);
  /*
  {
    id: 'b4a6b1f2-1e00-41cc-a7bd-dce896ed3e08',
    body: 'Dear [USER],<br/>John Doe has invited you to take &#39;Example Course&#39;. To start your training, just click on the &#39;Play Course&#39; link below.<br/><br/>[URL:Play Course]',
    courseId: '810348d9-318e-48d5-b352-a1f6eb3a92cd',
    subject: 'Example Course',
    url: 'http://cloud.scorm.com/sc//InvitationConfirmEmail?publicInvitationId=99ed782f-3a54-4dad-856c-30a376daf439',
    allowLaunch: true,
    allowNewRegistrations: true,
    public: true,
    created: true,
    createdDate: '2017-11-12T18:00:30.000+0000',
    userInvitations: [
      {
        email: 'steven.westmoreland@gmail.com',
        url: 'http://cloud.scorm.com/sc//InvitationLaunch?userInvitationId=c9c6bd04-468c-40cb-a29c-805e1c4c8c3c',
        isStarted: true,
        registrationId: '8dac010d-f009-4554-a26c-28b8439228d7',
        registrationreport: {
          format: 'course',
          regid: '8dac010d-f009-4554-a26c-28b8439228d7',
          instanceid: '0',
          complete: 'complete',
          success: 'passed',
          totaltime: '60',
          score: 'unknown'
        }
      },
      ...
    ]
  }
  */
});
```

<h4 id="#getInvitationList">.getInvitationList([options], callback)</h4>

Retrieve a list of invitations that meet the filter criteria.

Parameters:

 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `filter` - A regular expression that will be used to filter the list of invitations. Specifically only those invitations whose invitation Id’s match the given expression will be returned in the list.
 * `coursefilter` - A regular express that will be used to filter the list of invitations. Specifically only those invitations that are associated with courses whose courseid’s match the given expression will be returned in the list.

```js
api.getInvitationList(function (error, result) {
  console.log(result);
  /*
  [
    {
      id: 'e16007ae-75b5-4efe-bef9-69ad0017569c',
      body: 'Dear [USER],<br/>John Doe has invited you to take &#39;Example Course&#39;. To start your training, just click on the &#39;Play Course&#39; link below.<br/><br/>[URL:Play Course]',
      courseId: '810348d9-318e-48d5-b352-a1f6eb3a92cd',
      subject: 'Example Course',
      url: '',
      allowLaunch: true,
      allowNewRegistrations: true,
      public: false,
      created: false,
      createdDate: '2017-11-10T21:30:45.000+0000'
    },
    ...
  ]
  */
});
```

### Application Service

This service requires authentication with your management app id and secret. You can access this information from the [Apps / API](https://cloud.scorm.com/sc/user/Apps) page in SCORM Cloud.

```js
// Include your management app id and secret when creating an API client instance.
var api = new SCORMCloud('appid', 'secretKey', 'managementid', 'managementKey');
```

```js
// or set your management app id and secret after creating an API client instance.
var api = new SCORMCloud('appid', 'secretKey');
api.managementid  = 'HP1BW3KC2G';
api.managementKey = 'Management App Secret Key';
```

<h4 id="#getAppList">.getAppList(callback)</h4>

Retrieve a list of applications associated with your realm.

Parameters:

 * `callback`

```js
api.getAppList(function (error, result) {
  console.log(result);
  /*
  [
    {
      appId: 'FNPQCR5SRN',
      name: 'Initial Application for Steven\'s Realm',
      createDate: '2012-06-27T03:38:55.000+0000'
    },
    { 
      appId: 'HP1BW3KC2G',
      name: 'App Management App',
      createDate: '2017-11-09T18:12:35.000+0000'
    },
    ...
  ]
  */
});
```

<h4 id="#getAppInfo">.getAppInfo(appid, callback)</h4>

Retrieve details about the specified application.

Parameters:

 * `appid` - The unique identifier for the application.
 * `callback`

```js
api.getAppInfo('FNPQCR5SRN', function (error, result) {
  console.log(result);
  /*
  {
    appId: 'FNPQCR5SRN',
    name: 'Initial Application for Steven\'s Realm',
    allowDeleteAPI: true,
    allowUpdateAPI: true,
    createDate: '2012-06-27T03:38:55.000+0000',
    secretKeys: [
      { 
        id: '03772612-d3ed-433e-81dc-a63b2af5cd41',
        key: '',
        pensKey: '',
        description: 'First Secret Key',
        active: true,
        createDate: '2012-06-27T03:38:55.000+0000'
      }
    ] 
  }
  */
});
```

<h4 id="#createApplication">.createApplication(name, callback)</h4>

Create a new application.

Parameters:

 * `name` - Name or description for the new application.
 * `callback`

```js
api.createApplication('New Applicaton', function (error, result) {
  console.log(result);
  /*
  {
    appId: 'IVPO0IN0LL',
    name: 'New Applicaton',
    allowDeleteAPI: false,
    allowUpdateAPI: true,
    createDate: '2018-03-05T19:36:41.691+0000',
    secretKeys: [
      {
        id: 'a32418df-1292-470f-9c43-296913cf084e',
        key: '',
        pensKey: '',
        description: 'First Secret Key',
        active: true,
        createDate: '2018-03-05T19:36:42.000+0000'
      }
    ]
  }
  */
}
```

<h4 id="#updateApplication">.updateApplication(appid, [options], callback)</h4>

Update the name and/or registration deletion permissions for an application.

Parameters:

 * `appid` - The unique identifier for the application.
 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `name` - Name or description for the application.
 * `allowdelete` - Sets whether `deleteRegistration` can be used with this app.

```js
api.updateApplication('IVPO0IN0LL', { allowdelete: true }, function (error, result) {
  console.log(result);
  /*
  {
    appId: 'IVPO0IN0LL',
    name: 'New Applicaton',
    allowDeleteAPI: true,
    allowUpdateAPI: true,
    createDate: '2018-03-05T19:36:41.691+0000',
    secretKeys: [
      {
        id: 'a32418df-1292-470f-9c43-296913cf084e',
        key: '',
        pensKey: '',
        description: 'First Secret Key',
        active: true,
        createDate: '2018-03-05T19:36:42.000+0000'
      }
    ]
  }
  */
});
```

<h4 id="#addSecretKey">.addSecretKey(appid, description, callback)</h4>

Create a new secret key for an application.

Parameters:

 * `appid` - The unique identifier for the application.
 * `description` - Name or description for the new key.
 * `callback`

```js
api.addSecretKey('IVPO0IN0LL', 'New Secret Key', function (error, result) {
  console.log(result);
  /*
  {
    appId: 'IVPO0IN0LL',
    name: 'New Applicaton',
    allowDeleteAPI: true,
    allowUpdateAPI: true,
    createDate: '2018-03-05T19:36:41.691+0000',
    secretKeys: [
      {
        id: '45792a11-f084-4e37-817d-62977e906def',
        key: '',
        pensKey: '',
        description: 'New Secret Key',
        active: true,
        createDate: '2018-03-05T19:59:01.000+0000'
      },
      {
        id: 'a32418df-1292-470f-9c43-296913cf084e',
        key: '',
        pensKey: '',
        description: 'First Secret Key',
        active: true,
        createDate: '2018-03-05T19:36:42.000+0000'
      }
    ]
  }
  */
});
```

<h4 id="#updateSecretKey">.updateSecretKey(appid, keyid, [options], callback)</h4>

Updates a secret key associated with the given keyid.

Parameters:

 * `appid` - The unique identifier for the application.
 * `keyid` - The unique identifier for the key. Key identifiers can be retrieved by calling `getAppInfo`.
 * `options` - Object with optional parameters; see options below.
 * `callback`

Options:

 * `description` - Name or description for the key.
 * `active` - Enables or disables the secret key for use.

```js
api.updateSecretKey('IVPO0IN0LL', '45792a11-f084-4e37-817d-62977e906def', { active: false }, function (error, result) {
  console.log(result);
  /*
  {
    appId: 'IVPO0IN0LL',
    name: 'New Applicaton',
    allowDeleteAPI: true,
    allowUpdateAPI: true,
    createDate: '2018-03-05T19:36:41.691+0000',
    secretKeys: [
      {
        id: '45792a11-f084-4e37-817d-62977e906def',
        key: '',
        pensKey: '',
        description: 'New Secret Key',
        active: false,
        createDate: '2018-03-05T19:59:01.000+0000'
      },
      {
        id: 'a32418df-1292-470f-9c43-296913cf084e',
        key: '',
        pensKey: '',
        description: 'First Secret Key',
        active: true,
        createDate: '2018-03-05T19:36:42.000+0000'
      }
    ]
  }
  */
});
```

<h4 id="#deleteSecretKey">.deleteSecretKey(appid, keyid, callback)</h4>

Deletes a secret key associated with the given keyid.

Parameters:

 * `appid` - The unique identifier for the application.
 * `keyid` - The unique identifier for the key. Key identifiers can be retrieved by calling `getAppInfo`.
 * `callback`

```js
api.deleteSecretKey('IVPO0IN0LL', '45792a11-f084-4e37-817d-62977e906def', function (error, result) {
  console.log(result);
  /*
  {
    appId: 'IVPO0IN0LL',
    name: 'New Applicaton',
    allowDeleteAPI: true,
    allowUpdateAPI: true,
    createDate: '2018-03-05T19:36:41.691+0000',
    secretKeys: [
      {
        id: 'a32418df-1292-470f-9c43-296913cf084e',
        key: '',
        pensKey: '',
        description: 'First Secret Key',
        active: true,
        createDate: '2018-03-05T19:36:42.000+0000'
      }
    ]
  }
  */
});
```

### Tagging Service

<h4 id="#getCourseTags">getCourseTags(courseid, callback)</h4>

Retrieve a list of tags for the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `callback`

```js
api.getCourseTags('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result);
  /* ['example', 'course'] */
});
```

<h4 id="#setCourseTags">setCourseTags(courseid, tags, callback)</h4>

Set a list of tags for the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `tags` - Comma separated list of tags to set for the course.
 * `callback`

```js
api.setCourseTags('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'example,course', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#addCourseTag">addCourseTag(courseid, tag, callback)</h4>

Add a tag to the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `tag` - The tag to associate with the course.
 * `callback`

```js
api.addCourseTag('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#removeCourseTag">removeCourseTag(courseid, tag, callback)</h4>

Remove a tag from the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `tag` - The tag to remove from the course.
 * `callback`

```js
api.removeCourseTag('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#getLearnerTags">getLearnerTags(learnerid, callback)</h4>

Retrieve a list of tags for the specified learner.

Parameters:

 * `learnerid` - The unique identifier for the learner.
 * `callback`

```js
api.getLearnerTags('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', function (error, result) {
  console.log(result);
  /* ['developer', 'tester'] */
});
```

<h4 id="#setLearnerTags">setLearnerTags(learnerid, tags, callback)</h4>

Set a list of tags for the specified learner.

Parameters:

 * `learnerid` - The unique identifier for the learner.
 * `tags` - Comma separated list of tags to set for the learner.
 * `callback`

```js
api.setLearnerTags('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', 'developer,tester', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#addLearnerTag">addLearnerTag(learnerid, tag, callback)</h4>

Add a tag to the specified learner.

Parameters:

 * `learnerid` - The unique identifier for the learner.
 * `tag` - The tag to associate with the learner.
 * `callback`

```js
api.addLearnerTag('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#removeLearnerTag">removeLearnerTag(learnerid, tag, callback)</h4>

Remove a tag from the specified learner.

Parameters:

 * `learnerid` - The unique identifier for the learner.
 * `tag` - The tag to remove from the learner.
 * `callback`

```js
api.removeLearnerTag('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#getRegistrationTags">getRegistrationTags(regid, callback)</h4>

Retrieve a list of tags for the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

```js
api.getRegistrationTags('988a83fa-fd1e-40bc-b93f-89346667448b', function (error, result) {
  console.log(result);
  /* ['example', 'registration'] */
});
```

<h4 id="#setRegistrationTags">setRegistrationTags(regid, tags, callback)</h4>

Set a list of tags for the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `tags` - Comma separated list of tags to set for the registration.
 * `callback`

```js
api.setRegistrationTags('988a83fa-fd1e-40bc-b93f-89346667448b', 'example,registration', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#addRegistrationTag">addRegistrationTag(regid, tag, callback)</h4>

Add a tag to the specified registration.

Parameters:

 * `regid` - The unique identifier for the registation.
 * `tag` - The tag to associate with the registration.
 * `callback`

```js
api.addRegistrationTag('988a83fa-fd1e-40bc-b93f-89346667448b', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

<h4 id="#removeRegistrationTag">.removeRegistrationTag(regid, tag, callback)</h4>

Remove a tag from the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `tag` - The tag to remove from the registration.
 * `callback`

```js
api.removeRegistrationTag('988a83fa-fd1e-40bc-b93f-89346667448b', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

### Reporting Service

<h4 id="#getAccountInfo">.getAccountInfo(callback)</h4>

Retrieve information about the account associated with the `appid`.

```js
api.getAccountInfo(function (error, result) {
  console.log(result);
  /*
  {
    email: 'john.doe@example.com',
    firstname: 'John',
    lastname: 'Doe',
    company: 'Acme',
    accounttype: 'little',
    reglimit: 50,
    strictlimit: true,
    createdate: '2015-11-10T15:30:00+0000',
    usage: {
      monthstart: '2017-11-10T15:30:00+0000',
      regcount: 0,
      totalregistrations: 29,
      totalcourses: 40
    }
  }
  */
});
```
