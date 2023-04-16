import React from "react";
import { Link } from "react-router-dom";

const OrderDetailTours = (props) => {
  const { order, loading } = props;

  // if (!loading) {
  //   // Calculate Price
  //   const addDecimals = (num) => {
  //     return (Math.round(num * 100) / 100).toFixed(2);
  //   };

  //   order.itemsPrice = addDecimals(
  //     order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  //   );
  // }

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Tour</th>
          <th style={{ width: "20%" }}>Unit Price</th>
          <th style={{ width: "20%" }}>Quantity</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        (
        <tr key={order._id}>
          <td>
            <Link className="itemside" to="#">
              <div className="left">
                <img
                  src={order.image}
                  alt={order.name}
                  style={{ width: "40px", height: "40px" }}
                  className="img-xs"
                />
              </div>
              <div className="info">{order.name}</div>
            </Link>
          </td>
          <td>${order.price} </td>
          {/* <td>{order.qty} </td> */}
          <td className="text-end"> ${order.qty * order.price}</td>
        </tr>
        ))
        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                {/* <dt>Subtotal:</dt> <dd>${order.itemsPrice}</dd> */}
              </dl>
              <dl className="dlist">
                {/* <dt>Shipping cost:</dt> <dd>${order.shippingPrice}</dd> */}
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">${order.totalPrice}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {order.isPaid ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Payment done
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Not Paid
                    </span>
                  )}
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