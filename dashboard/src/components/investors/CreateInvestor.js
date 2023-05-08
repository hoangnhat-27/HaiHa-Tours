import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { INVESTOR_CREATE_RESET } from "../../Redux/Constants/InvestorConstants";
import {
  listInvestors,
  createInvestor,
} from "../../Redux/Actions/InvestorActions";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateInvestor = () => {
  const dispatch = useDispatch();

  const investorCreate = useSelector((state) => state.investorCreate);
  const { investor } = investorCreate;
  const [investorName, setInvestorName] = useState("");
  const [investorAddress, setInvestorAddress] = useState("");

  useEffect(() => {
    dispatch(listInvestors());
  }, [dispatch]);

  useEffect(() => {
    if (investor) {
      toast.success("Nhà đầu tư được tạo thành công", ToastObjects);
      dispatch({ type: INVESTOR_CREATE_RESET });
      dispatch(listInvestors());
      setInvestorAddress("");
      setInvestorName("");
    }
  }, [investor, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createInvestor(investorName, investorAddress));
  };

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="investor_name" className="form-label">
              Tên nhà đầu tư
            </label>
            <input
              type="text"
              placeholder="Nhập tên nhà đầu tư"
              className="form-control py-3"
              id="investor_name"
              value={investorName}
              onChange={(e) => setInvestorName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="investor_address" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              className="form-control py-3"
              id="investor_address"
              value={investorAddress}
              onChange={(e) => setInvestorAddress(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary py-3">
              Tạo nhà đầu tư
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateInvestor;
