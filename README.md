# scormcloud-api-wrapper

Node.js client for the [SCORM Cloud API](https://cloud.scorm.com/docs/index.html).

[![npm](https://img.shields.io/npm/v/scormcloud-api-wrapper.svg?style=flat-square)]()

## Installation

To install via npm:

```sh
npm install scormcloud-api-wrapper --save
```

## Usage

```js
// Import the module.
var SCORMCloud = require('scormcloud-api-wrapper');

// Create an instance with your API credentials.
var api = new SCORMCloud('appid', 'secretKey');

// See API documentation for additional examples.
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

## API

### Debug Service

#### authPing(callback)

Verifies that your credentials are valid and that the web service is reachable.

```js
api.authPing(function (error, result) {
  console.log(result);
  /* true */
});
```

### Course Service

#### courseExists(courseid, callback)

Check whether or not the specified course exists.

```js
api.courseExists('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result);
  /* true */
});
```

#### deleteCourse(courseid, [options], callback)

Delete the specified course.

Options:

 * `email` - If this parameter is included, user information will be attached to this event in the event history on the SCORM Cloud website.

```js
api.deleteCourse('bd16aa80-f042-44b2-94a8-dd18a5484740', function (error, result) {
  console.log(result);
  /* true */
});
```

#### getCourseList([options], callback)

Retrieve a list of courses associated with the `appid`.

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

#### getCourseDetail(courseid, callback)

Retrieve details about the specified course. Includes version information; see [Course Versioning and Overwriting](https://cloud.scorm.com/docs/advanced/versioning.html).

```js
api.getCourseList('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result);
  /*
  [
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
    },
    ...
  ]
  */
});
```

### Registration Service

#### createRegistration(courseid, regid, fname, lname, learnerid, [options], callback)

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
  'Phil',
  'Miller',
  'phil.miller@example.com',
  {
    email: 'phil.miller@example.com'
  },
  function (error, result) {
    console.log(result);
    /* true */
  }
);
```

#### registrationExists(regid, callback)

Check whether or not the specified registration exists.

```js
api.registrationExists('09e6c1c5-1f20-4df0-b9a5-145364d0003b', function (error, result) {
  console.log(result);
  /* true */
});
```

#### deleteRegistration(regid, callback)

Delete the specified registration.

```js
api.deleteRegistration('09e6c1c5-1f20-4df0-b9a5-145364d0003b', function (error, result) {
  console.log(result);
  /* true */
});
```

#### resetRegistration(regid, callback)

Reset the specified registration.

```js
api.deleteRegistration('09e6c1c5-1f20-4df0-b9a5-145364d0003b', function (error, result) {
  console.log(result);
  /* true */
});
```

#### getRegistrationList([options], callback)

Retrieve a list of registrations associated with the `appid`.

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

#### getRegistrationDetail(regid, callback)

Retrieve details about the specified registration.

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

#### getRegistrationResult(regid, [options], callback)

Retrieve details about the results of the specified registration.

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

#### getRegistrationListResults([options], callback)

Combination of `getRegistrationList` and `getRegistrationResult` methods; can be used for basic reporting functionality.

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

#### getLaunchHistory(regid, callback)

Retrieve historical list of launches for the specified registration.

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

#### getLaunchInfo(launchid, callback)

Retrieve historical data for the specified launch.

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

#### resetGlobalObjectives(regid, callback)

Reset all global objectives associated with this registration.

```js
api.resetGlobalObjectives('0247b487-c3ab-4404-9103-70373ac11ef3', function (error, result) {
  console.log(result);
  /* true */
});
```

#### updateLearnerInfo(learnerid, fname, lname, [options], callback)

Update learner information that was given during previous `createRegistration` calls.

### Invitation Service

#### createInvitation(courseid, public, [options], callback)

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

```js
api.createInvitation('810348d9-318e-48d5-b352-a1f6eb3a92cd', true, function (error, result) {
  console.log(result);
  /* '237cd2a4-1828-42ed-b30d-5b6c6f534b82' */
});
```

#### getInvitationInfo(invitationid, [options], callback)

Retrieve details about the specified invitation.

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

#### getInvitationList([options], callback)

Retrieve a list of invitations that meet the filter criteria.

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

### Tagging Service

#### getCourseTags(courseid, callback)

Retrieve a list of tags for the specified course.

```js
api.getCourseTags('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result);
  /* ['example', 'course'] */
});
```

#### setCourseTags(courseid, tags, callback)

Set a list of tags for the specified course.

```js
api.setCourseTags('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'example,course', function (error, result) {
  console.log(result);
  /* true */
});
```

#### addCourseTag(courseid, tag, callback)

Add a tag to the specified course.

```js
api.addCourseTag('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### removeCourseTag(courseid, tag, callback)

Remove a tag from the specified course.

```js
api.removeCourseTag('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### getLearnerTags(learnerid, callback)

Retrieve a list of tags for the specified learner.

```js
api.getLearnerTags('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', function (error, result) {
  console.log(result);
  /* ['developer', 'tester'] */
});
```

#### setLearnerTags(learnerid, tags, callback)

Set a list of tags for the specified learner.

```js
api.setLearnerTags('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', 'developer,tester', function (error, result) {
  console.log(result);
  /* true */
});
```

#### addLearnerTag(learnerid, tag, callback)

Add a tag to the specified learner.

```js
api.addLearnerTag('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### removeLearnerTag(learnerid, tag, callback)

Remove a tag from the specified learner.

```js
api.removeLearnerTag('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### getRegistrationTags(regid, callback)

Retrieve a list of tags for the specified registration.

```js
api.getRegistrationTags('988a83fa-fd1e-40bc-b93f-89346667448b', function (error, result) {
  console.log(result);
  /* ['example', 'registration'] */
});
```

#### setRegistrationTags(regid, tags, callback)

Set a list of tags for the specified registration.

```js
api.setRegistrationTags('988a83fa-fd1e-40bc-b93f-89346667448b', 'example,registration', function (error, result) {
  console.log(result);
  /* true */
});
```

#### addRegistrationTag(regid, tag, callback)

Add a tag to the specified registration.

```js
api.addRegistrationTag('988a83fa-fd1e-40bc-b93f-89346667448b', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### removeRegistrationTag(regid, tag, callback)

Remove a tag from the specified registration.

```js
api.removeRegistrationTag('988a83fa-fd1e-40bc-b93f-89346667448b', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

### Reporting Service

#### getAccountInfo(callback)

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
