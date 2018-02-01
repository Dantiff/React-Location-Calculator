
class TableFunctions {

  //Table Popover actions' functions
  static handleTouchTap (event) {
    
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  static handleRequestClose () {
    this.setState({
      open: false,
      selectedUser: {},
      selectedClient: {}
    });
  };


  //Search html tables using javascript
  static handleSearch(event) {
    
    var input, filter, table, tr, td, i;

    input  = event.target.value;

    this.setState({filterBy: input});

    filter = input.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].innerHTML;
      if (td) {
        if (td.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  //Paginate table lists
  static handlePageChange (stage, page, domain) {

    let p = this.state.page;

    if (stage === "current") {
      p = page;
    }
    else if (stage === "previous" && p !== 1) {
      p = p-1;
    }
    else if (stage === "next") {
      p = p+1;
    }
    
    this.setState({
        page: p
      }, function () {
        if (domain === "clients") {
          this.props.clientActions.getClients(this.state.page, this.state.pSize);
        }
      });
  }


}

export default TableFunctions;
