import React from "react";

const OrderDetailInfo = (props) => {
  const { order } = props;

  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Khách hàng</h6>
            <p className="mb-1">
              <span>Họ tên: </span>
              {order.data.fullName} <br />
              <a href={`mailto:${order.data.userEmail}`}>
                {order.data.userEmail}
              </a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <div className="text">
            <h6 className="mb-1">Thông tin đặt hàng</h6>
            <p className="mb-1">
              Địa chỉ: {order.address}
              <br /> Pay method: {/* {order.paymentMethod} */}
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          {/* <div className="text">
            <h6 className="mb-1">Deliver to</h6>
            <p className="mb-1">
              Address: {order.shippingAddress.city}
              <br />
              {order.shippingAddress.address}
              <br /> {order.shippingAddress.postalCode}
            </p>
          </div> */}
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
