import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { BASE_URL } from "../utils/config.js";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Toast from "../Toast/Toast.js";

import registerImg from "../assets/images/register.png";
import userImg from "../assets/images/user.png";

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

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
  });
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      toast.error("Bạn đã đăng nhập rồi!", ToastObjects);
      setTimeout(() => navigate("/home"), 2500);
      return;
    }
  }, [user, token]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      await res.json();
      if (!res.ok) toast.error("Đăng ký không thành công!", ToastObjects);
      else {
        toast.success("Đăng ký thành công!", ToastObjects);
        dispatch({ type: "REGISTER_SUCCESS" });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Đăng ký không thành công!", ToastObjects);
    }
  };

  return (
    <>
      <Toast />
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div className="login__img">
                  <img src={registerImg} alt="" />
                </div>

                <div className="login__form">
                  <div className="user">
                    <img src={userImg} alt="" />
                  </div>
                  <h2>Đăng ký</h2>

                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        required
                        id="username"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        id="email"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        required
                        id="password"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button
                      className="btn secondary__btn auth__btn"
                      type="submit"
                    >
                      Đăng ký
                    </Button>
                  </Form>
                  <p>
                    Đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
