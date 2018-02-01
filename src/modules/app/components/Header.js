import { history } from '../../../store/configureStore';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../auth/actions';
import {Link} from 'react-router';
import white_logo from '../../../images/umati_white.png';
import black_logo from '../../../images/umati_black.png';
import user_logo from '../../../images/user.svg';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


class Header extends Component {

  constructor() {
    super()
    this.state = { open: false }
  }

  handleTouchTap = (event) => {
    
    event.preventDefault();

    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleLogOut = () => {
    this.setState({ open: false });
    this.props.actions.logOutUser();
  };

  handleChangePassword = () => {
    this.setState({ open: false });

    history.push('/change_password');
  };

  render() {

    const { isLoggedIn, user } = this.props;

    if(isLoggedIn){
      return (
        <div className=" nav-Active">
      
          <a className="col-sm-2 logo-box" href="/users"> <img src={ black_logo } className="logo-image" alt="Umati Capital"/> </a>

          <div className="float-right user-icon-box">

            <span className="user-icon-image padding-top-10"><Link to="#" activeClassName="active"><img src={user_logo} alt="User"/></Link> </span>

            <span className="user-icon-name"><Link to="/dashboard" activeClassName="active">{user.name}</Link></span>

            <span className="padding-top-13"> <Link to="#" activeClassName="active"> <i className="fa fa-chevron-up padding-10" onTouchTap={this.handleTouchTap}></i> </Link> </span>

            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
                <MenuItem primaryText="Account Settings" />
                <MenuItem primaryText="Change Password" onClick={ this.handleChangePassword.bind(this) } />
                <MenuItem primaryText="Sign out" onClick={ this.handleLogOut.bind(this) }/>
              </Menu>
            </Popover>
          </div>
        </div>
      );
    }else{
      return (
        <div className="navbar">
          <div className="nav-brand brand">
            <div className="logo-text"> <img src={white_logo} alt="Umati Capital"/> </div>
          </div>
        </div>
      )
    }
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);