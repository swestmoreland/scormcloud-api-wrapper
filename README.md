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
  [{
    id: '810348d9-318e-48d5-b352-a1f6eb3a92cd',
    title: 'Example Course',
    versions: -1,
    registrations: 1,
    size: 3023399,
    tags: [ 'example' ],
    learningStandard: 'scorm_12',
    createDate: '2017-11-10T16:30:00.000+0000'
  }]
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
```

### Course Service

### Registration Service

### Invitation Service

### Tagging Service

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
    company: '',
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
