// basic building block of ReactJS is a 'component'
// a 'component' is basically a React class
var IntakeForm = React.createClass({
  getInitialState: function () {
    return {
        firstName: "",
        lastName: "",
        nickname: "",
        personCompletingIntake: "",
        intakeDate: moment().toISOString(),
        HMISConsent: false,
        firstTime: true,
        caseManager: "",
        caseManagerID: 0,
        phoneNumber: "",
        email: "",
        dob: "",
        intakeAge: 0,
        providedID: true,
        IDstate: "CA",
        otherID: "",
        reference: "",
        referenceOther: "",
        services: "",
        disability: false,
        lastGradeCompleted: "",
        someCompleted: "",
        currentlyAttending: [],
        graduated: false,
        firstLanguage: "English",
        preferredLanguage: "English",
        maritalStatus: "Unmarried",
        militaryService: "",
        healthInsurance: false,
        gender: "Male",
        genderIdentification: "Male",
        preferredPronoun: "",
        ethnicity: "White",
        race: "",
        lastSleepingLocation: "",
        lastSleepingDuration: "",
        firstDayFirstTimeHomeless: "",
        currentHomelessStartDate: "",
        currentHomelessLength: "",
        homelessEpisodeCount: "",
        locationBeforeWestLA: "",
        durationInWestLA: "",
        housingInstabilityCause: "",
        stableHousingObstacle: "",
        housingInterest: "",
        naturalConnection: "",
        contactName: "",
        contactPhoneNumber: "",
        contactRelationship: "",
        currentlyPregnant: "",
        firstPregnancy: "",
        preNatalCareReceived: "",
        preNatalCareLocation: "",
        preNatalCareDesired: "",
        trimester: "",
        babyDueDate: "",
        hasOtherChildren: "",
        dcfsOpenCase: "",
        childrenWithFamilyOrFriends: "",
        substanceAbuse: "",
        choiceSubstance: "",
        injectedDrugs: "",
        treatmentInterest: "",
        mentalServicesReceived: "",
        mentalServicesLocation: "",
        mentalMedication: "",
        helpAcquiringMedicine: "",
        internalReferral: "",
        externalReferral: "",
        income: "",
        birthCity: "",
        birthState: "",
        birthCountry: "",
        employed: "",
        lookingForEmployment: "",
        fosterCare: "",
        socialSecurityNumber: "",
        caringForAnimals: "",
        goodNeighborContract: "",
        storyPhotoVideoAudioForm: "",
        informationReleaseAuthorized: "",
        servicesConsent: "",
        showerInstructions: "",
        showerGuidelines: "",
        dropInGuidelines: "",
        intakeConfirmation: "",
        immediateNeedsConfirmation: "",
        documentsSigned: "",
        sleepingBag: "",
        backpack: "",
        responseData: {}
      };
  },
  handleSubmit: function (e) { // 'e' is an event
    e.preventDefault();

    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    // var birthDate = this.state.birthDate.trim();
    // var birthday = moment(birthYear + "-" + birthMonth + "-" + birthDate);
    // birthday.toISOString();
    //if (isNaN(birthDate)) {
    //  console.log("this is false.");
    //  return
    if (!firstName || !lastName) {
      console.log("I was missing a critical piece.");
    } else {
      // Ajax will go here

      // ajax doesn't take nested objects when passing data
      // so have to JSON stringify it on this end and unstringify
      // it on the other end
      var data = {
        firstName: firstName,
        nickname: this.state.nickname.trim(),
        lastName: lastName,
        personCompletingIntake: this.state.personCompletingIntake.trim(),
        intakeDate: this.state.intakeDate,
        HMISConsent: this.state.HMISConsent,
        firstTime: this.state.firstTime,
        providedID: this.state.providedID,
        IDstate: this.state.IDstate,
        returning: {
            id:"", 
            firstname:"", 
            nickname: "", 
            lastname:"",
            personcompletingintake: "",
            hmisconsent: "",
            firsttime: "",
            providedid: "",
            idstate: ""
          }
      }
      
      console.log("data sent");
      console.log(data);

      

      /**/

      // because ajax is asynchronous, any return statements
      // will return before the callbacks (success, error) run
      // the return runs before the request is complete essentially

      $.ajax({
          xhrFields: {
              withCredentials: true
          },
          beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
          },
          url: "api/createclient",
          method: "POST",
          data: { expression: JSON.stringify(data) },
          success: function (data) {
              console.log(data);
              console.log("result");
              console.log(data.result);
              var rows = data.result.rows;
              var string = "";
              for (var property in rows[0]) {
                string += '<h4>' + property + '</h4>' + rows[0][property]; 
              }
              $("#display-area").append('<div>'
                    // + '<h3>New Client Added</h3>' 
                    // + '<h4>ID</h4>' + rows[0].id
                    // + '<h4>First Name</h4>' + rows[0].firstname
                    // + '<h4>Nickname</h4>' + rows[0].nickname
                    // + '<h4>personCompletingIntake</h4>' + rows[0].personcompletingintake
                    // + '<h4>intakeDate</h4>' + rows[0]
                    // + '<h4> Last Name</h4>' + rows[0].lastname
                    + string
                    + '</div>');
          },
          error: function (xhr) {
              console.log(xhr);

              if (xhr.status === 401) {
                  localStorage.removeItem("authorization");
                  login.show();
                  alert.hide();
              }
          }
      });
      /**/

      console.log("handleSubmit");
    };
  },
  handlePersonCompletingIntakeChange: function (e) {
    this.setState({personCompletingIntake: e.target.value});
  },
  handleHMISConsentChange: function (e) {
    var getVal = e.currentTarget.value,
        boolVal = false;
    if (getVal === "true") {
      boolVal = true;
    };
    this.setState({HMISConsent: boolVal});
  },
  handleFirstTimeChange: function (e) {
    var getVal = e.currentTarget.value,
        boolVal = false;
    if (getVal === "true") {
      boolVal = true;
    };
    this.setState({firstTime: boolVal});
  },
  handleIntakeDateChange: function (e) {
    console.log("Handling...");
    var date = moment(e).toISOString();
    console.log(date);
    this.setState({intakeDate: date});
  },
  handleFirstNameChange: function (e) {
    this.setState({firstName: e.target.value.trim()});
  },
  handleNicknameChange: function (e) {
    this.setState({nickname: e.target.value});
  },
  handleLastNameChange: function (e) {
    this.setState({lastName: e.target.value});
  },
  handleBirthdayChange: function (e) {
    this.setState({dob: e.target.value}); // will not work right now
  },
  handleEmailChange: function (e) {
    this.setState({email: e.target.value});
  },
  handleProvidedIDChange: function (e) {
    var getVal = e.currentTarget.value,
        boolVal = false;
    if (getVal === "true") {
      boolVal = true;
    };
    this.setState({providedID: boolVal})
  },
  handleStateIDChange: function (e) {
    this.setState({stateID: e.target.value});
  },
  handleOtherIDChange: function (e) {
    this.setState({otherID: e.target.value});
  },
  handleReferenceChange: function (e) {
    this.setState({refernce: e.target.value})
  },
  handleReferenceOtherChange: function (e) {
    this.setState({referenceOther: e.target.value});
  },

  // every React component is required to have a 'render' function
  // to display the html
  render: function () {
    var currentYear = new Date().getFullYear(),
        todaysDate = moment();
    return (
      <div>
        <form className="intakeForm" onSubmit={this.handleSubmit}>
            Person Filling out this form: <input type="text"
                                            onChange={this.handlePersonCompletingIntakeChange} />
            HMIS Consent: <input type="radio" name="HMIS" value="true"
                                  checked={this.state.HMISConsent === true}
                                  onChange={this.handleHMISConsentChange} /> Yes
                          <input type="radio" name="HMIS" value="false"
                                  checked={this.state.HMISConsent === false}
                                  onChange={this.handleHMISConsentChange} /> No
            <br />
            First Time Attending? <input type="radio" name="firstTime" value="true"
                                    checked={this.state.firstTime === true}
                                    onChange={this.handleHMISConsentChange} /> Yes
                                  <input type="radio" name="firstTime" value="false"
                                    checked={this.state.firstTime === false}
                                    onChange={this.handleHMISConsentChange} /> No
            {/*Assigned Case Manager:  TO DO */}
            <br />
            Date of Intake: <DateDropdown handleChange={this.handleIntakeDateChange} />
            First Name: <input type="text"
                          onChange={this.handleFirstNameChange} />
            Nickname: <input type="text"
                        onChange={this.handleNicknameChange} />
            Last Name: <input type="text"
                        onChange={this.handleLastNameChange} />
            <br />
            Date of Birth: <DateDropdown handleChange={this.handleBirthdayChange} />
            Email: <input type="text"
                    onChange={this.handleEmailChange} />
            <br />
            ID Provided? <input type="radio" name="idProvided" value="true"
                                  checked={this.state.providedID === true}
                                  onChange={this.handleProvidedIDChange} /> Yes
                          <input type="radio" name="idProvided" value="false"
                                  checked={this.state.providedID === false}
                                  onChange={this.handleProvidedIDChange} /> No
            <IdInfo display={this.state.providedID}
                    stateID={this.state.stateID}
                    changeState={this.handleStateIDChange}
                    changeOtherID={this.handleOtherIDChange} />
            <br />
            How did you hear about Spy? {/* Need textbox on other */}
            <select name="howHear" defaultValue="outreach" onChange={this.handleHowHeard}>
              <option value="outreach">SPY Outreach</option>
              <option value="friends">Friends</option>
              <option value="web">Web</option>
              <option value="other">Other</option>
            </select>
            {/* Not included: Services */}
            <br />
            <input type="submit" value="Submit" />
          </form>
          <DisplayArea ref={(da) => {this.displayarea = da;}} />
      </div>
    );
  }
});

