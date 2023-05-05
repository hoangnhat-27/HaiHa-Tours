import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import logo from "../../assets/images/logo.png";
import "./header.css";
import SearchBar from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate(null);
  const { user, dispatch } = useContext(AuthContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchInput("");
  };

  const { data: categories } = useFetch(`${BASE_URL}/category`);
  const { data: tours } = useFetch(`${BASE_URL}/tours`);
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
  nav__link.push({
    path: `/blogs`,
    display: "Tin tức",
    click: true,
  });
  if (user && user._id) {
    nav__link.push({
      path: `/orders-list/${user._id}`,
      display: "Đơn đặt hàng",
      click: true,
    });
  }

  const categoryMenu = categories.filter((item) => {
    const parentItem = parentNav.find(
      (parent) => parent._id === item.fatherCateId
    );
    return parentItem !== undefined;
  });

  const logout = () => {
    setTimeout(() => navigate("/home", { replace: true }), 500);
    dispatch({ type: "LOGOUT" });
  };
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    });
  };
  const toggleDropdown = () => {
    document.querySelector(".dropdown-toggle").classList.toggle("show");
    document.querySelector(".dropdown-menu").classList.toggle("show");
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);
  useEffect(() => {
    if (searchInput?.trim()) {
      let searchResult = tours
        .filter((tour) =>
          tour.title
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(searchInput)
        )
        .slice(0, 8);
      setSearchData(searchResult.length ? searchResult : []);
    } else {
      setSearchData([]);
    }
  }, [searchInput, tours]);

  const searchHandler = () => {
    if (searchInput?.trim() === "") {
      return;
    }

    handleSearchIconClick();
    navigate(`/tours/search?title=${searchInput}`);
    setTimeout(() => window.location.reload(), 500);
  };

  const toggleMenu = () => menuRef.current.classList.toggle(`show__menu`);

  return (
    <header className="header" ref={headerRef}>
      <Row style={{ padding: "0 1.5rem" }}>
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

          <div className="nav-right d-flex align-items-center gap-2">
            <div className="nav__btns d-flex align-items-center gap-2">
              {/* search */}
              <div>
                <SearchBar
                  onClick={handleSearchIconClick}
                  className="search--icon"
                />
                {isSearchOpen && (
                  <>
                    <div className="search d-flex justify-content-center align-items-center gap-2">
                      <input
                        type="text"
                        placeholder="Tìm kiếm tour"
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <SearchBar
                        className="search--btn"
                        onClick={searchHandler}
                      />
                      {searchData?.length ? (
                        <div className="resultList">
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 475,
                              bgcolor: "background.paper",
                            }}
                          >
                            {searchData.map((tour) => (
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar alt="" src={tour.photo} />
                                </ListItemAvatar>
                                <Link
                                  to={`/tour/${tour._id}`}
                                  onClick={handleSearchIconClick}
                                >
                                  <ListItemText
                                    primary={`${tour.title}`}
                                    secondary={
                                      <React.Fragment>
                                        <Typography
                                          sx={{ display: "inline" }}
                                          component="span"
                                          variant="body2"
                                          color="text.primary"
                                        >
                                          {tour.city}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                  />
                                </Link>
                              </ListItem>
                            ))}
                          </List>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="overlay"
                      onClick={handleSearchIconClick}
                    ></div>
                  </>
                )}
              </div>

              {/* userIcon */}
              {user ? (
                <>
                  <h5 className="nav-item mb-0">{user.username}</h5>
                  <ul className="nav">
                    {/* <li className="nav-item">
                        <Link
                          className={`nav-link btn-icon `}
                          title="Dark mode"
                          to="#"
                        >
                          <i className="fas fa-moon"></i>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link btn-icon" to="#">
                          <i className="fas fa-bell"></i>
                        </Link>
                      </li> */}
                    <li className="dropdown nav-item">
                      <Link
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        to="#"
                      >
                        <img
                          className="img-xs rounded-circle"
                          src={user.photo}
                          alt="User"
                          onClick={toggleDropdown}
                        />
                      </Link>
                      <div className="dropdown-menu dropdown-menu-end">
                        <Link
                          className="dropdown-item"
                          to={`/user/info/${user._id}`}
                          onClick={toggleDropdown}
                        >
                          Thông tin cá nhân
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={`/discounts/${user._id}`}
                          onClick={toggleDropdown}
                        >
                          Mã khuyến mãi
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={toggleDropdown}
                        >
                          Cài đặt
                        </Link>
                        <Link
                          onClick={logout}
                          className="dropdown-item text-danger"
                          to="#"
                        >
                          Đăng xuất
                        </Link>
                      </div>
                    </li>
                  </ul>
                  {/* <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button> */}
                </>
              ) : (
                <>
                  <Button className="btn secondary__btn">
                    <Link to="/login">Đăng nhập</Link>
                  </Button>
                  <Button className="btn secondary__btn">
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
    </header>
  );
};

export default Header;
