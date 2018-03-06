# Registration Service

#### .createRegistration(courseid, regid, fname, lname, learnerid, [options], callback) {#createRegistration}

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

#### .registrationExists(regid, callback) {#registrationExists}

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

#### .deleteRegistration(regid, callback) {#deleteRegistration}

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

#### .resetRegistration(regid, callback) {#resetRegistration}

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

#### .getRegistrationList([options], callback) {#getRegistrationList}

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

#### .getRegistrationDetail(regid, callback) {#getRegistrationDetail}

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

#### .getRegistrationResult(regid, [options], callback) {#getRegistrationResult}

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

#### .getRegistrationListResults([options], callback) {#getRegistrationListResults}

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

#### .getLaunchUrl(regid, redirecturl, [options]) {#getLaunchUrl}

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

#### .getLaunchHistory(regid, callback) {#getLaunchHistory}

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

#### .getLaunchInfo(launchid, callback) {#getLaunchInfo}

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

#### .resetGlobalObjectives(regid, callback) {#resetGlobalObjectives}

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

#### .updateLearnerInfo(learnerid, fname, lname, [options], callback) {#updateLearnerInfo}

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

#### .getPostbackInfo(regid, callback) {#getPostbackInfo}

This method provides a way to retrieve the postback attributes that were set with `createRegistration` or `updatePostbackInfo` calls. See [Registration Postbacks](https://cloud.scorm.com/docs/advanced/postback.html).

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

#### .updatePostbackInfo(regid, postbackUrl, options, callback) {#updatePostbackInfo}

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

#### .deletePostbackInfo(regid, callback) {#deletePostbackInfo}

Clear postback settings so that registration results no longer invoke a postback url.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

#### .testRegistrationPostbackUrl(postbackUrl, options, callback) {#testRegistrationPostbackUrl}

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
