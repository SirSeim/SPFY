var Search = React.createClass({ 
  getInitialState: function () {
    return {
      displayDetail: false
    }
  },
  render: function () {
    return (
      <div className="searchMain">
        <QueryBuilderInterface />
        <DetailPane hidden={this.state.displayDetail} />
        <FilterTable people={this.props.people} headers={this.props.headers} />
        {/*<Footer />*/}
      </div>
    )
  }
});

var QueryBuilderInterface = React.createClass({
  getInitialState: function () {
    return {
      displayQueryBuilder: false
    };
  },
  toggle: function () {
    this.setState({
      displayQueryBuilder: !this.state.displayQueryBuilder
    })
  },
  render: function () {
    var classNames = "queryBuilderUI " + (this.state.displayQueryBuilder ? "" : "hidden");
    return (
      <div>
        <div className="qbAccess" onClick={this.toggle}> 
          >
        </div>
        <div className={classNames}>
          <span id="qbClose" onClick={this.toggle}>Close</span>
          <ResourceSelector />
          <QueryBuilder />
          {/* <ViewManager /> */}
        </div>
      </div>
    )
  }
})

var ResourceSelector = React.createClass({
  render: function () {
    return (
      <div className="qbBlock">
        <h4 className="qbHeader">Resource</h4>
        <select className="qbSelect"> 
          <option value="An option">One Option</option>
          <option value="Another option">Another option</option>
        </select>
      </div>
    )
  }
});

var QueryBuilder = React.createClass({
  render: function () {
    return (
      <div className="qbBlock">
        <h4 className="qbHeader">Build Search</h4>
        <select className="qbSelect"> 
          <option value="An option">Searching for</option>
          <option value="Another option">Here could be another thing</option>
        </select>
        <select className="qbSelect"> 
          <option value="An option">Strictness</option>
          <option value="Another option">Here could be another thing</option>
        </select>
        <input type="text" className="qbText" />
      </div>
    )
  }
});

var ViewManager = React.createClass({
  render: function () {
    return (
      <div className="viewSaver">
        The view saver.
      </div>
    )
  }
});

var FilterTable = React.createClass({
   render: function () {
      var tableRows = [];
      for (var i = 0; i < this.props.people.length; i++) {
        var person = this.props.people[i];
        var isEven = (i % 2 === 0);
        tableRows.push(
          <FilterTableRow person={person} key={person.firstName} isEven={isEven} />
        )
      }
      return (
        <div id="allowScroll">
          <table className="filterTable">
            <tbody>
              <FilterTableHeader header={this.props.headers}/>
              {tableRows}
            </tbody>
          </table>
        </div>
      )
   }
});

var FilterTableHeader = React.createClass({
  render: function () {
    var headers = [];
    this.props.header.forEach(function (header) {
      headers.push(<td key={header} className="ftHead ftCell">{header}</td>);
    })
    return (
      <tr className="ftRow">
        {headers}
      </tr>
    )
  }
});

var FilterTableRow = React.createClass({
  render: function () {
    var colorClass = "";
    if (this.props.isEven) {
      colorClass = "ftEven";
    } else {
      colorClass = "ftOdd";
    };
    var classNames = "ftRow " + colorClass;
    return (
      <tr className={classNames}>
        <td className="ftCell">{this.props.person.firstName}</td>
        <td className="ftCell">{this.props.person.lastName}</td>
        <td className="ftCell">{this.props.person.nickname}</td>
      </tr>
    )
  }
});

var DetailPane = React.createClass({
  render: function () {
    var classNames = "detailPane " + (this.props.hidden ? "" : "hidden");
    return (
      <div className={classNames}>
        <span id="dClose">Close</span>
        <div className="dInset">
          <p id="dHeader"> Details </p>
        </div>
      </div>
    )
  }
});

var Footer = React.createClass({
  render: function () {
    return (
      <div className="SearchFooter">
        <p> A footer. </p>
      </div>
    )
  }
});

var PEOPLE = [
  {id: 0, firstName: 'John', lastName: 'Doe', nickname: 'JJ'},
  {id: 1, firstName: 'Carl', lastName: 'A', nickname: ''},
  {id: 2, firstName: 'Lisa', lastName: 'Wittiker', nickname: 'L'},
  {id: 3, firstName: 'Joe', lastName: 'Shmoe', nickname: 'JoeJoe'},
  {id: 4, firstName: 'Bob', lastName: 'Huphalumpicaus', nickname: 'Bobert'},
  {id: 5, firstName: 'Peter', lastName: 'Mgee', nickname: 'Peep'}
];

var CLIENT_FILTER_HEADERS = [ 
  "ID", "First Name", "Last Name", "Nickname", "Intake Person", 
  "Intake Date", "HMIS Consent", "First Time Attending", "Case Manager",
  "Case Manager ID", "Phone Number", "Email", "Date of Birth", "Age",
  "Provided ID", "State ID", "Reference", "Services"
]


ReactDOM.render(
  <Search people={PEOPLE} headers={CLIENT_FILTER_HEADERS} />,
  document.getElementById('content')
);