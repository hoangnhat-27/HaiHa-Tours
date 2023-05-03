import React from "react";
import { Link } from "react-router-dom";
import "./blog.css";
const Blog = ({ blog }) => {
  return (
    <div className="blog-container">
      <Link to={`/blog/${blog._id}`}>
        <h1 className="heading">{blog.title}</h1>
        <img className="image" src={blog.photo} alt="blog" />
      </Link>
    </div>
  );
};

export default Blog;
