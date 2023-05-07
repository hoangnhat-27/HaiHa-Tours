import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const UserComponent = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState(0);
  const [userSorted, setUserSorted] = useState([]);

  useEffect(() => {
    if (users?.success) {
      setUserData(users.data);
    }
  }, [users]);

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  useEffect(() => {
    let result = userData;
    if (searchInput?.trim()) {
      result = result.filter((user) =>
        user.title
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
        .sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortOption === 3) {
      result = result
        .slice()
        .sort((a, b) => a.username.localeCompare(b.username))
        .reverse();
    }
    setUserSorted(result);
  }, [userData, sortOption, searchInput]);

  const handleSort = (event) => {
    const selectedOption = event.target.selectedIndex;
    setSortOption(selectedOption);
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Người dùng</h2>
        <div>
          <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Tạo khách hàng
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm người dùng..."
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

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {userSorted.map((user) =>
                user.role === "user" ? (
                  <div className="col" key={user._id}>
                    <div className="card card-user shadow-sm">
                      <div className="card-header">
                        <img
                          className="img-md img-avatar"
                          src={user.photo}
                          alt="User pic"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-5">{user.username}</h5>
                        <div className="card-text text-muted">
                          {user.role === "admin" ? null : (
                            <p className="m-0">Khách hàng</p>
                          )}

                          <p>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
