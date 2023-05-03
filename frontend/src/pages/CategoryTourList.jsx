import React, { useState, useEffect } from "react";
import CommonSection from "./../shared/CommonSection";
import calculateAvgRating from "../utils/avgRating";
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

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [tourSorted, setTourSorted] = useState([]);
  const [tourFilter, setTourFilter] = useState([]);
  const [checkedCity, setCheckedCity] = useState(false);
  const [checkedPrice, setCheckedPrice] = useState(false);
  const [checkedSlot, setCheckedSlot] = useState(false);
  const [checkedReview, setCheckedReview] = useState(false);
  const [checkedFeature, setCheckedFeature] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const [priceValue, setPriceValue] = useState(4000000);
  const [slotValue, setSlotValue] = useState(50);
  const [reviewValue, setReviewValue] = useState(0);
  const [isFeature, setIsFeature] = useState("");

  useEffect(() => {
    if (tours.length) {
      let tourCategories = tours.filter((tour) => tour.cateId?._id === id);
      setTourCategory(tourCategories);
    }
  }, [tours, id]);

  const handleSort = (event) => {
    const selectedOption = event.target.selectedIndex;
    setSortOption(selectedOption);
  };

  useEffect(() => {
    if (sortOption === 0) {
      setTourSorted(tours.slice().reverse());
    } else if (sortOption === 1) {
      setTourSorted(tours);
    } else if (sortOption === 2) {
      setTourSorted(
        tours.slice().sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (sortOption === 3) {
      setTourSorted(
        tours
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title))
          .reverse()
      );
    }
  }, [tours, sortOption]);
  useEffect(() => {
    if (tourSorted.length) {
      let filterResult = tourSorted;
      if (checkedCity && cityInput?.trim()) {
        filterResult = filterResult.filter((tour) =>
          tour.city
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(cityInput)
        );
      }
      if (checkedPrice) {
        filterResult = filterResult.filter(
          (tour) => +tour.price <= +priceValue
        );
      }
      if (checkedSlot && slotValue) {
        filterResult = filterResult.filter(
          (tour) => +tour.maxGroupSize <= +slotValue
        );
      }
      if (checkedReview) {
        filterResult = filterResult.filter(
          (tour) => +calculateAvgRating(tour.reviews).avgRating >= +reviewValue
        );
      }
      if (checkedFeature && isFeature) {
        filterResult = filterResult.filter(
          (tour) => tour.featured === (isFeature === "featured" ? true : false)
        );
      }
      setTourFilter(filterResult);
    }
  }, [
    tourSorted,
    checkedCity,
    checkedPrice,
    checkedSlot,
    checkedReview,
    checkedFeature,
    cityInput,
    priceValue,
    slotValue,
    reviewValue,
    isFeature,
  ]);
  useEffect(() => {
    if (tourFilter.length) {
      let pages = Math.ceil(tourFilter.length / 8);
      window.scrollTo(0, 350);
      setPageCount(pages);
    }
  }, [tourFilter]);

  return (
    <>
      <CommonSection title={`${category ? category.categoryName : ""}`} />
      <section className="pt-0 mt-4">
        <Container style={{ maxWidth: "1150px", position: "relative" }}>
          {tourCategory?.length === 0 ? (
            <h4 className="text-center">Không có dữ liệu</h4>
          ) : (
            <Row>
              <Col lg="2" md="6">
                <div className="me-auto mt-5 filter-box">
                  <span>Lọc theo: </span>
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        name="filter"
                        checked={checkedCity}
                        onChange={(e) => setCheckedCity(e.target.checked)}
                      />
                      <span style={{ marginLeft: "10px" }}>Thành phố</span>
                    </div>
                    {checkedCity ? (
                      <div>
                        <input
                          type="text"
                          className="input__field"
                          placeholder="Nhập thành phố"
                          onChange={(e) => setCityInput(e.target.value)}
                        />
                      </div>
                    ) : null}
                    <div>
                      <input
                        type="checkbox"
                        name="filter"
                        checked={checkedPrice}
                        onChange={(e) => setCheckedPrice(e.target.checked)}
                      />
                      <span style={{ marginLeft: "10px" }}>
                        Giá tiền nhỏ hơn
                      </span>
                    </div>
                    {checkedPrice ? (
                      <div>
                        <input
                          type="range"
                          value={priceValue}
                          min={0}
                          max={10000000}
                          onChange={(e) => setPriceValue(e.target.value)}
                        />
                        <span style={{ marginLeft: "10px" }}>
                          {Intl.NumberFormat("en-US").format(priceValue)}đ
                        </span>
                      </div>
                    ) : null}
                    <div>
                      <input
                        type="checkbox"
                        name="filter"
                        checked={checkedSlot}
                        onChange={(e) => setCheckedSlot(e.target.checked)}
                      />
                      <span style={{ marginLeft: "10px" }}>Số người dưới</span>
                    </div>
                    {checkedSlot ? (
                      <div>
                        <input
                          type="number"
                          className="input__field"
                          placeholder="0"
                          onChange={(e) => setSlotValue(e.target.value)}
                        />
                      </div>
                    ) : null}
                    <div>
                      <input
                        type="checkbox"
                        name="filter"
                        checked={checkedReview}
                        onChange={(e) => setCheckedReview(e.target.checked)}
                      />
                      <span style={{ marginLeft: "10px" }}>Đánh giá trên</span>
                    </div>
                    {checkedReview ? (
                      <div>
                        <input
                          type="range"
                          value={reviewValue}
                          min={0}
                          max={5}
                          onChange={(e) => setReviewValue(e.target.value)}
                        />
                        <span style={{ marginLeft: "10px" }}>
                          {reviewValue} <i class="ri-star-fill"></i>
                        </span>
                      </div>
                    ) : null}
                    <div>
                      <input
                        type="checkbox"
                        name="filter"
                        checked={checkedFeature}
                        onChange={(e) => setCheckedFeature(e.target.checked)}
                      />
                      <span style={{ marginLeft: "10px" }}>Nổi bật</span>
                    </div>
                    {checkedFeature ? (
                      <div className="d-flex gap-2">
                        Có{" "}
                        <input
                          type="radio"
                          id="featured"
                          name="featured"
                          value="featured"
                          checked={isFeature === "featured"}
                          onChange={(e) => setIsFeature(e.target.value)}
                        />
                        Không{" "}
                        <input
                          type="radio"
                          name="featured"
                          id="notfeatured"
                          value="notfeatured"
                          checked={isFeature === "notfeatured"}
                          onChange={(e) => setIsFeature(e.target.value)}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </Col>
              <Col lg="10">
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
                        {/* </Col> */}
                      </div>
                    </div>
                  </div>
                </header>
                {tourCategory?.map((tour) => (
                  <Col lg="3" className="mb-4" key={tour._id}>
                    <TourCard tour={tour} />
                  </Col>
                ))}
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default CategoryTourList;
