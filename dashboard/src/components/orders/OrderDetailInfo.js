import React from "react";

const OrderDetailInfo = (props) => {
  const { order } = props;

  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Khách hàng</h6>
            <p className="mb-1">
              <span>Họ tên: </span>
              {order.data[0].fullName} <br />
              <span>Email: </span>
              <a href={`mailto:${order.data[0].userId.email}`}>
                {order.data[0].userId.email}
              </a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-6">
        <article className="icontext align-items-start">
          <div className="text">
            <p className="mb-1">
              <br />
              <span>Điện thoại: </span>
              {order.data[0].phone} <br />
              Phương thức thanh toán:{" "}
              {order.data[0].paymentMethod === "direct"
                ? "Thanh toán trực tiếp"
                : "Chuyển khoản"}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
