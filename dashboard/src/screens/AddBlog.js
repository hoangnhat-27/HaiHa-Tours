import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddBlogMain from "./../components/blogs/AddBlogMain";

const AddBlog = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddBlogMain />
      </main>
    </>
  );
};

export default AddBlog;
