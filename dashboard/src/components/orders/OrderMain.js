import React, { useCallback, useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const [orderData, setOrderData] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState(0);
  const [orderSorted, setOrderSorted] = useState([]);

  const handleSort = (event) => {
    const selectedOption = event.target.selectedIndex;
    setSortOption(selectedOption);
  };

  useEffect(() => {
    if (orders?.success) {
      setOrderData(orders.data);
    }
  }, [orders]);

  useEffect(() => {
    if (orderData.length) {
      let result = orderData;

      if (sortOption === 0) {
        result = result?.slice().reverse();
      } else if (sortOption === 1) {
        result = result.filter((order) => order.status === "accept");
      } else if (sortOption === 2) {
        result = result.filter((order) => order.status === "cancel");
      } else if (sortOption === 3) {
        result = result.filter((order) => order.status === "notconfirmed");
      }
      if (searchInput?.trim()) {
        result = result.filter((order) =>
          order.userId.email
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(searchInput)
        );
      }
      setOrderSorted(result);
    }
  }, [orderData, sortOption, searchInput]);

  const [itemOffset, setItemOffset] = useState(0);
  const [orderFilter, setOrderFilter] = useState([]);
  const [pageCount, setPageCount] = useState([]);

  const endOffset = itemOffset + 5;
  useEffect(() => {
    setOrderFilter(orderSorted.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(orderSorted.length / 5));
  }, [orderSorted, itemOffset, endOffset]);

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = (event.selected * 5) % orderSorted.length;
      setItemOffset(newOffset);
      window.scrollTo(0, 350);
    },
    [orderSorted]
  );

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Đơn đặt hàng</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm theo email..."
                className="form-control p-2"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={handleSort}>
                <option>Tất cả</option>
                <option>Đã xác nhận</option>
                <option>Đã Hủy</option>
                <option>Chưa xác nhận</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body" style={{ minHeight: "300px" }}>
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : orderData.length ? (
              <>
                <h6>Có {orderSorted.length} kết quả</h6>
                <Orders orders={orderFilter} />
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
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
