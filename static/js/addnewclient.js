var IntakeForm = React.createClass({
  getInitialState: function () {
    return {firstName: "", nickname: "", lastName: "",
            birthMonth: "01", birthDate: "01", birthYear: "2016",
            email: "", howHeard: ""};
  },
  handleSubmit: function (e) {
    console.log("fudge");
    e.preventDefault();
    var firstName = this.state.firstName.trim();
    var nickname = this.state.nickname.trim();
    var lastName = this.state.lastName.trim();
    var birthDate = this.state.birthDate.trim();
    var birthday = moment(birthYear + "-" + birthMonth + "-" + birthDate);
    birthday.toISOString();
    if (isNaN(birthDate)) {
      console.log("this is false.");
      return
    } else if (!firstName || !lastName) {
      console.log("I was missing a critical piece.");
    } else {
      // ajax call
    };
  },
  handleFirstNameChange: function (e) {
    this.setState({firstName: e.target.value});
  },
  handleNicknameChange: function (e) {
    this.setState({nickname: e.target.value});
  },
  handleLastNameChange: function (e) {
    this.setState({lastName: e.target.value});
  },
  handleBirthMonthChange: function (e) {
    this.setState({birthMonth: e});
  },
  handleBirthDateChange: function (e) {
    this.setState({birthDate: e});
  },
  handleBirthYearChange: function (e) {
    this.setState({birthYear: e});
  },
  handleEmailChange: function (e) {
    this.setState({email: e.target.value});
  },
  handleHowHeard: function (e) {
    this.setState({howHEar: e.target.value})
  },
  render: function () {
    var currentYear = new Date().getFullYear();
    return (
      <div>
        <form className="intakeForm" onSubmit={this.handleSubmit}>
          First Name: <input type="text"
                        onChange={this.handleFirstNameChange} />
          Nickname: <input type="text" 
                      onChange={this.handleNicknameChange} />
          Last Name: <input type="text"
                      onChange={this.handleLastNameChange} />
          <br />
          <DateOfBirthDropdown 
            changeMonth={this.handleBirthMonthChange}
            changeDate={this.handleBirthDateChange} 
            changeYear={this.handleBirthYearChange} 
            currentYear={currentYear} />
          Email: <input type="text"
                  onChange={this.handleEmailChange} />
          <br />
          ID Provided?  {/* Make into component that asks for ID and ID type if yes. currently NOT STORED. */}
              <input type="radio" name="idProvided" value="idYes" /> Yes
              <input type="radio" name="idProvided" value="idNo" /> No
          <br />
          How did you hear about Spy? {/* Same as ID. Make other option functional */}
          <select name="howHear" defaultValue="outreach" onChange={this.handleHowHeard}>
            <option value="outreach">SPY Outreach</option>
            <option value="friends">Friends</option>
            <option value="web">Web</option>
            <option value="Other">Other</option>
          </select>
          {/* Not included: Services */}
          <br /> 
          <input type="submit" value="Submit" />
        </form>
        <div className="trashDiv">
          <p>
            My name is {this.state.firstName} ({this.state.nickname}) {this.state.lastName}.
          </p>
        </div>
      </div>
    );
  }
});

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

var GetOption = React.createClass({
  render: function () {
    return (
      <option value={this.props.val}>{this.props.valName}</option>
    )
  }
})

ReactDOM.render(
  <IntakeForm />,
  document.getElementById('content')
);
