import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TOUR_CREATE_RESET } from "../../Redux/Constants/TourConstants";
import { createTour } from "../../Redux/Actions/TourActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddTourMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState(0);
  const [slot, setSlot] = useState(0);
  const [description, setDescription] = useState("");
  const [uploadData, setUploadData] = useState("");
  const [featured, setFeatured] = useState("");

  // const [countInStock, setCountInStock] = useState(0);
  const dispatch = useDispatch();

  const tourCreate = useSelector((state) => state.tourCreate);
  const { loading, error, tour } = tourCreate;

  useEffect(() => {
    if (tour) {
      toast.success("Tour được thêm thành công", ToastObjects);
      dispatch({ type: TOUR_CREATE_RESET });
      setName("");
      setDescription("");
      setAddress("");
      setCity("");
      // setCountInStock(0);
      setPhoto("");
      setDistance(0);
      setPrice(0);
      setSlot(0);
    }
  }, [tour, dispatch]);

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "uploadBookingImg");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/nhat-clouds/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.url && data.public_id) {
        setUploadData(data.public_id);
        setPhoto(data.url);
      }
    } catch (e) {
      <Message variant="alert-danger">Có lỗi đã xảy ra, hãy thử lại</Message>;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTour(
        name,
        price,
        city,
        address,
        distance,
        slot,
        description,
        photo
        // countInStock
      )
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/tours" className="btn btn-danger text-white">
              Quay lại
            </Link>
            <h2 className="content-title">Thêm tour</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Thêm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="tour_title" className="form-label">
                      Tên tour
                    </label>
                    <input
                      type="text"
                      placeholder="Tên tour"
                      className="form-control"
                      id="tour_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="tour_title" className="form-label">
                      Thành phố
                    </label>
                    <input
                      type="text"
                      placeholder="Thành phố"
                      className="form-control"
                      id="city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="tour_title" className="form-label">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      className="form-control"
                      id="address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="tour_title" className="form-label">
                      Khoảng cách
                    </label>
                    <input
                      type="number"
                      placeholder="Khoảng cách"
                      className="form-control"
                      id="distance"
                      required
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="tour_title" className="form-label">
                      Slots
                    </label>
                    <input
                      type="number"
                      placeholder="Số lượng"
                      className="form-control"
                      id="slot"
                      required
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="featured" className="form-label">
                      Nổi bật
                    </label>
                    <div className="d-flex gap-3">
                      <div>
                        <input
                          type="radio"
                          id="featured"
                          name="featured"
                          value="featured"
                          checked={featured === "featured"}
                          onChange={(e) => setFeatured(e.target.value)}
                        />{" "}
                        Có
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="featured"
                          id="notfeatured"
                          value="notfeatured"
                          checked={featured === "notfeatured"}
                          onChange={(e) => setFeatured(e.target.value)}
                        />{" "}
                        Không
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="tour_price" className="form-label">
                      Giá tiền
                    </label>
                    <input
                      type="number"
                      placeholder="Giá"
                      className="form-control"
                      id="tour_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  {/* <div className="mb-4">
                        <label htmlFor="tour_price" className="form-label">
                          Count In Stock
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="tour_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div> */}
                  <div className="mb-4">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      placeholder="Nhập mô tả"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Ảnh</label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => {
                        uploadImage(e.target.files[0]);
                      }}
                    />
                    <Image
                      cloudName="nhat-clouds"
                      publicId={`${
                        uploadData
                          ? uploadData
                          : photo
                          ? photo.slice(
                              photo.lastIndexOf("/tourImg") + 1,
                              photo.lastIndexOf(".")
                            )
                          : ""
                      }`}
                      style={{ width: "50%", marginTop: "20px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddTourMain;
