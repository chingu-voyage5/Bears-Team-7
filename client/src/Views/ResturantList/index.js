import React, { Component } from "react";
import Card from "./Card";
import PropTypes from "prop-types";

class ResturantList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLike() {
    console.log("liked");
  }

  handleBookmark() {
    console.log("bookmarked");
  }

  render() {
    const { resturants, cityName } = this.props;
    const resturantCards = resturants.map(resturant => {
      const { name, recommends, image_url, id } = resturant;
      return (
        <Card
          key={id}
          name={name}
          recommends={recommends}
          image={image_url}
          handleLike={this.handleLike}
          handleBookmark={this.handleBookmark}
        />
      );
    });
    return (
      <div className="ResturantList">
        <h2>{`Resturants in ${cityName}`}</h2>
        <ul className="CardList">{resturantCards}</ul>
      </div>
    );
  }
}

ResturantList.defaultProps = {
  cityName: "Miami, US"
};

ResturantList.propTypes = {
  resturants: PropTypes.object.isRequied,
  cityName: PropTypes.string
};

export default ResturantList;
