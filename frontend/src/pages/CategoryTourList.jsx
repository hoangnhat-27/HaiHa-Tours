import React, { useState, useEffect } from "react";
import CommonSection from "./../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config.js";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";

const CategoryTourList = () => {
  const { id } = useParams();
  const { data: tours } = useFetch(`${BASE_URL}/tours`);
  const { data: category } = useFetch(`${BASE_URL}/category/${id}`);
  const [tourCategory, setTourCategory] = useState([]);

  useEffect(() => {
    if (tours.length) {
      let tourCategories = tours.filter((tour) => tour.cateId?._id === id);
      setTourCategory(tourCategories);
    }
  }, [tours, id]);

  return (
    <>
      <CommonSection title={`${category ? category.categoryName : ""}`} />
      <section>
        <Container>
          <Row>
            {tourCategory?.length === 0 ? (
              <h4 className="text-center">No data</h4>
            ) : (
              tourCategory?.map((tour) => (
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

export default CategoryTourList;
