import React, { useRef, useEffect, useContext, useState } from "react";
import {
  Container,
  Row,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import logo from "../../assets/images/logo.png";
import "./header.css";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate(null);
  const { user, dispatch } = useContext(AuthContext);

  const { data: categories } = useFetch(`${BASE_URL}/category`);
  let parentNav = categories.filter((item) => item.fatherCateId == null);
  const nav__link = [
    { path: "/home", display: "Trang chủ", click: true },
    { path: "/about", display: "Giới thiệu", click: true },
  ];
  parentNav.forEach((item) => {
    nav__link.push({
      id: `${item._id}`,
      path: null,
      display: `${item.categoryName}`,
    });
  });
  const categoryMenu = categories.filter((item) => {
    const parentItem = parentNav.find(
      (parent) => parent._id === item.fatherCateId
    );
    return parentItem !== undefined;
  });

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle(`show__menu`);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* logo */}
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>

            {/* menu */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex">
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive && item.click ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                    <ul>
                      {categoryMenu.length &&
                        categoryMenu.map((itemCate) =>
                          itemCate.fatherCateId === item.id ? (
                            <li key={itemCate._id}>
                              <Link to={`/category/${itemCate._id}`}>
                                {itemCate.categoryName}
                              </Link>
                            </li>
                          ) : (
                            ""
                          )
                        )}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav-right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Đăng nhập</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Đăng ký</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
