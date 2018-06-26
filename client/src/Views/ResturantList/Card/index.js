import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCaretDown,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Card = ({ name, recommends, image, handleBookmark, handleLike }) => {
  return (
    <div className="Card">
      <div className="photoWrapper">
        <img src={image} alt={name} />
        <div onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div onClick={handleBookmark}>
          <FontAwesomeIcon icon={faBookmark} />
        </div>
      </div>
      <div className="bottomWrapper">
        <p className="recommends">{`${recommends} recommend`}</p>
        <h3 className="resturantName">{name}</h3>
        <div>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
    </div>
  );
};

Card.defaultProps = {
  name: "Loading",
  img: "none",
  recommends: 500
};

Card.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  recommends: PropTypes.number,
  handleLike: PropTypes.func.isRequired,
  handleBookmark: PropTypes.func.isRequired
};

export default Card;
