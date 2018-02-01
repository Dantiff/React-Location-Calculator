import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import store from '../../../store/configureStore';
import {persistStore} from 'redux-persist';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

    const { userLoader } = this.props;

    let loader_div = null;

    if(userLoader){
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
      const styles={
        width: '100%',
        height: '100vh',
        background: '#ffffff',
        backgroundSize: 'cover',
        color: '#f3f3f3'
      }
    };
      return (
        <MuiThemeProvider>
          <div className="background" style={styles}>
              <div className="">

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
    userLoader: state.users.loader,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);