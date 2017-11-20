'use strict';

const fs = require('fs');
const { URL, URLSearchParams } = require('url');
const util = require('util');

var _ = require('lodash');
var md5 = require('md5');
var moment = require('moment');
var request = require('request');
var parseString = require('xml2js').parseString;

const VERBOSE = false;

var SCORMCloud = function (appid, secretKey) {
    this.appid = appid;
    this.secretKey = secretKey;
    this.serviceUrl = 'https://cloud.scorm.com/EngineWebServices/';
}
module.exports = SCORMCloud;

//
// Debug Service
//

SCORMCloud.prototype.authPing = function (callback) {

    var url = new URL('api?method=rustici.debug.authPing', this.serviceUrl);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'pong');

        return callback(error, data);

    });
}

//
// Course Service
//

SCORMCloud.prototype.getCoursePreviewUrl = function (courseid, versionid) {

    var url = new URL('api?method=rustici.course.preview', this.serviceUrl);

    // Not yet implemented.

}

SCORMCloud.prototype.courseExists = function (courseid, callback) {

    var url = new URL('api?method=rustici.course.exists', this.serviceUrl);

    // The id used to identify this course.
    if (courseid) url.searchParams.set('courseid', courseid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.lowerCase(json.rsp.result) === 'true' ? true : false;

        return callback(error, data);

    });
}

SCORMCloud.prototype.deleteCourse = function (courseid, options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.course.deleteCourse', this.serviceUrl);

    // The id used to identify the course for deletion.
    if (courseid) url.searchParams.set('courseid', courseid);

    // An email address associated with an existing SCORM Cloud website user. If this parameter is included, user information will be attached to this event in the event history on the SCORM Cloud website.
    if (options.email) url.searchParams.set('email', options.email);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.getCourseAttributes = function (courseid, callback) {

    var url = new URL('api?method=rustici.course.getAttributes', this.serviceUrl);

    // The id used to identify the course for deletion.
    if (courseid) url.searchParams.set('courseid', courseid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = {};
        let attributes = json.rsp.attributes.attribute;

        attributes.forEach(function (attribute) {
            data[attribute.name] = attribute.value;
        });

        return callback(error, data);

    });
}

SCORMCloud.prototype.setCourseAttributes = function (courseid, attributes, callback) {

    var url = new URL('api?method=rustici.course.updateAttributes', this.serviceUrl);

    // Not yet implemented.

}

SCORMCloud.prototype.getCourseList = function (options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.course.getCourseList', this.serviceUrl);

    // A regular expression that will be used to filter the list of courses. Specifically only those courses whose courseid’s match the given expression will be returned in the list.
    if (options.filter) url.searchParams.set('filter', options.filter);

    // A comma separated list of tags to filter results by. Results will include only courses which are tagged with every tag in the list.
    if (options.tags) url.searchParams.set('tags', options.tags);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = [];
        let courseList = _.isArray(json.rsp.courselist.course) ? json.rsp.courselist.course : [ json.rsp.courselist.course ];

        courseList.forEach(function (course) {
            data.push({
               "id":               course.id,
               "title":            course.title,
               "registrations":    _.toInteger(course.registrations),
               "size":             _.toInteger(course.size),
               "tags":             _.flatten(_.toArray(course.tags)),
               "learningStandard": course.learningStandard,
               "createDate":       course.createDate
            });
        });

        return callback(error, data);

    });
}

SCORMCloud.prototype.getCourseDetail = function (courseid, callback) {

    var url = new URL('api?method=rustici.course.getCourseDetail', this.serviceUrl);

    // The id used to identify the course.
    if (courseid) url.searchParams.set('courseid', courseid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = {
            "id":               json.rsp.course.id,
            "title":            json.rsp.course.title,
            "versions":         _.flatten(_.toArray(json.rsp.course.versions[1])),
            "registrations":    _.toInteger(json.rsp.course.registrations),
            "size":             _.toInteger(json.rsp.course.size),
            "tags":             _.flatten(_.toArray(json.rsp.course.tags)),
            "learningStandard": json.rsp.course.learningStandard,
            "createDate":       json.rsp.course.createDate
        }

        return callback(error, data);

    });
}

