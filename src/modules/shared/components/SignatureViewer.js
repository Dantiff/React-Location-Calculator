import React, { Component } from 'react';
import ReactPDF from 'react-pdf';
import Popover from '@terebentina/react-popover';

import '@terebentina/react-popover/lib/styles.css';

class SignatureViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      total: 0,
      pageIndex: 0,
      pageNumber: 0, 
    };
  };

  onDocumentLoad({ total }) {
      this.setState({ total });
  }

  onPageLoad({ pageIndex, pageNumber }) {
      this.setState({ pageIndex, pageNumber });
  }

  render(){

    const { trigger, url } = this.props;
    const { pageNumber, pageIndex, total } = this.state;

    return(	
      <div width="220px" height="250px">					
        <Popover position="bottom" className="awesome" trigger={trigger}>
            <ReactPDF
                file={url}
                pageIndex={pageIndex}
                onDocumentLoad={this.onDocumentLoad.bind(this)}
                onPageLoad={this.onPageLoad.bind(this)}
                loading={<div>Please wait!</div>}
                error={<div>An error occurred!</div>}
                width={220}
                height={ 250 }
            />
            <p>Page {pageNumber} of {total}</p>
        </Popover>
      </div>
    )
  }
}

export default SignatureViewer;
