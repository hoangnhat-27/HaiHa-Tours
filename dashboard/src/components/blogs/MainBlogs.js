import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import { listBlogs } from "../../Redux/Actions/BlogActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import ReactPaginate from "react-paginate";

const MainBlogs = () => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;
  const [blogData, setBlogData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState(0);
  const [blogSorted, setBlogSorted] = useState([]);

  const blogDelete = useSelector((state) => state.blogDelete);
  const { error: errorDelete, success: successDelete } = blogDelete;

  const handleSort = (event) => {
    const selectedOption = event.target.selectedIndex;
    setSortOption(selectedOption);
  };

  useEffect(() => {
    if (blogs?.success) {
      setBlogData(blogs.data);
    }
  }, [blogs]);

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch, successDelete]);

  useEffect(() => {
    let result = blogData;
    if (searchInput?.trim()) {
      result = result.filter((blog) =>
        blog.title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(searchInput)
      );
    }
    if (sortOption === 0) {
      result = result.slice().reverse();
    } else if (sortOption === 1) {
    } else if (sortOption === 2) {
      result = result.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 3) {
      result = result
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .reverse();
    }
    setBlogSorted(result);
  }, [blogData, sortOption, searchInput]);

  const [itemOffset, setItemOffset] = useState(0);
  const [blogFilter, setBlogFilter] = useState([]);
  const [pageCount, setPageCount] = useState([]);

  const endOffset = itemOffset + 5;
  useEffect(() => {
    setBlogFilter(blogSorted.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(blogSorted.length / 5));
  }, [blogSorted, itemOffset, endOffset]);

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = (event.selected * 5) % blogSorted.length;
      setItemOffset(newOffset);
      window.scrollTo(0, 350);
    },
    [blogSorted]
  );

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Blogs</h2>
        <div>
          <Link to="/addblog" className="btn btn-primary">
            Thêm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm blog..."
                className="form-control p-2"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div
              className="col-lg-3 col-6 col-md-3"
              style={{ margin: "auto 0" }}
            >
              <div className="d-flex justify-content-center align-items-center gap-2">
                <span>Sắp xếp theo: </span>
                <select onChange={handleSort}>
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <h6>Có {blogSorted.length} kết quả</h6>
              <div className="row">
                {/* Blogs */}
                {blogFilter.length ? <Blog blogs={blogFilter} /> : null}
              </div>
              <div className="d-flex justify-content-center">
                <ReactPaginate
                  nextLabel="Sau >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< Trước"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainBlogs;
