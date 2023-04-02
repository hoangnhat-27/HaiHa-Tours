import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Booking from "../components/Booking/Booking";
import { Container, Row, Col, Form, ListGroup, List } from "reactstrap";
import tourData from "../assets/data/tours";

const Checkout = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const tour = tourData.find((tour) => tour.id === id);

  return (
    <>
      <Container>
        <Col lg="12">
          <Booking tour={tour} />
        </Col>
      </Container>
    </>
  );
};

export default Checkout;
