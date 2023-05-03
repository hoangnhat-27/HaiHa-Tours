import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTour, updateTour } from "../../Redux/Actions/TourActions";
import { TOUR_UPDATE_RESET } from "../../Redux/Constants/TourConstants";
import { listInvestors } from "../../Redux/Actions/InvestorActions";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditTourMain = (props) => {
  const { tourId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [slot, setSlot] = useState("");
  // const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [tourData, setTourData] = useState([]);
  const [uploadData, setUploadData] = useState("");

  const dispatch = useDispatch();

  const tourEdit = useSelector((state) => state.tourEdit);
  const { loading, error, tour } = tourEdit;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const investorList = useSelector((state) => state.investorList);
  const { investors } = investorList;
  const [categoryData, setCategoryData] = useState([]);
  const [investorData, setInvestorData] = useState([]);

  useEffect(() => {
    if (categories?.success) {
      setCategoryData(categories.data);
    }
    if (investors?.success) {
      setInvestorData(investors.data);
    }
  }, [categories, investors]);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listInvestors());
  }, [dispatch]);

  useEffect(() => {
    if (tour?.success) {
      setTourData(tour.data);
    }
  }, [tour]);

  const [featured, setFeatured] = useState("");
  const tourUpdate = useSelector((state) => state.tourUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tourUpdate;

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
  const [cateId, setCateId] = useState(tour?.length ? tour.cateId : undefined);
  const [investorId, setInvestorId] = useState(
    tour?.length ? tour.investorId : undefined
  );
  const [currentCateName, setCurrentCateName] = useState("");
  const [currentInvestorName, setCurrentInvestorName] = useState("");
  useEffect(() => {
    if (cateId?.length) {
      let category = categoryData.find((item) => item._id === cateId);
      setCurrentCateName(category?.categoryName);
    }
    if (investorId?.length) {
      let investor = investorData.find((item) => item._id === investorId);
      setCurrentInvestorName(investor?.name);
    }
  }, [cateId, investorId]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TOUR_UPDATE_RESET });
      toast.success("Tour cập nhật thành công", ToastObjects);
    } else {
      if (!tourData.title || tourData._id !== tourId) {
        dispatch(editTour(tourId));
        return;
      } else {
        setName(tourData.title);
        setCity(tourData.city);
        setAddress(tourData.address);
        setDistance(tourData.distance);
        setSlot(tourData.maxGroupSize);
        setDescription(tourData.desc);
        // setCountInStock(tourData.countInStock);
        setPhoto(tourData.photo);
        setPrice(tourData.price);
        setFeatured(tourData.featured ? "featured" : "notfeatured");
        setCateId(tourData.cateId);
        setInvestorId(tourData.investorId);
      }
    }
  }, [tourData, dispatch, tourId, successUpdate]);

  const handleCategory = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const fatherCateId = selectedOption.getAttribute("data-cate-id");
    setCateId(fatherCateId);
  };
  const handleInvestor = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const investorId = selectedOption.getAttribute("data-investor-id");
    setInvestorId(investorId);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTour({
        _id: tourId,
        title: name,
        city,
        address,
        distance,
        maxGroupSize: slot,
        price,
        desc: description,
        photo: photo,
        featured: featured === "featured" ? true : false,
        // countInStock,
      })
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
            <h2 className="content-title">Update Tour</h2>
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
                        <label htmlFor="tour_title" className="form-label">
                          Tên tour
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
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
                          placeholder="Type here"
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
                          placeholder="Type here"
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
                          placeholder="Type here"
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
                          placeholder="Type here"
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
                        <label htmlFor="fatherCategory" className="form-label">
                          Danh mục
                        </label>
                        <select
                          className="form-select"
                          onChange={handleCategory}
                          value={currentCateName}
                        >
                          {categoryData.length &&
                            categoryData.map((item) =>
                              item.fatherCateId ? (
                                <option data-cate-id={item._id}>
                                  {item.categoryName}
                                </option>
                              ) : null
                            )}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="investor" className="form-label">
                          Nhà đầu tư
                        </label>
                        <select
                          className="form-select"
                          onChange={handleInvestor}
                          value={currentInvestorName}
                        >
                          {investorData.length &&
                            investorData.map((item) => (
                              <option data-investor-id={item._id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="tour_price" className="form-label">
                          Giá tiền
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
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
                        <Editor
                          apiKey={`${process.env.REACT_APP_API_KEY}`}
                          value={description}
                          init={{
                            height: 500,
                            menubar: false,
                          }}
                          onEditorChange={(desc) => setDescription(desc)}
                        />
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
                              : photo.slice(
                                  photo.lastIndexOf("/tourImg") + 1,
                                  photo.lastIndexOf(".")
                                )
                          }`}
                          style={{ width: "50%", marginTop: "20px" }}
                        />
                      </div>
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

export default EditTourMain;
