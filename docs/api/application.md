# Application Service

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

#### .getAppList(callback) {#getAppList}

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

#### .getAppInfo(appid, callback) {#getAppInfo}

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

#### .createApplication(name, callback) {#createApplication}

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

#### .updateApplication(appid, [options], callback) {#updateApplication}

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

#### .addSecretKey(appid, description, callback) {#addSecretKey}

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

#### .updateSecretKey(appid, keyid, [options], callback) {#updateSecretKey}

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

#### .deleteSecretKey(appid, keyid, callback) {#deleteSecretKey}

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
