import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainBlogs from "./../components/blogs/MainBlogs";

const CategoriesScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainBlogs />
      </main>
    </>
  );
};

export default CategoriesScreen;
