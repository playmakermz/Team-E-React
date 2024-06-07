import React from 'react';
import PropTypes from 'prop-types';
import './App.css';  // Import the CSS file

class Item extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <div className="item">
        <p>Sembako: {name}</p>
      </div>
    );
  }
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Item;
