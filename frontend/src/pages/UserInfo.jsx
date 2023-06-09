import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config.js";
import { AuthContext } from "./../context/AuthContext";
import { toast } from "react-toastify";
import Toast from "../Toast/Toast.js";
import { Image } from "cloudinary-react";
import { Link, useNavigate } from "react-router-dom";

const ToastObjects = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
};

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [photo, setPhoto] = useState("");
  const [uploadData, setUploadData] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "uploadUserImg");

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
      alert("Có lỗi đã xảy ra, hãy thử lại");
    }
  };

  const chooseFile = () => {
    document.getElementById("fileInput").click();
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPhone(user.phone);
      setGender(user.gender);
      setBirthday(user.birthday);
      setPhoto(user.photo);
      setUserName(user.username);
    } else if (!user && !token) {
      toast.error("Bạn chưa đăng nhập!", ToastObjects);
      setTimeout(() => navigate("/login"), 2500);
      return;
    }
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        phone: Number(phone),
        gender: gender,
        birthday: birthday,
        photo: photo,
        username: username,
        updatedAt: new Date(Date.now()),
      }),
    });
    const result = await res.json();
    if (result.success) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: result.data._id,
          username: result.data.username,
          email: result.data.email,
          phone: result.data.phone,
          gender: result.data.gender,
          birthday: result.data.birthday,
          photo: result.data.photo,
          createdAt: result.data.createdAt,
          updatedAt: result.data.updatedAt,
          __v: result.data.__v,
        })
      );
      toast.success("Cập nhật thông tin thành công", ToastObjects);
      setTimeout(() => window.location.reload(), 2500);
    }
  };

  return (
    <>
      <Toast />
      <section>
        <Container>
          <form onSubmit={handleSubmit}>
            <div className="content-header d-flex justify-content-between">
              <Link to="/home" className="btn btn-danger text-white">
                Về trang chủ
              </Link>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onSubmit={handleSubmit}
                >
                  Cập nhật
                </button>
              </div>
            </div>
            <Row>
              <Col lg="4" className="text-center">
                <div className="mb-4">
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
                    style={{
                      width: "50%",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  />
                  <div style={{ overflow: "hidden", height: 0 }}>
                    <input
                      className="form-control"
                      id="fileInput"
                      name="fileInput"
                      type="file"
                      onChange={(e) => {
                        uploadImage(e.target.files[0]);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={chooseFile}
                    style={{ border: "1px solid #ccc", padding: "10px" }}
                  >
                    Chọn ảnh
                  </button>
                </div>
              </Col>
              <Col>
                <h1>Thông tin cá nhân</h1>
                <div className="form">
                  <div className="mb-4">
                    <label htmlFor="tour_title" className="form-label">
                      Tên người dùng
                    </label>
                    <input
                      type="text"
                      placeholder="Tên tour"
                      className="form-control"
                      id="tour_title"
                      required
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="tour_title" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control"
                      id="email"
                      disabled
                      value={email}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="tour_title" className="form-label">
                      Điện thoại
                    </label>
                    <input
                      type="text"
                      placeholder="Điện thoại"
                      className="form-control"
                      id="phone"
                      value={phone ? phone : ""}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="gender" className="form-label">
                      Giới tính
                    </label>
                    <div className="d-flex gap-3">
                      <div>
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          checked={gender === "male"}
                          onChange={(e) => setGender(e.target.value)}
                        />{" "}
                        Nam
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          checked={gender === "female"}
                          onChange={(e) => setGender(e.target.value)}
                        />{" "}
                        Nữ
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="tour_title" className="form-label">
                      Ngày sinh:
                    </label>
                    <span style={{ marginLeft: "10px" }}>
                      <input
                        type="text"
                        value={
                          birthday
                            ? new Date(birthday).toLocaleDateString(
                                window.userLang,
                                {
                                  timeZone: "GMT",
                                }
                              )
                            : ""
                        }
                        disabled
                      />
                    </span>
                    <input
                      type="date"
                      placeholder=""
                      className="form-control"
                      id="birthday"
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </section>
    </>
  );
};

export default UserInfo;
