import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DISCOUNT_CREATE_RESET } from "../../Redux/Constants/DiscountConstants";
import { createDiscount } from "../../Redux/Actions/DiscountActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listUser } from "../../Redux/Actions/userActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddDiscountMain = () => {
  const [discountName, setDiscountName] = useState("");
  const [amount, setAmount] = useState(0);
  const [belowPrice, setBelowPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState("decreasePercent");
  const [uploadData, setUploadData] = useState("");
  const [discountUserId, setDiscountUserId] = useState("");

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const [userData, setUserData] = useState([]);

  const discountCreate = useSelector((state) => state.discountCreate);
  const { loading, error, discount } = discountCreate;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  useEffect(() => {
    if (discount) {
      toast.success("Discount được thêm thành công", ToastObjects);
      dispatch({ type: DISCOUNT_CREATE_RESET });
      setDiscountName("");
      setPhoto("");
      setAmount(0);
      setBelowPrice("");
      setUploadData("");
      setType("decreasePercent");
      setDiscountUserId("");
    }
  }, [discount, dispatch]);

  useEffect(() => {
    if (users?.success) {
      setUserData(users.data);
      setDiscountUserId(users.data[0]._id);
    }
  }, [users]);

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "uploadDiscountsImg");

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

  const handleUser = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const userId = selectedOption.getAttribute("data-user-id");
    setDiscountUserId(userId);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let discountCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    dispatch(
      createDiscount(
        discountName,
        discountCode,
        amount,
        belowPrice,
        photo,
        type,
        discountUserId
      )
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/discounts" className="btn btn-danger text-white">
              Quay lại
            </Link>
            <h2 className="content-title">Thêm khuyến mãi</h2>
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
                    <label htmlFor="discount_title" className="form-label">
                      Tên khuyến mãi
                    </label>
                    <input
                      type="text"
                      placeholder="Tên khuyến mãi"
                      className="form-control"
                      id="discount_title"
                      required
                      value={discountName}
                      onChange={(e) => setDiscountName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="featured" className="form-label">
                      Loại khuyến mãi
                    </label>
                    <div className="d-flex gap-3">
                      <div>
                        <input
                          type="radio"
                          id="decreasePercent"
                          name="type"
                          value="decreasePercent"
                          checked={type === "decreasePercent"}
                          onChange={(e) => setType(e.target.value)}
                        />{" "}
                        Giảm theo %
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="decreaseFixed"
                          id="notfeatured"
                          value="decreaseFixed"
                          checked={type === "decreaseFixed"}
                          onChange={(e) => setType(e.target.value)}
                        />{" "}
                        Giảm số tiền cố định
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="discount_amount" className="form-label">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="form-control"
                      id="discount_amount"
                      required
                      min={0}
                      max={type === "decreasePercent" ? 100 : 100000000000000}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="discount_amount" className="form-label">
                      Giá dưới
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="form-control"
                      id="discount_below_price"
                      required
                      min={0}
                      value={belowPrice}
                      onChange={(e) => setBelowPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="fatherCategory" className="form-label">
                      Khách hàng
                    </label>
                    <select className="form-select" onChange={handleUser}>
                      {userData.length &&
                        userData.map((user) => (
                          <option data-user-id={user._id}>
                            {user.username} ({user.email})
                          </option>
                        ))}
                    </select>
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
                              photo.lastIndexOf("/discountImg") + 1,
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

export default AddDiscountMain;
