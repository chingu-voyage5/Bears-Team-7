import React from "react";
import PropTypes from "prop-types";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Homepage = ({
  handleSearchInput,
  handleLocationInput,
  handleSearchButton,
  searchValue,
  cityName
}) => {
  return (
    <div className="Homepage">
      <h1>Resto</h1>
      <p>I'm in</p>
      <Input handleChange={handleLocationInput} value={cityName} />
      <p>and love to try</p>
      <Input handleChange={handleSearchInput} value={searchValue} />
      <Button handleClick={handleSearchButton} text={"Search"} />
    </div>
  );
};

Homepage.defaultProps = {
  cityName: "Miami, US",
  searchValue: ""
};

Homepage.propTypes = {
  cityName: PropTypes.string,
  searchValue: PropTypes.string,
  handleSearchInput: PropTypes.func.isRequired,
  handleLocationInput: PropTypes.func.isRequired,
  handleSearchButton: PropTypes.func.isRequired
};

export default Homepage;
