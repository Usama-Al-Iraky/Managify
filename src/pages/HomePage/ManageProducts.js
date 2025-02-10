import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useRedCon } from "../../Context/State";

const ManageProducts = () => {
  const { lang } = useRedCon();
  return (
    <div>
      <div className="input-div d-flex align-items-center justify-content-around w-100 my-3">
        <NavLink to="">
          <button className="route-btn">
            {" "}
            {lang === "en" ? "All products" : "كل المنتجات"}{" "}
          </button>
        </NavLink>
        <NavLink to="add_new">
          <button className="route-btn">
            {" "}
            {lang === "en" ? "Add new" : "إضافة جديد"}{" "}
          </button>
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default ManageProducts;
