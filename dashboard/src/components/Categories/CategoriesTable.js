import React, { useEffect, useState } from "react";
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
  const { error: errorDelete, success: successDelete } = categoryDelete;

  useEffect(() => {
    if (categories?.success) {
      setCategoryData(categories.data);
    }
  }, [categories]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch, successDelete]);

  const findCategoryName = (categoryArr, id) => {
    let category = categoryArr.find((item) => item._id === id);
    return category.categoryName;
  };

  const DeleteCategory = async (item) => {
    try {
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
          Bạn chắc chắn muốn xóa danh mục này chứ ? (Tất cả các tour nằm trong
          danh mục này cũng sẽ bị xóa)
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
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </th>
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Danh mục cha</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {categoryData.length &&
              categoryData.map((item, index) => (
                <tr>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </td>
                  <td>{index + 1}</td>
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
                        <Link className="dropdown-item" to="#">
                          Chỉnh sửa
                        </Link>
                        {item.fatherCateId ? (
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
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoriesTable;
