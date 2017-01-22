/*
  Syntax Notes:
  • single quotes \' are strings
  • double quotes \" are column identifiers (reference column names)
*/

/*
  • adding a line with EXPLAIN ANALYZE before a query
  will print out each step that postgres takes for running the query
  as well as the time it took to run the query
  (it will explain everything that is run until the next semicolon ';')

  EXPLAIN ANALYZE
  SELECT type, comment, link, checked FROM notification WHERE id IN (
    SELECT notification_id FROM receive_notification WHERE user_id = 1
  ) ORDER BY id;
  INSERT INTO notification (type) VALUES (1); -- won't explain analyze this

*/

/*

   Create index for fields that are searched from the application side
   Example: names, phone numbers

   create alternateID's  1-to-many relationship
    1 person associated with many id's
    driver's license
    Social security number
    passport

    If you are searching for it on the application side, should
    index it on database side to make search faster


    For queryBuilding:
    "adhoc reporting for postgres"
    collects dictionary data (data about the datastructure)
    displays the data and can shop around
    can build your own report

    MySQL has more resources for best practices, more popular
    Postgres has enterprise level version


    Can secure with SSL using a free SSL certificate
    company called LetsEncrypt - completely trustworthy!!!

    LAMP environment - pre-packaged but can't really change shell
    usually given when signing up with a host provider


    Database encryption encrypts the files

    tables are a logical structure, stored as a file in the database
    server file system

    encrypt the database data files (which hold the tables and
    storage information)

    encrypt the os file system encryption, encrypts the os files
    makes the os less agile though, so instead protect
    the os from the network, keep all the ports closed, only
    open those needed for data transfer

    if you protect os network side, don't have to encrypt the os
    every time you encrypt it slows down the system

    Recommends AWS
    -pick 6 or 7 availability zone
    -deploy into one zone
    -each zone has 4 data centers
    -your system is gauranteed to be in 2 datacenters
    at any given moment, so don't have to worry
    about back-ups!
    -can extend service, pay extra to live in more avaibility zones
    makes requests faster

    can ask support about back-ups

    * Make sure Heroku can access AWS console

    Bitnami - has Marketplace

*/
DROP TABLE IF EXISTS casemanager;

CREATE TABLE casemanager (
  id integer PRIMARY KEY,
  username varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  position varchar(45) NOT NULL
);

INSERT INTO casemanager VALUES (1, 'jew@spfy.org','tables','Jeanine','Espejo-Watkins','Case Manager');
INSERT INTO casemanager VALUES (2, 'bp@spfy.org','tables','Ben','Perkins','Case Manager');
INSERT INTO casemanager VALUES (3, 'rh@spfy.org','tables','Rob','Hanna','Case Manager');



-- DROP TABLE IF EXISTS status;

-- CREATE TABLE status (
--   id SERIAL PRIMARY KEY,
--   name varchar(45) DEFAULT NULL,
--   color varchar(15) DEFAULT NULL
-- );

-- INSERT INTO status (name, color) VALUES ('okay', '#008000'); --rgb(0, 128, 0)
-- INSERT INTO status (name, color) VALUES ('missing', '#0000FF'); --rgb(0, 0, 255)
-- INSERT INTO status (name, color) VALUES ('sick', '#FD9600'); --rgb(253, 150, 0)
-- INSERT INTO status (name, color) VALUES ('vulnerable', '#6A0072'); --rgb(106, 0, 114)
-- INSERT INTO status (name, color) VALUES ('dangerous', '#FB0000'); --rgb(251, 0, 0)


DROP TABLE IF EXISTS client;

-- Where are the rest of the intake fields for a client profile?
-- They are broken up into subsequent tables that follow this one
-- (this structure is still being decided upon)


-- for dates, postgres documentation recommends using ISO 8601 format: '2016-01-08'
-- which postgres will accept in any mode (some formats are rejected in certain postgres date/time modes)

CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  first_name varchar(45) DEFAULT NULL,
  last_name varchar(45) DEFAULT NULL,
  nickname varchar(45) DEFAULT NULL,
  person_completing_intake varchar(65) DEFAULT NULL,
  gender varchar(45) DEFAULT NULL,
  race varchar(45) DEFAULT NULL,
  intake_date date DEFAULT NULL,
  hmis_consent boolean DEFAULT NULL,
  first_time boolean DEFAULT NULL,
  first_intake_date date DEFAULT NULL,
  case_manager varchar(65) DEFAULT NULL,
  case_manager_id integer DEFAULT NULL,
  phone_number varchar(45) DEFAULT NULL,
  email varchar(65) DEFAULT NULL,
  date_of_birth date DEFAULT NULL,
  intake_age integer DEFAULT NULL,
  provided_id boolean DEFAULT NULL,
  id_state varchar(45) DEFAULT NULL,
  reference varchar(45) DEFAULT NULL,
  services varchar(45) DEFAULT NULL,
  -- status integer REFERENCES status (id) DEFAULT 1,
  caseplan varchar DEFAULT NULL
);

INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('John','Doe', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'Hello');
INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('Steven', 'Brown', '2010-03-15T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'asdfaf');
INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('Carlie','Smith', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'Hello');
INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('Carlie','Johnson', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'Hello');
INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('Jeremiah','Haelstrom', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'Hello');
INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('Erick','Wilson', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'Hello');
INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('Tommie', 'Franklin', '2010-03-15T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'Hello');
INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('Tricia','Goodman', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'Hello');
INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('Mona','Adkins', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'Hello');
INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, caseplan) VALUES ('Brooke','Burke', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 'Hello');

-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('John','Doe', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 1, 'Hello');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('Steven', 'Brown', '2010-03-15T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 3, 'asdfaf');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('Carlie','Smith', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 4, 'Hello');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('Carlie','Johnson', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 1, 'Hello');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('Jeremiah','Haelstrom', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 2, 'Hello');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('Erick','Wilson', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 1, 'Hello');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('Tommie', 'Franklin', '2010-03-15T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 3, 'Hello');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('Tricia','Goodman', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 4, 'Hello');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('Mona','Adkins', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 1, 'Hello');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status, caseplan) VALUES ('Brooke','Burke', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 3, 'Hello');
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Ed','Salazar', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 3);
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Gerard', 'Powers', '2010-03-15T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 2);
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Courtney','Lawrence', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 4);
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Alfredo','Hodges', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 1);
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Lynne','Simmons', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 1);
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Sonya','Powell', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 1);
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Ann', 'Moss', '2010-03-15T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 3);
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Rickey','Jacobs', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 4);
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Colin','Turner', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 1);
-- INSERT INTO client (first_name, last_name, intake_date, phone_number, email, date_of_birth, status) VALUES ('Tara','Evans', '2016-10-20T07:00:00.000Z', '123-456-7890', 'email@email.com', '01/01/2222', 1);

DROP TABLE IF EXISTS flag_type;

CREATE TABLE flag_type (
  id SERIAL PRIMARY KEY,
  name varchar(45) DEFAULT NULL,
  color varchar(45) DEFAULT NULL,
  settings jsonb DEFAULT NULL -- trying this out for now
);

INSERT INTO flag_type (name, color, settings) VALUES ('Follow-Up', '#02AEF0', '{ "defaults": { "message": "default message", "note": "default note", "dot": true }}');
INSERT INTO flag_type (name, color, settings) VALUES ('Checked-In', '#02AEF0', '{ "defaults": { "message": "default message", "note": "default note", "dot": true }}');
INSERT INTO flag_type (name, color, settings) VALUES ('Timed-Out', 'red', '{ "defaults": { "message": "default message", "note": "default note", "dot": true }}');
INSERT INTO flag_type (name, color, settings) VALUES ('Aged-Out', 'yellow', '{ "defaults": { "message": "default message", "note": "default note", "dot": true }}');
INSERT INTO flag_type (name, color, settings) VALUES ('E&E', '#02AEF0', '{ "defaults": { "message": "default message", "note": "default note", "dot": false }}');
INSERT INTO flag_type (name, color, settings) VALUES ('CM', '#02AEF0', '{ "defaults": { "message": "default message", "note": "default note", "dot": false }}');

DROP TABLE IF EXISTS flag;

CREATE TABLE flag (
  id SERIAL PRIMARY KEY,
  client_id integer REFERENCES client (id),
  type integer REFERENCES flag_type (id),
  message varchar(45) DEFAULT NULL,
  note varchar(100) DEFAULT NULL,
  settings jsonb DEFAULT NULL
);

