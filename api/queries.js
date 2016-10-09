

var parseProperty = function(property) {
    if (typeof property === 'boolean') {
        property = property === true ? '1' : '0';
    }
    if (property === undefined) {
        property = 'null';
    }
    return property;
};

var queries = {
    createClient: function (payload) {
        var queryString = 'INSERT INTO client VALUES (';

        // frontend people are using this for naming standards in their JSON
        queryString += parseProperty(payload.firstName) + ',';
        queryString += parseProperty(payload.lastName) + ',';
        queryString += parseProperty(payload.nickname) + ',';
        queryString += parseProperty(payload.personCompletingIntake) + ',';
        queryString += parseProperty(payload.intakeDate) + ',';
        queryString += parseProperty(payload.HMISConsent) + ',';
        queryString += parseProperty(payload.firstTime) + ',';
        queryString += parseProperty(payload.caseManager) + ',';
        queryString += parseProperty(payload.caseManagerID) + ',';
        queryString += parseProperty(payload.phoneNumber) + ',';
        queryString += parseProperty(payload.email) + ',';
        queryString += parseProperty(payload.dob) + ',';
        queryString += parseProperty(payload.intakeAge) + ',';
        queryString += parseProperty(payload.providedID) + ',';
        queryString += parseProperty(payload.stateID) + ',';
        queryString += parseProperty(payload.reference) + ',';
        queryString += parseProperty(payload.services) + ',';
        queryString += parseProperty(payload.disability) + ',';
        queryString += parseProperty(payload.lastGradeCompleted) + ',';
        queryString += parseProperty(payload.someCompleted) + ',';
        queryString += parseProperty(payload.currentlyAttending) + ',';
        queryString += parseProperty(payload.graduated) + ',';
        queryString += parseProperty(payload.firstLanguage) + ',';
        queryString += parseProperty(payload.preferredLanguage) + ',';
        queryString += parseProperty(payload.maritalStatus) + ',';
        queryString += parseProperty(payload.militaryService) + ',';
        queryString += parseProperty(payload.healthInsurance) + ',';
        queryString += parseProperty(payload.gender) + ',';
        queryString += parseProperty(payload.genderIdentification) + ',';
        queryString += parseProperty(payload.preferredPronoun) + ',';
        queryString += parseProperty(payload.ethnicity) + ',';
        queryString += parseProperty(payload.race) + ',';
        queryString += parseProperty(payload.lastSleepingLocation) + ',';
        queryString += parseProperty(payload.lastSleepingDuration) + ',';
        queryString += parseProperty(payload.firstDayFirstTimeHomeless) + ',';
        queryString += parseProperty(payload.currentHomelessStartDate) + ',';
        queryString += parseProperty(payload.currentHomelessLength) + ',';
        queryString += parseProperty(payload.homelessEpisodeCount) + ',';
        queryString += parseProperty(payload.locationBeforeWestLA) + ',';
        queryString += parseProperty(payload.durationInWestLA) + ',';
        queryString += parseProperty(payload.housingInstabilityCause) + ',';
        queryString += parseProperty(payload.stableHousingObstacle) + ',';
        queryString += parseProperty(payload.housingInterest) + ',';
        queryString += parseProperty(payload.naturalConnection) + ',';
        queryString += parseProperty(payload.contactName) + ',';
        queryString += parseProperty(payload.contactPhoneNumber) + ',';
        queryString += parseProperty(payload.contactRelationship) + ',';
        queryString += parseProperty(payload.currentlyPregnant) + ',';
        queryString += parseProperty(payload.firstPregnancy) + ',';
        queryString += parseProperty(payload.preNatalCareReceived) + ',';
        queryString += parseProperty(payload.preNatalCareLocation) + ',';
        queryString += parseProperty(payload.preNatalCareDesired) + ',';
        queryString += parseProperty(payload.trimester) + ',';
        queryString += parseProperty(payload.babyDueDate) + ',';
        queryString += parseProperty(payload.hasOtherChildren) + ',';
        queryString += parseProperty(payload.dcfsOpenCase) + ',';
        queryString += parseProperty(payload.childrenWithFamilyOrFriends) + ',';
        queryString += parseProperty(payload.substanceAbuse) + ',';
        queryString += parseProperty(payload.choiceSubstance) + ',';
        queryString += parseProperty(payload.injectedDrugs) + ',';
        queryString += parseProperty(payload.treatmentInterest) + ',';
        queryString += parseProperty(payload.mentalServicesReceived) + ',';
        queryString += parseProperty(payload.mentalServicesLocation) + ',';
        queryString += parseProperty(payload.mentalMedication) + ',';
        queryString += parseProperty(payload.helpAcquiringMedicine) + ',';
        queryString += parseProperty(payload.internalReferral) + ',';
        queryString += parseProperty(payload.externalReferral) + ',';
        queryString += parseProperty(payload.income) + ',';
        queryString += parseProperty(payload.birthCity) + ',';
        queryString += parseProperty(payload.birthState) + ',';
        queryString += parseProperty(payload.birthCountry) + ',';
        queryString += parseProperty(payload.employed) + ',';
        queryString += parseProperty(payload.lookingForEmployment) + ',';
        queryString += parseProperty(payload.fosterCare) + ',';
        queryString += parseProperty(payload.socialSecurityNumber) + ',';
        queryString += parseProperty(payload.caringForAnimals) + ',';
        queryString += parseProperty(payload.goodNeighborContract) + ',';
        queryString += parseProperty(payload.storyPhotoVideoAudioForm) + ',';
        queryString += parseProperty(payload.informationReleaseAuthorized) + ',';
        queryString += parseProperty(payload.servicesConsent) + ',';
        queryString += parseProperty(payload.showerInstructions) + ',';
        queryString += parseProperty(payload.showerGuidelines) + ',';
        queryString += parseProperty(payload.dropInGuidelines) + ',';
        queryString += parseProperty(payload.intakeConfirmation) + ',';
        queryString += parseProperty(payload.immediateNeedsConfirmation) + ',';
        queryString += parseProperty(payload.documentsSigned) + ',';
        queryString += parseProperty(payload.sleepingBag) + ',';
        queryString += parseProperty(payload.backpack) + ')';

        return queryString;
    },

    // This gets called in query.js by Queries module
    getAllCaseManagers: function () {
        var queryString = 'SELECT first_name, last_name FROM casemanager;';
        return queryString;
    },

    getClient: function (payload) {
        var queryString = 'SELECT first_name, last_name FROM client WHERE first_name = '
                            + '\'' + payload.firstName + '\'' + ' AND last_name = ' 
                            + '\'' + payload.lastName + '\'' + ';';
        return queryString;
    }

};

module.exports = queries;
