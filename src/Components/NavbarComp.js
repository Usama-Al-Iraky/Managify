import React from "react";
import { Col } from "react-bootstrap";
import { NavLink } from "react-router";
import { useRedCon } from "../Context/State";
import { auth } from "../firebase";
const NavbarComp = () => {
  const checkActive = ({ isActive }) => {
    return {
      transition: "0.3s",
      backgroundColor: isActive ? "white" : "",
      color: isActive ? "#292929" : "",
    };
  };
  const { lang, handelChangeLang } = useRedCon();

  return (
    <Col
      xs="12"
      sm="4"
      lg="3"
      className="side-bar p-3 d-flex flex-column h-md-100"
    >
      <div className="logo w-100 p-md-2 my-md-5 text-warning d-flex gap-2 justify-content-center fs-3">
        <p className="logo-1">Managfiy</p>
      </div>
      <div className="d-flex justify-content-between gap-2 flex-md-column border-0 p-0">
        <NavLink style={checkActive} className="main-a w-100" to="/">
          <i className="fa-solid fa-file-invoice mx-3"></i>
          {lang === "en" ? "Invoice" : "إنشاء فاتورة"}
        </NavLink>
        <NavLink
          style={checkActive}
          className="main-a w-100"
          to="manage_products"
        >
          <i className="fa-solid fa-list-check mx-3"></i>
          {lang === "en" ? "Manage Products" : "إدارة المنتجات"}
        </NavLink>
        <NavLink style={checkActive} className="main-a w-100" to="invoices">
          <i className="fa-solid fa-receipt mx-3 "></i>
          {lang === "en" ? "Invoices" : "الفواتير"}
        </NavLink>
      </div>
      <button onClick={handelChangeLang} className="lang-btn">
        {lang === "en" ? "عربى" : "EN"}
      </button>
      <button
        onClick={() => {
          auth.signOut();
        }}
        style={lang === "en" ? { right: "10px" } : { left: "10px" }}
        className="log-btn"
      >
        {lang === "en" ? "Sign Out" : "تسجيل الخروج"}
      </button>
    </Col>
  );
};

export default NavbarComp;
