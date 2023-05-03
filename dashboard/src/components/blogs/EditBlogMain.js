import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editBlog, updateBlog } from "../../Redux/Actions/BlogActions";
import { BLOG_UPDATE_RESET } from "../../Redux/Constants/BlogConstants";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditBlogMain = (props) => {
  const { blogId } = props;

  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [content, setContent] = useState("");
  const [blogData, setBlogData] = useState({});
  const [uploadData, setUploadData] = useState("");

  const dispatch = useDispatch();

  const blogEdit = useSelector((state) => state.blogEdit);
  const { loading, error, blog } = blogEdit;

  useEffect(() => {
    if (blog?.success) {
      setBlogData(blog.data);
    }
  }, [blog]);

  const blogUpdate = useSelector((state) => state.blogUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = blogUpdate;

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

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
      toast.success("Blog cập nhật thành công", ToastObjects);
      dispatch(editBlog(blogId));
    } else {
      if (!blogData.title || blogData._id !== blogId) {
        dispatch(editBlog(blogId));
        return;
      } else {
        setTitle(blogData.title);
        setContent(blogData.content);
        setPhoto(blogData.photo);
      }
    }
  }, [blogData, dispatch, blogId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBlog({
        _id: blogId,
        title: title,
        content: content,
        photo: photo,
      })
    );
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
            <h2 className="content-title">Update Blog</h2>
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
                        <label htmlFor="blog_title" className="form-label">
                          Tên blog
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="blog_title"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Mô tả</label>
                        <Editor
                          apiKey={`${process.env.REACT_APP_API_KEY}`}
                          value={content}
                          init={{
                            height: 500,
                            menubar: false,
                          }}
                          onEditorChange={(content) => setContent(content)}
                        />
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
                              : photo.slice(
                                  photo.lastIndexOf("/blogImg") + 1,
                                  photo.lastIndexOf(".")
                                )
                          }`}
                          style={{ width: "50%", marginTop: "20px" }}
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

export default EditBlogMain;
