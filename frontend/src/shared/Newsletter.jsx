import React from "react";
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Đăng ký ngay để nhận những thông tin du lịch mới nhất</h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Nhập email của bạn" />
                <button className="btn newsletter__btn">Đăng ký</button>
              </div>
              <p>
                Hãy nhanh tay đăng ký để nắm được những thông tin mới nhất từ
                chúng tôi !
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
