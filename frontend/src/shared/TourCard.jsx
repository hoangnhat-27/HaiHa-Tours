import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "./../utils/config";
import "./tour-card.css";

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, slots, featured } = tour;
  const { data: reviews } = useFetch(`${BASE_URL}/review/${_id}`);
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <Link to={`/tour/${_id}`}>
            <img src={photo} alt="tour-img" />
          </Link>
          {featured && <span>Nổi bật</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-map-pin-line"></i> {city}
            </span>
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-group-line"></i>
              {slots}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i class="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? "0" : <span>({reviews.length})</span>}
            </span>
          </div>
          <h5 className="tour__title">
            <Link to={`/tour/${_id}`}>{title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              {Intl.NumberFormat("en-US").format(price)}đ <span> /người</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/tour/${_id}`}>Chi tiết</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
