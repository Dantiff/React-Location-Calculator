import { history } from '../../../store/configureStore';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../auth/actions';
import {Link} from 'react-router';
import SideBarTitlePanel from './SideBarTitlePanel';
import PropTypes from 'prop-types';
import user_logo from '../../../images/user.svg';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


class SideBarContent extends Component {

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

    const { user } = this.props;

    const styles = {
      sidebar: {
        width: '100%',
        height: '100%',
      },
      sidebarLink: {
        display: 'block',
        color: '#242635',
        textDecoration: 'none',
      },
      divider: {
        margin: '8px 0',
        height: 1,
        background: '#242635',
      },
      content: {
        padding: '0 0 15px 15px',
        height: '85%',
        background: '#3f485b',
      },
    };
    const style = this.props.style ? {...styles.sidebar, ...this.props.style} : styles.sidebar;

    return (
      <SideBarTitlePanel title="Samaritan" style={style}>
        <div style={styles.content}>
          <span className="sidebar-item active-role"> { user.role } </span>
          <Link to="/dashboard"  activeClassName="sidebar-item-active" className="sidebar-item">Dashboard</Link>
          <Link to="/clients"  activeClassName="sidebar-item-active" className="sidebar-item">Clients</Link>
          <Link to="/users"  activeClassName="sidebar-item-active" className="sidebar-item">Users</Link>
          <Link to="/investors"  activeClassName="sidebar-item-active" className="sidebar-item">Investors</Link>
          <Link to="/products"  activeClassName="sidebar-item-active" className="sidebar-item">Products</Link>
        
        </div>
        <div className="user-icon-box sidebar-item">

          <span className="user-icon-image padding-top-10"><Link to="#" activeClassName="active-white"><img src={user_logo} alt="User"/></Link> </span>

          <span className="user-icon-name"><Link to="/dashboard" activeClassName="active-white">{user.name}</Link></span>

          <span className="user-icon-icon"> <Link to="#" activeClassName="active-white"> <i className="fa fa-chevron-up" onTouchTap={this.handleTouchTap}></i> </Link> </span>

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
      </SideBarTitlePanel>
    );
  };
}

SideBarContent.propTypes = {
  style: PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    auth_token: state.sessions.auth_token,
    user: state.sessions.auth_user
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SideBarContent);