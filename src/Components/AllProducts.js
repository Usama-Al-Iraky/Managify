import React, { useEffect, useMemo, useState } from "react";
import { DataForm } from "./DataForm";
import { useRedCon } from "../Context/State";
import CurrencyFormat from "react-currency-format";

export const AllProducts = () => {
  const [productName, setProductName] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [ads, setAds] = useState("");
  const [taxes, setTaxes] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState(0);
  const [display, setDisplay] = useState("none");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPrice = () => {
    const total = +mainPrice + (+mainPrice * +taxes) / 100 + +ads - +discount;
    setPrice(total);
  };
  useEffect(() => {
    getPrice();
  }, [ads, mainPrice, taxes, discount, getPrice]);

  const { lang, products, dispatch } = useRedCon();
  const en = ["No", "Name", "Company", "Category", "Price", "Count"];
  const ar = ["الرقم", "الإسم", "الشركة", "الفئة", "السعر", "الكمية"];
  const th = lang === "en" ? en : ar;
  const [id, setId] = useState();
  const testEdit = (id) => {
    const titles = {
      one: lang === "en" ? "Enter The Password" : "ادخل كلمة السر",
      two: lang === "en" ? "Password is wrong" : "كلمة السر خاطئة",
    };
    const editPassword = prompt(titles.one);
    // eslint-disable-next-line no-useless-concat
    const pass = "0" + "0" + "0" + "0";
    if (editPassword === pass && editPassword !== "") {
      setId(id);
      setDisplay("block");
      const index = products.findIndex((i) => i.id === id);
      const product = products[index];
      // eslint-disable-next-line eqeqeq
      if (index !== -1) {
        setProductName(product.name);
        setCompany(product.company);
        setCategory(product.category);
        setCount(product.count);
        setMainPrice(product.mainPrice);
        setAds(product.ads);
        setTaxes(product.taxes);
        setDiscount(product.discount);
      }
    } else {
      if (editPassword === "") {
        alert(titles.one);
      } else {
        alert(titles.two);
      }
    }
  };

  const handelEditDone = (e) => {
    e.preventDefault();
    setDisplay("none");
    const updatedProduct = {
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
      type: "EDIT_PRODUCT",
      id: id,
      updated: updatedProduct,
    });
  };
  const [searchWord, setSearchWord] = useState("");
  const [result, setResult] = useState(products);
  const HandelSearch = () => {
    if (searchWord === "") {
      setResult(products);
    } else {
      const product = products?.filter(
        (item) =>
          item.company.toLowerCase().trim() === searchWord ||
          item.category.toLowerCase().trim() === searchWord ||
          item.name.toLowerCase().startsWith(searchWord)
      );
      setResult(product);
    }
  };
  useEffect(() => {
    HandelSearch();
  }, [searchWord]);
  const productsList = result?.map((i, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{i.name}</td>
      <td>{i.date ? i.date : i.company}</td>
      <td>{i.category}</td>
      <td>{i.price}</td>
      <td>{i.count}</td>
      <td>
        <button
          onClick={() => {
            testEdit(i.id);
          }}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </td>
    </tr>
  ));
  const allPrice = useMemo(
    () => products.reduce((acc,curr) => acc + curr.price * curr.count, 0),
    [products]
  );
  return (
    <div>
      <form className="w-75 m-auto text-center" style={{ display: display }}>
        <div className=" d-flex flex-column flex-sm-row justify-content-between p-0">
          <input
            value={productName}
            className="shadow w-100"
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
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
        <button type="submit" onClick={handelEditDone} className="w-100">
          {lang === "en" ? "Add" : "إضافة"}
        </button>
      </form>
      <div className="d-flex justify-content-center w-100">
        <input
          className="m-0"
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          type="text"
          placeholder={lang === "en" ? "Search" : "بحث"}
        />
      </div>
      <DataForm
        classs={"all-product"}
        productsList={productsList}
        theadItems={th}
      />
      <CurrencyFormat
        value={allPrice}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"EGP "}
        renderText={(value) => (
          <h4 className="text-center">
            {lang === "en" ? "Total Price is " : "إجمالى السعر "}
            {value}
          </h4>
        )}/>
    </div>
  );
};
