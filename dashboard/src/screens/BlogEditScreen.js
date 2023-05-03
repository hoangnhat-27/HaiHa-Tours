import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditBlogMain from "../components/blogs/EditBlogMain";

const BlogEditScreen = ({ match }) => {
  const blogId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditBlogMain blogId={blogId} />
      </main>
    </>
  );
};
export default BlogEditScreen;
