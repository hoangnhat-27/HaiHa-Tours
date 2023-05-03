import React from "react";
import { Link } from "react-router-dom";

const OrderDetailTours = (props) => {
  const { order } = props;

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "auto" }}>Tên Tour</th>
          <th style={{ width: "auto" }}>Ảnh</th>
          <th style={{ width: "auto" }}>Ngày bắt đầu</th>
          <th style={{ width: "auto" }}>Ngày kết thúc</th>
          <th style={{ width: "auto" }}>Người lớn</th>
          <th style={{ width: "auto" }}>Trẻ em</th>
        </tr>
      </thead>
      <tbody>
        <tr key={order.data._id}>
          <td>
            <Link className="itemside" to="#">
              <td>{order.data.tourId.title}</td>
            </Link>
          </td>
          <td>
            <img src={order.data.tourId.photo} alt="" width="50px" />
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
          <td colSpan="6">
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