-- INSERT INTO flag (type, message, color, note) VALUES ('Showers', 'Tier 1', '#02AEF0', '(name) is Tier 1 for showers this week. Will reset on a weekly basis.');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (1, 1, 'Jeanine', '(name) has a follow up meeting with Jeanine.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (1, 2, '3:30 PM', '(name) checked in at (client_id, time, day)', '{ "dot": false }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (1, 3, '10 days', 'Timed out for (doing such and such).', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (1, 4, '26 yrs old', '(name) is now older than 25.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (1, 5, 'enrolled', '(name) is enrolled in Education & Employment.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (1, 6, 'enrolled', '(name) is enrolled in Case Management.', '{ "dot": true }');

INSERT INTO flag (client_id, type, message, note, settings) VALUES (3, 1, 'Jeanine', '(name) has a follow up meeting with Jeanine.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (3, 2, '3:30 PM', '(name) checked in at (client_id, time, day)', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (3, 3, '10 days', 'Timed out for (doing such and such).', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (3, 4, '26 yrs old', '(name) is now older than 25.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (3, 5, 'enrolled', '(name) is enrolled in Education & Employment.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (3, 6, 'enrolled', '(name) is enrolled in Case Management.', '{ "dot": true }');

INSERT INTO flag (client_id, type, message, note, settings) VALUES (5, 1, 'Jeanine', '(name) has a follow up meeting with Jeanine.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (5, 2, '3:30 PM', '(name) checked in at (client_id, time, day)', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (5, 3, '10 days', 'Timed out for (doing such and such).', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (5, 4, '26 yrs old', '(name) is now older than 25.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (5, 5, 'enrolled', '(name) is enrolled in Education & Employment.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (5, 6, 'enrolled', '(name) is enrolled in Case Management.', '{ "dot": true }');

INSERT INTO flag (client_id, type, message, note, settings) VALUES (7, 1, 'Jeanine', '(name) has a follow up meeting with Jeanine.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (7, 2, '3:30 PM', '(name) checked in at (client_id, time, day)', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (7, 3, '10 days', 'Timed out for (doing such and such).', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (7, 4, '26 yrs old', '(name) is now older than 25.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (7, 5, 'enrolled', '(name) is enrolled in Education & Employment.', '{ "dot": true }');
INSERT INTO flag (client_id, type, message, note, settings) VALUES (7, 6, 'enrolled', '(name) is enrolled in Case Management.', '{ "dot": true }');

-- DROP TABLE IF EXISTS profile_status;

-- CREATE TABLE profile_status (
--   id SERIAL PRIMARY KEY,
--   client_id integer REFERENCES client (id),
--   status_id integer REFERENCES status (id)
-- );


-- INSERT INTO profile_status (client_id, status_id) VALUES (1, 1);
-- INSERT INTO profile_status (client_id, status_id) VALUES (1, 3);
-- INSERT INTO profile_status (client_id, status_id) VALUES (1, 5);
-- INSERT INTO profile_status (client_id, status_id) VALUES (1, 6);


DROP TABLE IF EXISTS prescreen;

CREATE TABLE prescreen (
  id integer PRIMARY KEY,
  client_id integer REFERENCES client (id)
);

DROP TABLE IF EXISTS background;

CREATE TABLE background (
  id integer PRIMARY KEY,
  client_id integer REFERENCES client (id)
  -- Disability varchar(45) DEFAULT NULL,
  -- LastGradeCompleted varchar(45) DEFAULT NULL,
  -- SomeCompleted varchar(45) DEFAULT NULL,
  -- CurrentlyAttending varchar(45) DEFAULT NULL,
  -- Graduated varchar(45) DEFAULT NULL,
  -- FirstLanguage varchar(45) DEFAULT NULL,
  -- PreferredLanguage varchar(45) DEFAULT NULL,
  -- MaritalStatus varchar(45) DEFAULT NULL,
  -- MilitaryService varchar(45) DEFAULT NULL,
  -- HealthInsurance varchar(45) DEFAULT NULL,
  -- Gender varchar(45) DEFAULT NULL,
  -- GenderIdentification varchar(45) DEFAULT NULL,
  -- PreferredPronoun varchar(45) DEFAULT NULL,
  -- Ethnicity varchar(45) DEFAULT NULL,
  -- Race varchar(45) DEFAULT NULL
);

DROP TABLE IF EXISTS housing_history;

CREATE TABLE housing_history (
  id integer PRIMARY KEY,
  client_id integer REFERENCES client (id),
  last_sleeping_location varchar(45) DEFAULT NULL,
  last_sleeping_duration varchar(45) DEFAULT NULL,
  first_day_first_time_homeless date DEFAULT NULL,
  current_homeless_start_date date DEFAULT NULL,
  current_homeless_length varchar(45) DEFAULT NULL,
  homeless_episode_count varchar(45) DEFAULT NULL,
  location_before_west_la varchar(45) DEFAULT NULL,
  duration_in_west_la varchar(45) DEFAULT NULL,
  housing_instability_cause varchar(45) DEFAULT NULL,
  stable_housing_obstacle varchar(45) DEFAULT NULL,
  housing_interest boolean DEFAULT NULL
);

DROP TABLE IF EXISTS natural_connection;

CREATE TABLE natural_connection (
  id integer PRIMARY KEY,
  client_id integer REFERENCES client (id),
  natural_connection boolean DEFAULT NULL,
  contact_name varchar(45) DEFAULT NULL,
  contact_phone_number varchar(45) DEFAULT NULL,
  contact_relationship varchar(45) DEFAULT NULL
);

DROP TABLE IF EXISTS pregnant_and_parenting;

CREATE TABLE pregnant_and_parenting (
  id integer PRIMARY KEY,
  client_id integer REFERENCES client (id),
  currently_pregnant boolean DEFAULT NULL,
  first_pregnancy boolean DEFAULT NULL,
  pre_natal_carereceived boolean DEFAULT NULL,
  pre_natal_carelocation varchar(45) DEFAULT NULL,
  pre_natal_caredesired boolean DEFAULT NULL,
  trimester varchar(45) DEFAULT NULL,
  baby_due_date date DEFAULT NULL,
  has_other_children boolean DEFAULT NULL,
  dcfs_open_case boolean DEFAULT NULL,
  children_with_family_or_friends varchar(45) DEFAULT NULL
);

DROP TABLE IF EXISTS substance_abuse;

CREATE TABLE substance_abuse (
  id integer PRIMARY KEY,
  client_id integer REFERENCES client (id),
  substance_abuse boolean DEFAULT NULL,
  choice_substance varchar(45) DEFAULT NULL,
  injected_drugs boolean DEFAULT NULL,
  treatment_interest boolean DEFAULT NULL
);

DROP TABLE IF EXISTS mental_health;

CREATE TABLE mental_health (
  id integer PRIMARY KEY,
  client_id integer REFERENCES client (id)
  -- MentalServicesReceived boolean DEFAULT NULL,
  -- MentalServicesLocation varchar(45) DEFAULT NULL,
  -- MentalMedication boolean DEFAULT NULL,
  -- HelpAcquiringMedicine boolean DEFAULT NULL
);

DROP TABLE IF EXISTS referrals;

CREATE TABLE referral (
  id integer PRIMARY KEY,
  client_id integer REFERENCES client (id),
  internal_referral varchar(45) DEFAULT NULL,
  external_referral varchar(45) DEFAULT NULL
);

DROP TABLE IF EXISTS additional_info;

CREATE TABLE additional_info (
  id integer PRIMARY KEY,
  client_id integer REFERENCES client (id),
  income varchar(45) DEFAULT NULL,
  birth_city varchar(45) DEFAULT NULL,
  birth_state varchar(45) DEFAULT NULL,
  birth_country varchar(45) DEFAULT NULL,
  employed varchar(45) DEFAULT NULL,
  looking_for_employment boolean DEFAULT NULL,
  foster_care boolean DEFAULT NULL,
  social_security_number varchar(45) DEFAULT NULL,
  caring_for_animals boolean DEFAULT NULL,
  chronically_homeless boolean DEFAULT NULL
);

DROP TABLE IF EXISTS forms;

CREATE TABLE forms (
  id integer PRIMARY KEY,
  client_id integer  REFERENCES client (id),
  good_neighbor_contract varchar(45) DEFAULT NULL,
  story_photo_video_audio_form boolean DEFAULT NULL,
  information_release_authrorized boolean DEFAULT NULL,
  services_consent boolean DEFAULT NULL,
  shower_instructions boolean DEFAULT NULL,
  shower_guidelines boolean DEFAULT NULL,
  drop_in_guidelines boolean DEFAULT NULL,
  intake_confirmation boolean DEFAULT NULL,
  immediate_needs_transportation boolean DEFAULT NULL,
  documents_signed boolean DEFAULT NULL,
  sleeping_bag boolean DEFAULT NULL,
  backpack boolean DEFAULT NULL
);

DROP TABLE IF EXISTS match;

-- matching case managers with their clients

CREATE TABLE match (
  id integer PRIMARY KEY,
  casemanager_id integer REFERENCES casemanager (id),
  client_id integer REFERENCES client (id)
);

/* INSERT INTO match VALUES (1, 1, 1), (2, 2, 2), (3, 3, 3), (4, 1, 4); */


/* should we use inheritance here?
Programs definitely "contain" subprograms,
but is a subprogram also a program?
Is an activity a subprogram?
*/

DROP TABLE IF EXISTS program;

CREATE TABLE program (
  id SERIAL PRIMARY KEY,
  program_name varchar(45) DEFAULT NULL
);

INSERT INTO program (program_name) VALUES ('Other');
INSERT INTO program (program_name) VALUES ('Health & Wellness');
INSERT INTO program (program_name) VALUES ('Arts & Creativity');
INSERT INTO program (program_name) VALUES ('Education & Employment');
INSERT INTO program (program_name) VALUES ('Health & Wellness');
INSERT INTO program (program_name) VALUES ('Arts & Healing');
INSERT INTO program (program_name) VALUES ('Advocacy');
INSERT INTO program (program_name) VALUES ('Pregnancy & Parenting');
INSERT INTO program (program_name) VALUES ('Legal');
INSERT INTO program (program_name) VALUES ('Case Management');
INSERT INTO program (program_name) VALUES ('Drop In');


DROP TABLE IF EXISTS subprogram;

CREATE TABLE subprogram (
  id SERIAL PRIMARY KEY,
  subprogram_name varchar(45) DEFAULT NULL,
  program_id integer REFERENCES program (id)
);

INSERT INTO subprogram (subprogram_name, program_id) VALUES ('Digital Arts Lab', 1);


DROP TABLE IF EXISTS activity;

CREATE TABLE activity (
  id SERIAL PRIMARY KEY,
  program_id integer REFERENCES program (id) DEFAULT 1,
  activity_name varchar(45) DEFAULT NULL,
  location varchar(45) DEFAULT NULL,
  ongoing boolean DEFAULT true,
  start_time time DEFAULT NULL,
  end_time time DEFAULT NULL
);

INSERT INTO activity (activity_name, program_id) VALUES ('Medical Care', 2);
INSERT INTO activity (activity_name, program_id) VALUES ('Medi-Cal Registration', 2);
INSERT INTO activity (activity_name, program_id) VALUES ('HIV Testing', 2);
INSERT INTO activity (activity_name, program_id) VALUES ('Dental Care', 2);
INSERT INTO activity (activity_name, program_id) VALUES ('Digital Arts Lab', 4);
INSERT INTO activity (activity_name, program_id) VALUES ('Mock Interviews', 4);
INSERT INTO activity (activity_name, program_id) VALUES ('Life Skills Program', 4);
INSERT INTO activity (activity_name) VALUES ('Legal');

DROP TABLE IF EXISTS drop_in;

CREATE TABLE drop_in (
  id SERIAL PRIMARY KEY,
  date date DEFAULT CURRENT_DATE
);

INSERT INTO drop_in (date) VALUES ('2016-10-16');
INSERT INTO drop_in (date) VALUES ('2016-10-17');
INSERT INTO drop_in (date) VALUES ('2016-10-31');
INSERT INTO drop_in (date) VALUES ('2016-11-04');
INSERT INTO drop_in (date) VALUES ('2016-11-16');
INSERT INTO drop_in (date) VALUES ('2016-11-21');
-- there are dropins here that might not be populated with clients checked in
-- or activities chosen, so frontend will return error because it is looking
-- for data that the DB doesn't have

DROP TABLE IF EXISTS match_drop_in_activity;

CREATE TABLE match_drop_in_activity (
  id SERIAL PRIMARY KEY,
  drop_in_id integer REFERENCES drop_in (id),
  activity_id integer REFERENCES activity (id),
  room varchar(30) DEFAULT NULL,
  comments varchar(128) DEFAULT NULL,
  start_time time DEFAULT '00:00:00',
  end_time time DEFAULT '23:59:59'
);

INSERT INTO match_drop_in_activity (drop_in_id, activity_id, room, start_time, end_time) VALUES (2, 3, 'Clinic', '13:30:00', '15:30:00');
INSERT INTO match_drop_in_activity (drop_in_id, activity_id, room, start_time, end_time) VALUES (2, 4, 'Clinic', '12:30:00', '13:30:00');
INSERT INTO match_drop_in_activity (drop_in_id, activity_id, room, start_time, end_time) VALUES (2, 1, 'Clinic', '12:30:00', '13:30:00');

DROP TABLE IF EXISTS match_drop_in_client;

CREATE TABLE match_drop_in_client (
  id SERIAL PRIMARY KEY,
  drop_in_id integer REFERENCES drop_in (id),
  client_id integer REFERENCES client (id)
);

INSERT INTO match_drop_in_client (drop_in_id, client_id) VALUES (1, 1);

DROP TABLE IF EXISTS enrollment;

CREATE TABLE enrollment (
  id SERIAL PRIMARY KEY,
  drop_in_activity_id integer REFERENCES match_drop_in_activity (id),
  client_id integer REFERENCES client (id)
);

INSERT INTO enrollment (drop_in_activity_id, client_id) VALUES (1, 2);
INSERT INTO enrollment (drop_in_activity_id, client_id) VALUES (1, 3);
INSERT INTO enrollment (drop_in_activity_id, client_id) VALUES (1, 4);

INSERT INTO enrollment (drop_in_activity_id, client_id) VALUES (2, 2);
INSERT INTO enrollment (drop_in_activity_id, client_id) VALUES (2, 4);
INSERT INTO enrollment (drop_in_activity_id, client_id) VALUES (2, 1);

INSERT INTO enrollment (drop_in_activity_id, client_id) VALUES (3, 4);
INSERT INTO enrollment (drop_in_activity_id, client_id) VALUES (3, 5);
INSERT INTO enrollment (drop_in_activity_id, client_id) VALUES (3, 7);

DROP TABLE IF EXISTS check_in;

CREATE TABLE check_in (
  id SERIAL PRIMARY KEY,
  drop_in_id integer REFERENCES drop_in (id),
  client_id integer REFERENCES client (id)
);

INSERT INTO check_in (drop_in_id, client_id) VALUES (2, 4);
INSERT INTO check_in (drop_in_id, client_id) VALUES (2, 3);
INSERT INTO check_in (drop_in_id, client_id) VALUES (2, 5);
INSERT INTO check_in (drop_in_id, client_id) VALUES (2, 7);
INSERT INTO check_in (drop_in_id, client_id) VALUES (2, 1);
INSERT INTO check_in (drop_in_id, client_id) VALUES (2, 10);

DROP TABLE IF EXISTS case_note;

CREATE TABLE case_note (
  id SERIAL PRIMARY KEY,
  client_id integer REFERENCES client (id),
  case_manager_id integer REFERENCES casemanager (id),
  date date DEFAULT CURRENT_DATE,
  category VARCHAR (5) DEFAULT NULL,
  note VARCHAR(2000) DEFAULT NULL,
  follow_up_needed boolean DEFAULT NULL,
  due_date date DEFAULT NULL,
  reminder_date date DEFAULT NULL
);

INSERT INTO case_note (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (1, 1, '2016-10-31', 'CM', 'This is an initial note', false, null, null);
INSERT INTO case_note (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (1, 1, '2016-11-15', 'CM', 'This is another initial note', false, null, null);
INSERT INTO case_note (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (2, 3, '2016-10-31', 'CM', 'This is an initial note', false, null, null);
INSERT INTO case_note (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (2, 2, '2016-10-31', 'CM', 'This is another initial note', false, null, null);
INSERT INTO case_note (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (3, 1, '2016-10-31', 'CM', 'This is an initial note', false, null, null);

-- DROP TABLE IF EXISTS caseplan;
--
-- CREATE TABLE caseplan (
--   id SERIAL PRIMARY KEY,
--   client_id integer REFERENCES client (id),
--   case_manager_id integer REFERENCES casemanager (id),
--   date date DEFAULT CURRENT_DATE,
--   note VARCHAR DEFAULT NULL
-- );
--
-- INSERT INTO caseplan (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (1, 1, '2016-10-31', 'CM', 'This is an initial note');
-- INSERT INTO caseplan (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (1, 1, '2016-11-15', 'CM', 'This is another initial note');
-- INSERT INTO caseplan (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (2, 3, '2016-10-31', 'CM', 'This is an initial note');
-- INSERT INTO caseplan (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (2, 2, '2016-10-31', 'CM', 'This is another initial note');
-- INSERT INTO caseplan (client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date) VALUES (3, 1, '2016-10-31', 'CM', 'This is an initial note');

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(45) NOT NULL,
  hashed_password varchar(70) NOT NULL
);

-- inserting user 'test' to login with password 'passwordisnone'
INSERT INTO users (username, hashed_password) VALUES ('test', '$2a$10$DAInVRGKZJ4pmb64YDJxXe2zgt4N3/FbxHkhC23yv8Dwv0uHeov6u');

DROP TABLE IF EXISTS notification_types;

CREATE TABLE notification_types ( -- making types separate is useful for settings
  id SERIAL PRIMARY KEY,          -- and this could very well be implemented in the frontend
  name varchar(45) DEFAULT NULL   -- by just calling all the notifications and extracting the different
);                                -- types, but this seems much simpler and safer than relying on
                                  -- complex js to filter out the unique types from each request

INSERT INTO notification_types (name) VALUES ('default');
INSERT INTO notification_types (name) VALUES ('primary');
INSERT INTO notification_types (name) VALUES ('success');
INSERT INTO notification_types (name) VALUES ('info');
INSERT INTO notification_types (name) VALUES ('warning');
INSERT INTO notification_types (name) VALUES ('danger');

DROP TABLE IF EXISTS notifications;

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users (id),
  type integer REFERENCES notification_types (id),
  comment varchar(128) DEFAULT NULL,
  link varchar(128) DEFAULT NULL,
  checked boolean DEFAULT FALSE
);

INSERT INTO notifications (user_id, type, comment, link, checked) VALUES (1, 1, 'Test notification for test', '/frontdesk', 'FALSE');
INSERT INTO notifications (user_id, type, comment, link, checked) VALUES (1, 1, 'Another notification for test', '/frontdesk', 'FALSE');
INSERT INTO notifications (user_id, type, comment, link, checked) VALUES (1, 1, 'Yet another notification for test', '/frontdesk', 'FALSE');

DROP TABLE IF EXISTS file;

--Type choices: profile_picture, photo, document, compressed
CREATE TABLE file (
  id SERIAL PRIMARY KEY,
  client_id integer REFERENCES client (id),
  name varchar(45) DEFAULT NULL,
  type varchar(30) DEFAULT NULL,
  date date DEFAULT NULL,
  base_64_string varchar DEFAULT NULL
);

DROP TABLE IF EXISTS settings;

CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users (id),
  settings_data jsonb DEFAULT NULL
);

INSERT INTO settings (user_id, settings_data) VALUES (1, '{ "default": true, "primary": true, "success": true, "info": true, "warning": false, "danger": false }');

DROP TABLE IF EXISTS backpack_sleepingbag_waitlist;

CREATE TABLE backpack_sleepingbag_waitlist (
  id SERIAL PRIMARY KEY,
  client_id integer REFERENCES client (id),
  backpack boolean DEFAULT false,
  sleepingbag boolean DEFAULT false,
  ask_date date DEFAULT NULL
);

DROP TABLE IF EXISTS monthly_statistics;

CREATE TABLE monthly_statistics (
  id SERIAL PRIMARY KEY,
  month varchar(45) DEFAULT NULL,
  year integer DEFAULT NULL,
  unduplicated_youth integer DEFAULT 0,
  total_youth integer DEFAULT 0
);

DROP TABLE IF EXISTS follow_up;

CREATE TABLE follow_up (
  id SERIAL PRIMARY KEY,
  timestamp timestamp DEFAULT NULL,
  note varchar(500) DEFAULT NULL,
  casemanager_id integer REFERENCES users (id),
  client_id integer REFERENCES client (id),
  location varchar(50) DEFAULT NULL
);

INSERT INTO follow_up (timestamp, note, casemanager_id, client_id, location) VALUES('1999-01-08 04:05:06', 'test', 1, 1, 'patio');