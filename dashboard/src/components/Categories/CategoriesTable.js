import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../Redux/Actions/CategoryActions";

const CategoriesTable = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (categories?.success) {
      setCategoryData(categories.data);
    }
  }, [categories]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const findCategoryName = (categoryArr, id) => {
    let category = categoryArr.find((item) => item._id === id);
    return category.categoryName;
  };

  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
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
                      {/* {item.fatherCateId ? (
                        <Link className="dropdown-item text-danger" to="#">
                          Xoá
                        </Link>
                      ) : (
                        ""
                      )} */}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