SCORMCloud.prototype.importCourse = function (courseid, path, callback) {

    var url = new URL('api?method=rustici.course.importCourse', this.serviceUrl);

    // The id used to identify this course.
    if (courseid) url.searchParams.set('courseid', courseid);

    // See https://cloud.scorm.com/docs/api_reference/course.html#importcourse
    let formData = {
        filedata: fs.createReadStream(path)
    }

    this._request(url, formData, function (error, json) {

        if (error) return callback(error, json);

        let data = {
            "status":  json.rsp.status,
            "message": json.rsp.message,
            "importresult": _.isArray(json.rsp.importresult) ? json.rsp.importresult : [ json.rsp.importresult ]
        }

        return callback(error, data);

    });
}

//
// Registration Service
//

SCORMCloud.prototype.createRegistration = function (courseid, regid, fname, lname, learnerid, options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.registration.createRegistration', this.serviceUrl);

    // The course for which this registration is being created.
    if (courseid) url.searchParams.set('courseid', courseid);

    // The id used to identify this registration (must be unique).
    if (regid) url.searchParams.set('regid', regid);

    // The first name of the learner associated with this registration.
    if (fname) url.searchParams.set('fname', fname);

    // The last name of the learner associated with this registration.
    if (lname) url.searchParams.set('lname', lname);

    // The learner id associated with this registration.
    if (learnerid) url.searchParams.set('learnerid', learnerid);

    // If the email parameter is included, this registration will be attached to a SCORM Cloud website user (an “empty” user will be created if none with this email exists).
    if (options.email) url.searchParams.set('email', options.email);

    // Specifies a URL for which to post activity and status data in real time as the course is completed.
    if (options.postbackurl) url.searchParams.set('postbackurl', options.postbackurl);

    // Optional parameter to specify how to authorize against the given postbackurl, can be “form” or “httpbasic”.
    if (options.authtype) url.searchParams.set('authtype', options.authtype);

    // You can optionally specify a login name to be used for credentials when posting to the URL specified in postbackurl.
    if (options.urlname) url.searchParams.set('urlname', options.urlname);

    // If credentials for the postbackurl are provided, this must be included, it is the password to be used in authorizing the postback of data to the URL specified by postbackurl.
    if (options.urlpass) url.searchParams.set('urlpass', options.urlpass);

    // This parameter allows you to specify a level of detail in the information that is posted back while the course is being taken. It may be one of three values: “course” (course summary), “activity” (activity summary, or “full” (full detail), and is set to “course” by default.
    if (options.resultsformat) url.searchParams.set('resultsformat', options.resultsformat);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.registrationExists = function (regid, callback) {

    var url = new URL('api?method=rustici.registration.exists', this.serviceUrl);

    // The id used to identify this registration.
    if (regid) url.searchParams.set('regid', regid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.lowerCase(json.rsp.result) === 'true' ? true : false;

        return callback(error, data);

    });
}

