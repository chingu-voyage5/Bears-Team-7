import React, { Component } from "react";
import sendFetch from "./helpers/fetch";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./Views/Homepage";
import ResturantList from "./Views/ResturantList";
import Keys from "./keys";
import "./App.css";
const defaultLongitude = "-80.19366";
const deafultLatitude = "25.77427";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      latitude: "",
      longitude: "",
      cityName: "",
      resturantList: loadingResturantList
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleLocationInput = this.handleLocationInput.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setCityName = this.setCityName.bind(this);
    this.setResturantList = this.setResturantList.bind(this);
    this.pushUrl = this.pushUrl.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  pushUrl(url) {
    this.props.history.push(url);
    this.forceUpdate();
  }

  //location functions

  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000
    };
    const success = pos => {
      const { longitude, latitude } = pos.coords;
      this.setLocation(longitude, latitude);
    };
    const error = e => this.setLocation(defaultLongitude, deafultLatitude);

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  setLocation(longitude, latitude) {
    this.setState({ longitude, latitude }, this.fetchCityName);
  }

  fetchCityName() {
    const { longitude, latitude } = this.state;
    const baseUrl = "https://api.opencagedata.com/geocode/v1/json";
    const q = `?q=${latitude}+${longitude}&key=${Keys["geo"]}&pretty=1`;
    const url = `${baseUrl}${q}`;
    return sendFetch(url, this.setCityName);
  }

  setCityName(data) {
    if (data.results[0] !== undefined) {
      let source = data.results[0].components;
      let city = source.city;
      let country = source["ISO_3166-1_alpha-2"];
      this.setState({ cityName: `${city}, ${country}` });
    }
  }

  handleLocationInput(e) {
    this.setState({ cityName: e.target.value });
  }

  //search functions

  handleSearchInput(e) {
    this.setState({ search: e.target.value });
  }

  handleSearchButton() {
    const { search, cityName } = this.state;
    search !== "" && this.searchYelp(search, cityName);
  }

  setResturantList(data) {
    const resturantList = data.businesses;
    this.setState({ resturantList }, this.pushUrl("/list"));
  }

  searchYelp(search, location) {
    const limit = 5;
    const url = `/term=${search}&location=${location}&limit=${limit}`;
    sendFetch(url, this.setResturantList);
  }

  //render

  render() {
    const { search, cityName, resturantList } = this.state;
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              handleSearchInput={this.handleSearchInput}
              handleLocationInput={this.handleLocationInput}
              handleSearchButton={this.handleSearchButton}
              searchValue={search}
              cityName={cityName}
            />
          )}
        />
        <Route
          path="/list"
          render={() => (
            <ResturantList cityName={cityName} resturants={resturantList} />
          )}
        />
      </div>
    );
  }
}

const loadingResturantList = [
  {
    name: "Loading"
  },
  {
    name: "Loading"
  },
  {
    name: "Loading"
  },
  {
    name: "Loading"
  },
  {
    name: "Loading"
  }
];

export default withRouter(App);
