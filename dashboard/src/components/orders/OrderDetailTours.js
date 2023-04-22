import React from "react";
import { Link } from "react-router-dom";

const OrderDetailTours = (props) => {
  const { order } = props;

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>Tên Tour</th>
          <th style={{ width: "20%" }}>Ngày bắt đầu</th>
          <th style={{ width: "20%" }}>Ngày kết thúc</th>
          <th style={{ width: "20%" }}>Người lớn</th>
          <th style={{ width: "20%" }}>Trẻ em</th>
        </tr>
      </thead>
      <tbody>
        <tr key={order.data._id}>
          <td>
            <Link className="itemside" to="#">
              {/* <div className="left">
                <img
                  src={order.data.photo}
                  alt={order.data.tourName}
                  style={{ width: "40px", height: "40px" }}
                  className="img-xs"
                />
              </div> */}
              <div className="info">{order.data.tourName}</div>
            </Link>
          </td>
          <td>
            {new Date(order.data.bookFrom).toLocaleDateString(window.userLang, {
              timeZone: "GMT",
            })}
          </td>
          <td>
            {new Date(order.data.bookTo).toLocaleDateString(window.userLang, {
              timeZone: "GMT",
            })}
          </td>
          <td> {order.data.people.adult}</td>
          <td> {order.data.people.children}</td>
        </tr>
        <tr>
          <td colSpan="5">
            <article className="float-end">
              <dl className="dlist">
                <dt className="text-end">Tổng cộng:</dt>
                <dd>
                  <b className="h5">
                    {Intl.NumberFormat("en-US").format(order.data.totalPrice)}đ
                  </b>
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailTours;