SCORMCloud.prototype.deleteRegistration = function (regid, callback) {

    var url = new URL('api?method=rustici.registration.deleteRegistration', this.serviceUrl);

    // The unique identifier for this registration.
    if (regid) url.searchParams.set('regid', regid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.resetRegistration = function (regid, callback) {

    var url = new URL('api?method=rustici.registration.resetRegistration', this.serviceUrl);

    // The unique identifier for this registration.
    if (regid) url.searchParams.set('regid', regid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.getRegistrationList = function (options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.registration.getRegistrationList', this.serviceUrl);

    // Limit search to only registrations for the course specified by this courseid.
    if (options.courseid) url.searchParams.set('courseid', options.courseid);

    // Limit search to only registrations for the learner specified by this learnerid.
    if (options.learnerid) url.searchParams.set('learnerid', options.learnerid);

    // Return registrations updated (strictly) after this timestamp.
    if (options.after) url.searchParams.set('after', options.after);

    // Return registrations updated up to and including this timestamp.
    if (options.until) url.searchParams.set('until', options.until);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = [];
        let registrationList = _.isArray(json.rsp.registrationlist.registration) ? json.rsp.registrationlist.registration : [ json.rsp.registrationlist.registration ];

        registrationList.forEach(function (registration) {
            data.push({
               "id":                        registration.id,
               "courseId":                  registration.courseId,
               "courseTitle":               registration.courseTitle,
               "lastCourseVersionLaunched": registration.lastCourseVersionLaunched,
               "learnerId":                 registration.learnerId,
               "learnerFirstName":          registration.learnerFirstName,
               "learnerLastName":           registration.learnerLastName,
               "email":                     registration.email,
               "createDate":                registration.createDate,
               "firstAccessDate":           registration.firstAccessDate,
               "lastAccessDate":            registration.lastAccessDate,
               "completedDate":             registration.completedDate
            });
        });

        return callback(error, data);

    });
}

SCORMCloud.prototype.getRegistrationDetail = function (regid, callback) {

    var url = new URL('api?method=rustici.registration.getRegistrationDetail', this.serviceUrl);

    // The unique identifier for the registration.
    if (regid) url.searchParams.set('regid', regid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = {
            "id":                        json.rsp.registration.id,
            "courseId":                  json.rsp.registration.courseId,
            "courseTitle":               json.rsp.registration.courseTitle,
            "lastCourseVersionLaunched": json.rsp.registration.lastCourseVersionLaunched,
            "learnerId":                 json.rsp.registration.learnerId,
            "learnerFirstName":          json.rsp.registration.learnerFirstName,
            "learnerLastName":           json.rsp.registration.learnerLastName,
            "email":                     json.rsp.registration.email,
            "createDate":                json.rsp.registration.createDate,
            "firstAccessDate":           json.rsp.registration.firstAccessDate,
            "lastAccessDate":            json.rsp.registration.lastAccessDate,
            "completedDate":             json.rsp.registration.completedDate,
            "tinCanRegistrationId":      json.rsp.registration.tinCanRegistrationId,
            "instances":                 _.flatten(_.toArray(json.rsp.registration.instances))
        }

        return callback(error, data);

    });
}

SCORMCloud.prototype.getRegistrationResult = function (regid, options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.registration.getRegistrationResult', this.serviceUrl);

    // The unique identifier for the registration.
    if (regid) url.searchParams.set('regid', regid);

    // This optional parameter can be one of three values, “course”, “activity”, or “full”. If specified as “course”, only top level information such as completion status, success status, total time spent, and score will be returned. If specified as “activity”, similar summary information will be return for every activity in the course. If specified as “full”, the full set of CMI runtime and activity data is returned for every activity in the course. By default, “course” is used.
    //if (options.resultsformat) url.searchParams.set('resultsformat', options.resultsformat);

    // The ID of a particular registration instance (as listed in getRegistrationDetail).
    //if (options.instanceid) url.searchParams.set('instanceid', options.instanceid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = {
            "format":     json.rsp.registrationreport.format,
            "regid":      json.rsp.registrationreport.regid,
            "instanceid": json.rsp.registrationreport.instanceid,
            "complete":   json.rsp.registrationreport.complete,
            "success":    json.rsp.registrationreport.success,
            "totaltime":  json.rsp.registrationreport.totaltime,
            "score":      json.rsp.registrationreport.score
        }

        return callback(error, data);

    });
}

SCORMCloud.prototype.getRegistrationListResults = function (options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.registration.getRegistrationListResults', this.serviceUrl);

    // Limit search to only registrations for the course specified by this courseid.
    if (options.courseid) url.searchParams.set('courseid', options.courseid);

    // Limit search to only registrations for the learner specified by this learnerid.
    if (options.learnerid) url.searchParams.set('learnerid', options.learnerid);

    // This optional parameter can be one of three values, “course”, “activity”, or “full”. If specified as “course”, only top level information such as completion status, success status, total time spent, and score will be returned. If specified as “activity”, similar summary information will be return for every activity in the course. If specified as “full”, the full set of CMI runtime and activity data is returned for every activity in the course. By default, “course” is used.
    //if (options.resultsformat) url.searchParams.set('resultsformat', options.resultsformat);

    // Return registrations updated (strictly) after this timestamp.
    if (options.after) url.searchParams.set('after', options.after);

    // Return registrations updated up to and including this timestamp.
    if (options.until) url.searchParams.set('until', options.until);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = [];
        let registrationList = _.isArray(json.rsp.registrationlist.registration) ? json.rsp.registrationlist.registration : [ json.rsp.registrationlist.registration ];

        registrationList.forEach(function (registration) {
            data.push({
                "id":                        registration.id,
                "courseId":                  registration.courseId,
                "courseTitle":               registration.courseTitle,
                "lastCourseVersionLaunched": registration.lastCourseVersionLaunched,
                "learnerId":                 registration.learnerId,
                "learnerFirstName":          registration.learnerFirstName,
                "learnerLastName":           registration.learnerLastName,
                "email":                     registration.email,
                "createDate":                registration.createDate,
                "firstAccessDate":           registration.firstAccessDate,
                "lastAccessDate":            registration.lastAccessDate,
                "completedDate":             registration.completedDate,
                "registrationreport": {
                    "format":                registration.registrationreport.format,
                    "regid":                 registration.registrationreport.regid,
                    "instanceid":            registration.registrationreport.instanceid,
                    "complete":              registration.registrationreport.complete,
                    "success":               registration.registrationreport.success,
                    "totaltime":             registration.registrationreport.totaltime,
                    "score":                 registration.registrationreport.score
                }
            });
        });

        return callback(error, data);

    });
}

