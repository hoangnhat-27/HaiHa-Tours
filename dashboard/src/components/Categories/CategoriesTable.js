import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listCategories,
  deleteCategory,
} from "../../Redux/Actions/CategoryActions";
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
const CategoriesTable = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const [categoryData, setCategoryData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryItem, setCategoryItem] = useState({});
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  useEffect(() => {
    if (categories?.success) {
      setCategoryData(categories.data);
    }
  }, [categories]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch, successDelete]);

  const [itemOffset, setItemOffset] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [pageCount, setPageCount] = useState([]);

  const endOffset = itemOffset + 10;
  useEffect(() => {
    if (categoryData.length) {
      setCategoryFilter(categoryData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(categoryData.length / 10));
    }
  }, [categoryData, itemOffset, endOffset]);

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = (event.selected * 10) % categoryData.length;
      setItemOffset(newOffset);
      window.scrollTo(0, 350);
    },
    [categoryData]
  );

  const findCategoryName = (categoryArr, id) => {
    let category = categoryArr.find((item) => item._id === id);
    return category.categoryName;
  };

  const DeleteCategory = async (item) => {
    try {
      if (!item.fatherCateId) {
        let categoryArr = categoryData.filter(
          (category) => category.fatherCateId === item._id
        );
        if (categoryArr.length) {
          categoryArr.forEach((category) =>
            dispatch(deleteCategory(category._id))
          );
        }
      }
      dispatch(deleteCategory(item._id));
      toast.success("Xoá danh mục thành công", ToastObjects);
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
          <Modal.Title>Xoá danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn chắc chắn muốn xóa danh mục này chứ ? (Tất cả các danh mục con và
          tour nằm trong danh mục này cũng sẽ bị xóa)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              DeleteCategory(categoryItem);
              handleClose();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-md-12 col-lg-8">
        <h6>Có {categoryData.length} kết quả</h6>
        <table className="table">
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Danh mục cha</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {categoryFilter.length &&
              categoryFilter.map((item, index) => (
                <tr>
                  <td>
                    <b>{item.categoryName}</b>
                  </td>
                  <td>
                    {item.fatherCateId
                      ? findCategoryName(categoryData, item.fatherCateId)
                      : "Không"}
                  </td>
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
                          to={`/category/${item._id}/edit`}
                        >
                          Chỉnh sửa
                        </Link>
                        <div
                          className="dropdown-item text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleShow();
                            setCategoryItem(item);
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

export default CategoriesTable;
