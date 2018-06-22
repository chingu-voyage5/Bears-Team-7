import React from "react";
import PropTypes from "prop-types";

const Input = ({ handleChange, value }) => {
  return (
    <input
      type="text"
      className="Input"
      value={value}
      onChange={handleChange}
    />
  );
};

Input.defaultProps = {
  value: ""
};

Input.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default Input;
