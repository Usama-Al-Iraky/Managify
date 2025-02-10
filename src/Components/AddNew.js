import React, { useEffect, useState } from "react";
import { DataForm } from "./DataForm";
import { useRedCon } from "../Context/State";
import shortid from "shortid";
import moment from "moment";

export const AddNew = () => {
  const [productName, setProductName] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [ads, setAds] = useState("");
  const [taxes, setTaxes] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState(0);
  const handelAutoFill = () => {
    const product = products.find(
      (i) => i.name.toLowerCase().trim() === productName.toLowerCase().trim()
    );
    if (productName !== "" && product) {
      setCompany(product.company);
      setCategory(product.category);
      setMainPrice(product.mainPrice);
      setAds(product.ads);
      setTaxes(product.taxes);
      setDiscount(product.discount);
    }else{
      setCompany("");
      setCategory("");
      setMainPrice("");
      setAds("");
      setTaxes("");
      setDiscount("");
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPrice = () => {
    const total = +mainPrice + (+mainPrice * +taxes) / 100 + +ads - +discount;
    setPrice(total);
  };
  useEffect(() => {
    getPrice();
  }, [ads, mainPrice, taxes, discount, getPrice]);
  // //////////////////////////////////////////
  const { dispatch, purchaseInvoice, products, lang } = useRedCon();
  const en = ["No", "Name", "Company", "Category", "Price", "Count"];
  const ar = ["الرقم", "الإسم", "الشركة", "الفئة", "السعر", "الكمية"];
  const th = lang === "en" ? en : ar;
  const handleAddNew = (e) => {
    e.preventDefault();
    let newProduct;
    if (
      productName !== "" &&
      company !== "" &&
      category !== "" &&
      count !== "" &&
      mainPrice !== "" &&
      ads !== "" &&
      taxes !== "" &&
      discount !== ""
    ) {
      newProduct = {
        id: shortid.generate(),
        name: productName,
        company: company,
        category: category,
        price: price,
        count: +count,
        mainPrice: +mainPrice,
        ads: +ads,
        taxes: +taxes,
        discount: +discount,
      };
      dispatch({
        type: "ADD_TO_PURCHASE",
        newProduct: newProduct,
      });
      setProductName("");
      setCompany("");
      setCategory("");
      setCount("");
      setMainPrice("");
      setAds("");
      setTaxes("");
      setDiscount("");
    }
  };
  // /////////////////////////
  const [merchantName, setMerchantName] = useState("");
  const [purchaseDiscount, setPurchaseDiscount] = useState("");
  const [priceBefor, setPriceBefor] = useState("");
  const [purchaseTotalPrice, setPurchaseTotalePrice] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPurchasePriceBefor = () => {
    const price = purchaseInvoice.reduce((a, b) => {
      return a + b.price * b.count;
    }, 0);
    setPriceBefor(price);
    const total = priceBefor - purchaseDiscount;
    setPurchaseTotalePrice(total);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    getPurchasePriceBefor();
  }, [purchaseInvoice, purchaseDiscount, getPurchasePriceBefor]);

  const handelSubminPurchase = () => {
    let newPurchase;
    if (merchantName !== "") {
      newPurchase = {
        id: shortid.generate(),
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        name: merchantName,
        invoiceItems: purchaseInvoice,
        priceBefor: priceBefor || 0,
        invoiceDiscount: purchaseDiscount || 0,
        invoicePrice: purchaseTotalPrice || 0,
      };
      dispatch({ type: "ADD_TO_PRODUCTS", Purchases: purchaseInvoice });
      dispatch({
        type: "SUBMIT_PURCHASE_INVOICE",
        newPurchase: newPurchase,
      });
      setMerchantName("");
      setPurchaseDiscount("");
    }
  };
  const productsList = purchaseInvoice?.map((i, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{i.name}</td>
      <td>{i.date ? i.date : i.company}</td>
      <td>{i.category}</td>
      <td>{i.price}</td>
      <td>{i.count}</td>
    </tr>
  ));
  return (
    <>
      <form className="w-75 m-auto text-center">
        <div className=" d-flex flex-column flex-sm-row justify-content-between p-0">
          <input
            value={productName}
            className="shadow w-100"
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
              handelAutoFill()
            }}
            placeholder={lang === "en" ? "Product Name" : "إسم المنتج"}
          />
          <input
            value={company}
            className="shadow w-100"
            type="text"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            placeholder={lang === "en" ? "Company" : "الشركة"}
          />
          <input
            value={category}
            className="shadow w-100"
            type="text"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            placeholder={lang === "en" ? "Category" : "الفئة"}
          />
        </div>
        <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between">
          <input
            value={count}
            className="shadow w-100"
            type="number"
            onChange={(e) => {
              setCount(e.target.value);
            }}
            placeholder={lang === "en" ? "Count" : "الكمية"}
          />
          <input
            value={mainPrice}
            className="shadow w-100"
            type="number"
            onChange={(e) => {
              setMainPrice(e.target.value);
            }}
            placeholder={lang === "en" ? "Main Price" : "سعر الإنتاج"}
          />
          <input
            value={ads}
            className="shadow w-100"
            type="number"
            onChange={(e) => {
              setAds(e.target.value);
            }}
            placeholder={lang === "en" ? "Ads" : "الإعلانات"}
          />
          <input
            value={taxes}
            className="shadow w-100"
            type="number"
            onChange={(e) => {
              setTaxes(e.target.value);
            }}
            placeholder={lang === "en" ? "Taxes" : "الضرائب"}
          />
          <input
            value={discount}
            className="shadow w-100"
            type="number"
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
            placeholder={lang === "en" ? "Discount" : "الخصم"}
          />
          <div>
            {lang === "en" ? `Price is ${price} EGP` : `السعر ${price} جنيها`}
          </div>
        </div>
        <button type="submit" onClick={handleAddNew} className="w-100">
          {lang === "en" ? "Add" : "إضافة"}
        </button>
      </form>
      <DataForm productsList={productsList} theadItems={th} />
      <div className="tfoot-div d-flex">
        <div className="tfoot d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 ">
          <input
            value={merchantName}
            onChange={(e) => {
              setMerchantName(e.target.value);
            }}
            className="p-1 rounded-3 text-center"
            type="text"
            placeholder={lang === "en" ? "Merchant Name" : "إسم التاجر"}
          />
          <input
            value={purchaseDiscount}
            onChange={(e) => {
              setPurchaseDiscount(e.target.value);
            }}
            className="p-1 rounded-3 text-center"
            type="number"
            placeholder={lang === "en" ? "Discount" : "الخصم"}
          />
          <div className="d-flex flex-md-column align-items-center justify-content-between">
            <span> {lang === "en" ? "Total Price" : "السعر الكلى"} </span>
            <span> {purchaseTotalPrice} </span>
          </div>
          <button onClick={handelSubminPurchase}>
            {lang === "en" ? "Done" : "تم"}
          </button>
        </div>
      </div>
    </>
  );
};
