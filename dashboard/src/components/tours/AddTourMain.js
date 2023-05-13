import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TOUR_CREATE_RESET } from "../../Redux/Constants/TourConstants";
import { listInvestors } from "../../Redux/Actions/InvestorActions";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { createTour } from "../../Redux/Actions/TourActions";
import { Editor } from "@tinymce/tinymce-react";
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
  const [slot, setSlot] = useState(0);
  const [description, setDescription] = useState("");
  const [uploadData, setUploadData] = useState("");
  let [featured, setFeatured] = useState("");

  // const [countInStock, setCountInStock] = useState(0);
  const dispatch = useDispatch();

  const tourCreate = useSelector((state) => state.tourCreate);
  const { loading, error, tour } = tourCreate;
  const [cateId, setCateId] = useState(tour?.length ? tour.cateId : undefined);
  const [investorId, setInvestorId] = useState(
    tour?.length ? tour.investorId : undefined
  );
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
    if (categoryData.length) {
      setCateId(categoryData[2]._id);
    }
  }, [categoryData]);
  console.log("categoryData", categoryData);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listInvestors());
  }, [dispatch]);

  useEffect(() => {
    if (tour) {
      toast.success("Tour được thêm thành công", ToastObjects);
      dispatch({ type: TOUR_CREATE_RESET });
      setName("");
      setDescription("");
      setAddress("");
      setCity("");
      setUploadData("");
      setPhoto("");
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
  const handleCategory = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const categoryId = selectedOption.getAttribute("data-cate-id");
    setCateId(categoryId);
  };
  const handleInvestor = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const investId = selectedOption.getAttribute("data-investor-id");
    setInvestorId(investId);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTour(
        name,
        city,
        address,
        photo,
        description,
        Number(price),
        Number(slot),
        featured === "featured" ? (featured = true) : (featured = false),
        cateId,
        investorId
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
            <div className="col-xl-12 col-lg-12">
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
                    <label htmlFor="fatherCategory" className="form-label">
                      Danh mục
                    </label>
                    <select className="form-select" onChange={handleCategory}>
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
                    <select className="form-select" onChange={handleInvestor}>
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
                      placeholder="Giá"
                      className="form-control"
                      id="tour_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
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