SCORMCloud.prototype.getLaunchHistory = function (regid, callback) {

    var url = new URL('api?method=rustici.registration.getLaunchHistory', this.serviceUrl);

    // The unique identifier for the registration.
    if (regid) url.searchParams.set('regid', regid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = [];
        let launchHistory = _.isArray(json.rsp.launchhistory.launch) ? json.rsp.launchhistory.launch : [ json.rsp.launchhistory.launch ];

        launchHistory.forEach(function (launch) {
            data.push({
                "id":                           launch.id,
                "completion":                   launch.completion,
                "satisfaction":                 launch.satisfaction,
                "measure_status":               launch.measure_status,
                "normalized_measure":           launch.normalized_measure,
                "experienced_duration_tracked": launch.experienced_duration_tracked,
                "launch_time":                  launch.launch_time,
                "exit_time":                    launch.exit_time,
                "update_dt":                    launch.update_dt
            });
        });

        return callback(error, data);

    });
}

SCORMCloud.prototype.getLaunchInfo = function (launchid, callback) {

    var url = new URL('api?method=rustici.registration.getLaunchInfo', this.serviceUrl);

    // The unique identifier for this launch.
    if (launchid) url.searchParams.set('launchid', launchid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = {
            "id":                           json.rsp.launch.id,
            "completion":                   json.rsp.launch.completion,
            "satisfaction":                 json.rsp.launch.satisfaction,
            "measure_status":               json.rsp.launch.measure_status,
            "normalized_measure":           json.rsp.launch.normalized_measure,
            "experienced_duration_tracked": json.rsp.launch.experienced_duration_tracked,
            "launch_time":                  json.rsp.launch.launch_time,
            "exit_time":                    json.rsp.launch.exit_time,
            "update_dt":                    json.rsp.launch.update_dt,
            "log": {
                "browser":                  json.rsp.launch.log.RuntimeLog.browser,
                "trackingEnabled":          _.lowerCase(json.rsp.launch.log.RuntimeLog.trackingEnabled) === 'true' ? true : false,
                "version":                  json.rsp.launch.log.RuntimeLog.version,
                "events":                   json.rsp.launch.log.RuntimeLog.RuntimeEvent
            }
        };

        return callback(error, data);

    });
}

