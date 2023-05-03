import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BLOG_CREATE_RESET } from "../../Redux/Constants/BlogConstants";
import { createBlog } from "../../Redux/Actions/BlogActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddBlogMain = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [content, setContent] = useState("");
  const [uploadData, setUploadData] = useState("");

  const dispatch = useDispatch();

  const blogCreate = useSelector((state) => state.blogCreate);
  const { loading, error, blog } = blogCreate;

  useEffect(() => {
    if (blog) {
      toast.success("Blog được thêm thành công", ToastObjects);
      dispatch({ type: BLOG_CREATE_RESET });
      setContent("");
      setPhoto("");
      setTitle("");
      setUploadData("");
    }
  }, [blog, dispatch]);

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "uploadBlogsImg");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/nhat-clouds/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.url && data.public_id) {
        setUploadData(data.public_id);
        setPhoto(data.url);
      }
    } catch (e) {
      <Message variant="alert-danger">Có lỗi đã xảy ra, hãy thử lại</Message>;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBlog(title, content, photo));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/blogs" className="btn btn-danger text-white">
              Quay lại
            </Link>
            <h2 className="content-title">Thêm blog</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Thêm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="blog_title" className="form-label">
                      Tên blog
                    </label>
                    <input
                      type="text"
                      placeholder="Tên blog"
                      className="form-control"
                      id="blog_title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      placeholder="Nhập mô tả"
                      className="form-control"
                      rows="7"
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Ảnh</label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => {
                        uploadImage(e.target.files[0]);
                      }}
                    />
                    <Image
                      cloudName="nhat-clouds"
                      publicId={`${
                        uploadData
                          ? uploadData
                          : photo
                          ? photo.slice(
                              photo.lastIndexOf("/blogImg") + 1,
                              photo.lastIndexOf(".")
                            )
                          : ""
                      }`}
                      style={{ width: "50%", marginTop: "20px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddBlogMain;
