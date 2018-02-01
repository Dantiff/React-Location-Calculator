import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  root: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 300,
  },
  header: {
    background: '#31c47c',
    color: '#ffffff',
    padding: '16px',
    fontSize: '20px',
    fontFamily: '"FagoExTf", sans-serif',
    fontWeight: 'bold',
    textAlign: 'left',
  },
};

const SideBarTitlePanel = (props) => {
  const rootStyle = props.style ? {...styles.root, ...props.style} : styles.root;

  return (
    <div style={rootStyle}>
      <div style={styles.header}>{props.title}</div>
      {props.children}
    </div>
  );
};

SideBarTitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  children: PropTypes.object,
};

export default SideBarTitlePanel;