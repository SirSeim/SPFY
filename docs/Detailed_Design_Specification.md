**7.0	Detailed Design Specification**

**7.1	Introduction**

This document presents a detailed description of the software for the Safe Place for Youth (SPY) database as described in the [*Requirements Specification*](https://github.com/SirSeim/SPFY/blob/master/docs/Requirements_Specification.md). The SPY Database will allow users to store and retrieve data over the Internet from any platform, be it a desktop computer, tablet, or smartphone. 

**7.2 Detailed Design Description**

**7.2.1 Frontdesk Page CSC Description**
The front desk homepgage js file (frontdesk.js) initializes and refreshes the page based on user activity in real time. User activity includes checking clients in, adding them to activities, searching for client profiles, creating a new drop-in or viewing old ones. The functionality is implemented to include the following functions: setupFrontDesk, setUpClientsForCheckin, refreshCheckinTable, setupCheckin, updateAddActivities.
- setupFrontDesk
  - Sets up the click handler function for each client to include a modal and 
- setUpClientsForCheckin
- refreshCheckinTable
-setupCheckin
-updateAddActivities


**7.2.1.1 Client Profile Table CSU Description**

The client profile table js file (clientprofiletable.js) is a component of the front desk homepage that focuses on the table of clients who are available to be added to the checkin. It can be searched, and clients can be selected to be checked into the drop in for the day. Functionalities include setupClientProfileTable, and the rest of it's functionality is in main.js, which populates the table rows with correctly parsed data. 
-setUpClientProfileTable

			
**7.2.1.2 Add Activity Table CSU Description**
			
The Add Activity button on the front desk homepage is a modal that allows the user to add activities to a current dropin. The file is a single function that gets the activities list from the database and displays it in button lists based on category in a pop up. The activities that are already added to the current dropin are clearly disabled and cannot be duplicated.

**7.2.1.3 Checkin CSU Description**
			
Description: Module that implements the functionality for the components and buttons that facilitate checking clients into a drop-in session.
Attributes: Makes requests, Populates components with data

			

**7.2.2 Client Profiles Page CSC Description**

		
The Entities in our client profiles page are Information, Case Management, Documents, Referrals, Other. Each of the entities have some actions and Attributes. Some entities do not have actions or attributes. The Information entity includes Edit Client action that allows you to change the attributes of the clients information. Also, the information entity has a profile picture box. The profile picture has a relationship with Documents entity. The Documents entity allows you to add files onto each client profile. The attributes of add file are compressed folder, document and Photo. Both Referrals and Other do not have actions or attributes. Case management entity on the other hand has an add case note action and the attributes are case notes, client, case manager, and Date.

**7.2.2.1 Client Profile CSU Description**

Description: Module that implements the functionality for displaying information associated with a specific client profile in the database.
Attributes: Viewing/editing profile information, viewing/adding existing flags to client, viewing/editing/creating case notes associated with client, adding/deleting documents associated with client.


**7.2.3 Data Browser CSC Description**


Description: Module that implements functionality for displaying and querying the contents of the tables contained in the database as rows in a table. Each row displays the values contained in each table row for the filter specified. 
Attributes: Runs a search, populates the table, allows view of detail.


A page allowing the user to search and view the entire database. The user can then generate queries in the query builder, with results being displayed in the Filter table. Users can click on rows in the Filter table to see the content of the table in a more easily readable form within the Detail Pane. The ability to generate reports based on the query given is also available. 

**7.2.3.1 Query Builder CSU Description**

Description: Module that implements functionality for building queries on a specified table and column. Sends the ajax call that populates the search table with information.
Attributes: Runs the search, allows for selection of tables, allows for specific or nonspecific searches

**7.2.3.2 Search Table CSU Description**
Displays the results of the queries built by the query builder. If no query is specified, displays all of the current content of the selected database table. 

Description: Module that implements functionality for displaying the results of queries in a table. Allows for a different detail view if a row is selected.
Attributes: Displays search results, attach handlers to each row to display detail in a different format



**7.2.3.3 Detail Pane CSU Description**
Displays specific details on rows selected by the users. When a row is clicked, the detail pane will open and display the information showed in that row in a single area.

Description: Module that implements functionality for displaying the results of a selected table row in a vertical rather than horizontal format.
Attributes: Displays a selected row’s information vertically.


**7.2.3.4 Report Generator CSU Description**
Displays a visual report of selected columns for a given date range. 
		
Description: Module that implements functionality for displaying a graphical report of selected columns for a given date range. Graphs are drawn for selected columns.
Attributes: Draws graphs from selected columns over a given date range.

**7.2.2 Server CSC Description**

**7.2.2.2 Routes CSU Description**
Module that implements the addresses, or paths, associated with HTTP requests. Each route contains a path, a request method (GET, POST, PUT, DELETE), and a reference to a function handler that is called when the request is made for that route.

Description: Requests method routing for database
Attributes: GET POST PUT DELETE


**7.2.2.1 API CSU Description**
Module that implements the API functions associated with each route in the Routes CSU. 

Description: Chronological routing to communicate with frontend and database
Attributes: API -> Queries -> Query -> Response -> Schema -> Service 


**7.2.2.3 Server Response CSU Description**
Module responsible for sending responses, or replies, from the client-side server back to the frontend of the SPY Database Application.

Description: 
Attributes:


**7.2.2.4 Query CSU Description**
Responsible for connecting to the database server from within the client-side server and initiating a query to the database.

Description:
Attributes:


**7.3 Database CSC Design Description**
		
**7.3.1 Client CSU Description**
		
Description: Client table containing information relevant to youth prescreen

Attributes: id, first_name, last_name, nickname, person_completing_intake, gender, race, intake_date, hmis_consent, first_time, first_intake_Date, case_manager, case_manager_id, phone_number, email, date_of_birth, intake_age, provided_id, id_state, reference, services, status, caseplan


**7.3.2 Case Manager CSU Description**

Description: Case manager table containing information relevant to person as well as username and password

Attributes: id, first_name, last_name, position


**7.3.3 Case Note CSU Description**

Description: Case note table containing case note information, like text and date, as well as the accompanying case manager and client

Attributes: id, client_id, case_manager_id, date, category, note, follow_up_needed, due_date, reminder_date


**7.3.4 Background CSU Description**

Description: Table containing a referenced client’s background indicated during the intake form

Attributes: id, client_id, disability, last_grade_completed, some_completed, currently_attending, graduated, first_language, preferred_language, marital_status, military_service, health_insurance, gender_identification, preferred_pronoun, ethnicity, race


**7.3.5 Housing History CSU Description**
		
Description: Table containing a referenced client’s housing history indicated during the intake form

Attributes: id, client_id, last_sleeping_location, last_sleeping_duration, first_day_first_time_homeless, current_homeless_start_date, current_homeless_length, homeless_episode_count, location_before_west_la, duration_in_west_la, housing_instability_cause, stable_housing_obstacle, housing_interest


**7.3.6 Natural Connection CSU Description**

Description: Table containing a referenced client’s natural connection, like an aunt or uncle, indicated during the intake form

Attributes: id, client_id, natural_connection, conatct_name, contact_phone_number, contact_relationship


**7.3.7 Pregnant and Parenting CSU Description**

Description: Table containing a referenced client’s pregnancy and parenting history indicated during the intake form

Attributes: id, client_id, currently_pregnant, first_pregnancy, pre_natal_care_received, pre_natal_care_location, pre_natal_care_desired, trimester, baby_due_date, has_other_children, dcfs_open_case, children_with_family_or_friends


**7.3.8 Substance Abuse CSU Description**

Description:Table containing a referenced client’s substance abuse history indicated during the intake form

Attributes: id, client_id, substance_abuse, choice_substance, injected_drugs, treatment_interest


**7.3.9 Mental Health CSU Description**

Description: Table containing information indicated during the intake form relevant to a client’s mental health, such as  mental illnesses and medication

Attributes: id, client_id, mental_services_received, mental_services_location, mental_medication, help_acquiring_medicine


**7.3.10 Referral CSU Description**
		
Description: Table containing internal and external referrals relevant to a client

Attributes: id, client_id, internal_referral, external_referral


**7.3.11 Additional Info CSU Description**


Description: Table containing any additional information relevant to a referenced client

Attributes: id, client_id, income, birth_city, birth_state, birth_country, employed, looking_for_employment, foster_care, social_security_number, caring_for_animals, chronically_homeless


**7.3.12 Forms CSU Description**

Description: Table containing information on forms to be filled out by a youth

Attributes: id, client_id, good_neighbor_contract, story_photo_video_audo_form, information_release_authorized, services_consent, shower_guidelines, drop_in_guidelines, intake_confirmation, immediate_needs_transportation, documents_signed, sleeping_bag, backpack


**7.3.13 Match CSU Description**
		
Description: Table matching case managers with clients

Attributes: id, casemanager_id, client_id


**7.3.14 Program CSU Description**

Description: Table containing information relevant to SPY programs

Attributes: id, program_name


**7.3.15 Subprogram CSU Description**

Description: Table containing information about subprograms

Attributes: id, subprogram_name, program_id


**7.3.16 Activity CSU Description**

Description: Table containing information about activities held

Attributes: id, program_id, activity_name, location, ongoing, start_time, end_time


**7.3.17 Drop_in CSU Description**
		
Description: Table containing drop in session information

Attributes: id, date


**7.3.18 Match_drop_in_activity CSU Description**

Description: Table matching activities to drop in sessions

Attributes: id, drop_in_id, activity_id, room, comments, start_time, end_time

	
**7.3.19 Enrollment CSU Description**

Description:Table containing a referenced client’s substance abuse history indicated during the intake form

Attributes: id, drop_in_activity_id, client_id


**7.3.20 Check_in CSU Description**

Description: Table matching drop in sessions with attending clients

Attributes: id, drop_in_id, client_id


**7.3.21 Users CSU Description**
		
Description: Table containing user account settings

Attributes: id, username, hashed_password


**7.3.11 Notification_types CSU Description**

Description: Table containing possible notification categories

Attributes: id, name


**7.3.12 Notification CSU Description**

Description: Table containing information pertaining to notifications

Attributes: id, user_id, type, comment, link, checked


**7.3.24 Flags CSU Description**

Description: Table containing information relating to possible flags

Attributes: type, message, color, note


**7.3.25 Profile_flags CSU Description**

Description: Table matching clients and their respective flags

Attributes: client_id, flag_id


**7.3.26 File CSU Description**

Description: Table for storing files and file information

Attributes: id, client_id, name, type, date, base_64_string


**7.3.27 Backpack_sleepingbag_waitlist CSU Description**

Description: Table containing information on sleeping bag and backpack wait status for clients

Attributes: id, client_id, backpack, sleeping_bag, ask_date


**7.3.28 Monthly_statistics CSU Description**

Description: Table containing monthly statistics data

Attributes: id, month, year, unduplicated_youth, total_youth


**7.4 Detailed Interface Description**

**7.4.1 Socket CSC Description**
		- Frontend to backend communication
	SPFY application uses NodeJS server to handle any requests that the frontend sends, so the frontend pages will initiate requests which are received and processed by the NodeJS server.

- The NodeJS server initiates connections with the Postgres Database server
	The frontend utilizes ajax calls to pass JSON data to the server, which retrieves the payload data and utilizes it for API calls. During API calls, the NodeJS server initializes a connection to the Postgres database server and executes a query string along the established connection. 

- Types of data passed between the database and server and frontend
	The Postgres database server retrieves the queried data and passes it back to the NodeJS server, which converts it to JSON. The NodeJS server passes the necessary JSON data, along with a response code, back to the frontend to be displayed in the page. 

- How does the browser handle frontend pages/files?
	SPFY uses React’s Virtual DOM to update the view in SPFY application, so that it can update efficiently and render pages faster. All CSS is compiled into one screen.css file from the screen.scss file, which is made up of various imports of modularized SASS, including Bootstrap 4. Compass is used to automatically compile these files.


