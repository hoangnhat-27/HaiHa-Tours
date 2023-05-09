import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants";
import {
  listCategories,
  createCategory,
} from "../../Redux/Actions/CategoryActions";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategory = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { categories } = categoryList;
  const { category } = categoryCreate;
  const [categoryData, setCategoryData] = useState([]);
  const [fatherCateId, setFatherCateId] = useState(null);
  const [categoryName, setCategoryname] = useState("");

  useEffect(() => {
    if (categories?.success) {
      setCategoryData(categories.data);
    }
  }, [categories]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      toast.success("Danh mục được tạo thành công", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
      dispatch(listCategories());
      setCategoryname("");
    }
  }, [category, dispatch]);

  const handleCategory = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const fatherCateId = selectedOption.getAttribute("data-father-cate-id");
    setFatherCateId(fatherCateId);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(categoryName, fatherCateId));
  };

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="category_name" className="form-label">
              Tên danh mục
            </label>
            <input
              type="text"
              placeholder="Nhập tên danh mục"
              className="form-control py-3"
              id="category_name"
              value={categoryName}
              onChange={(e) => setCategoryname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fatherCategory" className="form-label">
              Danh mục cha
            </label>
            <select className="form-select" onChange={handleCategory}>
              <option onChange={() => setFatherCateId(null)}>Không</option>
              {categoryData.length &&
                categoryData.map((item) =>
                  !item.fatherCateId ? (
                    <option data-father-cate-id={item._id}>
                      {item.categoryName}
                    </option>
                  ) : null
                )}
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary py-3">
              Tạo danh mục
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
