import React, { useState } from "react";
import CommonSection from "./../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";
import { useLocation } from "react-router-dom";

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);
  return (
    <>
      <CommonSection title={"Kết quả tìm kiếm"} />
      <section>
        <Container>
          <Row>
            {data?.length === 0 ? (
              <h4 className="text-center">No data found</h4>
            ) : (
              data?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;
