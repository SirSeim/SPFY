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
    'activity_name',
    'ongoing',
    'start_date',
    'end_date'
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
        var queryString = 'SELECT id, first_name, last_name, intake_date, phone_number, email, ' +
                            'date_of_birth, age(date_of_birth), status, caseplan FROM client WHERE id = ' +

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
        var queryString = 'SELECT id, first_name, last_name, status, date_of_birth, phone_number, email FROM client;';

        return queryString;
    },

    createDropIn: function (payload) {
        var queryString = 'INSERT INTO drop_in (date) VALUES ( $1 ) RETURNING date;'; // [payload.date]
        var params = [];
        params.push('\'' + payload.date + '\'');
        var queryData = {
            string: queryString,
            params: params
        };
        return queryData;
    },

    getDropIns: function () {
        var queryString = 'SELECT id, date FROM drop_in;';

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
                        'match_drop_in_activity.end_time FROM activity, match_drop_in_activity ' +
                        'WHERE activity.id = match_drop_in_activity.activity_id AND ' +
                        'match_drop_in_activity.drop_in_id = ' + dropin + ';';
        return queryString;
    },
    getDropinEnrollment: function (dropinID) {
        var queryString = 'SELECT client_id, activity_id FROM enrollment WHERE drop_in_id =' + dropinID + ';';

        return queryString;
    },
    getAllActivities: function () {
        var queryString = 'SELECT id, activity_name FROM activity;';

        return queryString;
    },

    getActivity: function (activity) {
        var queryString = 'SELECT id, activity_name FROM activity WHERE id = ' + activity + ';';

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
        queryString += 'date_of_birth = ' + '\'' + parseProperty(payload.birthday) + '\'' + ', ';
        queryString += 'intake_age = ' + '\'' + parseProperty(payload.age) + '\'' + ', ';
        queryString += 'phone_number = ' + '\'' + parseProperty(payload.phoneNumber) + '\'' + ', ';
        queryString += 'email = ' + '\'' + parseProperty(payload.email) + '\'' + ', ';
        // queryString += 'last_meeting = ' + '\'' + parseProperty(payload.lastMeeting) + '\'' + ',';
        queryString += 'case_manager = ' + '\'' + parseProperty(payload.caseManager) + '\'' + ', ';
        queryString += 'status = ' + '\'' + parseProperty(payload.status) + '\'' + ' ';

        queryString += 'WHERE id = ' + '\'' + payload.id + '\'' + ' ';

        queryString += 'RETURNING id, first_name, last_name, date_of_birth, ' +
                        'intake_age, phone_number, email, case_manager, status;';

        return queryString;
    },

    createActivity: function (payload) {
        // WTF IS GOING ON HERE
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

    checkin: function (payload) {
        var queryString = "";
        payload.forEach(function (element) {
            queryString += 'INSERT INTO check_in (drop_in_id, client_id, date) VALUES( ' +
                            element.dropinID + ', ' +
                            element.clientID + ', ' +
                            '\'' + element.date + '\'' + ') RETURNING drop_in_id, client_id, date;';
        });

        return queryString;
    },

    getCheckIn: function () {
        var queryString = 'SELECT id, drop_in_id, client_id, date FROM check_in';

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

        // Currently unused
        // var TYPE_DATE = 1082;

        var searchText = "";

        if (data.columnType === TYPE_STRING) {
            searchText = ' LIKE \'' + (data.status === 1 ? data.data : '%' + data.data + '%') + '\'';
        } else if (data.columnType === TYPE_INT) {
            var operators = ["=", "!=", ">", "<"];
            searchText = ' ' + operators[data.status] + ' ' + data.data;
        } else if (data.columnType === TYPE_BOOL) {
            if (data.status === 0 || data.status === 1) {
                searchText = ' = ' + (data.status === 0 ? '1' : '0');
            } else {
                searchText = ' IS ' + (data.status === 2 ? 'NOT ' : '') + 'NULL';
            }
        } else {
            searchText = ' LIKE \'' + (data.status === 1 ? data.data : '%' + data.data + '%') + '\'';
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

    editCaseNote: function (payload) {
        var queryString = 'UPDATE case_note SET ';

        queryString += 'client_id = ' + '\'' + parseProperty(payload.clientID) + '\'' + ',';
        queryString += 'case_manager_id = ' + '\'' + parseProperty(payload.caseManagerID) + '\'' + ',';
        queryString += 'date = ' + '\'' + parseProperty(payload.date) + '\'' + ',';
        queryString += 'note = ' + '\'' + parseProperty(payload.note) + '\'' + ',';

        queryString += 'follow_up_needed = ' + '\'' + parseProperty(payload.followUpNeeded) + '\'' + ',';
        queryString += 'due_date = ' + '\'' + parseProperty(payload.dueDate) + '\'' + ',';
        queryString += 'reminder_date = ' + '\'' + parseProperty(payload.reminderDate) + '\'' + ' ';

        queryString += 'WHERE id = ' + '\'' + payload.id + '\'' + ' ';

        queryString += 'RETURNING client_id, case_manager_id, date, note, follow_up_needed, due_date, reminder_date;';

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
        if (payload.type) {
            queryString += 'type';
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
        queryString += ') VALUES (' +
            '\'' + userId + '\'' + ', ' +
            '\'' + payload.comment + '\'';
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
        queryString += ') RETURNING id, type, comment, link, checked;';

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

    changeUserPassword: function (userId, hashedPassword) {
        var queryString = 'UPDATE users SET hashed_password = \'' + hashedPassword +
                            '\' WHERE id = ' + userId + ';';

        return queryString;
    },

    deleteUser: function (userId) {
        var queryString = 'DELETE FROM users WHERE id = ' + userId + ';';

        return queryString;
    },

    getStatuses: function () {
        var queryString = 'SELECT id, name, color FROM status;';

        return queryString;
    },

    createStatus: function (payload) {
        var queryString = 'INSERT INTO status (name, color) VALUES(\'' +
                            payload.name + '\', \'' +
                            payload.color + '\') RETURNING id, name, color;';

        return queryString;
    },

    editStatus: function (statusID, payload) {
        // just updating all of them for now?
        var queryString = 'UPDATE status SET ' +
                            'name = \'' + payload.name + '\', ' +
                            'color = \'' + payload.color + '\' ' +
                            'WHERE id = \'' + statusID + '\'' +
                            'RETURNING id, name, color;';
        return queryString;
    },
    getFlags: function () {
        var queryString = 'SELECT id, type, message, color, note FROM flags;';

        return queryString;
    },

    createFlag: function (payload) {
        var queryString = 'INSERT INTO flags (type, message, color, note) VALUES(\'' +
                            payload.type + '\', \'' +
                            payload.message + '\', \'' +
                            payload.color + '\', \'' +
                            payload.note + '\' ) RETURNING id, type, message, color, note;';

        return queryString;
    },

    editFlag: function (flagID, payload) {
        // just updating all of them for now?
        var queryString = 'UPDATE flags SET ' +
                            'type = \'' + payload.type + '\', ' +
                            'message = \'' + payload.message + '\', ' +
                            'color = \'' + payload.color + '\', ' +
                            'note = \'' + payload.note + '\' ' +
                            'WHERE id = ' + flagID +
                            ' RETURNING id, type, message, color, note;';
        return queryString;
    },

    getClientFlags: function (clientID) {
        var queryString = 'SELECT type, message, color, note FROM flags WHERE id IN (' +
                          'SELECT flag_id FROM profile_flag WHERE client_id = ' + clientID +
                          ') ORDER BY id;';

        return queryString;
    },

    uploadFile: function (payload) {
        var queryString = 'INSERT INTO file (client_id, name, type, date, base_64_string) VALUES (\'' +
                            payload.clientID + '\', \'' +
                            payload.name + '\', \'' +
                            payload.type + '\', \'' +
                            payload.date + '\', \'' +
                            payload.fileString + '\');';

        return queryString;
    },

    getClientFiles: function (clientID) {
        var queryString = 'SELECT name, type, date, base_64_string FROM file WHERE client_id = ' + clientID + ';';
        return queryString;
    },

    getProfilePicture: function (clientID) {
        var queryString = 'SELECT name, type, base_64_string FROM file WHERE client_id = ' + clientID +
                            'AND type=\'profile_picture\'' + 
                            'AND id = (SELECT MAX(id) FROM file WHERE client_id = ' + clientID + ' AND type=\'profile_picture\');';
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
};

module.exports = queries;
