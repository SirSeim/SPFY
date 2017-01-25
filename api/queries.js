var xlsx = require('node-xlsx');

var parseProperty = function(property) {
    // if (typeof property === 'boolean') {
    //     property = property === true ? '1' : '0';
    // }
    if (property === undefined) {
        property = 'null';
    }
    if (typeof property === 'string' && property === '') {
        property = null;
    }
    if (property === 'null') {
        return null;
    } else {
        return property;
    }
};

// *** Postgres allows rows with duplicate data, so currently
// same data inserted twice will be stored in two separate rows
// need to figure out how to "only insert if not exists" implementation
// order of these properties
// must match order of payload properties

// later we will find a way to mirror the field names in each table
// so we don't have to cache them like this
var profileProperties = [
    'first_name',
    'last_name',
    'nickname',
    'person_completing_intake',
    'intake_date',
    'hmis_consent',
    'first_time',
    'case_manager',
    'case_manager_id',
    'phone_number',
    'email',
    'date_of_birth',
    'intake_age',
    'provided_id',
    'id_state',
    // reference,
    // services,
    // reference,
    // services,
    // disability,
    // lastGradeCompleted,
    // someCompleted,
    // currentlyAttending,
    // graduated,
    // firstLanguage,
    // preferredLanguage,
    // maritalStatus,
    // militaryService,
    // healthInsurance,
    // gender,
    // genderIdentification,
    // preferredPronoun,
    // ethnicity,
    // race,
    // lastSleepingLocation,
    // lastSleepingDuration,
    // firstDayFirstTimeHomeless,
    // currentHomelessStartDate,
    // currentHomelessLength,
    // homelessEpisodeCount,
    // locationBeforeWestLA,
    // durationInWestLA,
    // housingInstabilityCause,
    // stableHousingObstacle,
    // housingInterest,
    // naturalConnection,
    // contactName,
    // contactPhoneNumber,
    // contactRelationship,
    // currentlyPregnant,
    // firstPregnancy,
    // preNatalCareReceived,
    // preNatalCareLocation,
    // preNatalCareDesired,
    // trimester,
    // babyDueDate,
    // hasOtherChildren,
    // dcfsOpenCase,
    // childrenWithFamilyOrFriends,
    // substanceAbuse,
    // choiceSubstance,
    // injectedDrugs,
    // treatmentInterest,
    // mentalServicesReceived,
    // mentalServicesLocation,
    // mentalMedication,
    // helpAcquiringMedicine,
    // internalReferral,
    // externalReferral,
    // income,
    // birthCity,
    // birthState,
    // birthCountry,
    // employed,
    // lookingForEmployment,
    // fosterCare,
    // socialSecurityNumber,
    // caringForAnimals,
    // goodNeighborContract,
    // storyPhotoVideoAudioForm,
    // informationReleaseAuthorized,
    // servicesConsent,
    // showerInstructions,
    // showerGuidelines,
    // dropInGuidelines,
    // intakeConfirmation,
    // immediateNeedsConfirmation,
    // documentsSigned,
    // sleepingBag,
    // backpack
];

// again, working on solution to avoid doing this
var activityProperties = [
    'program_id',
    'activity_name',
    'location', 
    'ongoing',
    'start_time',
    'end_time'
];

