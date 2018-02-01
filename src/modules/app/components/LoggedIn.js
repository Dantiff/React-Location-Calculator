import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../auth/actions';
import Sidebar from 'react-sidebar';
import SideBarTitlePanel from './SideBarTitlePanel';
import SideBarContent from './SideBarContent';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
    background: '#f3f3f3',
    cursor: 'pointer'
  },
  content: {
    padding: '16px',
  },
};

const mql = window.matchMedia(`(min-width: 800px)`);

class LoggedIn extends Component{

  constructor(props) {
    super(props);

    this.state = {
      mql: mql,
      docked: false,
      open: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
  }

  componentDidMount() {
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      // this.props.actions.redirectedToLogin(currentURL)
    }
    else{
      // this.props.actions.checkAuthTokenValidity(currentURL);
    }
  }

  componentWillUpdate() {
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      // this.props.actions.redirectedToLogin(currentURL)
    }
    else{
      // this.props.actions.checkAuthTokenValidity(currentURL);
    }
  }
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, docked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetOpen(open) {
    this.setState({open: open});
  }

  mediaQueryChanged() {
    this.setState({
      mql: mql,
      docked: this.state.mql.matches,
    });
  }

  toggleOpen(ev) {
    this.setState({open: !this.state.open});

    if (ev) {
      ev.preventDefault();
    }
  }

  render(){
    const { isLoggedIn } = this.props;

    const sidebar = <SideBarContent />;

    var dockedContent, unDockedContent = "";

    if (this.state.docked) {
     dockedContent = <div className="app-content col-sm-9 col-md-10">
                            {this.props.children}
                          </div>;
    } else  {
     unDockedContent = <div className="app-content col-sm-9 col-md-10">
                            {this.props.children}
                          </div>;
    }

    const contentHeader = (
      <span>
        {!this.state.docked &&
         <span onClick={this.toggleOpen.bind(this)} style={styles.contentHeaderMenuLink}><i className="fa fa-bars color-black"></i></span>}
        <span className="logo-text-s"> Samaritan </span>
      </span>);

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
      sidebarClassName: 'sidebar-width',
    };


    if (isLoggedIn){
      return(
        <span>
          <div className="side-bar col-xs-12 col-sm-3 col-md-2 col-lg-2"> 
            <Sidebar {...sidebarProps}>
              <SideBarTitlePanel title={contentHeader}>
                { unDockedContent}
              </SideBarTitlePanel>
            </Sidebar>
          </div>

          { dockedContent }
          
        </span>
      );
    }else{
      return(<div> please log in to view that page</div>)
    }
  }
}

function matchDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: !!state.sessions.auth_token,
    currentURL: ownProps.location.pathname,
    message: state.sessions.message
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(LoggedIn)
