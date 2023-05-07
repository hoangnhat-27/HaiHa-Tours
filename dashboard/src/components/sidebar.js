import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/favicon.png"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-chart-bar" aria-hidden="true"></i>
                <span className="text">Thống kê</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/tours"
              >
                <i className="icon fas fa-shopping-bag" aria-hidden="true"></i>
                <span className="text">Tours</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/category"
              >
                <i className="icon fas fa-list" aria-hidden="true"></i>
                <span className="text">Danh mục</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping" aria-hidden="true"></i>
                <span className="text">Đơn hàng</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user" aria-hidden="true"></i>
                <span className="text">Người dùng</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/blogs"
              >
                <i className="icon fas fa-blog" aria-hidden="true"></i>
                <span className="text">Blogs</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/discounts"
              >
                <i className="icon fas fa-percent" aria-hidden="true"></i>
                <span className="text">Mã khuyến mãi</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/investors"
              >
                <i class="icon fa fa-users" aria-hidden="true"></i>
                <span className="text">Nhà đầu tư</span>
              </NavLink>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