// *** Postgres allows rows with duplicate data, so currently
// same data inserted twice will be stored in two separate rows
// need to figure out how to "only insert if not exists" implementation
var queries = {

    // *** with this implementation, the order of the properties
    // in payload determines the order of the specified column names
    // in the queryString   INSERT INTO client (firstname, nickname, lastname) VALUES ...
    //                                          ^^^^^^^^^  ^^^^^^^^  ^^^^^^^^
    createClient: function (payload) {
        var queryString = 'INSERT INTO client (';
        var payloadNames = [];
        var props = [];
        var params = [];

        var profilePropNames = profileProperties.map(function (element) {
            return element.toLowerCase().replace(/_/g, '');
        });

        for (var property in payload) {
            var index = profilePropNames.indexOf(property.toLowerCase());
            if (index !== -1) {
                props.push(profileProperties[index]);
                payloadNames.push(property);
            }
        }

        props.forEach(function (element, index) {
            queryString += props[index] + ', ';
        });

        queryString = queryString.slice(0, queryString.lastIndexOf(','));
        queryString += ') VALUES (';

        payloadNames.forEach(function (element, index) {
            queryString += '$' + (index + 1) + ', ';
            params.push(parseProperty(payload[payloadNames[index]]));
        });

        queryString = queryString.slice(0, queryString.lastIndexOf(','));
        queryString += ') RETURNING ';

        props.forEach(function (element) {
            queryString += element + ', ';
        });

        queryString = queryString.slice(0, queryString.lastIndexOf(','));
        queryString += ';';

        var queryData = {
            string: queryString,
            params: params
        };

        return queryData;

        // var queryString = 'INSERT INTO client (first_name, last_name, nickname,'
        //                 +   'person_completing_intake, hmis_consent, first_time,'
        //                 +   'email, provided_id, state_id) VALUES (';


        // // frontend people are using this for naming standards in their JSON
        // queryString += parseProperty(payload.firstName) + ',';
        // queryString += parseProperty(payload.lastName) + ',';
        // queryString += parseProperty(payload.nickname) + ',';
        // queryString += parseProperty(payload.personCompletingIntake) + ',';
        // // queryString += parseProperty(payload.intakeDate) + ',';
        // queryString += parseProperty(payload.HMISConsent) + ',';
        // queryString += parseProperty(payload.firstTime) + ',';
        // // queryString += parseProperty(payload.caseManager) + ',';
        // // queryString += parseProperty(payload.caseManagerID) + ',';
        // // queryString += parseProperty(payload.phoneNumber) + ',';
        // queryString += parseProperty(payload.email) + ',';
        // // queryString += parseProperty(payload.dob) + ',';
        // // queryString += parseProperty(payload.intakeAge) + ',';
        // queryString += parseProperty(payload.providedID) + ',';
        // queryString += parseProperty(payload.stateID);
        // // queryString += parseProperty(payload.reference) + ',';
        // // queryString += parseProperty(payload.services) + ',';
        // // queryString += parseProperty(payload.disability) + ',';
        // // queryString += parseProperty(payload.lastGradeCompleted) + ',';
        // // queryString += parseProperty(payload.someCompleted) + ',';
        // // queryString += parseProperty(payload.currentlyAttending) + ',';
        // // queryString += parseProperty(payload.graduated) + ',';
        // // queryString += parseProperty(payload.firstLanguage) + ',';
        // // queryString += parseProperty(payload.preferredLanguage) + ',';
        // // queryString += parseProperty(payload.maritalStatus) + ',';
        // // queryString += parseProperty(payload.militaryService) + ',';
        // // queryString += parseProperty(payload.healthInsurance) + ',';
        // // queryString += parseProperty(payload.gender) + ',';
        // // queryString += parseProperty(payload.genderIdentification) + ',';
        // // queryString += parseProperty(payload.preferredPronoun) + ',';
        // // queryString += parseProperty(payload.ethnicity) + ',';
        // // queryString += parseProperty(payload.race) + ',';
        // // queryString += parseProperty(payload.lastSleepingLocation) + ',';
        // // queryString += parseProperty(payload.lastSleepingDuration) + ',';
        // // queryString += parseProperty(payload.firstDayFirstTimeHomeless) + ',';
        // // queryString += parseProperty(payload.currentHomelessStartDate) + ',';
        // // queryString += parseProperty(payload.currentHomelessLength) + ',';
        // // queryString += parseProperty(payload.homelessEpisodeCount) + ',';
        // // queryString += parseProperty(payload.locationBeforeWestLA) + ',';
        // // queryString += parseProperty(payload.durationInWestLA) + ',';
        // // queryString += parseProperty(payload.housingInstabilityCause) + ',';
        // // queryString += parseProperty(payload.stableHousingObstacle) + ',';
        // // queryString += parseProperty(payload.housingInterest) + ',';
        // // queryString += parseProperty(payload.naturalConnection) + ',';
        // // queryString += parseProperty(payload.contactName) + ',';
        // // queryString += parseProperty(payload.contactPhoneNumber) + ',';
        // // queryString += parseProperty(payload.contactRelationship) + ',';
        // // queryString += parseProperty(payload.currentlyPregnant) + ',';
        // // queryString += parseProperty(payload.firstPregnancy) + ',';
        // // queryString += parseProperty(payload.preNatalCareReceived) + ',';
        // // queryString += parseProperty(payload.preNatalCareLocation) + ',';
        // // queryString += parseProperty(payload.preNatalCareDesired) + ',';
        // // queryString += parseProperty(payload.trimester) + ',';
        // // queryString += parseProperty(payload.babyDueDate) + ',';
        // // queryString += parseProperty(payload.hasOtherChildren) + ',';
        // // queryString += parseProperty(payload.dcfsOpenCase) + ',';
        // // queryString += parseProperty(payload.childrenWithFamilyOrFriends) + ',';
        // // queryString += parseProperty(payload.substanceAbuse) + ',';
        // // queryString += parseProperty(payload.choiceSubstance) + ',';
        // // queryString += parseProperty(payload.injectedDrugs) + ',';
        // // queryString += parseProperty(payload.treatmentInterest) + ',';
        // // queryString += parseProperty(payload.mentalServicesReceived) + ',';
        // // queryString += parseProperty(payload.mentalServicesLocation) + ',';
        // // queryString += parseProperty(payload.mentalMedication) + ',';
        // // queryString += parseProperty(payload.helpAcquiringMedicine) + ',';
        // // queryString += parseProperty(payload.internalReferral) + ',';
        // // queryString += parseProperty(payload.externalReferral) + ',';
        // // queryString += parseProperty(payload.income) + ',';
        // // queryString += parseProperty(payload.birthCity) + ',';
        // // queryString += parseProperty(payload.birthState) + ',';
        // // queryString += parseProperty(payload.birthCountry) + ',';
        // // queryString += parseProperty(payload.employed) + ',';
        // // queryString += parseProperty(payload.lookingForEmployment) + ',';
        // // queryString += parseProperty(payload.fosterCare) + ',';
        // // queryString += parseProperty(payload.socialSecurityNumber) + ',';
        // // queryString += parseProperty(payload.caringForAnimals) + ',';
        // // queryString += parseProperty(payload.goodNeighborContract) + ',';
        // // queryString += parseProperty(payload.storyPhotoVideoAudioForm) + ',';
        // // queryString += parseProperty(payload.informationReleaseAuthorized) + ',';
        // // queryString += parseProperty(payload.servicesConsent) + ',';
        // // queryString += parseProperty(payload.showerInstructions) + ',';
        // // queryString += parseProperty(payload.showerGuidelines) + ',';
        // // queryString += parseProperty(payload.dropInGuidelines) + ',';
        // // queryString += parseProperty(payload.intakeConfirmation) + ',';
        // // queryString += parseProperty(payload.immediateNeedsConfirmation) + ',';
        // // queryString += parseProperty(payload.documentsSigned) + ',';
        // // queryString += parseProperty(payload.sleepingBag) + ',';
        // // queryString += parseProperty(payload.backpack) + ')';
        // queryString += ');';
    },

    // ** TODO: paramaterize all of these functions
    // ** parameterize queries!!! Taking user input and using it
    // directly in the query makes the code vulnerable to SQL injection
    // also, apostraphies in names could throw off syntax

    // This gets called in query.js by Queries module
    getAllCaseManagers: function () {
        var queryString = 'SELECT id, first_name, last_name FROM casemanager;';
        return queryString;
    },

    getClient: function (clientID) {
        // var queryString = 'SELECT id, first_name, last_name, intake_date, phone_number, email, ' +
        //                     'date_of_birth, age(date_of_birth), status, caseplan FROM client WHERE id = ' +
        //                     '\'' + clientID + '\'' + ';';
        var queryString = 'SELECT id, first_name, last_name, intake_date, phone_number, email, ' +
                            'date_of_birth, age(date_of_birth), caseplan FROM client WHERE id = ' +
                            '\'' + clientID + '\'' + ';';
        return queryString;
    },

    searchClient: function (firstName, lastName) {
        // console.log(firstName);
        // console.log(lastName);
        var queryString = 'SELECT id, first_name, last_name FROM client WHERE';
        var setFirstName = false;
        if (firstName) {
            queryString += ' first_name = \'' + firstName + '\'';
            setFirstName = true;
        }
        if (lastName) {
            if (setFirstName) {
                queryString += ' AND';
            }
            queryString += ' last_name = \'' + lastName + '\'';
        }
        queryString += ';';

        return queryString;
    },

    getClients: function () {
        // var queryString = 'SELECT id, first_name, last_name, status, date_of_birth, phone_number, email FROM client;';
        var queryString = 'SELECT id, first_name, last_name, date_of_birth, phone_number, email FROM client;';

        return queryString;
    },

    createDropIn: function (payload) {
        var queryString = 'INSERT INTO drop_in (date) VALUES (\'' + payload.date + '\') RETURNING id, date;';

        return queryString;
    },

    getDropIns: function () {
        var queryString = 'SELECT id, date FROM drop_in;';

        return queryString;
    },
    getLatestDropIns: function (latest) {
        var queryString = 'SELECT * FROM drop_in ORDER BY date DESC LIMIT ' + latest + ';';

        return queryString;
    },
    getDropIn: function (dropin) {
        var queryString = 'SELECT id, date FROM drop_in WHERE id = ' +
                            dropin + ';';

        return queryString;
    },

    createDropinActivities: function (payload) {
        var queryString = "";
        payload.forEach(function (element) {
            queryString += 'INSERT INTO match_drop_in_activity (drop_in_id, activity_id) VALUES( ' +
                            element.dropinID + ', ' +
                            element.activityID + '); ';
        });

        return queryString;
    },

    getDropinActivities: function (dropin) {

        var queryString = 'SELECT activity.id, activity.activity_name, match_drop_in_activity.room, ' +
                'match_drop_in_activity.comments, match_drop_in_activity.start_time, ' +
                'match_drop_in_activity.end_time, program.id AS program_id, program.program_name FROM activity, ' +
                'match_drop_in_activity, program WHERE activity.id = match_drop_in_activity.activity_id ' +
                'AND match_drop_in_activity.drop_in_id = ' + dropin + ' AND activity.program_id = program.id;';
        return queryString;
    },
    addActivitiesToDropIn: function (dropinID, payload) {
        var queryString = '';
        for (var i = 0; i < payload.activities.length; i++) {
            var local = payload.activities[i];
            queryString += 'INSERT INTO match_drop_in_activity (drop_in_id, activity_id';
            if (local.room) {
                queryString += ', room';
            }
            if (local.comments) {
                queryString += ', comments';
            }
            if (local.startTime) {
                queryString += ', start_time';
            }
            if (local.endTime) {
                queryString += ', end_time';
            }
            queryString += ') VALUES (\'' + dropinID + '\', \'' + local.id + '\'';
            if (local.room) {
                queryString += ', \'' + local.room + '\'';
            }
            if (local.comments) {
                queryString += ', \'' + local.comments + '\'';
            }
            if (local.startTime) {
                queryString += ', \'' + local.startTime + '\'';
            }
            if (local.endTime) {
                queryString += ', \'' + local.endTime + '\'';
            }
            queryString += '); ';
        }

        return queryString;
    },
    removeActivitiesFromDropin: function (dropinID, payload) {
        var queryString = '';
        payload.activities.forEach(function (activityID) {
            queryString += 'DELETE FROM enrollment WHERE enrollment.drop_in_activity_id = ' +
                    '(SELECT match_drop_in_activity.id FROM match_drop_in_activity WHERE ' +
                    'match_drop_in_activity.drop_in_id = ' +
                    dropinID + ' AND match_drop_in_activity.activity_id = ' +
                    activityID + '); DELETE FROM match_drop_in_activity WHERE ' +
                    'match_drop_in_activity.drop_in_id = ' +
                    dropinID + ' AND match_drop_in_activity.activity_id = ' +
                    activityID + ' RETURNING match_drop_in_activity.activity_id;';
        });

        return queryString;
    },
    getDropinActivity: function (dropinID, activityID) {
        var queryString = 'SELECT activity.id, activity.activity_name, match_drop_in_activity.room, ' +
                'match_drop_in_activity.comments, match_drop_in_activity.start_time, ' +
                'match_drop_in_activity.end_time, program.id AS program_id, program.program_name ' +
                'FROM activity, match_drop_in_activity, program WHERE activity.id = ' +
                'match_drop_in_activity.activity_id AND match_drop_in_activity.drop_in_id = ' +
                dropinID + ' AND match_drop_in_activity.activity_id = ' +
                activityID + ' AND activity.program_id = program.id;';

        return queryString;
    },
    getDropinActivityEnrollment: function (dropinID, activityID) {
        var queryString = 'SELECT client.id, client.first_name, client.last_name FROM client WHERE ' +
                    'client.id IN (SELECT enrollment.client_id FROM enrollment, match_drop_in_activity ' +
                    'WHERE enrollment.drop_in_activity_id = match_drop_in_activity.id AND ' +
                    'match_drop_in_activity.drop_in_id = ' + dropinID +
                    ' AND match_drop_in_activity.activity_id = ' + activityID + ');';

        return queryString;
    },
    addEnrollmentToDropinActivity: function (dropinID, activityID, payload) {
        var queryString = '';
        payload.clients.forEach(function (clientID) {
            queryString += 'INSERT INTO enrollment (drop_in_activity_id, client_id) SELECT ' +
                    'match_drop_in_activity.id, \'' + clientID + '\' FROM match_drop_in_activity WHERE ' +
                    'match_drop_in_activity.drop_in_id = ' +
                    dropinID + ' AND match_drop_in_activity.activity_id = ' +
                    activityID + ' AND NOT EXISTS (SELECT enrollment.id FROM enrollment, match_drop_in_activity ' +
                    'WHERE enrollment.client_id = ' + clientID + ' AND enrollment.drop_in_activity_id = ' +
                    'match_drop_in_activity.id AND match_drop_in_activity.drop_in_id = ' +
                    dropinID + ' AND match_drop_in_activity.activity_id = ' +
                    activityID + ') RETURNING client_id;';
        });

        return queryString;
    },
    removeEnrollmentToDropinActivity: function (dropinID, activityID, payload) {
        var queryString = "";
        payload.clients.forEach(function (clientID) {
            queryString += 'DELETE FROM enrollment WHERE enrollment.drop_in_activity_id = ' +
                '(SELECT match_drop_in_activity.id FROM match_drop_in_activity WHERE ' +
                'match_drop_in_activity.drop_in_id = ' + dropinID + ' AND match_drop_in_activity.activity_id = ' +
                activityID + ') AND enrollment.client_id = ' + clientID + ' RETURNING client_id;';
        });

        return queryString;

    },
    getDropinEnrollment: function (dropinID) {
        var queryString = 'SELECT client_id, activity_id FROM enrollment WHERE drop_in_id =' + dropinID + ';';

        return queryString;
    },
    getAllActivities: function () {
        var queryString = 'SELECT activity.id, activity.activity_name, activity.location, activity.ongoing, ' +
                'activity.start_time, activity.end_time, activity.program_id AS program_id, ' +
                'program.program_name FROM activity, program WHERE activity.program_id = program.id;';

        return queryString;
    },

    getActivity: function (activity) {
        var queryString = 'SELECT activity.id, activity.activity_name, activity.location, activity.ongoing, ' +
                'activity.start_time, activity.end_time, activity.program_id AS program_id, program.program_name ' +
                'FROM activity, program WHERE activity.program_id = program.id AND activity.id = ' + activity + ';';

        return queryString;
    },

    getActivityDropIns: function (activity) {
        var queryString = 'SELECT drop_in.id, drop_in.date, match_drop_in_activity.room, ' +
                        'match_drop_in_activity.comments, match_drop_in_activity.start_time, ' +
                        'match_drop_in_activity.end_time FROM drop_in, match_drop_in_activity ' +
                        'WHERE drop_in.id = match_drop_in_activity.drop_in_id ' +
                        'AND match_drop_in_activity.activity_id = ' + activity + ';';

        return queryString;
    },

    editClient: function (payload) {
        var queryString = 'UPDATE client SET ';

        queryString += 'first_name = ' + '\'' + parseProperty(payload.firstName) + '\'' + ', ';
        queryString += 'last_name = ' + '\'' + parseProperty(payload.lastName) + '\'' + ', ';
        // queryString += 'nickname = ' + parseProperty(payload.nickname) + ',';
        if (parseProperty(payload.birthday)) {
            queryString += 'date_of_birth = ' + '\'' + parseProperty(payload.birthday) + '\'' + ', ';
        }
        // queryString += 'intake_age = ' + '\'' + parseProperty(payload.age) + '\'' + ', ';
        queryString += 'phone_number = ' + '\'' + parseProperty(payload.phoneNumber) + '\'' + ', ';
        queryString += 'email = ' + '\'' + parseProperty(payload.email) + '\'' + ', ';
        // queryString += 'last_meeting = ' + '\'' + parseProperty(payload.lastMeeting) + '\'' + ',';
        queryString += 'case_manager = ' + '\'' + parseProperty(payload.caseManager) + '\' '; // + ', ';

        // if (parseProperty(payload.status)) {
        //     queryString += 'status = ' + '\'' + parseProperty(payload.status) + '\'' + ' ';
        // } else {
        //     queryString += 'status = ' + '\'1\'' + ' ';
        // }

        queryString += 'WHERE id = ' + '\'' + payload.id + '\'' + ' ';

        queryString += 'RETURNING id, first_name, last_name, date_of_birth, ' +
                        'age(date_of_birth), phone_number, email, case_manager;'; // , status;';

        return queryString;
    },

    createActivity: function (payload) {
        var queryString = 'INSERT INTO activity (';

        var payloadNames = [];
        var props = [];
        var params = [];

        var activityPropNames = activityProperties.map(function (element) {
            return element.toLowerCase().replace(/_/g, '');
        });

        for (var property in payload) {
            var index = activityPropNames.indexOf(property.toLowerCase());
            if (index !== -1) {
                props.push(activityProperties[index]);
                payloadNames.push(property);
            }
        }

        props.forEach(function (element, index) {
            queryString += props[index] + ', ';
        });

        queryString = queryString.slice(0, queryString.lastIndexOf(','));
        queryString += ') VALUES (';

        payloadNames.forEach(function (element, index) {
            queryString += '$' + (index + 1) + ', ';
            params.push(parseProperty(payload[payloadNames[index]]));
        });

        queryString = queryString.slice(0, queryString.lastIndexOf(','));
        queryString += ') RETURNING ';

        props.forEach(function (element) {
            queryString += element + ', ';
        });

        queryString = queryString.slice(0, queryString.lastIndexOf(','));
        queryString += ';';

        var queryData = {
            string: queryString,
            params: params
        };

        return queryData;
    },

    editActivity: function (payload) {
        var queryString = 'UPDATE activity SET ';

        queryString += 'activity_name = ' + parseProperty(payload.activity_name) + ',';
        queryString += 'ongoing = ' + parseProperty(payload.onGoing) + ',';
        queryString += 'start_date = ' + parseProperty(payload.startDate) + ',';
        queryString += 'end_date = ' + parseProperty(payload.endDate) + ',';

        queryString += 'WHERE id = ' + payload.id;

        return queryString;
    },

    enroll: function (payload) {
        var queryString = "";
        payload.forEach(function (element) {
            queryString += 'INSERT INTO enrollment (drop_in_id, client_id, activity_id) VALUES( ' +
                            element.dropinID + ', ' +
                            element.clientID + ', ' +
                            element.activityID + '); ';
        });

        return queryString;
    },

    getEnrollmentByActivity: function (activityID) {
        var queryString = "SELECT client_id FROM enrollment WHERE activity_id = " + activityID + ";";

        return queryString;
    },

    addCheckinForDropin: function (dropinID, payload) {
        var queryString = "";
        payload.clients.forEach(function (clientID) {
            queryString += 'INSERT INTO check_in (drop_in_id, client_id) SELECT \'' +
                    dropinID + '\', \'' +
                    clientID + '\' WHERE NOT EXISTS (SELECT id FROM check_in WHERE drop_in_id = \'' +
                    dropinID + '\' AND client_id = \'' +
                    clientID + '\') RETURNING drop_in_id, client_id;';
        });

        return queryString;
    },

    removeCheckinForDropin: function (dropinID, payload) {
        var queryString = "";
        payload.clients.forEach(function (clientID) {
            queryString += 'DELETE FROM check_in WHERE drop_in_id = ' + dropinID + ' AND ' +
                            'client_id = ' + clientID + ' RETURNING client_id;';
        });

        return queryString;
    },

    getCheckInForDropin: function (dropinID) {
        var queryString = 'SELECT client_id FROM check_in WHERE drop_in_id = ' + dropinID + ';';

        return queryString;
    },

    dataBrowserGetClients: function () {
        var queryString = 'SELECT * FROM client;';

        return queryString;
    },

    dataBrowserSearchClients: function (data) {
        var TYPE_STRING = 1043;
        var TYPE_INT = 23;
        var TYPE_BOOL = 16;

        var searchText = "";
        var operators = ["=", "!=", ">", "<"];

        if (data.columnType === TYPE_STRING) {
            searchText = ' LIKE \'' + (data.status === 1 ? data.data : '%' + data.data + '%') + '\'';
        } else if (data.columnType === TYPE_INT) {
            searchText = ' ' + operators[data.status] + ' ' + data.data;
        } else if (data.columnType === TYPE_BOOL) {
            if (data.status === 0 || data.status === 1) {
                searchText = ' = ' + (data.status === 0 ? 'true' : 'false');
            } else {
                searchText = ' IS ' + (data.status === 2 ? 'NOT ' : '') + 'NULL';
            }
        } else { // DATE: 1082
            if (data.status < 4) {
                searchText = operators[data.status] + ' \'' + data.data + '\'';
            } else { 
                searchText = (data.status === 5 ? ' NOT' : '') + ' BETWEEN ' + '\'' + 
                    data.data + '\' AND \'' + data.secondData + '\'';
            }
        }

        var queryString = 'SELECT * FROM client WHERE ' +
                          data.column + searchText + ';';

        return queryString;
    },

    createCaseNote: function (payload) {
        var queryString = 'INSERT INTO case_note (client_id, case_manager_id, date, category, ' +
            'note, follow_up_needed, due_date, reminder_date) VALUES (' +
            '\'' + parseProperty(payload.clientID) + '\'' + ', ' +
            '\'' + parseProperty(payload.caseManagerID) + '\'' + ', ' +
            '\'' + parseProperty(payload.date) + '\'' + ', ' +
            '\'' + parseProperty(payload.category) + '\'' + ', ' +
            '\'' + parseProperty(payload.note) + '\'' + ', ' +
            '\'' + parseProperty(payload.followUpNeeded) + '\'' + ', ';

        if (parseProperty(payload.dueDate) === null) {
            queryString += 'null, ';
        } else {
            queryString += '\'' + parseProperty(payload.dueDate) + '\'' + ', ';
        }

        if (parseProperty(payload.reminderDate) === null) {
            queryString += 'null);';
        } else {
            queryString += '\'' + parseProperty(payload.reminderDate) + '\'' + ');';
        }


        return queryString;
    },

    getClientCaseNotes: function (clientID) {
        var queryString = 'SELECT n.id, client_id, case_manager_id, date, category, first_name, ' +
            'last_name, note, follow_up_needed, due_date, reminder_date FROM case_note n LEFT JOIN ' +
            'casemanager m ON n.case_manager_id = m.id WHERE client_id = ' + clientID + ';';

        return queryString;
    },

    getCaseNote: function (noteID) {
        var queryString = 'SELECT n.id, client_id, case_manager_id, date, category, first_name, ' +
            'last_name, note, follow_up_needed, due_date, reminder_date FROM case_note n LEFT JOIN ' +
            'casemanager m ON n.case_manager_id = m.id WHERE n.id = ' + noteID + ';';

        return queryString;

    },

    editCaseNote: function (payload) {

        var queryString = 'UPDATE case_note SET ';

        queryString += 'client_id = ' + '\'' + parseProperty(payload.clientID) + '\'' + ',';
        queryString += 'case_manager_id = ' + '\'' + parseProperty(payload.caseManagerID) + '\'' + ',';
        queryString += 'date = ' + '\'' + parseProperty(payload.date) + '\'' + ',';
        queryString += 'note = ' + '\'' + parseProperty(payload.note) + '\'' + ',';
        queryString += 'category = ' + '\'' + parseProperty(payload.category) + '\'' + ',';
        queryString += 'follow_up_needed = ' + '\'' + parseProperty(payload.followUpNeeded) + '\'' + ',';

        if (parseProperty(payload.dueDate) === null) {
            queryString += 'due_date = null, ';
        } else {
            queryString += 'due_date = ' + '\'' + parseProperty(payload.dueDate) + '\'' + ', ';
        }

        if (parseProperty(payload.reminderDate) === null) {
            queryString += 'reminder_date = null ';
        } else {
            queryString += 'reminder_date = ' + '\'' + parseProperty(payload.reminderDate) + '\'' + ' ';
        }

        queryString += 'WHERE id = ' + '\'' + payload.id + '\'' + ' ';

        queryString += 'RETURNING client_id, case_manager_id, date, note, follow_up_needed, due_date, reminder_date;';

        console.log(queryString);

        return queryString;
    },

    getUserList: function () {
        var queryString = 'SELECT id, username FROM users;';

        return queryString;
    },

    getUserByQuery: function (query) {
        var queryString = 'SELECT id, username, hashed_password FROM users WHERE';
        var setId = false;

        if (query.id) {
            queryString += ' id = \'' + query.id + '\'';
            setId = true;
        }
        if (query.username) {
            if (setId) {
                queryString += ' AND';
            }
            queryString += ' username = \'' + query.username + '\'';
        }
        queryString += ';';

        return queryString;
    },

    createUser: function (payload) {
        var queryString = 'INSERT INTO users ("username", "hashed_password") VALUES (\'' +
                            payload.username + '\', \'' +
                            payload.password + '\');';

        return queryString;
    },

    updateUser: function (userId, payload) {
        var queryString = 'UPDATE users SET username = \'' + payload.username +
                            '\' WHERE id = \'' + userId + '\';';

        return queryString;
    },

    getUsersNotifications: function (userId) {
        var queryString = 'SELECT id, type, comment, link, checked FROM notifications WHERE user_id = ' + userId +
                            ' AND checked = false ORDER BY id;';
        return queryString;
    },

    createNotification: function (userId, payload) {
        var queryString = 'INSERT INTO notifications (';
        queryString += 'user_id';
        if (payload.type) {
            queryString += ', type';
        }
        if (payload.comment) {
            queryString += ', comment';
        }
        if (payload.link) {
            queryString += ', link';
        }
        if (payload.checked) {
            queryString += ', checked';
        }
        queryString += ') VALUES (' + userId;
        if (payload.type) {
            queryString += ', \'' + payload.type + '\'';
        }
        if (payload.comment) {
            queryString += ', \'' + payload.comment + '\'';
        }
        if (payload.link) {
            queryString += ', \'' + payload.link + '\'';
        }
        if (payload.checked) {
            queryString += ', \'' + payload.checked + '\'';
        }
        queryString += ') RETURNING id, user_id, type, comment, link, checked;';

        return queryString;
    },

    getNotificationById: function (noteId) {
        var queryString = 'SELECT id, user_id, type, comment, link, checked FROM notifications ' +
                            'WHERE id = \'' + noteId + '\';';

        return queryString;
    },

    updateUsersNotification: function (noteId, payload) {
        var queryString = 'UPDATE notifications SET ';
        if (payload.type) {
            queryString += 'type = \'' + payload.type + '\',';
        }
        if (payload.comment) {
            queryString += 'comment = \'' + payload.comment + '\',';
        }
        if (payload.link) {
            queryString += 'link = \'' + payload.link + '\',';
        }
        if (typeof payload.checked === 'boolean') {
            queryString += 'checked = \'' + payload.checked + '\',';
        }
        queryString = queryString.substring(0, queryString.length - 1);
        queryString += ' WHERE id = \'' + noteId + '\' RETURNING id, user_id, type, comment, link, checked;';

        return queryString;
    },

    getNotificationTypes: function () {
        var queryString = 'SELECT * FROM notification_types;';

        return queryString;
    },

    getUserSettings: function (userId) {
        var queryString = 'SELECT user_id, settings_data FROM settings WHERE user_id = ' + userId + ';';

        return queryString;
    },

    changeUserPassword: function (userId, hashedPassword) {
        var queryString = 'UPDATE users SET hashed_password = \'' + hashedPassword +
                            '\' WHERE id = ' + userId + ';';

        return queryString;
    },

    deleteUser: function (userId) {
        var queryString = 'DELETE FROM users WHERE id = ' + userId + ';';

        return queryString;
    },

    // getStatuses: function () {
    //     var queryString = 'SELECT id, name, color FROM status;';

    //     return queryString;
    // },

    // createStatus: function (payload) {
    //     var queryString = 'INSERT INTO status (name, color) VALUES(\'' +
    //                         payload.name + '\', \'' +
    //                         payload.color + '\') RETURNING id, name, color;';

    //     return queryString;
    // },

    // editStatus: function (statusID, payload) {
    //     // just updating all of them for now?
    //     var queryString = 'UPDATE status SET ' +
    //                         'name = \'' + payload.name + '\', ' +
    //                         'color = \'' + payload.color + '\' ' +
    //                         'WHERE id = \'' + statusID + '\'' +
    //                         'RETURNING id, name, color;';
    //     return queryString;
    // },

    // ** 

    getFlagTypes: function () {
        var queryString = 'SELECT id, name, color, settings FROM flag_type;';

        return queryString;
    },

    getFlags: function () {
        var queryString = 'SELECT id, client_id, type, message, note, settings FROM flag;';

        return queryString;
    },

    createFlagType: function (payload) {
        var queryString = 'INSERT INTO flag_type (name, color, settings) VALUES (\'' +
                            payload.name + '\', \'' +
                            payload.color + '\', \'' +
                            payload.settings + '\' ) RETURNING id, name, color, settings;';

        return queryString;
    },

    editFlagType: function (flagtypeID, payload) {
        // just updating all of them for now?
        var settings = { 
            defaults: { 
                message: payload.message, 
                note: payload.note 
            }
        };

        var queryString = 'UPDATE flag_type SET ' +
                            'name = \'' + payload.typeName + '\', ' +
                            'color = \'' + payload.color + '\', ' +
                            'settings = \'' + JSON.stringify(settings) + '\' ' +
                            // 'message = \'' + payload.message + '\', ' +
                            // 'note = \'' + payload.note + '\' ' +
                            'WHERE id = ' + flagtypeID +
                            // ' RETURNING id, type, message, color, note;';
                            ' RETURNING id, name, color, settings;';
        return queryString;
    },

    getClientFlags: function (clientID) {
        var queryString = 'SELECT id, type, message, note, settings FROM flag WHERE client_id = ' + clientID + ';';

        return queryString;
    },

    setClientFlag: function (payload) {
        console.log(payload);
        var queryString = 'INSERT INTO flag (client_id, type, message, note, settings) VALUES (' +
                            payload.clientID + ', ' + 
                            payload.typeID + ', ' +
                            '\'' + payload.message + '\', \'' + 
                            payload.note + '\', \'' + 
                            payload.settings + '\') RETURNING id, client_id, type, message, note, settings;';
        console.log(queryString);
        return queryString;
    },

    editClientFlag: function (payload) {
        var queryString = 'UPDATE flag SET ' +
                          'message = \'' + payload.message + '\', ' +
                          'note = \'' + payload.note + '\', ' +
                          'settings = \'' + payload.settings + '\' ' +
                          'WHERE id = ' + payload.flagID + ' ' +
                          'RETURNING id, client_id, type, message, note, settings;';
        return queryString;
    },

    // ** 

    uploadFile: function (payload) {
        var queryString = 'INSERT INTO file (client_id, name, type, date, base_64_string) VALUES (\'' +
                            payload.clientID + '\', \'' +
                            payload.name + '\', \'' +
                            payload.type + '\', \'' +
                            payload.date + '\', \'' +
                            payload.fileString + '\');';

        return queryString;
    },

    deleteFile: function (fileID) {
        var queryString = 'DELETE FROM file WHERE id = ' + fileID + ';';
        return queryString;
    },

    getClientFiles: function (clientID) {
        var queryString = 'SELECT id, name, type, date, base_64_string FROM file WHERE client_id = ' + clientID + ';';
        return queryString;
    },

    getProfilePicture: function (clientID) {
        var queryString = 'SELECT name, type, base_64_string FROM file WHERE client_id = ' + clientID +
                            'AND type=\'profile_picture\'' +
                            'AND id = (SELECT MAX(id) FROM file WHERE client_id = ' + clientID +
                            ' AND type=\'profile_picture\');';
        return queryString;
    },

    createCasePlan: function (payload) {
        var queryString = 'INSERT INTO caseplan (client_id, case_manager_id, date, note, ) VALUES (' +
            '\'' + parseProperty(payload.clientID) + '\'' + ', ' +
            '\'' + parseProperty(payload.caseManagerID) + '\'' + ', ' +
            '\'' + parseProperty(payload.date) + '\'' + ', ' +
            '\'' + parseProperty(payload.note) + '\'' + ', ';

        return queryString;
    },

    editCasePlan: function (payload) {
        var queryString = 'UPDATE client SET ';
        queryString += 'caseplan = ' + '\'' + payload.text + '\'' + ' ';
        queryString += 'WHERE id = ' + '\'' + payload.clientID + '\'' + ' ';

        queryString += 'RETURNING caseplan;';

        return queryString;
    },

    getCasePlan: function (clientID) {
        var queryString = 'SELECT caseplan FROM client WHERE id =' + clientID + ";";

        return queryString;
    },

    getPrograms: function () {
        var queryString = 'SELECT program_name FROM program';

        return queryString;
    },
    getAllFollowUps: function () {
        var queryString = 'SELECT id, timestamp, note, casemanager_id, client_id, location FROM follow_up;';

        return queryString;
    },

    getFollowUp: function (id) {
        var queryString = 'SELECT id, timestamp, note, casemanager_id, ' +
                          'client_id, location FROM follow_up WHERE id = ' + id + ';';

        return queryString;
    },

    getCaseManagerFollowUps: function (casemanagerID) {
        var queryString = 'SELECT id, timestamp, note, casemanager_id, ' +
                          'client_id, location FROM follow_up WHERE casemanager_id = ' + casemanagerID + ';';

        return queryString;
    },

    editFollowUp: function (payload) {
        var queryString = 'UPDATE follow_up SET ';
        queryString += 'timestamp = \'' + parseProperty(payload.timestamp) + '\', ';
        queryString += 'note = \'' + parseProperty(payload.note) + '\', ';
        queryString += 'casemanager_id = \'' + parseProperty(payload.casemanagerID) + '\', ';
        queryString += 'client_id = \'' + parseProperty(payload.clientID) + '\', ';
        queryString += 'location = \'' + parseProperty(payload.location) + '\' ';
        queryString += 'WHERE id = ' + payload.id + ';';

        return queryString;
    },

    createFollowUp: function (payload) {
        var queryString = 'INSERT INTO follow_up (timestamp, note, casemanager_id, client_id, location) VALUES (';
        queryString += '\'' + parseProperty(payload.timestamp) + '\', ';
        queryString += '\'' + parseProperty(payload.note) + '\', ';
        queryString += '\'' + parseProperty(payload.casemanagerID) + '\', ';
        queryString += '\'' + parseProperty(payload.clientID) + '\', ';
        queryString += '\'' + parseProperty(payload.location) + '\');';

        return queryString;
    },

    deleteFollowUp: function (id) {
        var queryString = 'DELETE FROM follow_up WHERE id = ' + id + ';';

        return queryString;
    },

    uploadSpreadsheet: function (formdata) {

        var removeEmptyArrays = function (data) {
            data = 
                data.filter(function (e) {
                    return e.length !== 0;
                });
            return data;
        };

        var trimAllArrays = function (data) {
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    if (typeof data[i][j] === "string" && data[i][j] !== undefined) {
                        data[i][j] = data[i][j].trim();
                    }
                }
                var longestString = data[i].reduce(function (a, b) { return a.length > b.length ? a : b; });
                if (longestString.length === 0) {
                    data[i] = data[i].filter(function (e) {
                        return e.length !== 0 && e !== undefined && e !== null;
                    });
                }
            }
            return data;
        };

        var processSheet = function (data) {
            var processedData = removeEmptyArrays(data);
            processedData = trimAllArrays(processedData);
            processedData = removeEmptyArrays(processedData);
            return processedData;
        };

        // https://github.com/SheetJS/js-xlsx
        var parseDateAndTime = function (v, opts, b2) {
            var date = v | 0;
            var time = Math.floor(86400 * (v - date)); 
            var dow = 0;
            var dout = [];
            var out = {
                D: date, 
                T: time, 
                u: 86400 * (v - date) - time,
                y: 0,
                m: 0,
                d: 0,
                date: "",
                H: 0,
                M: 0,
                S: 0,
                q: 0
            };
            if (Math.abs(out.u) < 1e-6) {
                out.u = 0;
            }
            if (out.u > 0.999) {
                out.u = 0;
                if (++time === 86400) { 
                    time = 0; 
                    ++date; 
                }
            }
            if (date === 60) {
                dout = b2 ? [1317, 10, 29] : [1900, 2, 29]; 
                dow = 3;
            } else if (date === 0) {
                dout = b2 ? [1317, 8, 29] : [1900, 1, 0]; 
                dow = 6;
            } else {
                if (date > 60) { 
                    --date;
                }
                // 1 = Jan 1 1900 
                var d = new Date(1900, 0, 1);
                d.setDate(d.getDate() + date - 1);
                dout = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
                dow = d.getDay();
                if (date < 60) {
                    dow = (dow + 6) % 7;
                }
            }
            out.y = dout[0]; 
            out.m = dout[1]; 
            out.d = dout[2];
            out.date = new Date(out.y, out.m - 1, out.d).toISOString();
            out.S = time % 60; 
            time = Math.floor(time / 60);
            out.M = time % 60; 
            time = Math.floor(time / 60);
            out.H = time;
            out.q = dow;
            return out;
        };

        var sheet;
        var queryString = "";

        try {
            sheet = xlsx.parse(formdata.file);
        } catch (err) {
            return err;
        }

        if (formdata.type === "1") { // Importing Case Management Caseload
            var data = processSheet(sheet[0].data);
        } else if (formdata.type === "4") { // Importing Backpack and Sleeping Bad Waitlist
            data = sheet[0].data;
            queryString += 'INSERT INTO backpack_sleepingbag_waitlist (client_id, backpack, sleepingBag, ask_date) VALUES (';
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    // Not quite sure what is going on here
                    // console.log(data[i][j]); 
                }
            }
        } else if (formdata.type === "8") { // Importing Youth Master List
            var dropin = processSheet(sheet[0].data);
            // var intake = processSheet(sheet[1].data);
            var date;
            var month;
            var year;

            for (var k = 1; k < dropin.length; k++) {
                for (var m = 0; m < dropin[k].length; m++) {
                    if (m <= 8) {
                        if (dropin[k][0] !== "TOTALS" && 
                            (dropin[k][0] === undefined || dropin[k][1] === undefined)) { // no first/last name
                            // If they don't have a name, skip row.
                            m = dropin[k].length; 
                        } else {
                            if (dropin[k][0] !== "TOTALS") {
                                // eventually: Update if is detected
                                queryString += "INSERT INTO client (first_name, last_name, gender, race, date_of_birth, " +
                                "intake_age, reference, first_intake_date) SELECT \'" + dropin[k][0] + "\', \'" + 
                                dropin[k][1] + "\', " + 
                                (dropin[k][2] === undefined ? "NULL, " : "\'" + dropin[k][2] + "\', ") + // gender
                                (dropin[k][3] === undefined ? "NULL, " : "\'" + dropin[k][3] + "\', ") + // race
                                (dropin[k][4] === undefined ? "NULL, " : "\'" + parseDateAndTime(dropin[k][4]).date + "\', ") +
                                (dropin[k][5] === undefined ? "NULL, " : "\'" + dropin[k][5] + "\', ") + // age
                                (dropin[k][6] === undefined ? "NULL, " : "\'" + dropin[k][6] + "\', ") +  // ref
                                (dropin[k][8] === undefined ? "NULL " : "\'" + parseDateAndTime(dropin[k][8]).date + "\' ") +  
                                "WHERE NOT EXISTS (SELECT first_name FROM client WHERE first_name = \'" + dropin[k][0] + 
                                "\' AND last_name = \'" + dropin[k][1] + "\');"; 
                            }
                            m = 8;
                        }
                    } else {
                        if (dropin[k][0] !== "TOTALS" && dropin[k][m] !== undefined) {
                            if (typeof dropin[0][m] !== "string") {
                                date = parseDateAndTime(dropin[0][m]);
                                queryString += "INSERT INTO drop_in (date) SELECT \'" + date.date + "\' " + 
                                    "WHERE NOT EXISTS (SELECT date FROM drop_in WHERE date = \'" + date.date + "\');";
                                queryString += "INSERT INTO match_drop_in_client (drop_in_id, client_id) SELECT (" + 
                                    "SELECT id FROM drop_in WHERE date = \'" + date.date + "\'), (SELECT id FROM client " + 
                                    "WHERE first_name = \'" + dropin[k][0] + "\' AND last_name = \'" + dropin[k][1] +
                                    "\') WHERE NOT EXISTS (SELECT id FROM match_drop_in_client WHERE drop_in_id = " + 
                                    "(SELECT id FROM drop_in WHERE date = \'" + date.date + "\') AND client_id = " +
                                    "(SELECT id FROM client WHERE first_name = \'" + dropin[k][0] + "\' AND last_name " + 
                                    " = \'" + dropin[k][1] + "\'));"; 
                            }
                        } else if (dropin[k][0] === "TOTALS") {
                            if (typeof dropin[0][m] === "string") {
                                month = dropin[0][m].split(" ");
                                month = month[0];
                                // NOT SAFE FOR CONCURRENT ACCESS...
                                if (dropin[0][m].toLowerCase().includes("visits")) {
                                    year = parseDateAndTime(dropin[0][m - 1]).date.substring(0, 4);
                                    queryString += 'UPDATE monthly_statistics SET total_youth = ' + 
                                        dropin[k][m] + " WHERE month = \'" + month + "\' AND year = " + 
                                        year + ";";
                                    queryString += 'INSERT INTO monthly_statistics (month, year, total_youth) ' + 
                                        'SELECT \'' + month + "\', " + year + ", " + dropin[k][m] + " WHERE NOT " + 
                                        "EXISTS (SELECT month, year FROM monthly_statistics WHERE month = \'" + 
                                        month + "\' AND year = " + year + ");";
                                } else {
                                    year = parseDateAndTime(dropin[0][m - 2]).date.substring(0, 4);
                                    queryString += 'UPDATE monthly_statistics SET unduplicated_youth = ' + 
                                        dropin[k][m] + " WHERE month = \'" + month + "\' AND year = " + 
                                        year + ";";
                                    queryString += 'INSERT INTO monthly_statistics (month, year, unduplicated_youth) ' + 
                                        'SELECT \'' + month + "\', " + year + ", " + dropin[k][m] + " WHERE NOT " + 
                                        "EXISTS (SELECT month, year FROM monthly_statistics WHERE month = \'" + 
                                        month + "\' AND year = " + year + ");";
                                }
                            }
                        }
                    }
                }
            }
        }

        return queryString;
    }
};

module.exports = queries;
