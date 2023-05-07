import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editDiscount,
  updateDiscount,
} from "../../Redux/Actions/DiscountActions";
import { DISCOUNT_UPDATE_RESET } from "../../Redux/Constants/DiscountConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listUser } from "../../Redux/Actions/userActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditDiscountMain = (props) => {
  const { discountId } = props;

  const [discountName, setDiscountName] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [amount, setAmount] = useState(0);
  const [belowPrice, setBelowPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState("decreasePercent");
  const [uploadData, setUploadData] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [discountData, setDiscountData] = useState({});

  const dispatch = useDispatch();

  const discountEdit = useSelector((state) => state.discountEdit);
  const { loading, error, discount } = discountEdit;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const [userData, setUserData] = useState([]);
  const [discountUserId, setDiscountUserId] = useState("");

  useEffect(() => {
    if (discount?.success) {
      setDiscountName(discount.data.discountName);
      setDiscountCode(discount.data.discountCode);
      setAmount(discount.data.amount);
      setBelowPrice(discount.data.belowPrice);
      setPhoto(discount.data.photo);
      setType(discount.data.type);
      setDiscountUserId(discount.data.userId._id);
      setDiscountData(discount.data);
    }
  }, [discount]);

  useEffect(() => {
    if (users?.success) {
      setUserData(users.data);
    }
  }, [users]);

  useEffect(() => {
    if (discountUserId.trim() && userData.length) {
      let user = userData.find((user) => user._id === discountUserId);
      setCurrentUser(`${user?.username} (${user?.email})`);
    }
  }, [discountUserId, userData]);

  const discountUpdate = useSelector((state) => state.discountUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = discountUpdate;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DISCOUNT_UPDATE_RESET });
      toast.success("Discount cập nhật thành công", ToastObjects);
      dispatch(editDiscount(discountId));
    } else {
      if (!discountData.discountName || discountData._id !== discountId) {
        dispatch(editDiscount(discountId));
        return;
      } else {
        setDiscountName(discountData.discountName);
        setDiscountCode(discountData.discountCode);
        setPhoto(discountData.photo);
        setAmount(discountData.amount);
        setBelowPrice(discountData.belowPrice);
        setType(discountData.type);
        setDiscountUserId(discountData.userId._id);
      }
    }
  }, [discountData, dispatch, discountId, successUpdate]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDiscount({
        _id: discountId,
        discountName: discountName,
        discountCode: discountCode,
        type: type,
        amount: amount,
        photo: photo,
        userId: discountUserId,
      })
    );
  };

  const handleUser = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const userId = selectedOption.getAttribute("data-user-id");
    setDiscountUserId(userId);
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
            <h2 className="content-title">Sửa khuyến mãi</h2>
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
                        <label
                          htmlFor="discount_discountName"
                          className="form-label"
                        >
                          Tên khuyến mãi
                        </label>
                        <input
                          type="text"
                          placeholder="Tên khuyến mãi"
                          className="form-control"
                          id="discount_discountName"
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
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="discount_below_price"
                          className="form-label"
                        >
                          Giá dưới
                        </label>
                        <input
                          type="number"
                          placeholder="0"
                          className="form-control"
                          id="discount_below_price"
                          required
                          value={belowPrice}
                          onChange={(e) => setBelowPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="fatherCategory" className="form-label">
                          Khách hàng
                        </label>
                        <select
                          className="form-select"
                          onChange={handleUser}
                          value={currentUser}
                        >
                          {userData.length &&
                            userData.map((user) =>
                              user ? (
                                <option data-user-id={user._id}>
                                  {user.username} ({user.email})
                                </option>
                              ) : null
                            )}
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

export default EditDiscountMain;
