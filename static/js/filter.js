var Search = React.createClass({ 
  getInitialState: function () {
    return {
      displayDetail: false,
      detailData: {},
      columns: [],
      currentTable: "",
      people: {}
    }
  },
  displayDetail: function (data) {
    this.setState({
      displayDetail: true,
      detailData: data
    });
  },
  closeDetail: function () {
    this.setState({displayDetail: false});
  },
  writeToTable: function (data) {
    this.setState({
      people: data
    });
  },
  changeColumns: function (data) {
    this.setState({
      columns: data
    })
  },
  getColumns: function (data) {
    var handleColumns = this.changeColumns;
    var writeToTable = this.writeToTable;
    var url = "api/" + data;
    this.setState({
      currentTable: data
    });
    $.ajax({
      url: url,
      method: "GET",
      success: function (data) {
        var fields = data.result.fields;
        var columnNames = [];
        for(var i = 0; i < fields.length; i++) {
          columnNames.push(fields[i].name);
        };
        handleColumns(columnNames);
        writeToTable(data.result.rows);
      },
      error: function (data) {
        console.error(data);
      }
    });
  },
  search: function (data) {
    var url = "api/" + this.state.currentTable;
    var writeToTable = this.writeToTable;
    $.ajax({
      url: url,
      method: "GET",
      success: function (data) {
        console.log(data.result.rows);
        writeToTable(data.result.rows);
      },
      error: function (data) {
        console.error(data);
      }
    });
  },
  render: function () {
    return (
      <div className="searchMain">
        <QueryBuilderInterface selectTable={this.getColumns} 
                               columns={this.state.columns}
                               performSearch={this.search} />
        <DetailPane hidden={this.state.displayDetail} 
                    detailData={this.state.detailData}
                    close={this.closeDetail} />
        <FilterTable people={this.state.people} 
                     headers={this.props.headers}
                     displayDetail={this.displayDetail} />
        {/*<Footer />*/}
      </div>
    )
  }
});

var QueryBuilderInterface = React.createClass({
  getInitialState: function () {
    return {
      displayQueryBuilder: true,
      displaySelector: false
    };
  },
  toggleBuilder: function () {
    this.setState({
      displayQueryBuilder: !this.state.displayQueryBuilder
    })
  },
  toggleSelector: function (data) {
    this.setState({
      displaySelector: data
    })
  },
  render: function () {
    var classNames = "queryBuilderUI " + (this.state.displayQueryBuilder ? "" : "hidden");
    return (
      <div>
        <div className="qbAccess" onClick={this.toggleBuilder}> 
          >
        </div>
        <div className={classNames}>
          <span id="qbClose" onClick={this.toggleBuilder}>Close</span>
          <ResourceSelector handleChange={this.props.selectTable} 
                            changeDisplay={this.toggleSelector} />
          <QueryBuilder columns={this.props.columns} 
                        performSearch={this.props.performSearch}
                        display={this.state.displaySelector} />
          {/* <ViewManager /> */}
        </div>
      </div>
    )
  }
})

var ResourceSelector = React.createClass({
  handleChange: function (e) {
    if (e.target.value != "none") {
      this.props.handleChange(e.target.value);
      this.props.changeDisplay(true);
    } else {
      this.props.changeDisplay(false);
    }
  },
  render: function () {
    return (
      <div className="qbBlock">
        <h4 className="qbHeader">Resource</h4>
        <select className="qbSelect" onChange={this.handleChange}>
          <option value="none">Select a Resource.</option> 
          <option value="clients">Client</option>
        </select>
      </div>
    )
  }
});

var QueryBuilder = React.createClass({
  handleChange: function (e) {
    this.props.performSearch(e.target.value);
  },
  render: function () {
    var columns = [];
    this.props.columns.forEach(function (columnName) {
      columns.push(
        <option value={columnName} key={columnName}>{columnName}</option>
      )
    });
    var classNames = "qbBlock " + (this.props.display ? "" : "hidden");
    return (
      <div className={classNames}>
        <h4 className="qbHeader">Build Search</h4>
        <select className="qbSelect"> 
          <option value="An option">Select an Option to Filter By</option>
          {columns}
        </select>
        <select className="qbSelect"> 
          <option value="An option">Select a Strictness</option>
          <option value="Another option">Is Exactly</option>
          <option value="Another option">Contains</option>
        </select>
        <input type="text" className="qbText" onChange={this.handleChange} />
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
        var keyString = "tRow" + person["id"];
        tableRows.push(
          <FilterTableRow person={person} 
                          isEven={isEven}
                          key={keyString}
                          displayDetail={this.props.displayDetail} />
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
  handleClick: function () {
    this.props.displayDetail(this.props.person);
  },
  render: function () {
    var colorClass = "";
    if (this.props.isEven) {
      colorClass = "ftEven";
    } else {
      colorClass = "ftOdd";
    };
    var classNames = "ftRow " + colorClass;
    var person = this.props.person;
    var info = [];
    for (var prop in person) {
      if (person.hasOwnProperty(prop)) {
        var keyString = person["id"] + prop + person[prop];
        info.push(<td key={keyString} className={classNames}>{person[prop]}</td>)
      }
    };
    return (
      <tr key={person["id"]} className={classNames} onClick={this.handleClick}>
        {info}
      </tr>
    )
  }
});

var DetailPane = React.createClass({
  render: function () {
    var classNames = "detailPane " + (this.props.hidden ? "" : "hidden");
    var details = [];
    for (var key in this.props.detailData) {
      if (this.props.detailData.hasOwnProperty(key)) {
        details.push(<p key={key}>{key} : {this.props.detailData[key]}</p>);
      }
    }
    return (
      <div className={classNames}>
        <span id="dClose" onClick={this.props.close}>Close</span>
        <div className="dInset">
          <p id="dHeader"> Details </p>
          {details}
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
  <Search headers={CLIENT_FILTER_HEADERS} />,
  document.getElementById('content')
);