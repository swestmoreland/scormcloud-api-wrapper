const { URL, URLSearchParams } = require('url');
const util = require('util');

var _ = require('lodash');
var md5 = require('md5');
var moment = require('moment');
var request = require('request');
var parseString = require('xml2js').parseString;

const VERBOSE = true;

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

    this._get(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'pong');

        return callback(error, data);

    });
}

//
// Course Service
//

SCORMCloud.prototype.courseExists = function (courseid, callback) {

    var url = new URL('api?method=rustici.course.exists', this.serviceUrl);

    // The id used to identify this course.
    if (courseid) url.searchParams.set('courseid', courseid);

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
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

    this._get(url, function (error, json) {

        if (error) return callback(error, json);

        let data = [];
        let courseList = _.isArray(json.rsp.courselist.course) ? json.rsp.courselist.course : [ json.rsp.courselist.course ];

        courseList.forEach(function (course) {
            data.push({
               "id":               course.id,
               "title":            course.title,
               "versions":         _.toInteger(course.versions),
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

}

//
// Registration Service
//

SCORMCloud.prototype.createRegistration = function (courseid, regid, fname, lname, learnerid, options, callback) {

}

SCORMCloud.prototype.registrationExists = function (regid, callback) {

    var url = new URL('api?method=rustici.course.exists', this.serviceUrl);

    // The id used to identify this registration.
    if (regid) url.searchParams.set('regid', regid);

    this._get(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.lowerCase(json.rsp.result) === 'true' ? true : false;

        return callback(error, data);

    });
}

SCORMCloud.prototype.deleteRegistration = function (regid, callback) {

    var url = new URL('api?method=rustici.registration.deleteRegistration', this.serviceUrl);

    // The unique identifier for this registration.
    if (regid) url.searchParams.set('regid', regid);

    this._get(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.resetRegistration = function (regid, callback) {

    var url = new URL('api?method=rustici.registration.resetRegistration', this.serviceUrl);

    // The unique identifier for this registration.
    if (regid) url.searchParams.set('regid', regid);

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

}

SCORMCloud.prototype.getRegistrationResult = function (regid, options, callback) {

}

SCORMCloud.prototype.getRegistrationListResults = function (options, callback) {

}

SCORMCloud.prototype.getLaunchHistory = function (regid, callback) {

}

SCORMCloud.prototype.getLaunchInfo = function (launchid, callback) {

}

//
// Invitation Service
//

SCORMCloud.prototype.createInvitation = function (courseid, public, options, callback) {

}

SCORMCloud.prototype.getInvitationInfo = function (invitationid, options, callback) {

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

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.getLearnerTags = function (learnerid, callback) {

    var url = new URL('api?method=rustici.tagging.getLearnerTags', this.serviceUrl);

    // The id of the learner for which the tags will be retrieved.
    if (learnerid) url.searchParams.set('learnerid', learnerid);

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

        if (error) return callback(error, json);

        let data = _.has(json.rsp, 'success');

        return callback(error, data);

    });
}

SCORMCloud.prototype.getRegistrationTags = function (regid, callback) {

    var url = new URL('api?method=rustici.tagging.getRegistrationTags', this.serviceUrl);

    // The id of the registration for which the tags will be retrieved.
    if (regid) url.searchParams.set('regid', regid);

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

    this._get(url, function (error, json) {

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

SCORMCloud.prototype._get = function (url, callback) {

    url.searchParams.set('appid', this.appid);

    // See https://cloud.scorm.com/docs/advanced/communication.html#ts-parameter
    url.searchParams.set('ts', moment.utc().format('YYYYMMDDHHmmss'));

    // See https://cloud.scorm.com/docs/advanced/communication.html#sig-parameter
    url.searchParams.sort();
    url.searchParams.append('sig', this._getSig(url));

    // See https://github.com/request/request
    request.get(url.toString(), function (error, response, body) {

        if (error) return callback(error);

        parseString(body, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (VERBOSE) {
                console.log(body);
                console.log(util.inspect(json, false, null));
            }

            let error;
            if (json.rsp.stat === 'fail') {
                error = new Error(json.rsp.err.msg);
            }

            callback(error, json);
        });

    });

}

SCORMCloud.prototype._getSig = function (url) {

    let parameterString = '';
    url.searchParams.forEach((value, name) => {
        parameterString += `${name}${value}`;
    });

    return md5(this.secretKey + parameterString);

}
