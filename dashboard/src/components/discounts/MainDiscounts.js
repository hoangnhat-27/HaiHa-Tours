import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Discount from "./Discount";
import { useDispatch, useSelector } from "react-redux";
import { listDiscounts } from "../../Redux/Actions/DiscountActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainDiscounts = () => {
  const dispatch = useDispatch();

  const discountList = useSelector((state) => state.discountList);
  const { loading, error, discounts } = discountList;
  const [discountData, setDiscountData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState(0);
  const [discountSorted, setDiscountSorted] = useState([]);

  const discountDelete = useSelector((state) => state.discountDelete);
  const { error: errorDelete, success: successDelete } = discountDelete;

  const handleSort = (event) => {
    const selectedOption = event.target.selectedIndex;
    setSortOption(selectedOption);
  };

  useEffect(() => {
    if (discounts?.success) {
      setDiscountData(discounts.data);
    }
  }, [discounts]);

  useEffect(() => {
    dispatch(listDiscounts());
  }, [dispatch, successDelete]);

  useEffect(() => {
    let result = discountData;
    if (searchInput?.trim()) {
      result = result.filter((discount) =>
        discount.discountName
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
      result = result
        .slice()
        .sort((a, b) => a.discountName.localeCompare(b.discountName));
    } else if (sortOption === 3) {
      result = result
        .slice()
        .sort((a, b) => a.discountName.localeCompare(b.discountName))
        .reverse();
    }
    setDiscountSorted(result);
  }, [discountData, sortOption, searchInput]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Discounts</h2>
        <div>
          <Link to="/adddiscount" className="btn btn-primary">
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
                placeholder="Tìm kiếm discount..."
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
          ) : discountSorted.length ? (
            <>
              <div className="row">
                {/* Discounts */}
                {discountSorted.length ? (
                  <Discount discounts={discountSorted} />
                ) : null}
              </div>
              <nav className="float-end mt-4" aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <Link className="page-link" to="#">
                      Trước
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" to="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      Sau
                    </Link>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <div className="text-center">Không có dữ liệu</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainDiscounts;
