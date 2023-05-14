import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import { toast } from "react-toastify";
import Toast from "../components/LoadingError/Toast";
import { BASE_URL } from "../utils/config.js";
import { useParams } from "react-router-dom";
import { useState } from "react";

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
const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch(`${BASE_URL}/auth/password/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        updatedAt: new Date(Date.now()),
      }),
    });
    const result = await res.json();
    if (result.success) {
      toast.success("Đổi mật khẩu thành công!", ToastObjects);
    } else {
      toast.error("Sai mật khẩu, vui lòng thử lại!", ToastObjects);
    }
  };

  return (
    <section>
      <Toast />
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <form
          className="form"
          onSubmit={handleSubmit}
          style={{ maxWidth: "1000px", margin: "2rem auto" }}
        >
          <h2>Đổi mật khẩu</h2>
          <div className="content-header d-flex justify-content-between">
            <div></div>
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
          <div className="my-4">
            <label htmlFor="tour_title" className="form-label">
              Mật khẩu cũ
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu cũ"
              className="form-control"
              id="old_password"
              required
              value={oldPassword ? oldPassword : ""}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tour_title" className="form-label">
              Mật khẩu mới
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              className="form-control"
              required
              id="new_password"
              value={newPassword ? newPassword : ""}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </form>
      </main>
    </section>
  );
};

export default Settings;
