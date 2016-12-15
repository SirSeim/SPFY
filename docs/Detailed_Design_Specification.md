**7.0	Detailed Design Specification**

**7.1	Introduction**

This document presents a detailed description of the software for the Safe Place for Youth (SPY) database as described in the [*Requirements Specification*](https://github.com/SirSeim/SPFY/blob/master/docs/Requirements_Specification.md). The SPY Database will allow users to store and retrieve data over the Internet from any platform, be it a desktop computer, tablet, or smartphone. 

**7.2 Detailed Design Description**

**7.2.1 Frontdesk Page CSC Description**
What are we supposed to put inside this section?
This -> “• A class diagram showing the different classes, including some (but not all) of the major methods and class fields
A sequence diagram or an activity diagram showing processing flow between the parts; possibly multiple sequence diagrams would be needed to show different operations
A state diagram showing the various states of this CSC and the events which cause the transition between the states”

**7.2.1.1 Client Profile Table CSU Description**

Description: Module that implements the functionality for displaying the client profiles as separate rows in a table.Each row displays a client profile’s status color, first name, and last name. A search bar is used to filter client profiles based on first and last name.
Attributes: Runs table component, populates table, handles search

			
**7.2.1.2 Activity Table CSU Description**
			
Description: Module that implements the functionality for displaying the client profiles associated with this activity as separate rows in a table. This module builds and populates each activity table component that appears on the frontend and handles its search, display, and edit functionality.
Attributes: populates table


**7.2.1.3 Checkin CSU Description**
			
Description: Module that implements the functionality for the components and buttons that facilitate checking clients into a drop-in session.
Attributes: Runs page, Makes requests, Populates components with data

			

**7.2.2 Client Profiles Page CSC Description**

		
	The Entities in our client profiles page are Information, Case Management, Documents, Referrals, Other. Each of the entities have some actions and Attributes. Some entities do not have actions or attributes. The Information entity includes Edit Client action that allows you to change the attributes of the clients information. Also, the information entity has a profile picture box. The profile picture has a relationship with Documents entity. The Documents entity allows you to add files onto each client profile. The attributes of add file are compressed folder, document and Photo. Both Referrals and Other do not have actions or attributes. Case management entity on the other hand has an add case note action and the attributes are case notes, client, case manager, and Date.

**7.2.2.1 Client Profile CSU Description**

Description: Module that implements the functionality for displaying information associated with a specific client profile in the database.
Attributes:


**7.2.3 Data Browser CSC Description**


Description: Module that implements functionality for displaying and querying the contents of the tables contained in the database as rows in a table. Each row displays the values contained in each table row for the filter specified. 
Attributes: Runs a search, populates the table, allows view of detail 


A page allowing the user to search and view the entire database. The user can then generate queries in the query builder, with results being displayed in the Filter Table. They can click on rows in the Filter table to see the content of the table in a more easily readable form within the Detail Pane. The ability to generate reports based on the query given is also available. 

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
Attributes:


**7.3.2 Case Manager CSU Description**

Description: Case manager table containing information relevant to person as well as username and password
Attributes:


**7.3.3 Case Note CSU Description**

Description: Case note table containing case note information, like text and date, as well as the accompanying case manager and client
Attributes:


**7.3.4 Background CSU Description**

Description: Table containing a referenced client’s background indicated during the intake form
Attributes:


**7.3.5 Housing History CSU Description**
		
Description: Table containing a referenced client’s housing history indicated during the intake form
Attributes:


**7.3.6 Natural Connection CSU Description**

Description: Table containing a referenced client’s natural connection, like an aunt or uncle, indicated during the intake form
Attributes:


**7.3.7 Pregnant and Parenting CSU Description**

Description: Table containing a referenced client’s pregnancy and parenting history indicated during the intake form
Attributes:


	
**7.3.8 Substance Abuse CSU Description**

Description:Table containing a referenced client’s substance abuse history indicated during the intake form
Attributes:


**7.3.9 Mental Health CSU Description**

Description: Table containing information indicated during the intake form relevant to a client’s mental health, such as  mental illnesses and medication**
Attributes:


**7.3.10 Referral CSU Description**
		
Description: Table containing internal and external referrals relevant to a client
Attributes:


**7.3.11 Additional Info CSU Description

Description: Table containing any additional information relevant to a referenced client
Attributes:


**7.3.12 Forms CSU Description**

Description: Table containing information on forms to be filled out by a youth
Attributes:

**7.3.1 Match CSU Description**
		
Description: Table matching case managers with clients
Attributes:


**7.3.2 Program CSU Description**

Description: Table containing information relevant to SPY programs
Attributes:


**7.3.3 Subprogram CSU Description**

Description: Table containing information about subprograms
Attributes:


**7.3.4 Activity CSU Description**

Description: Table containing information about activities held
Attributes:


**7.3.5 Drop_in CSU Description**
		
Description: Table containing drop in session information
Attributes:


**7.3.6 Match_drop_in_activity CSU Description**

Description: Table matching activities to drop in sessions
Attributes:


	



**7.3.7 Match_drop_in_client CSU Description**

Description: Table matching drop in sessions to their attending clients
Attributes:


	
**7.3.8 Enrollment CSU Description**

Description:Table containing a referenced client’s substance abuse history indicated during the intake form
Attributes:


**7.3.9 Mental Health CSU Description**

Description: Table containing information indicated during the intake form relevant to a client’s mental health, such as  mental illnesses and medication
Attributes:


**7.3.10 Referral CSU Description**
		
Description: Table containing internal and external referrals relevant to a client
Attributes:


**7.3.11 Additional Info CSU Description**

Description: Table containing any additional information relevant to a referenced client
Attributes:


**7.3.12 Forms CSU Description**

Description: Table containing information on forms to be filled out by a youth
Attributes:


**7.4 Detailed Interface Description**

**7.4.1 Socket CSC Description**
		- Frontend to backend communication
SPFY application uses NodeJS server to handle any requests that the frontend sends, so the frontend pages will initiate requests which are received and processed by the NodeJS server.

- The NodeJS server initiates connections with the Postgres Database server
	The frontend utilizes ajax calls to pass JSON data to the server, which retrieves the payload data and utilizes it for API calls. During API calls, the NodeJS server initializes a connection to the Postgres database server and executes a query string along the established connection. 

- Types of data passed between the database and server and frontend
The Postgres database server retrieves the queried data and passes it back to the NodeJS server, which converts it to JSON. The NodeJS server passes the necessary JSON data, along with a response code, back to the frontend to be displayed in the page. 

- How does the browser handle frontend pages/files?
	SPFY uses React’s Virtual DOM to update the view in SPFY application, so that it can update efficiently and render pages faster. 