// This isn't working properly for some reason...
var DateDropdown = React.createClass({
  getInitialState: function () {
    var todaysDate = moment(),
        month = todaysDate.format("MM"),
        day = todaysDate.format("DD"),
        year = todaysDate.format("YYYY");
    return {month: month, day: day, year: year};
  },
  handleMonthChange: function (e) {
    this.setState({month: e.target.value});
    if (this.state.day > this.state.month.daysInMonth) {
      this.state.day = 1
    };
    var newDate = moment([this.state.year, this.state.month, this.state.day]);
    this.props.handleChange(newDate);
  },
  handleDayChange: function (e) {
    this.setState({day: e.target.value})
    var newDate = moment([this.state.year, this.state.month, this.state.day]);
    this.props.handleChange(newDate);
  },
  render: function () {
    var monthSelect = [];
    for (var i = 0; i < 12; i++) {
      monthSelect.push(
        <option value={i + 1} key={"month" + i}>{moment().startOf("year").add(1 * i, "months").format("MMMM")}</option>
      )
    };
    var daySelect = [];
    var daysInMonth = moment(this.state.year + "-" + this.state.month).daysInMonth();
    for (var i = 1; i <= daysInMonth; i++) {
      daySelect.push(
        <option value={i} key={"day" + i}>{i}</option>
      )
    }
    console.log(this.state.month);
    return (
      <div>
        <select defaultValue={this.state.month} onChange={this.handleMonthChange}>
          {monthSelect}
        </select>
        <select defaultValue={this.state.day} onChange={this.handleDayChange}>
          {daySelect}
        </select>
      </div>
    );
  }
})