SCORMCloud.prototype.resetGlobalObjectives = function (regid, callback) {

    var url = new URL('api?method=rustici.registration.resetGlobalObjectives', this.serviceUrl);

    // The unique identifier for this registration.
    if (regid) url.searchParams.set('regid', regid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.updateLearnerInfo = function (learnerid, fname, lname, options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.registration.updateLearnerInfo', this.serviceUrl);

    // The id of the learner whose info is being updated.
    if (learnerid) url.searchParams.set('learnerid', learnerid);

    // The first name of the learner.
    if (fname) url.searchParams.set('fname', fname);

    // The last name of the learner.
    if (lname) url.searchParams.set('lname', lname);

    // The new id to assign to this learner.
    if (options.newid) url.searchParams.set('newid', options.newid);

    // The email of the learner.
    if (options.email) url.searchParams.set('email', options.email);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

//
// Invitation Service
//

SCORMCloud.prototype.createInvitation = function (courseid, publicInvitation, options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.invitation.createInvitation', this.serviceUrl);

    // The id of the course for which the invitation will be created.
    if (courseid) url.searchParams.set('courseid', courseid);

    // A boolean specifying whether the invitation is public or private.
    if (publicInvitation === true) {
        url.searchParams.set('public', 'true');
    } else {
        url.searchParams.set('public', 'false');
    }

    // The subject of the email that will be sent to any addresses provided (for private invitations).
    if (options.emailSubject) url.searchParams.set('emailSubject', options.emailSubject);

    // The text that will be sent in the body of emails sent to any addresses provided (for private invitations).
    if (options.emailBody) url.searchParams.set('emailBody', options.emailBody);

    // A comma separated list of email addresses for which registrations will be created for private invitations.
    if (options.addresses) url.searchParams.set('addresses', options.addresses);

    // A boolean (“true” or “false” only, default “false”) parameter specifying whether the private invitations will be emailed to the provided addresses or not.
    if (options.send === true) url.searchParams.set('send', 'true');

    // The email of the user who is creating the invitation. This value is required in order to send private invitations.
    if (options.creatingUserEmail) url.searchParams.set('creatingUserEmail', options.creatingUserEmail);

    // Integer value of limit of public invitation registrations to allow.
    if (options.registrationCap) url.searchParams.set('registrationCap', options.registrationCap);

    // Specifies a URL for which to post activity and status data in real time as the course is completed.
    if (options.postbackurl) url.searchParams.set('postbackurl', options.postbackurl);

    // Optional parameter to specify how to authorize against the given postbackurl, can be “form” or “httpbasic”.
    if (options.authtype) url.searchParams.set('authtype', options.authtype);

    // You can optionally specify a login name to be used for credentials when posting to the URL specified in postbackurl.
    if (options.urlname) url.searchParams.set('urlname', options.urlname);

    // If credentials for the postbackurl are provided, this must be included, it is the password to be used in authorizing the postback of data to the URL specified by postbackurl.
    if (options.urlpass) url.searchParams.set('urlpass', options.urlpass);

    // This parameter allows you to specify a level of detail in the information that is posted back while the course is being taken. It may be one of three values: “course” (course summary), “activity” (activity summary, or “full” (full detail), and is set to “course” by default.
    if (options.resultsformat) url.searchParams.set('resultsformat', options.resultsformat);

    // The date this invitation will expire and can not be launched (formatted yyyyMMddHHmmss in UTC time).
    if (options.expirationdate) url.searchParams.set('expirationdate', options.expirationdate);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = json.rsp['_'];

        return callback(error, data);

    });
}

SCORMCloud.prototype.getInvitationInfo = function (invitationid, options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.invitation.getInvitationInfo', this.serviceUrl);

    // The id of the invitation.
    if (invitationid) url.searchParams.set('invitationId', invitationid);

    // A boolean (“true” or “false” only, default “false”) parameter specifying whether to return registration summary info for any user invitations that are returned for the invitation.
    //if (options.detail === true) url.searchParams.set('detail', 'true');

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        var data = {
            "id":                    json.rsp.invitationInfo.id,
            "body":                  json.rsp.invitationInfo.body,
            "courseId":              json.rsp.invitationInfo.courseId,
            "subject":               json.rsp.invitationInfo.subject,
            "url":                   json.rsp.invitationInfo.url,
            "allowLaunch":           _.lowerCase(json.rsp.invitationInfo.allowLaunch) === 'true' ? true : false,
            "allowNewRegistrations": _.lowerCase(json.rsp.invitationInfo.allowNewRegistrations) === 'true' ? true : false,
            "public":                _.lowerCase(json.rsp.invitationInfo.public) === 'true' ? true : false,
            "created":               _.lowerCase(json.rsp.invitationInfo.created) === 'true' ? true : false,
            "createdDate":           json.rsp.invitationInfo.createdDate,
            "userInvitations":       []
        }

        if (!_.isString(json.rsp.invitationInfo.userInvitations)) {

            let userInvitations = _.isArray(json.rsp.invitationInfo.userInvitations.userInvitation) ? json.rsp.invitationInfo.userInvitations.userInvitation : [ json.rsp.invitationInfo.userInvitations.userInvitation ];
            userInvitations.forEach(function (invitation) {
                data.userInvitations.push({
                    "email":          invitation.email,
                    "url":            invitation.url,
                    "isStarted":      _.lowerCase(invitation.isStarted) === 'true' ? true : false,
                    "registrationId": invitation.registrationId,
                    "registrationreport": {
                        "format":     invitation.registrationreport.format,
                        "regid":      invitation.registrationreport.regid,
                        "instanceid": invitation.registrationreport.instanceid,
                        "complete":   invitation.registrationreport.complete,
                        "success":    invitation.registrationreport.success,
                        "totaltime":  invitation.registrationreport.totaltime,
                        "score":      invitation.registrationreport.score
                    }
                });
            });

        }

        return callback(error, data);

    });
}

