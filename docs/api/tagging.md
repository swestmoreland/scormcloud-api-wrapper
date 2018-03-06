# Tagging Service

#### getCourseTags(courseid, callback) {#getCourseTags}

Retrieve a list of tags for the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `callback`

```js
api.getCourseTags('810348d9-318e-48d5-b352-a1f6eb3a92cd', function (error, result) {
  console.log(result);
  /* ['example', 'course'] */
});
```

#### setCourseTags(courseid, tags, callback) {#setCourseTags}

Set a list of tags for the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `tags` - Comma separated list of tags to set for the course.
 * `callback`

```js
api.setCourseTags('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'example,course', function (error, result) {
  console.log(result);
  /* true */
});
```

#### addCourseTag(courseid, tag, callback) {#addCourseTag}

Add a tag to the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `tag` - The tag to associate with the course.
 * `callback`

```js
api.addCourseTag('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### removeCourseTag(courseid, tag, callback) {#removeCourseTag}

Remove a tag from the specified course.

Parameters:

 * `courseid` - The unique identifier for the course.
 * `tag` - The tag to remove from the course.
 * `callback`

```js
api.removeCourseTag('810348d9-318e-48d5-b352-a1f6eb3a92cd', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### getLearnerTags(learnerid, callback) {#getLearnerTags}

Retrieve a list of tags for the specified learner.

Parameters:

 * `learnerid` - The unique identifier for the learner.
 * `callback`

```js
api.getLearnerTags('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', function (error, result) {
  console.log(result);
  /* ['developer', 'tester'] */
});
```

#### setLearnerTags(learnerid, tags, callback) {#setLearnerTags}

Set a list of tags for the specified learner.

Parameters:

 * `learnerid` - The unique identifier for the learner.
 * `tags` - Comma separated list of tags to set for the learner.
 * `callback`

```js
api.setLearnerTags('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', 'developer,tester', function (error, result) {
  console.log(result);
  /* true */
});
```

#### addLearnerTag(learnerid, tag, callback) {#addLearnerTag}

Add a tag to the specified learner.

Parameters:

 * `learnerid` - The unique identifier for the learner.
 * `tag` - The tag to associate with the learner.
 * `callback`

```js
api.addLearnerTag('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### removeLearnerTag(learnerid, tag, callback) {#removeLearnerTag}

Remove a tag from the specified learner.

Parameters:

 * `learnerid` - The unique identifier for the learner.
 * `tag` - The tag to remove from the learner.
 * `callback`

```js
api.removeLearnerTag('2efae212-c03c-4904-9a9a-cec6f6b4d4f6', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### getRegistrationTags(regid, callback) {#getRegistrationTags}

Retrieve a list of tags for the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `callback`

```js
api.getRegistrationTags('988a83fa-fd1e-40bc-b93f-89346667448b', function (error, result) {
  console.log(result);
  /* ['example', 'registration'] */
});
```

#### setRegistrationTags(regid, tags, callback) {#setRegistrationTags}

Set a list of tags for the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `tags` - Comma separated list of tags to set for the registration.
 * `callback`

```js
api.setRegistrationTags('988a83fa-fd1e-40bc-b93f-89346667448b', 'example,registration', function (error, result) {
  console.log(result);
  /* true */
});
```

#### addRegistrationTag(regid, tag, callback) {#addRegistrationTag}

Add a tag to the specified registration.

Parameters:

 * `regid` - The unique identifier for the registation.
 * `tag` - The tag to associate with the registration.
 * `callback`

```js
api.addRegistrationTag('988a83fa-fd1e-40bc-b93f-89346667448b', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```

#### .removeRegistrationTag(regid, tag, callback) {#removeRegistrationTag}

Remove a tag from the specified registration.

Parameters:

 * `regid` - The unique identifier for the registration.
 * `tag` - The tag to remove from the registration.
 * `callback`

```js
api.removeRegistrationTag('988a83fa-fd1e-40bc-b93f-89346667448b', 'tag', function (error, result) {
  console.log(result);
  /* true */
});
```
