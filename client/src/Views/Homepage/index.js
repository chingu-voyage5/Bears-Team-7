import React, { Component } from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Keys from "../../keys";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", latitude: "", longitude: "", cityName: "" };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setCityName = this.setCityName.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000
    };
    const success = pos => {
      const { longitude, latitude } = pos.coords;
      this.setLocation(longitude, latitude);
    };
    const error = e => {
      const longitude = "-80.19366";
      const latitude = "25.77427";
      this.setLocation(longitude, latitude);
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  setLocation(longitude, latitude) {
    this.setState({ longitude, latitude }, this.setCityName);
  }

  setCityName() {
    const { longitude, latitude } = this.state;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${
      Keys["geo"]
    }&pretty=1`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.results[0] !== undefined) {
          let source = data.results[0].components;
          let city = source.city;
          let country = source["ISO_3166-1_alpha-2"];
          this.setState({ cityName: `${city}, ${country}` });
        }
      })
      .catch(e => console.error(e));
  }

  handleSearchInput(e) {
    this.setState({ search: e.target.value });
  }

  handleSearchButton() {
    const { search, cityName } = this.state;
    search !== "" && this.searchYelp(search, cityName);
  }

  searchYelp(search, location) {
    const limit = 5;
    const url = `/term=${search}&location=${location}&limit=${limit}`;
    fetch(url)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(e => console.error(e));
  }

  render() {
    const { cityName, search, longitude, latitude } = this.state;
    return (
      <div className="Homepage">
        <h1>Resto</h1>
        <p>I'm in</p>
        <Input handleChange={this.handleSearchInput} value={cityName} />
        <p>and love to try</p>
        <Input handleChange={this.handleSearchInput} value={search} />
        <Button handleClick={this.handleSearchButton} text={"Search"} />
      </div>
    );
  }
}

export default Homepage;
