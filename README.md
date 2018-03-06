# scormcloud-api-wrapper

Node.js client for the [SCORM Cloud API](https://cloud.scorm.com/docs/index.html).

[![npm](https://img.shields.io/npm/v/scormcloud-api-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/scormcloud-api-wrapper)

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

* [Debug Service](docs/api/debug.md)
    * [authPing](docs/api/debug.md#authPing)
* [Course Service](docs/api/course.md)
    * [getCoursePreviewUrl](docs/api/course.md#getCoursePreviewUrl)
    * [courseExists](docs/api/course.md#courseExists)
    * [deleteCourse](docs/api/course.md#deleteCourse)
    * [getCourseAttributes](docs/api/course.md#getCourseAttributes)
    * [setCourseAttributes](docs/api/course.md#setCourseAttributes)
    * [getCourseList](docs/api/course.md#getCourseList)
    * [getCourseDetail](docs/api/course.md#getCourseDetail)
    * [importCourse](docs/api/course.md#importCourse)
* [Registration Service](docs/api/registration.md)
    * [createRegistration](docs/api/registration.md#createRegistration)
    * [registrationExists](docs/api/registration.md#registrationExists)
    * [deleteRegistration](docs/api/registration.md#deleteRegistration)
    * [resetRegistration](docs/api/registration.md#resetRegistration)
    * [getRegistrationList](docs/api/registration.md#getRegistrationList)
    * [getRegistrationDetail](docs/api/registration.md#getRegistrationDetail)
    * [getRegistrationResult](docs/api/registration.md#getRegistrationResult)
    * [getRegistrationListResults](docs/api/registration.md#getRegistrationListResults)
    * [getLaunchUrl](docs/api/registration.md#getLaunchUrl)
    * [getLaunchUrl](docs/api/registration.md#getLaunchHistory)
    * [getLaunchInfo](docs/api/registration.md#getLaunchInfo)
    * [resetGlobalObjectives](docs/api/registration.md#resetGlobalObjectives)
    * [updateLearnerInfo](docs/api/registration.md#updateLearnerInfo)
    * [updateLearnerInfo](docs/api/registration.md#updateLearnerInfo)
    * [getPostbackInfo](docs/api/registration.md#getPostbackInfo)
    * [updatePostbackInfo](docs/api/registration.md#updatePostbackInfo)
    * [deletePostbackInfo](docs/api/registration.md#deletePostbackInfo)
    * [testRegistrationPostbackUrl](docs/api/registration.md#testRegistrationPostbackUrl)
* [Invitation Service](docs/api/invitation.md)
    * [createInvitation](docs/api/invitation.md#createInvitation)
    * [getInvitationInfo](docs/api/invitation.md#getInvitationInfo)
    * [getInvitationList](docs/api/invitation.md#getInvitationList)
* [Application Service](docs/api/application.md)
    * [getAppList](docs/api/application.md#getAppList)
    * [getAppInfo](docs/api/application.md#getAppInfo)
    * [createApplication](docs/api/application.md#createApplication)
    * [updateApplication](docs/api/application.md#updateApplication)
    * [addSecretKey](docs/api/application.md#addSecretKey)
    * [updateSecretKey](docs/api/application.md#updateSecretKey)
    * [deleteSecretKey](docs/api/application.md#deleteSecretKey)
* [Tagging Service](docs/api/tagging.md)
    * [getCourseTags](docs/api/tagging.md#getCourseTags)
    * [setCourseTags](docs/api/tagging.md#setCourseTags)
    * [addCourseTag](docs/api/tagging.md#addCourseTag)
    * [removeCourseTag](docs/api/tagging.md#removeCourseTag)
    * [getLearnerTags](docs/api/tagging.md#getLearnerTags)
    * [setLearnerTags](docs/api/tagging.md#setLearnerTags)
    * [addLearnerTag](docs/api/tagging.md#addLearnerTag)
    * [removeLearnerTag](docs/api/tagging.md#removeLearnerTag)
    * [getRegistrationTags](docs/api/tagging.md#getRegistrationTags)
    * [setRegistrationTags](docs/api/tagging.md#setRegistrationTags)
    * [addRegistrationTag](docs/api/tagging.md#addRegistrationTag)
    * [removeRegistrationTag](docs/api/tagging.md#removeRegistrationTag)
* [Reporting Service](docs/api/reporting.md)
    * [getAccountInfo](docs/api/reporting.md#getAccountInfo)
