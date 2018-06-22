import React from "react";
import PropTypes from "prop-types";

const Button = ({ history, newPath, handleClick, text }) => {
  return (
    <button className="Button" onClick={handleClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Submit"
};

Button.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func.isRequired
};

export default Button;
