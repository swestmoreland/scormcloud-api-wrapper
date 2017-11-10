const https = require('https');
const { URL, URLSearchParams } = require('url');
const util = require('util');

var _ = require('lodash');
var md5 = require('md5');
var moment = require('moment');
var parseString = require('xml2js').parseString;

var SCORMCloud = function (appid, secretKey) {
    this.appid = appid;
    this.secretKey = secretKey;
    this.serviceUrl = 'https://cloud.scorm.com/EngineWebServices/';
}
module.exports = SCORMCloud;

//
// Course Service
//

SCORMCloud.prototype.getCourseList = function (callback, filter, tags) {

    var url = new URL('api?method=rustici.course.getCourseList', this.serviceUrl);

    // A regular expression that will be used to filter the list of courses. Specifically only those courses whose courseid’s match the given expression will be returned in the list.
    if (filter) url.searchParams.set('filter', filter);

    // A comma separated list of tags to filter results by. Results will include only courses which are tagged with every tag in the list.
    if (tags) url.searchParams.set('tags', tags);

    this._get(url, function (error, rawData) {

        console.log(rawData);
        parseString(rawData, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (json.rsp.stat === 'fail') return callback(new Error(json.rsp.err.msg), json.rsp.err);

            console.log(util.inspect(json, false, null));

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

            return callback(null, data);
        });

    });
}

//
// Registration Service
//

SCORMCloud.prototype.getRegistrationList = function (callback, courseid, learnerid, after, until) {

    var url = new URL('api?method=rustici.registration.getRegistrationList', this.serviceUrl);

    // Limit search to only registrations for the course specified by this courseid.
    if (courseid) url.searchParams.set('courseid', courseid);

    // Limit search to only registrations for the learner specified by this learnerid.
    if (learnerid) url.searchParams.set('learnerid', learnerid);

    // Return registrations updated (strictly) after this timestamp.
    if (after) url.searchParams.set('after', after);

    // Return registrations updated up to and including this timestamp.
    if (until) url.searchParams.set('until', until);

    this._get(url, function (error, rawData) {

        console.log(rawData);
        parseString(rawData, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (json.rsp.stat === 'fail') return callback(new Error(json.rsp.err.msg), json.rsp.err);

            console.log(util.inspect(json, false, null))

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

            return callback(null, data);
        });

    });
}

//
// Invitation Service
//

SCORMCloud.prototype.getInvitationList = function (callback, filter, coursefilter) {

    var url = new URL('api?method=rustici.invitation.getInvitationList', this.serviceUrl);

    // A regular expression that will be used to filter the list of invitations. Specifically only those invitations whose invitationid’s match the given expression will be returned in the list.
    if (filter) url.searchParams.set('filter', filter);

    // A regular express that will be used to filter the list of invitations. Specifically only those invitations that are associated with courses whose courseid’s match the given expression will be returned in the list.
    if (coursefilter) url.searchParams.set('coursefilter', coursefilter);

    this._get(url, function (error, rawData) {

        console.log(rawData);
        parseString(rawData, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (json.rsp.stat === 'fail') return callback(new Error(json.rsp.err.msg), json.rsp.err);

            console.log(util.inspect(json, false, null));

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

            return callback(null, data);
        });

    });
}

//
// Tagging Service
//

SCORMCloud.prototype.getCourseTags = function (callback, courseid) {

    var url = new URL('api?method=rustici.tagging.getCourseTags', this.serviceUrl);

    // The id of the course for which the tags will be retrieved.
    if (courseid) url.searchParams.set('courseid', courseid);

    this._get(url, function (error, rawData) {

        console.log(rawData);
        parseString(rawData, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (json.rsp.stat === 'fail') return callback(new Error(json.rsp.err.msg), json.rsp.err);

            console.log(util.inspect(json, false, null));

            let data = _.flatten(_.toArray(json.rsp.tags));

            return callback(null, data);
        });

    });
}

SCORMCloud.prototype.setCourseTags = function (callback, courseid, tags) {

    var url = new URL('api?method=rustici.tagging.setCourseTags', this.serviceUrl);

    // The id of the course for which the tags will be set.
    if (courseid) url.searchParams.set('courseid', courseid);

    // A comma separated list of tags to set for the course.
    if (tags) url.searchParams.set('tags', tags);

    this._get(url, function (error, rawData) {

        console.log(rawData);
        parseString(rawData, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (json.rsp.stat === 'fail') return callback(new Error(json.rsp.err.msg), json.rsp.err);

            console.log(util.inspect(json, false, null));

            let data = _.has(json.rsp, 'success');

            return callback(null, data);
        });

    });
}

SCORMCloud.prototype.getLearnerTags = function (callback, learnerid) {

    var url = new URL('api?method=rustici.tagging.getLearnerTags', this.serviceUrl);

    // The id of the learner for which the tags will be retrieved.
    if (learnerid) url.searchParams.set('learnerid', learnerid);

    this._get(url, function (error, rawData) {

        console.log(rawData);
        parseString(rawData, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (json.rsp.stat === 'fail') return callback(new Error(json.rsp.err.msg), json.rsp.err);

            console.log(util.inspect(json, false, null));

            let data = _.flatten(_.toArray(json.rsp.tags));

            return callback(null, data);
        });

    });
}

SCORMCloud.prototype.getRegistrationTags = function (callback, regid) {

    var url = new URL('api?method=rustici.tagging.getRegistrationTags', this.serviceUrl);

    // The id of the registration for which the tags will be retrieved.
    if (regid) url.searchParams.set('regid', regid);

    this._get(url, function (error, rawData) {

        console.log(rawData);
        parseString(rawData, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (json.rsp.stat === 'fail') return callback(new Error(json.rsp.err.msg), json.rsp.err);

            console.log(util.inspect(json, false, null));

            let data = _.flatten(_.toArray(json.rsp.tags));

            return callback(null, data);
        });

    });
}

//
// Reporting Service
//

SCORMCloud.prototype.getAccountInfo = function (callback) {

    var url = new URL('api?method=rustici.reporting.getAccountInfo', this.serviceUrl);

    this._get(url, function (error, rawData) {

        console.log(rawData);
        parseString(rawData, { explicitArray: false, mergeAttrs: true }, function (err, json) {
            if (err) throw err;

            if (json.rsp.stat === 'fail') return callback(new Error(json.rsp.err.msg), json.rsp.err);

            console.log(util.inspect(json, false, null));

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

            return callback(null, data);
        });

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

    https.get(url, (res) => {

        const contentType = res.headers['content-type'];
        const { statusCode } = res;

        let error;
        if (statusCode !== 200) {
            error = new Error(`Request Failed. Status Code: ${statusCode}`);
        } else if (!/^text\/xml/.test(contentType)) {
            error = new Error(`Invalid content-type. Expected text/xml but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            res.resume();
            return;
        }

        res.setEncoding('utf8');

        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            callback(null, rawData);
        });

    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });

}

SCORMCloud.prototype._getSig = function (url) {

    let parameterString = '';
    url.searchParams.forEach((value, name) => {
        parameterString += `${name}${value}`;
    });

    return md5(this.secretKey + parameterString);

}
