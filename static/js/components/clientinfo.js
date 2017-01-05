$(function (event) {

    var sleepingLocations = [
        'Venice Boardwalk',
        'Street/alley/park',
        'Abandoned Building',
        'Detox/Rehab Center',
        'Transitional Housing',
        'Emergency Shelter',
        'Jail/juvenile detention',
        'Halfway House',
        'Family Members Home',
        'Permanent Supportive Housing',
        'Foster Care Home',
        'Long-term care facility',
        'Safe haven',
        'Friend\'s home',
        'Hospital - Medical',
        'Hospital - Psychiatric',
        'Hotel/motel',
        'Car'
    ];

    console.log($('#housing-history div.card-block'));
    sleepingLocations.forEach(function (location) {
        $('#housing-history-checkboxes').append(
            '<li><label><input type="checkbox" class="housing-history-checkbox">' +
            location + '</input></label></li>'
        );
    });

    var sleepingDurations = [
        '1 day',
        '2-7 days',
        '8-30 days',
        '1-3 months',
        '4-12 months',
        '> 1 year',
        'other'
    ];

    sleepingDurations.forEach(function (duration, index) {
        $('#how-long-sleeping-there').append(
            '<option value="' + index + '">' + duration + '</option>'
        );
    });

    var numberEpisodes = ['1', '2', '3', '4', 'more than 4'];

    numberEpisodes.forEach(function (number, index) {
        $('#number-episodes').append(
            '<option value="' + index + '">' + number + '</option>'
        );
    });
    
    var initialCauses = [
        'Abuse by parent/caregiver',
        'Domestic violence',
        'Discharged from armed services',
        'End of relationship/break-up',
        'Parent/caregiver\'s mental health',
        'Release from hospital',
        'adding more soon . . .'
    ];

    initialCauses.forEach(function (cause) {
        $('#initial-causes').append(
            '<li><label><input type="checkbox" class="initial-causes-checkbox">' +
            cause + '</input></label></li>'
        );
    });

    var genderIdentity = [
        'Man',
        'Woman',
        'Trans*',
        'Non-gender binary',
        'Refuse to answer',
        'other'
    ];

    genderIdentity.forEach(function (identity) {
        $('#gender-identity').append(
            '<li><label><input type="checkbox" class="gender-identity-checkbox">' +
            identity + '</input></label></li>'
        );
    });

    var genderAssigned = [
        'Male',
        'Female',
        'Refuse to answer'
    ];

    genderAssigned.forEach(function (assigned) {
        $('#gender-assigned').append(
            '<li><label><input type="checkbox" class="gender-assigned-checkbox">' +
            assigned + '</input></label></li>'
        );
    });

    var preferredPronoun = [
        'he/him/his',
        'she/her/hers',
        'they/them/theirs',
        'other'
    ];

    preferredPronoun.forEach(function (assigned) {
        $('#preferred-pronoun').append(
            '<li><label><input type="checkbox" class="preferred-pronoun-checkbox">' +
            assigned + '</input></label></li>'
        );
    });
});