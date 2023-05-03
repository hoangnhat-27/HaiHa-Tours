import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config.js";

import Newsletter from "../shared/Newsletter";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blogs } = useFetch(`${BASE_URL}/blogs/${id}`);

  const [blogObj, setBlogObj] = useState(null);

  useEffect(() => {
    if (blogs) {
      setBlogObj(blogs);
    }
  }, [blogs]);

  return (
    <>
      <section className="pt-0 mt-4">
        <Container style={{ maxWidth: "1000px", position: "relative" }}>
          {!blogObj ? (
            <h4 className="text-center">Không có dữ liệu</h4>
          ) : (
            <Row>
              <Col lg="12">
                <div className="blogs d-flex justify-content-center">
                  {blogObj ? (
                    <div className="blog">
                      <h1 className="heading">{blogObj.title}</h1>
                      <div>
                        <img
                          className="mb-4"
                          src={blogObj.photo}
                          alt="blog"
                          style={{ height: "500px" }}
                        />
                        <p
                          style={{ width: "100%" }}
                          dangerouslySetInnerHTML={{
                            __html: blogObj.content,
                          }}
                        ></p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default BlogDetails;
