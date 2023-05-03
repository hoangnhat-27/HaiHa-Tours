import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTour } from "../../Redux/Actions/TourActions";

const Tour = (props) => {
  const { tour } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Bạn muốn xóa chứ ?")) {
      dispatch(deleteTour(id));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-tour-grid shadow-sm">
          <div className="img-wrap">
            <img src={tour.photo} alt="Tour" />
          </div>
          <div className="info-wrap">
            <div className="title text-truncate">{tour.title}</div>
            <div className="price mb-2">
              {Intl.NumberFormat("en-US").format(tour.price)}đ
            </div>
            <div className="row">
              <Link
                to={`/tour/${tour._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(tour._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tour;
