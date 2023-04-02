import React, { useRef, useState } from "react";
import "../styles/tour-details.css";
import "../components/Booking/booking.css";
import { Container, Row, Col, Form, ListGroup, List } from "reactstrap";
import { useParams } from "react-router-dom";
import tourData from "../assets/data/tours";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import { Link } from "react-router-dom";
import Newsletter from "../shared/Newsletter";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const tour = tourData.find((tour) => tour.id === id);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  //format date
  const options = { day: "numeric", month: "long", year: "numeric" };
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt="" />
                <div className="tour__info">
                  <div className="tour__extra-details">
                    <span>
                      <i class="ri-map-pin-2-line"></i>
                      {city}
                    </span>
                    <span>
                      <i class="ri-money-dollar-circle-line"></i> {price}đ
                      /người
                    </span>
                    <span>
                      <i class="ri-map-pin-time-line"></i>
                      {distance} k/m
                    </span>
                    <span>
                      <i class="ri-group-line"></i> {maxGroupSize} người
                    </span>
                  </div>
                  <h5>Mô tả</h5>
                  <p>{desc}</p>
                </div>

                {/* tour review section */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length}) đánh giá</h4>
                  <Form>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4 <i class="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5 <i class="ri-star-s-fill"></i>
                      </span>
                    </div>
                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Chia sẻ cảm nhận của bạn"
                        required
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                        onClick={submitHandler}
                      >
                        Gửi
                      </button>
                    </div>
                  </Form>
                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item">
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>abc</h5>
                              <p>
                                {new Date("01-18-2023").toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              5<i class="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>Tour tuyệt vời</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <div className="booking">
                <h2>{title}</h2>
                <h5>
                  {price}đ <span>/người</span>
                </h5>

                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating d-flex align-items-center gap-1">
                    <i
                      class="ri-star-fill"
                      style={{ color: "var(--secondary-color)" }}
                    ></i>
                    {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                      "Not rated"
                    ) : (
                      <span>({reviews?.length})</span>
                    )}
                  </span>
                  <div className="d-flex align-items-center gap-5">
                    <span>
                      <i class="ri-map-pin-user-fill"></i> {address}
                    </span>
                  </div>
                </div>
                <div className="booking__bottom"></div>
                <button className="btn booking__btn">
                  <Link to={`/tour/${id}/checkout`}>Checkout ngay!</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
