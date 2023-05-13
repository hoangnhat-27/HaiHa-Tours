import React, { useEffect } from "react";
import "../styles/tour-details.css";
import "../styles/booking.css";
import { Container, Row, Col, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config.js";
import calculateAvgRating from "../utils/avgRating";
import { Link } from "react-router-dom";
import Newsletter from "../shared/Newsletter";

const TourDetails = () => {
  const { id } = useParams();
  const { data: tour, error, loading } = useFetch(`${BASE_URL}/tours/${id}`);
  const { data: reviews } = useFetch(`${BASE_URL}/review/${id}`);
  const { photo, title, desc, price, address, city, slots } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
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
                        <i class="ri-money-dollar-circle-line"></i>
                        {Intl.NumberFormat("en-US").format(price)}đ /người
                      </span>
                      <span>
                        <i class="ri-group-line"></i> {slots} người
                      </span>
                    </div>
                    <h5>Mô tả</h5>
                    <p dangerouslySetInnerHTML={{ __html: desc }}></p>
                  </div>

                  {/* tour review section */}
                  <div className="tour__reviews mt-4">
                    <h4>Hiển thị {reviews?.length} đánh giá</h4>
                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={review.userId.photo} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.userId.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString(window.userLang, {
                                    timeZone: "GMT",
                                  })}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i class="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
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
                    {Intl.NumberFormat("en-US").format(price)}đ{" "}
                    <span>/người</span>
                  </h5>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        class="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "0"
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
                    <Link to={`/tour/checkout/${id}`}>Đặt ngay!</Link>
                  </button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
