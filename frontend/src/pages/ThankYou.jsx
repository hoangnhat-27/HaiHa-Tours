import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/thank-you.css";

const ThankYou = () => {
  const { user } = useContext(AuthContext);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i class="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Cảm ơn bạn</h1>
              <h3 className="mb-4">Tour của bạn đã được đặt.</h3>

              <Button className="btn primary__btn w-25">
                <Link to="/home">&lt;- Quay về trang chủ</Link>
              </Button>
              <span> Hoặc </span>
              <Button className="btn primary__btn w-25">
                <Link to={`/orders-list/${user._id}`}>
                  Kiểm tra đơn hàng của bạn -&gt;
                </Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
