# scormcloud-api-wrapper

Node.js client for the [SCORM Cloud API](https://cloud.scorm.com/docs/index.html).

## Installation

```sh
npm install scormcloud-api-wrapper
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
      versions: -1,
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
      versions: -1,
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

#### registrationExists(regid, callback)

Check whether or not the specified registration exists.

```js
api.registrationExists('2ffab123-cb7c-4744-af8e-493a6c74e65b', function (error, result) {
  console.log(result);
  /* true */
});
```

#### deleteRegistration(regid, callback)

Delete the specified registration.

#### resetRegistration(regid, callback)

Reset the specified registration.

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
    }
    ...
  ]
  */
});
```

### Invitation Service

#### getInvitationList([options], callback)

Retrieve a list of invitations that meet the filter criteria.

Options:

 * `filter` - A regular expression that will be used to filter the list of invitations. Specifically only those invitations whose invitation Id’s match the given expression will be returned in the list.
 * `coursefilter` - A regular express that will be used to filter the list of invitations. Specifically only those invitations that are associated with courses whose courseid’s match the given expression will be returned in the list.

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
api.setCourseTags('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag1,tag2,tag3', function (error, result) {
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

#### setLearnerTags(learnerid, tags, callback)

Set a list of tags for the specified learner.

#### addLearnerTag(learnerid, tag, callback)

Add a tag to the specified learner.

#### removeLearnerTag(learnerid, tag, callback)

Remove a tag from the specified learner.

#### getRegistrationTags(regid, callback)

Retrieve a list of tags for the specified registration.

#### setRegistrationTags(regid, tags, callback)

Set a list of tags for the specified registration.

#### addRegistrationTag(regid, tag, callback)

Add a tag to the specified registration.

#### removeRegistrationTag(regid, tag, callback)

Remove a tag from the specified registration.

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
