import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditCategoryMain from "../components/Categories/EditCategoryMain";

const CategoryEditScreen = ({ match }) => {
  const cateId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditCategoryMain cateId={cateId} />
      </main>
    </>
  );
};
export default CategoryEditScreen;
