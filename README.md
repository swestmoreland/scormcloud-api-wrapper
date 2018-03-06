# scormcloud-api-wrapper

[![npm](https://img.shields.io/npm/v/scormcloud-api-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/scormcloud-api-wrapper)

Node.js client for the [SCORM Cloud API](https://cloud.scorm.com/docs/index.html).

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

For more information, see [Getting started with the Node.js client for the SCORM Cloud API](https://stevenwestmoreland.com/2017/11/nodejs-client-for-scormcloud-api.html).

## API

* [Debug Service](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/debug.html)
    * [authPing](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/debug.html#authPing)
* [Course Service](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/course.html)
    * [getCoursePreviewUrl](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/course.html#getCoursePreviewUrl)
    * [courseExists](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/course.html#courseExists)
    * [deleteCourse](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/course.html#deleteCourse)
    * [getCourseAttributes](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/course.html#getCourseAttributes)
    * [setCourseAttributes](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/course.html#setCourseAttributes)
    * [getCourseList](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/course.html#getCourseList)
    * [getCourseDetail](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/course.html#getCourseDetail)
    * [importCourse](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/course.html#importCourse)
* [Registration Service](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html)
    * [createRegistration](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#createRegistration)
    * [registrationExists](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#registrationExists)
    * [deleteRegistration](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#deleteRegistration)
    * [resetRegistration](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#resetRegistration)
    * [getRegistrationList](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#getRegistrationList)
    * [getRegistrationDetail](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#getRegistrationDetail)
    * [getRegistrationResult](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#getRegistrationResult)
    * [getRegistrationListResults](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#getRegistrationListResults)
    * [getLaunchUrl](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#getLaunchUrl)
    * [getLaunchUrl](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#getLaunchHistory)
    * [getLaunchInfo](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#getLaunchInfo)
    * [resetGlobalObjectives](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#resetGlobalObjectives)
    * [updateLearnerInfo](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#updateLearnerInfo)
    * [updateLearnerInfo](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#updateLearnerInfo)
    * [getPostbackInfo](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#getPostbackInfo)
    * [updatePostbackInfo](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#updatePostbackInfo)
    * [deletePostbackInfo](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#deletePostbackInfo)
    * [testRegistrationPostbackUrl](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/registration.html#testRegistrationPostbackUrl)
* [Invitation Service](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/invitation.html)
    * [createInvitation](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/invitation.html#createInvitation)
    * [getInvitationInfo](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/invitation.html#getInvitationInfo)
    * [getInvitationList](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/invitation.html#getInvitationList)
* [Application Service](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/application.html)
    * [getAppList](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/application.html#getAppList)
    * [getAppInfo](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/application.html#getAppInfo)
    * [createApplication](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/application.html#createApplication)
    * [updateApplication](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/application.html#updateApplication)
    * [addSecretKey](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/application.html#addSecretKey)
    * [updateSecretKey](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/application.html#updateSecretKey)
    * [deleteSecretKey](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/application.html#deleteSecretKey)
* [Tagging Service](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html)
    * [getCourseTags](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#getCourseTags)
    * [setCourseTags](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#setCourseTags)
    * [addCourseTag](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#addCourseTag)
    * [removeCourseTag](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#removeCourseTag)
    * [getLearnerTags](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#getLearnerTags)
    * [setLearnerTags](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#setLearnerTags)
    * [addLearnerTag](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#addLearnerTag)
    * [removeLearnerTag](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#removeLearnerTag)
    * [getRegistrationTags](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#getRegistrationTags)
    * [setRegistrationTags](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#setRegistrationTags)
    * [addRegistrationTag](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#addRegistrationTag)
    * [removeRegistrationTag](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/tagging.html#removeRegistrationTag)
* [Reporting Service](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/reporting.html)
    * [getAccountInfo](https://stevenwestmoreland.com/docs/scormcloud-api-wrapper/api/reporting.html#getAccountInfo)
