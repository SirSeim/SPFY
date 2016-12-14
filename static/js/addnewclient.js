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
        dobDay: moment().date(),
        dobMonth: moment().month(),
        dobYear: moment().year(),
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
    var dob = moment().date(this.state.dobDay)
                      .month(this.state.dobMonth)
                      .year(this.state.dobYear)
                      .toISOString();
    console.log(dob);
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
        lastName: lastName,
        nickname: this.state.nickname.trim(),
        personCompletingIntake: this.state.personCompletingIntake.trim(),
        intakeDate: this.state.intakeDate,
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

      // var picture = {
      //   clientID: clientID,
      //   name: name,
      //   type: "profile_picture",
      //   fileString: fileString
      // }
      
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
          url: "api/clients",
          method: "POST",
          data: { expression: JSON.stringify(data) },
          success: function (data) {
              console.log(data);
              console.log("result");
              console.log(data.result);
              window.location.href = "/";
          },
          error: function (xhr) {
              console.error(xhr);

              if (xhr.status === 401) {
                  localStorage.removeItem("authorization");
              }
          }
      });
      /**/

      // $.ajax({
      //     xhrFields: {
      //         withCredentials: true
      //     },
      //     beforeSend: function (xhr) {
      //         xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
      //     },
      //     url: "api/files",
      //     method: "POST",
      //     data: picture,
      //     success: function (data) {

      //     },
      //     error: function (xhr) {
      //         console.error(xhr);

      //         if (xhr.status === 401) {
      //             localStorage.removeItem("authorization");
      //         }
      //     }
      // });

      console.log("handleSubmit");
    };
  },
  handlePersonCompletingIntakeChange: function (e) {
    this.setState({personCompletingIntake: e.target.value});
  },
  handleFirstTimeChange: function (e) {
    var getVal = e.currentTarget.value,
        boolVal = false;
    if (getVal === "true") {
      boolVal = true;
    };
    this.setState({firstTime: boolVal});
  },
  // handlePictureChange: function (e) {
  //   this.setState({picture: e.target.value});
  // },
  handleFirstNameChange: function (e) {
    this.setState({firstName: e.target.value.trim()});
  },
  handleNicknameChange: function (e) {
    this.setState({nickname: e.target.value});
  },
  handleLastNameChange: function (e) {
    this.setState({lastName: e.target.value});
  },
  handleBirthDayChange: function (e) {
    this.setState({dobDay: e.target.value});
    console.log("Day changed.");
  },
  handleBirthMonthChange: function (e) { 
    this.setState({dobMonth: e.target.value});
    console.log("Month changed.");
    var date = moment().date(this.state.dobDay)
                       .month(this.state.dobMonth)
                       .year(this.state.dobYear);
    if (this.state.dobDay !== date.date()) { 
      // Change state if the date is outside day range (ex: If currently set at Feb 30th)
      this.setState({dobDay: $("select[name='birthDay']").val()});
    }
  },
  handleBirthYearChange: function (e) {
    this.setState({dobYear: e.target.value});
    console.log("Year changed.");
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
      <div className="row">
        <div className="col-sm-4">
          <form className="intakeForm" onSubmit={this.handleSubmit}>
            Person Filling out this form: <input type="text"
                                            onChange={this.handlePersonCompletingIntakeChange} />
            <br />
            First Time Attending? <input type="radio" name="firstTime" value="true"
                                    checked={this.state.firstTime === true}
                                    onChange={this.handleFirstTimeChange} /> Yes
                                  <input type="radio" name="firstTime" value="false"
                                    checked={this.state.firstTime === false}
                                    onChange={this.handleFirstTimeChange} /> No
            {/*Assigned Case Manager:  TO DO */}
            <br />
            <input type="text" className="form-control" id="clientFirstName" placeholder="First Name" 
                  onChange={this.handleFirstNameChange} />
            <br />
            <input type="text" className="form-control" id="clientLastName" placeholder="Last Name"
                  onChange={this.handleLastNameChange} />
            <br />
            <input type="text" className="form-control" id="clientNickName" placeholder="Nick Name (optional)"
                  onChange={this.handleNicknameChange} />
            <br />
            Date of Birth: <DateDropdown handleDayChange={this.handleBirthDayChange}
                                         handleMonthChange={this.handleBirthMonthChange}
                                         handleYearChange={this.handleBirthYearChange}
                                         day = {this.state.dobDay}
                                         month = {this.state.dobMonth}
                                         year = {this.state.dobYear} />
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
        </div>
        <div className="col-sm-4">
          <DisplayArea ref={(da) => {this.displayarea = da;}} text="Hello"/>
        </div>
      </div>
    );
  }
});

var DateDropdown = React.createClass({
  render: function () {
    var date = moment().date(this.props.day)
                       .month(this.props.month)
                       .year(this.props.year) 
    var totalDays = date.daysInMonth();
    return (
      <div>
        <select name="birthMonth" defaultValue={date.month()} onChange={this.props.handleMonthChange}>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
        <DayDropdown handleDayChange={this.props.handleDayChange} 
                     totalDays={totalDays}
                     date={date.date()} />
        <YearDropdown handleYearChange={this.props.handleYearChange}
                      year={date.year()} />
      </div>
    )
  }
});

var DayDropdown = React.createClass({
  render: function () {
    console.log(this.props.date);
    var showTwentyNineth = (29 > this.props.totalDays) ? "hidden" : "";
    var showThirtieth = (30 > this.props.totalDays) ? "hidden" : "";
    var showThirtyFirst = (31 > this.props.totalDays) ? "hidden" : "";
    if ($("select[name='birthDay']").val() > this.props.totalDays) {
      $("select[name='birthDay']").val(this.props.totalDays);
    };
    return (
      <select name="birthDay" defaultValue={this.props.date} onChange={this.props.handleDayChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29" className={showTwentyNineth}>29</option>
          <option value="30" className={showThirtieth}>30</option>
          <option value="31" className={showThirtyFirst}>31</option>
        </select>
    )
  }
})

var YearDropdown = React.createClass({
  render: function () {
    var yearOptions = [];
    for(var i = this.props.year - 50; i <= this.props.year; i++) {
      yearOptions.push(<option key={i} value={i}>{i}</option>);
    }
    return (
      <select name="birthYear" defaultValue={this.props.year} onChange={this.props.handleYearChange}>
        {yearOptions}
      </select>
    )
  }
})

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
  <IntakeForm />,
  document.getElementById('addClientContent') // html has a div with id='content'
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
