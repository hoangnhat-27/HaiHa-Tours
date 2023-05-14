import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listInvestors,
  deleteInvestor,
} from "../../Redux/Actions/InvestorActions";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const InvestorsTable = () => {
  const dispatch = useDispatch();

  const investorList = useSelector((state) => state.investorList);
  const { investors } = investorList;
  const [investorData, setInvestorData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [investorItem, setInvestorItem] = useState({});
  const investorDelete = useSelector((state) => state.investorDelete);
  const { success: successDelete } = investorDelete;

  useEffect(() => {
    if (investors?.success) {
      setInvestorData(investors.data);
    }
  }, [investors]);

  useEffect(() => {
    dispatch(listInvestors());
  }, [dispatch, successDelete]);

  const [itemOffset, setItemOffset] = useState(0);
  const [investorFilter, setInvestorFilter] = useState([]);
  const [pageCount, setPageCount] = useState([]);

  const endOffset = itemOffset + 10;
  useEffect(() => {
    if (investorData.length) {
      setInvestorFilter(investorData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(investorData.length / 10));
    }
  }, [investorData, itemOffset, endOffset]);

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = (event.selected * 10) % investorData.length;
      setItemOffset(newOffset);
      window.scrollTo(0, 350);
    },
    [investorData]
  );

  const DeleteInvestor = async (item) => {
    try {
      dispatch(deleteInvestor(item._id));
      toast.success("Xoá nhà đầu tư thành công", ToastObjects);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div style={{ position: "absolute" }}>
        <Toast />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá nhà đầu tư</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn xóa nhà đầu tư này chứ ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              DeleteInvestor(investorItem);
              handleClose();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-md-12 col-lg-8">
        <h6>Có {investorData.length} kết quả</h6>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên nhà đầu tư</th>
              <th>Địa chỉ</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {investorFilter.length &&
              investorFilter.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <b>{item.name}</b>
                  </td>
                  <td>{item.address}</td>
                  <td className="text-end">
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        className="btn btn-light"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </Link>
                      <div className="dropdown-menu">
                        <Link
                          className="dropdown-item"
                          to={`/investor/${item._id}/edit`}
                        >
                          Chỉnh sửa
                        </Link>

                        <div
                          className="dropdown-item text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleShow();
                            setInvestorItem(item);
                          }}
                        >
                          Xoá
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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
      </div>
    </>
  );
};

export default InvestorsTable;
