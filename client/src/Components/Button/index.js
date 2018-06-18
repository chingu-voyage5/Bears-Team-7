import React from 'react';
import PropTypes from "prop-types"

const Button = ({handleClick, text}) => {
    return (
      <button className="Button" onClick={handleClick}>
        {text}
      </button>
    );
  }


Button.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func
}

export default Button;