SCORMCloud.prototype.getInvitationList = function (options, callback) {

    if (typeof options === 'function') {
        callback = options; options = {};
    }

    var url = new URL('api?method=rustici.invitation.getInvitationList', this.serviceUrl);

    // A regular expression that will be used to filter the list of invitations. Specifically only those invitations whose invitationid’s match the given expression will be returned in the list.
    if (options.filter) url.searchParams.set('filter', options.filter);

    // A regular express that will be used to filter the list of invitations. Specifically only those invitations that are associated with courses whose courseid’s match the given expression will be returned in the list.
    if (options.coursefilter) url.searchParams.set('coursefilter', options.coursefilter);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = [];
        let invitationList = _.isArray(json.rsp.invitationlist.invitationInfo) ? json.rsp.invitationlist.invitationInfo : [ json.rsp.invitationlist.invitationInfo ];

        invitationList.forEach(function (invitation) {
            data.push({
               "id":                    invitation.id,
               "body":                  invitation.body,
               "courseId":              invitation.courseId,
               "subject":               invitation.subject,
               "url":                   invitation.url,
               "allowLaunch":           _.lowerCase(invitation.allowLaunch) === 'true' ? true : false,
               "allowNewRegistrations": _.lowerCase(invitation.allowNewRegistrations) === 'true' ? true : false,
               "public":                _.lowerCase(invitation.public) === 'true' ? true : false,
               "created":               _.lowerCase(invitation.created) === 'true' ? true : false,
               "createdDate":           invitation.createdDate
            });
        });

        return callback(error, data);

    });
}

//
// Tagging Service
//

SCORMCloud.prototype.getCourseTags = function (courseid, callback) {

    var url = new URL('api?method=rustici.tagging.getCourseTags', this.serviceUrl);

    // The id of the course for which the tags will be retrieved.
    if (courseid) url.searchParams.set('courseid', courseid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.flatten(_.toArray(json.rsp.tags));

        return callback(error, data);

    });
}

