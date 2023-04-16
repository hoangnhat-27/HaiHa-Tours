import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tour from "./Tour";
import { useDispatch, useSelector } from "react-redux";
import { listTours } from "../../Redux/Actions/TourActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainTours = () => {
  const dispatch = useDispatch();

  const tourList = useSelector((state) => state.tourList);
  const { loading, error, tours } = tourList;
  const [tourData, setTourData] = useState([]);

  const tourDelete = useSelector((state) => state.tourDelete);
  const { error: errorDelete, success: successDelete } = tourDelete;

  useEffect(() => {
    if (tours?.success) {
      setTourData(tours.data);
    }
  }, [tours]);

  useEffect(() => {
    dispatch(listTours());
  }, [dispatch, successDelete]);

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
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Tất cả</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Mới nhất</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
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
            <div className="row">
              {/* Tours */}
              {tourData.map((tour) => (
                <Tour tour={tour} key={tour._id} />
              ))}
            </div>
          )}

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
        </div>
      </div>
    </section>
  );
};

export default MainTours;
