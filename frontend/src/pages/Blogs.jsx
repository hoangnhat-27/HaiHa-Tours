import React, { useState, useEffect } from "react";
import CommonSection from "./../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config.js";
import "../styles/blogs.css";
import Blog from "../shared/Blog";
import ReactPaginate from "react-paginate";

const Blogs = () => {
  const { data: blogs } = useFetch(`${BASE_URL}/blogs`);

  const [sortOption, setSortOption] = useState(0);
  const [blogSorted, setBlogSorted] = useState([]);
  const [blogFilter, setBlogFilter] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  let itemsPerPage = 6;
  useEffect(() => {
    if (blogSorted.length) {
      const endOffset = itemOffset + itemsPerPage;
      setBlogFilter(blogSorted.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(blogSorted?.length / itemsPerPage));
    }
  }, [blogSorted, itemOffset, itemsPerPage]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogSorted?.length;
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };

  const handleSort = (event) => {
    const selectedOption = event.target.selectedIndex;
    setSortOption(selectedOption);
  };

  useEffect(() => {
    if (blogs) {
      if (sortOption === 0) {
        setBlogSorted(blogs.slice().reverse());
      } else if (sortOption === 1) {
        setBlogSorted(blogs);
      } else if (sortOption === 2) {
        setBlogSorted(
          blogs.slice().sort((a, b) => a.title.localeCompare(b.title))
        );
      } else if (sortOption === 3) {
        setBlogSorted(
          blogs
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title))
            .reverse()
        );
      }
    }
  }, [blogs, sortOption]);
  useEffect(() => {
    if (blogFilter.length) {
      let pages = Math.ceil(blogFilter.length / 8);
      window.scrollTo(0, 350);
      setPageCount(pages);
    }
  }, [blogFilter]);

  return (
    <>
      <CommonSection title={`Danh sách blogs`} />
      <section className="pt-0 mt-4">
        <Container style={{ maxWidth: "1150px", position: "relative" }}>
          {blogSorted?.length === 0 ? (
            <h4 className="text-center">Không có dữ liệu</h4>
          ) : (
            <Row>
              <Col lg="12">
                <header className="card-header bg-white ">
                  <div className="row gx-3 py-3">
                    <div className="col-lg-3 col-md-6 me-auto"></div>
                    <div className="col-lg-3 col-6 col-md-3">
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
                <div className="blogs-container">
                  <Row>
                    {blogSorted?.length
                      ? blogSorted.map((blog, index) => (
                          <Col
                            lg="4"
                            md="6"
                            sm="6"
                            className="mb-4"
                            key={blog._id}
                          >
                            <Blog key={index} index={index} blog={blog} />
                          </Col>
                        ))
                      : null}
                  </Row>
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
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default Blogs;