// Though this doesn't work either
var DateOfBirthDropdown = React.createClass({
  getInitialState: function () {
    return {birthMonth: "01", birthDate: "1", birthYear: "2016"};
  },
  handleMonth: function (e) {
    var daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.setState({birthMonth: e.target.value});
    this.props.changeMonth({birthMonth: e.target.value});
  },
  handleDate: function (e) {
    this.setState({birthDate: e.target.value});
    this.props.changeDate({birthDate: e.target.value});
  },
  handleYear: function (e) {
    this.setState({birthyear: e.target.value});
    this.props.changeYear({birthYear: e.target.value});
  },
  render: function () {
    var yearOptions = [];
    for (var j = this.props.currentYear; j > 1975; j--) {
      yearOptions.push(
        <GetOption val={j} valName={j} key={j} />
      );
    };
    return (
      <div>
        Date of Birth:
        <select name="Month" defaultValue="01" onChange={this.handleMonth}>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <input type="text" onChange={this.handleDate} />
        <select name="Year" defaultValue={this.props.currentYear} onChange={this.handleYear}>
          {yearOptions}
        </select>
      </div>
    );
  }
});

// this is being used inside the intake form component
var IdInfo = React.createClass({
  render: function () {
    var display = (this.props.display) ? "" : "hidden";
    return (
      <div className={display}>
        ID State:
        <select name="state" defaultValue={this.props.stateID} onChange={this.props.changeState}>
          <option value="AK">AK</option>
          <option value="AL">AL</option>
          <option value="AR">AR</option>
          <option value="AZ">AZ</option>
          <option value="CA">CA</option>
          <option value="CO">CO</option>
          <option value="CT">CT</option>
          <option value="DC">DC</option>
          <option value="DE">DE</option>
          <option value="FL">FL</option>
          <option value="GA">GA</option>
          <option value="HI">HI</option>
          <option value="IA">IA</option>
          <option value="ID">ID</option>
          <option value="IL">IL</option>
          <option value="IN">IN</option>
          <option value="KS">KS</option>
          <option value="KY">KY</option>
          <option value="LA">LA</option>
          <option value="MA">MA</option>
          <option value="MD">MD</option>
          <option value="ME">ME</option>
          <option value="MI">MI</option>
          <option value="MN">MN</option>
          <option value="MO">MO</option>
          <option value="MS">MS</option>
          <option value="MT">MT</option>
          <option value="NC">NC</option>
          <option value="ND">ND</option>
          <option value="NE">NE</option>
          <option value="NH">NH</option>
          <option value="NJ">NJ</option>
          <option value="NM">NM</option>
          <option value="NV">NV</option>
          <option value="NY">NY</option>
          <option value="OH">OH</option>
          <option value="OK">OK</option>
          <option value="OR">OR</option>
          <option value="PA">PA</option>
          <option value="RI">RI</option>
          <option value="SC">SC</option>
          <option value="SD">SD</option>
          <option value="TN">TN</option>
          <option value="TX">TX</option>
          <option value="UT">UT</option>
          <option value="VA">VA</option>
          <option value="VT">VT</option>
          <option value="WA">WA</option>
          <option value="WI">WI</option>
          <option value="WV">WV</option>
          <option value="WY">WY</option>
        </select>
        <br />
        Other Forms of ID: <input type="text" onChange={this.props.changeOtherID} />
      </div>
    )
  }
});

