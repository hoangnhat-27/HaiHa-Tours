import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tour from "./Tour";
import { useDispatch, useSelector } from "react-redux";
import { listTours } from "../../Redux/Actions/TourActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import ReactPaginate from "react-paginate";

const MainTours = () => {
  const dispatch = useDispatch();

  const tourList = useSelector((state) => state.tourList);
  const { loading, error, tours } = tourList;
  const [tourData, setTourData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState(0);
  const [tourSorted, setTourSorted] = useState([]);

  const tourDelete = useSelector((state) => state.tourDelete);
  const { error: errorDelete, success: successDelete } = tourDelete;

  const handleSort = (event) => {
    const selectedOption = event.target.selectedIndex;
    setSortOption(selectedOption);
  };

  useEffect(() => {
    if (tours?.success) {
      setTourData(tours.data);
    }
  }, [tours]);

  useEffect(() => {
    dispatch(listTours());
  }, [dispatch, successDelete]);

  useEffect(() => {
    let result = tourData;
    if (searchInput?.trim()) {
      result = result.filter((tour) =>
        tour.title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(searchInput)
      );
    }
    if (sortOption === 0) {
      result = result.slice().reverse();
    } else if (sortOption === 1) {
    } else if (sortOption === 2) {
      result = result.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 3) {
      result = result
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .reverse();
    }
    setTourSorted(result);
  }, [tourData, sortOption, searchInput]);

  const [itemOffset, setItemOffset] = useState(0);
  const [tourFilter, setTourFilter] = useState([]);
  const [pageCount, setPageCount] = useState([]);

  const endOffset = itemOffset + 8;
  useEffect(() => {
    setTourFilter(tourSorted.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(tourSorted.length / 8));
  }, [tourSorted, itemOffset, endOffset]);

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = (event.selected * 8) % tourSorted.length;
      setItemOffset(newOffset);
      window.scrollTo(0, 350);
    },
    [tourSorted]
  );
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Tours</h2>
        <div>
          <Link to="/addtour" className="btn btn-primary">
            Thêm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm tour..."
                className="form-control p-2"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div
              className="col-lg-3 col-6 col-md-3"
              style={{ margin: "auto 0" }}
            >
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

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <h6>Có {tourSorted.length} kết quả</h6>
              <div className="row">
                {/* Tours */}
                {tourFilter.map((tour) => (
                  <Tour tour={tour} key={tour._id} />
                ))}
              </div>
              <div className="d-flex justify-content-center">
                <ReactPaginate
                  nextLabel="Sau >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< Trước"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainTours;
