# scormcloud-api-wrapper

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

// Get things done.
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

```js
api.authPing(function (error, result) {
  console.log(result);
  /*
  true
  */
});
```

### Course Service

#### courseExists(courseid, callback)

```js
api.courseExists('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result)
  /*
  true
  */
});
```

#### deleteCourse(courseid, [options], callback)

#### getCourseList([options], callback)

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

```js
api.registrationExists('2ffab123-cb7c-4744-af8e-493a6c74e65b', function (error, result) {
  console.log(result)
  /*
  true
  */
});
```

#### deleteRegistration(regid, callback)

#### resetRegistration(regid, callback)

#### getRegistrationList([options], callback)

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

### Tagging Service

#### getCourseTags(courseid, callback)

```js
api.getCourseTags('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result)
  /*
  ['example', 'course']
  */
});
```

#### setCourseTags(courseid, tags, callback)

```js
api.setCourseTags('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag1,tag2,tag3', function (error, result) {
  console.log(result)
  /*
  true
  */
});
```

#### addCourseTag(courseid, tag, callback)

```js
api.addCourseTag('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag', function (error, result) {
  console.log(result)
  /*
  true
  */
});
```

#### removeCourseTag(courseid, tag, callback)

```js
api.removeCourseTag('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag', function (error, result) {
  console.log(result)
  /*
  true
  */
});
```

#### getLearnerTags(learnerid, callback)

#### setLearnerTags(learnerid, tags, callback)

#### addLearnerTag(learnerid, tag, callback)

#### removeLearnerTag(learnerid, tag, callback)

#### getRegistrationTags(regid, callback)

#### setRegistrationTags(regid, tags, callback)

#### addRegistrationTag(regid, tag, callback)

#### removeRegistrationTag(regid, tag, callback)

### Reporting Service

#### getAccountInfo(callback)

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
