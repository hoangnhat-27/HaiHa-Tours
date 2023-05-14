import React from "react";
import { Link } from "react-router-dom";
import "./discount.css";
const Discount = ({ discount }) => {
  return (
    <div className="discount-container">
      <h1 className="heading">{discount.discountName}</h1>
      <img className="image" src={discount.photo} alt="discount" />
      <h4 className="text-center">{discount.discountCode}</h4>
      <p className="text-center">
        Giảm ngay {Intl.NumberFormat("en-US").format(discount.amount)}
        {discount.type === "decreasePercent" ? "%" : "đ"} cho các tour có giá
        dưới {Intl.NumberFormat("en-US").format(discount.belowPrice)}đ
      </p>
      <button className="btn booking__btn py-1">
        <Link to={`/tours`}>Sử dụng ngay !</Link>
      </button>
    </div>
  );
};

export default Discount;
