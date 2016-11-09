var Search = React.createClass({ 
  getInitialState: function () {
    return {
      displayDetail: false,
      detailData: {},
      displayQueryBuilder: true,
      columns: [],
      currentTable: "",
      propsToSearch: 
        {
          column: "",
          columnType: "",
          strict: false,
          searchText: ""
        },
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
  toggleQueryBuilder: function () {
    this.setState({
      displayQueryBuilder: !this.state.displayQueryBuilder
    })
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
  formatColumnName: function (column) {
    var columnSplit = column.split("_");
    var newColumn = [];
    columnSplit.forEach(function (word) {
      newColumn.push(word.charAt(0).toUpperCase() + word.substr(1));
    }); 
    return newColumn.join(" ");
  },
  getColumns: function (data) {
    var handleColumns = this.changeColumns;
    var writeToTable = this.writeToTable;
    var formatColumnName = this.formatColumnName
    var url = "api/" + data + "/search";
    this.setState({
      currentTable: data
    });
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
      },
      url: url,
      method: "GET",
      success: function (data) {
        var fields = data.result.fields;
        var columnNames = [];
        var formattedName = "";
        for(var i = 0; i < fields.length; i++) {
          formattedName = formatColumnName(fields[i].name);
          columnNames.push({name: formattedName, type: fields[i].dataTypeID});
        };
        handleColumns(columnNames);
        writeToTable(data.result.rows);
      },
      error: function (xhr) {
        console.error(xhr);

        if (xhr.status === 401) {
          localStorage.removeItem("authorization");
        }
      }
    });
  },
  editPropColumn: function (data) {
    var jsonData = JSON.parse(data);
    var unformattedName = jsonData.name.toLowerCase().replace(" ", "_");
    this.state.propsToSearch.column = unformattedName;
    this.state.propsToSearch.columnType = jsonData.type; 
    // not using this.setState because it doesn't play nice
    // with the fact propsToSearch is an object... Look into later
  },
  editPropStrictness: function (data) {
    this.state.propsToSearch.strict = data;
  },
  editPropText: function (data) {
    this.state.propsToSearch.searchText = data;
    this.search();
  },
  search: function (data) {
    var props = this.state.propsToSearch;
    if (props.column != "") {
      var url = "api/" + this.state.currentTable 
                       +"/search" 
                       + ((props.searchText != "") ? 
                          "/" + JSON.stringify(this.state.propsToSearch) : 
                          "");
      console.log(url);
      var writeToTable = this.writeToTable;
      $.ajax({
        xhrFields: {
          withCredentials: true
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
        },
        url: url,
        method: "GET",
        success: function (data) {
          console.log(data.result.rows);
          writeToTable(data.result.rows);
        },
        error: function (xhr) {
          console.error(xhr);
          writeToTable({});

          if (xhr.status === 401) {
            localStorage.removeItem("authorization");
          }
        }
      });
    };
  },
  render: function () {
    return (
      <div className="searchMain">
        <QueryBuilderInterface selectTable={this.getColumns} 
                               columns={this.state.columns}
                               display={this.state.displayQueryBuilder}
                               toggleBuilder={this.toggleQueryBuilder}
                               changeColumn={this.editPropColumn}
                               changeStrictness={this.editPropStrictness}
                               changeText={this.editPropText} />
        <DetailPane hidden={this.state.displayDetail} 
                    detailData={this.state.detailData}
                    close={this.closeDetail}
                    format={this.formatColumnName} />
        <FilterTable people={this.state.people} 
                     headers={this.state.columns}
                     displayDetail={this.displayDetail}
                     extendWidth={this.state.displayQueryBuilder} />
        {/*<Footer />*/}
      </div>
    )
  }
});

var QueryBuilderInterface = React.createClass({
  getInitialState: function () {
    return {
      displaySelector: false,
      displayText: false
    };
  },
  toggleSelector: function (data) {
    this.setState({
      displaySelector: data
    })
  },
  showText: function (hasColumn, hasStrictness) {
    if (hasColumn) {
      this.setState({
        displayText: true
      });
    } else {
      this.setState({
        displayText: false
      });
    };
  },
  render: function () {
    var classNames = "queryBuilderUI " + (this.props.display ? "" : "hidden"),
        closeClassName = "qbAccess " + (this.props.display ? "hidden" : "");
    return (
      <div>
        <div className={closeClassName} onClick={this.props.toggleBuilder}> 
          >
        </div>
        <div className={classNames}>
          <span id="qbClose" onClick={this.props.toggleBuilder}>Close</span>
          <ResourceSelector handleChange={this.props.selectTable} 
                            changeDisplay={this.toggleSelector} />
          <QueryBuilder columns={this.props.columns} 
                        display={this.state.displaySelector}
                        displayText={this.state.displayText}
                        editTextShowing={this.showText}
                        changeColumn={this.props.changeColumn}
                        changeStrictness={this.props.changeStrictness}
                        changeText={this.props.changeText} />
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
  handleColumnChange: function (e) {
    if (e.target.value != "none") {
      this.props.editTextShowing(true);
      this.props.changeColumn(e.target.value);
    };
  },
  handleStrictnessChange: function (e) {
    if (e.target.value === "contains") {
      this.props.changeStrictness(false);
    } else if (e.target.value === "exactly") {
      this.props.changeStrictness(true);
    }
  },
  handleTextChange: function (e) {
    this.props.changeText(e.target.value);
  },
  render: function () {
    var columns = [];
    this.props.columns.forEach(function (columnName) {
      columns.push(
        <option value={JSON.stringify(columnName)} 
                key={JSON.stringify(columnName)}>{columnName.name}</option>
      )
    });
    var classNames = "qbBlock " + (this.props.display ? "" : "hidden");
    var textClassNames = "qbText " + (this.props.displayText ? "" : "hidden")
    return (
      <div className={classNames}>
        <h4 className="qbHeader">Build Search</h4>
        <select className="qbSelect" onChange={this.handleColumnChange}> 
          <option value="none">Select an Option to Filter By</option>
          {columns}
        </select>
        <select className="qbSelect" onChange={this.handleStrictnessChange}> 
          <option value="contains">Contains</option>
          <option value="exactly">Is Exactly</option>
        </select>
        <input type="text" className={textClassNames} onChange={this.handleTextChange} />
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
      var className = (this.props.extendWidth ? "filterTableExtend" : "filterTable");
      return (
        <div id="allowScroll">
          <table className={className}>
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
      headers.push(<td key={header.name} className="ftHead ftCell">{header.name}</td>);
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
        details.push(<p key={key} className="dDetail">{this.props.format(key)} : {this.props.detailData[key]}</p>);
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

/*var Footer = React.createClass({
  render: function () {
    return (
      <div className="SearchFooter">
        <p> A footer. </p>
      </div>
    )
  }
});*/


ReactDOM.render(
  <Search />,
  document.getElementById('dataBrowserContent')
);