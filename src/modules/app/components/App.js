import React, { Component } from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Footer from './Footer';
import Header from './Header';
import CircularProgress from 'material-ui/CircularProgress';

class App extends Component {

  render() {

    const { calculatorLoader } = this.props;
    let loader_div = null;

    if(calculatorLoader){
      loader_div = <span>
                    <div className="load-container"> </div>
                    <div className="loader"> 
                      <CircularProgress size={60} thickness={5} color="#fff"/> 
                    </div>
                  </span>;
    }

    const styles={
      width: '100%',
      height: '100vh',
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

                { loader_div }
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