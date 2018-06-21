import React, { Component } from "react";
import Card from "./Card";

class ResturantList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    // const resturantCards = resturants.map(resturant => <Card />);
    return (
      <div className="ResturantList">
        <h2>Resturants in Miami, Fl</h2>
        {/* <ul className="CardList">{resturantCards}</ul> */}
      </div>
    );
  }
}

export default ResturantList;