// this is being used inside the IdInfo component
var GetOption = React.createClass({
  render: function () {
    return (
      <option value={this.props.val}>{this.props.valName}</option>
    )
  }
})

var DisplayArea = React.createClass({
  render: function () {
    return (
      <div id="display-area">
        <h1>{this.props.text}</h1>
      </div>
    )
  }
});
// calls the render function of the given component to display
// takes two parameters: 1) component to display 2) where to display it
// React only tries to display one component, so can display
// multiple components as long as they are encased in a div
ReactDOM.render(
    <div>
      <IntakeForm />
    </div>,
  document.getElementById('content') // html has a div with id='content'
);

// to display multiple components with same render function
// need to place them inside another div
/*
ReactDOM.render(
    <div>
        <IntakeForm />
        <IntakeForm />
        <IntakeForm />
    </div>,
    document.getEleementByID('content')
);
*/

// *** When the state of a component changes, it's render function is called
// again to re-render its new state

// every component has
// this.props
// this.props.children
// this.state
// when a function is defined within a component, it is accessed as
// this.functionName

// every component has a this.state property
// getInitialState is a React built-in function just like render()
// returns an object of key-value pairs with initial states
/*
    getInitialState: function () {
      return {
        checked: false
      }
    }
*/

// this.setState is another React built-in function
// takes in object with same key-value pair state values
// (put inside a handler)
/*
  handleCheck: function () {
    this.setState({ checked: !this.state.checked });
  }
*/

// Sample code for changing state
/*
  <!DOCTYPE html>
<html>
    <head>
        <script src="https://fb.me/react-15.2.1.js"></script>
        <script src="https://fb.me/react-dom-15.2.1.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>
        <title>Intro to State</title>
    </head>
    <body>
        <div id='react-container'></div>
        <script type="text/babel">

        var Checkbox = React.createClass({
            getInitialState() {
                return {checked: true}
            },
            handleCheck() {
                this.setState({checked: !this.state.checked})
            },
            render() {
                var msg
                if(this.state.checked) {
                    msg = "checked"
                } else {
                    msg = "unchecked"
                }
                return ( <div>
                        <input type="checkbox"
                               onChange={this.handleCheck}
                               defaultChecked={this.state.checked}/>
                        <p>This box is {msg}</p>
                    </div>)
            }
        })
        ReactDOM.render(<Checkbox/>,
            document.getElementById('react-container'))
        </script>
    </body>
</html>
*/

{/* JSX comment */} // must be wrapped in curly braces
