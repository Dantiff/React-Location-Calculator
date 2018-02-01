import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../../auth/actions';
import store from '../../../store/configureStore';
import {persistStore} from 'redux-persist';
import logo from '../../../images/background.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReduxToastr from 'react-redux-toastr';
import Footer from './Footer';
import Layout from './Layout';
import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(store, { whitelist: ['sessions'] }, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {

    const { isLoggedIn, userLoader, sessionLoader, clientLoader } = this.props;

    let loader_div = null;

    if(userLoader || sessionLoader || clientLoader){
      loader_div = <span>
                    <div className="load-container"> </div>
                    <div className="loader"> 
                      <CircularProgress size={60} thickness={5} color="#fff"/> 
                    </div>
                  </span>;
    }

    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }
    else{

      if(isLoggedIn){

        var styles={
          width: '100%',
          height: '100vh',
          background: '#ffffff',
          backgroundSize: 'cover',
          color: '#f3f3f3'
        }
      }else{

        styles={
          width: '100%',
          height: '100vh',
          background: 'url('+ logo + ') no-repeat right',
          backgroundSize: 'cover',
          color: '#ffffff'
        }
      };
      return (
        <MuiThemeProvider>
          <div className="background" style={styles}>
              <div className="">

                <ReduxToastr
                  timeOut={6000}
                  newestOnTop={false}
                  preventDuplicates
                  position="top-right"
                  transitionIn="fadeIn"
                  transitionOut="fadeOut"
                  progressBar/>

                  <Layout>
                      {this.props.children}
                  </Layout>

                  { loader_div }
                  <div className="clearfix"></div>
                  <Footer></Footer>
              </div>
          </div>
        </MuiThemeProvider>
      );
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
    isLoggedIn: !! state.sessions.auth_token,
    sessionLoader: state.sessions.loader,
    userLoader: state.users.loader,
    clientLoader: state.clients.loader
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);