SCORMCloud.prototype.setCourseTags = function (courseid, tags, callback) {

    var url = new URL('api?method=rustici.tagging.setCourseTags', this.serviceUrl);

    // The id of the course for which the tags will be set.
    if (courseid) url.searchParams.set('courseid', courseid);

    // A comma separated list of tags to set for the course.
    if (tags) url.searchParams.set('tags', tags);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.addCourseTag = function (courseid, tag, callback) {

    var url = new URL('api?method=rustici.tagging.addCourseTag', this.serviceUrl);

    // The id of the course which the given tag will be associated with.
    if (courseid) url.searchParams.set('courseid', courseid);

    // The tag to associate with the course.
    if (tag) url.searchParams.set('tag', tag);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.removeCourseTag = function (courseid, tag, callback) {

    var url = new URL('api?method=rustici.tagging.removeCourseTag', this.serviceUrl);

    // The id of the course which the given tag will be associated with.
    if (courseid) url.searchParams.set('courseid', courseid);

    // The tag to remove from the course.
    if (tag) url.searchParams.set('tag', tag);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.getLearnerTags = function (learnerid, callback) {

    var url = new URL('api?method=rustici.tagging.getLearnerTags', this.serviceUrl);

    // The id of the learner for which the tags will be retrieved.
    if (learnerid) url.searchParams.set('learnerid', learnerid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.flatten(_.toArray(json.rsp.tags));

        return callback(error, data);

    });
}

SCORMCloud.prototype.setLearnerTags = function (learnerid, tags, callback) {

    var url = new URL('api?method=rustici.tagging.setLearnerTags', this.serviceUrl);

    // The id of the learner for which the tags will be set.
    if (learnerid) url.searchParams.set('learnerid', learnerid);

    // A comma separated list of tags to set for the learner.
    if (tags) url.searchParams.set('tags', tags);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.addLearnerTag = function (learnerid, tag, callback) {

    var url = new URL('api?method=rustici.tagging.addLearnerTag', this.serviceUrl);

    // The id of the learner which the given tag will be associated with.
    if (learnerid) url.searchParams.set('learnerid', learnerid);

    // The tag to associate with the learner.
    if (tag) url.searchParams.set('tag', tag);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.removeLearnerTag = function (learnerid, tag, callback) {

    var url = new URL('api?method=rustici.tagging.removeLearnerTag', this.serviceUrl);

    // The id of the learner which the given tag will be associated with.
    if (learnerid) url.searchParams.set('learnerid', learnerid);

    // The tag to remove from the learner.
    if (tag) url.searchParams.set('tag', tag);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.getRegistrationTags = function (regid, callback) {

    var url = new URL('api?method=rustici.tagging.getRegistrationTags', this.serviceUrl);

    // The id of the registration for which the tags will be retrieved.
    if (regid) url.searchParams.set('regid', regid);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.flatten(_.toArray(json.rsp.tags));

        return callback(error, data);

    });
}

SCORMCloud.prototype.setRegistrationTags = function (regid, tags, callback) {

    var url = new URL('api?method=rustici.tagging.setRegistrationTags', this.serviceUrl);

    // The id of the registration for which the tags will be set.
    if (regid) url.searchParams.set('regid', regid);

    // A comma separated list of tags to set for the registration.
    if (tags) url.searchParams.set('tags', tags);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.addRegistrationTag = function (regid, tag, callback) {

    var url = new URL('api?method=rustici.tagging.addRegistrationTag', this.serviceUrl);

    // The id of the registration which the given tag will be associated with.
    if (regid) url.searchParams.set('regid', regid);

    // The tag to associate with the registration.
    if (tag) url.searchParams.set('tag', tag);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.removeRegistrationTag = function (regid, tag, callback) {

    var url = new URL('api?method=rustici.tagging.removeRegistrationTag', this.serviceUrl);

    // The id of the registration which the given tag will be associated with.
    if (regid) url.searchParams.set('regid', regid);

    // The tag to remove from the registration.
    if (tag) url.searchParams.set('tag', tag);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

//
// Reporting Service
//

SCORMCloud.prototype.getAccountInfo = function (callback) {

    var url = new URL('api?method=rustici.reporting.getAccountInfo', this.serviceUrl);

    this._request(url, function (error, json) {

        if (error) return callback(error, json);

        let data = {
            "email":                  json.rsp.account.email,
            "firstname":              json.rsp.account.firstname,
            "lastname":               json.rsp.account.lastname,
            "company":                json.rsp.account.company,
            "accounttype":            json.rsp.account.accounttype,
            "reglimit":               _.toInteger(json.rsp.account.reglimit),
            "strictlimit":            _.lowerCase(json.rsp.account.strictlimit) === 'true' ? true : false,
            "createdate":             json.rsp.account.createdate,
            "usage": {
                "monthstart":         json.rsp.account.usage.monthstart,
                "regcount":           _.toInteger(json.rsp.account.usage.regcount),
                "totalregistrations": _.toInteger(json.rsp.account.usage.totalregistrations),
                "totalcourses":       _.toInteger(json.rsp.account.usage.totalcourses)
            }
        }

        return callback(error, data);

    });
}

//
// Helper Functions
//

SCORMCloud.prototype._getSig = function (url) {

    let parameterString = '';
    url.searchParams.forEach((value, name) => {
        parameterString += `${name}${value}`;
    });

    return md5(this.secretKey + parameterString);

}

SCORMCloud.prototype._getUrl = function (url) {

    if (!url.searchParams.has('appid'))
        url.searchParams.set('appid', this.appid);

    // See https://cloud.scorm.com/docs/advanced/communication.html#ts-parameter
    url.searchParams.set('ts', moment.utc().format('YYYYMMDDHHmmss'));

    // See https://cloud.scorm.com/docs/advanced/communication.html#sig-parameter
    url.searchParams.sort();
    url.searchParams.append('sig', this._getSig(url));

    return url.toString();

}

SCORMCloud.prototype._request = function (url, formData, callback) {

    if (typeof formData === 'function') {
        callback = formData; formData = {};
    }

    // See https://www.npmjs.com/package/request
    request.post({ url: this._getUrl(url), formData: formData}, function (error, response, body) {

        if (error) return callback(error);

        // See https://www.npmjs.com/package/xml2js
        parseString(body, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (VERBOSE) {
                console.log(body);
                console.log(util.inspect(json, false, null));
            }

            let error;
            if (json.rsp.stat === 'fail') {
                error = new Error(json.rsp.err.msg);
                json = { "error": { "code": _.toInteger(json.rsp.err.code), "message": json.rsp.err.msg } };
            }

            callback(error, json);
        });

    });

}
