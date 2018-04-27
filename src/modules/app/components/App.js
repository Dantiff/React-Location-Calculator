import React, { Component } from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Footer from './Footer';
import Header from './Header';
import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {

  render() {

    const { calculatorLoader } = this.props;
    let appLoader = null;

    if(calculatorLoader){
      appLoader =  <div className="app-loader"> 
                      <CircularProgress size={25} thickness={5} color="#fff"/> 
                    </div>;
    }

    console.log('The loader', calculatorLoader);

    const styles={
      width: '100%',
      background: '#eceeee',
      backgroundSize: 'cover',
      color: '#f3f3f3'
    }

    return (
      <MuiThemeProvider>
        <div className="background" style={styles}>
            <div className="">

                <Header/>
                <div className="clearfix"></div>
                
                {this.props.children}

                { appLoader }
                <div className="clearfix"></div>
                <Footer></Footer>
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state){
  return {
    calculatorLoader: state.calculator.loader,
  }
}

export default connect(mapStateToProps)(App);