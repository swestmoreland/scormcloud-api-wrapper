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
