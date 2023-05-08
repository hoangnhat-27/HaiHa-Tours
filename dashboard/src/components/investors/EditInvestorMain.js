import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editInvestor,
  updateInvestor,
} from "../../Redux/Actions/InvestorActions";
import { INVESTOR_UPDATE_RESET } from "../../Redux/Constants/InvestorConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditInvestorMain = (props) => {
  const { investorId } = props;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [investorObj, setInvestorObj] = useState({});

  const dispatch = useDispatch();

  const investorEdit = useSelector((state) => state.investorEdit);
  const { loading, error, investor } = investorEdit;

  useEffect(() => {
    if (investor?.success) {
      setInvestorObj(investor.data);
    }
  }, [investor]);

  const investorUpdate = useSelector((state) => state.investorUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = investorUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: INVESTOR_UPDATE_RESET });
      dispatch(editInvestor(investorId));
      toast.success("Nhà đầu tư cập nhật thành công", ToastObjects);
    } else {
      if (!investorObj.name || investorObj._id !== investorId) {
        dispatch(editInvestor(investorId));
        return;
      } else {
        setName(investorObj.name);
        setAddress(investorObj.address);
      }
    }
  }, [investorObj, dispatch, investorId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateInvestor({
        _id: investorId,
        name,
        address,
        updatedAt: new Date(),
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/investors" className="btn btn-danger text-white">
              Quay lại
            </Link>
            <h2 className="content-title">Cập nhật nhà đầu tư</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate ? (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  ) : loadingUpdate ? (
                    <Loading />
                  ) : loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="investor_title" className="form-label">
                          Tên nhà đầu tư
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập tên nhà đầu tư"
                          className="form-control"
                          id="investor_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="investor_title" className="form-label">
                          Địa chỉ
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập địa chỉ"
                          className="form-control"
                          id="address"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditInvestorMain;
