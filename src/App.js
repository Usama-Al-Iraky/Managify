import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComp from "./Components/NavbarComp";
import { Col, Row } from "react-bootstrap";
import { Invoice } from "./pages/HomePage/Invoice";
import { Invoices } from "./pages/HomePage/Invoices";
import ManageProducts from "./pages/HomePage/ManageProducts";
import { AllProducts } from "./Components/AllProducts";
import { AddNew } from "./Components/AddNew";
import { useRedCon } from "./Context/State";
import { LogIn } from "./pages/HomePage/LogIn";
import { auth, dataBase } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const App = () => {
  const { lang, user, dispatch, products, purchaseInvoices, done, invoices } =
    useRedCon();
  let dire = lang === "en" ? "ltr" : "rtl";
  useEffect(() => {
    document.getElementById("test").dir = dire;
  }, [lang]);
  // FireBasec Set and GetData Functions
  useEffect(() => {
    if (user) {
      const userRef = doc(dataBase, "users", user.uid);
      const setData = async () => {
        await setDoc(
          userRef,
          { dataInDB: { products, purchaseInvoices, invoices } },
          { merge: true }
        );
      };
      setData();
    }
  }, [products, purchaseInvoices, done, invoices]);
  useEffect(() => {
    if (user) {
      const userRef = doc(dataBase, "users", user.uid);
      const getData = async () => {
        const ref = await getDoc(userRef);
        const dataFromDB = ref.data().dataInDB;
        if (dataFromDB) {
          dispatch({
            type: "GET_DATA_FROM_FIREBASE",
            mainData: dataFromDB.products,
            mainPurchaseInvoices: dataFromDB.purchaseInvoices,
            mainInvoices: dataFromDB.invoices,
          });
        }
      };
      getData();
    }
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    });
  }, []);
  return (
    <>
      {user ? (
        <BrowserRouter>
          <Row className="main-row m-auto w-100">
            <NavbarComp />
            <Col className="p-0" sm="8" lg="9">
              <Routes>
                <Route path="/" element={<Invoice />} />
                <Route path="manage_products" element={<ManageProducts />}>
                  <Route index element={<AllProducts />} />
                  <Route path="add_new" element={<AddNew />} />
                </Route>
                <Route path="invoices" element={<Invoices />} />
              </Routes>
            </Col>
          </Row>
        </BrowserRouter>
      ) : (
        <LogIn />
      )}
    </>
  );
};

export default App;
