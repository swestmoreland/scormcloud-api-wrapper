# Invitation Service

#### .createInvitation(courseid, public, [options], callback) {#createInvitation}

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

The following tags can be added to the `emailSubject` or `emailBody` options:

 * [COURSE] - Course name
 * [COURSE_DESCRIPTION] - Course description
 * [COURSE_DURATION] - Course duration
 * [USER] - Recipient's name
 * [URL] - Course launch url
 * [URL:name] - Link to the launch URL with text 'name'

```js
api.createInvitation('810348d9-318e-48d5-b352-a1f6eb3a92cd', true, function (error, result) {
  console.log(result);
  /* '237cd2a4-1828-42ed-b30d-5b6c6f534b82' */
});
```

#### .getInvitationInfo(invitationid, [options], callback) {#getInvitationInfo}

Retrieve details about the specified invitation.

Parameters:

 * `invitationid` - The unique identifier for the invitation.
 * `callback`

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

#### .getInvitationList([options], callback) {#getInvitationList}

Retrieve a list of invitations that meet the filter criteria.

Parameters:

 * `options` - Object with optional parameters; see options below.
 * `callback`

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
