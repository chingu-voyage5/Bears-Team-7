import React from "react";
import PropTypes from "prop-types";

const Card = () => {
  return (
    <div className="Card">
      <div className="photoWrapper">
        <img />
        <div>{"heart"}</div>
        <div>{"bookmark"}</div>
      </div>
      <div className="bottomWrapper">
        <p className="recommends">{"507 recommend"}</p>
        <h3 className="resturantName">{"Resturant Name"}</h3>
        <div>{"dropDown"}</div>
      </div>
    </div>
  );
};

Card.propTypes = {};

export default Card;
