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
api.getCourseList(function (error, courses) {
  console.log(courses);
  /*
  [{
    id: '810348d9-318e-48d5-b352-a1f6eb3a92cd',
    title: 'Example Course',
    versions: -1,
    registrations: 1,
    size: 3023399,
    tags: [ 'example' ],
    learningStandard: 'scorm_12',
    createDate: '2017-11-10T22:00:00.000+0000'
   }]
   */
});
```
