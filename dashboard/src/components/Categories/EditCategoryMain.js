import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategory,
  updateCategory,
  listCategories,
} from "../../Redux/Actions/CategoryActions";
import { CATEGORY_UPDATE_RESET } from "../../Redux/Constants/CategoryConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditCategoryMain = (props) => {
  const { cateId } = props;

  const [categoryName, setCategoryName] = useState("");
  const [fatherCateId, setFatherCateId] = useState(cateId);
  const [categoryObj, setCategoryObj] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [currentCateName, setCurrentCateName] = useState("");

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const categoryEdit = useSelector((state) => state.categoryEdit);
  const { loading, error, category } = categoryEdit;
  const { categories } = categoryList;

  useEffect(() => {
    if (category?.success) {
      setCategoryObj(category.data);
    }
    if (categories?.success) {
      setCategoryData(categories.data);
    }
  }, [category, categories]);
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (fatherCateId?.length && categoryData.length) {
      let category = categoryData.find((item) => item._id === fatherCateId);
      setCurrentCateName(category?.categoryName);
    }
  }, [categoryData, fatherCateId]);

  const categoryUpdate = useSelector((state) => state.categoryUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      dispatch(editCategory(cateId));
      toast.success("Danh mục cập nhật thành công", ToastObjects);
    } else {
      if (!categoryObj.categoryName || categoryObj._id !== cateId) {
        dispatch(editCategory(cateId));
        return;
      } else {
        setCategoryName(categoryObj.categoryName);
        setFatherCateId(categoryObj.fatherCateId);
      }
    }
  }, [categoryObj, dispatch, cateId, successUpdate]);

  const handleCategory = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const fatherCateId = selectedOption.getAttribute("data-cate-id");
    setFatherCateId(fatherCateId);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: cateId,
        categoryName,
        fatherCateId,
        updatedAt: new Date(),
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/categories" className="btn btn-danger text-white">
              Quay lại
            </Link>
            <h2 className="content-title">Cập nhật danh mục</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate ? (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  ) : loadingUpdate ? (
                    <Loading />
                  ) : loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="category_title" className="form-label">
                          Tên danh mục
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập tên danh mục"
                          className="form-control"
                          id="category_title"
                          required
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>
                      {fatherCateId ? (
                        <div className="mb-4">
                          <label
                            htmlFor="fatherCategory"
                            className="form-label"
                          >
                            Danh mục cha
                          </label>
                          <select
                            className="form-select"
                            onChange={handleCategory}
                            value={currentCateName}
                          >
                            {categoryData.length &&
                              categoryData.map((item) =>
                                !item.fatherCateId ? (
                                  <option data-cate-id={item._id}>
                                    {item.categoryName}
                                  </option>
                                ) : null
                              )}
                          </select>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditCategoryMain;
