import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBlog, listBlogs } from "../../Redux/Actions/BlogActions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const Blog = (props) => {
  const { blogs } = props;
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState([]);
  const [show, setShow] = useState(false);
  const [blogItem, setBlogItem] = useState({});

  useEffect(() => {
    if (blogs.length) {
      setBlogData(blogs);
    }
  }, [blogs]);

  const deletehandler = (blog) => {
    if (blog) {
      dispatch(deleteBlog(blog._id));
      toast.success("Xóa blog thành công", ToastObjects);
      dispatch(listBlogs());
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Toast />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn muốn xóa blog này chứ ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deletehandler(blogItem);
              handleClose();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Tiêu đề</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Nội dung</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col" className="text-end">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {blogData.length
            ? blogData.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <b>{blog.title}</b>
                  </td>
                  <td>
                    <img src={blog.photo} alt="" width="50px" />
                  </td>
                  <td>{blog.content.substring(0, 15)}...</td>
                  <td>
                    {new Date(blog.createdAt).toLocaleDateString(
                      window.userLang,
                      {
                        timeZone: "GMT",
                      }
                    )}
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <div className="d-flex gap-2">
                      <Link to={`/blog/${blog._id}/edit`}>
                        <div
                          className="text-success"
                          style={{
                            cursor: "pointer",
                            opacity: "0.7",
                          }}
                          onMouseOver={(e) => (e.target.style.opacity = 1)}
                          onMouseOut={(e) => (e.target.style.opacity = 0.6)}
                        >
                          <i class="fas fa-edit" aria-hidden="true"></i>
                        </div>
                      </Link>
                      <div
                        className="text-success"
                        style={{
                          cursor: "pointer",
                          opacity: "0.7",
                        }}
                        onMouseOver={(e) => (e.target.style.opacity = 1)}
                        onMouseOut={(e) => (e.target.style.opacity = 0.6)}
                        onClick={() => {
                          handleShow();
                          setBlogItem(blog);
                        }}
                      >
                        <i class="fa fa-trash"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};

export default Blog;
