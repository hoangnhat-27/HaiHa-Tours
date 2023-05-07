import React, { useState, useEffect } from "react";
import CommonSection from "./../shared/CommonSection";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { BASE_URL } from "../utils/config.js";
import Discount from "../shared/Discount";

import Newsletter from "../shared/Newsletter";

const Discounts = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [discountData, setDiscountData] = useState(async () => {
    try {
      const res = await fetch(`${BASE_URL}/discounts/user/${id}`, {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      setDiscountData(result.data?.reverse());
    } catch (error) {
      alert(error.message);
    }
  });

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [discountSorted, setDiscountSorted] = useState([]);

  const handleSort = (event) => {
    const selectedOption = event.target.selectedIndex;
    setSortOption(selectedOption);
  };

  useEffect(() => {
    if (discountData?.length) {
      if (sortOption === 0) {
        setDiscountSorted(discountData.slice().reverse());
      } else if (sortOption === 1) {
        setDiscountSorted(discountData);
      } else if (sortOption === 2) {
        setDiscountSorted(
          discountData
            .slice()
            .sort((a, b) => a.discountName.localeCompare(b.discountName))
        );
      } else if (sortOption === 3) {
        setDiscountSorted(
          discountData
            .slice()
            .sort((a, b) => a.discountName.localeCompare(b.discountName))
            .reverse()
        );
      }
    }
  }, [discountData, sortOption]);
  useEffect(() => {
    if (discountSorted.length) {
      let pages = Math.ceil(discountSorted.length / 8);
      window.scrollTo(0, 350);
      setPageCount(pages);
    }
  }, [discountSorted]);

  return (
    <>
      <CommonSection title={`Danh sách discounts`} />
      <section className="pt-0 mt-4">
        <Container style={{ maxWidth: "1150px", position: "relative" }}>
          {discountSorted?.length === 0 ? (
            <h4 className="text-center">Không có dữ liệu</h4>
          ) : (
            <Row>
              <Col lg="12">
                <header className="card-header bg-white ">
                  <div className="row gx-3 py-3">
                    <div className="col-lg-3 col-md-6 me-auto"></div>
                    <div className="col-lg-3 col-6 col-md-3">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <span>Sắp xếp theo: </span>
                        <select onChange={handleSort}>
                          <option>Mới nhất</option>
                          <option>Cũ nhất</option>
                          <option>A-Z</option>
                          <option>Z-A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </header>
                <div
                  className="discounts-container"
                  style={{ padding: "1rem", backgroundColor: "#78be9d" }}
                >
                  <Row>
                    {discountSorted?.length
                      ? discountSorted.map((discount, index) => (
                          <Col
                            lg="4"
                            md="6"
                            sm="6"
                            className="mb-4"
                            key={discount._id}
                          >
                            <Discount
                              key={index}
                              index={index}
                              discount={discount}
                            />
                          </Col>
                        ))
                      : null}
                  </Row>
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

export default Discounts;
