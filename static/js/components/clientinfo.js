$(function (event) {

    /*
        TODO:
        - text boxes for 'Other' and 'More than' options

        - once database tables are set up, use ajax
        to retrieve options and labels for checkboxes
        (rather than the hard-coded arrays)
    */
    
    // provide identifier with '#'
    var buildListItems = function (array, identifier, classname) {
        array.forEach(function (element) {
            $(identifier).append(
                '<li><label><input type="checkbox" class="' + classname + '">' +
                element + '</input></label></li>'
            );
        });
    };

    var buildOptions = function (array, identifier) {
        array.forEach(function (element, index) {
            $(identifier).append(
                '<option value="' + index + '">' + element + '</option>'
            );
        });
    };

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

    buildListItems(sleepingLocations, '#housing-history-checkboxes', 'housing-history-checkbox');

    var sleepingDurations = [
        '1 day',
        '2-7 days',
        '8-30 days',
        '1-3 months',
        '4-12 months',
        '> 1 year',
        'Other' // add text box
    ];

    buildOptions(sleepingDurations, '#how-long-sleeping-there');

    var numberEpisodes = ['1', '2', '3', '4', 'more than 4']; // add text box

    buildOptions(numberEpisodes, '#number-episodes');

    var initialCauses = [
        'Abuse by parent/caregiver',
        'Domestic violence',
        'Discharged from armed services',
        'End of relationship/break-up',
        'Parent/caregiver\'s mental health',
        'Release from hospital',
        'adding more soon . . .'
    ];

    buildListItems(initialCauses, '#initial-causes', 'initial-causes-checkbox');

    var genderIdentity = [
        'Man',
        'Woman',
        'Trans*',
        'Non-gender binary',
        'Refuse to answer',
        'Other'
    ];

    buildListItems(genderIdentity, '#gender-identity', 'gender-identity-checkbox');

    var genderAssigned = [
        'Male',
        'Female',
        'Refuse to answer'
    ];

    buildListItems(genderAssigned, '#gender-assigned', 'gender-assigned-checkbox');

    var preferredPronoun = [
        'he/him/his',
        'she/her/hers',
        'they/them/theirs',
        'Other'
    ];

    buildListItems(preferredPronoun, '#preferred-pronoun', 'preferred-pronoun-checkbox');

    var ethnicities = [
        'Non-latinx',
        'Latinx',
        'Don\'t know',
        'Refused to answer'
    ];

    buildListItems(ethnicities, '#ethnicity', 'ethnicity-checkbox');

    var races = [
        'Asian',
        'Black',
        'Native Hawaiian/Pacific Islander',
        'White',
        'Native American/Alaskan Native',
        'Don\'t know',
        'Refuse to answer',
        'Other'
    ];

    buildListItems(races, '#race', 'race-checkbox');
});