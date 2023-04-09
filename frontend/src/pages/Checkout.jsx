import React from "react";
import { useParams } from "react-router-dom";
import Booking from "../components/Booking/Booking";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config";
import "../components/Booking/booking.css";

const Checkout = () => {
  const { id } = useParams();
  const { data: tour, error, loading } = useFetch(`${BASE_URL}/tours/${id}`);

  const { photo, title } = tour;

  return (
    <>
      <Container>
        {loading && <h4 className="text-center pt-5">Loading...</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {!loading && !error && (
          <Row>
            <Col lg="6">
              <Booking tour={tour} />
            </Col>
            <Col lg="6">
              <img src={photo} alt="" width="100%" />
              <h4 className="mt-4 text-center">{title}</h4>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Checkout;
