import React, { useEffect, useState } from "react";
import { DataForm } from "../../Components/DataForm";
import { useRedCon } from "../../Context/State";
import shortid from "shortid";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

export const Invoice = () => {
  const { lang, products, dispatch, invoice } = useRedCon();
  const en = ["No", "Name", "Company", "Category", "Price", "Count"];
  const ar = ["الرقم", "الإسم", "الشركة", "الفئة", "السعر", "الكمية"];
  const th = lang === "en" ? en : ar;
  const [searchWord, setSearchWord] = useState("");
  const [result, setResult] = useState([]);
  const HandelSearch = () => {
    if (searchWord === "") {
      setResult([]);
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
  const handelSelectProduct = (id) => {
    dispatch({
      type: "ADD_TO_INVOICE",
      id: id,
    });
  };
  const handelRemoveProduct = (id) => {
    dispatch({
      type: "REMOVE_FROM_INVOICE",
      id: id,
    });
  };
  const [customerName, setCustomerName] = useState("");
  const [invoiceTotalPrice, setInvoiceTotalPrice] = useState(0);
  const [invoiceDiscount, setInvoiceDiscount] = useState(0);
  const [invoicePrice, setInvoicePrice] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getInvoicePrice = () => {
    const price = invoice.reduce((a, b) => {
      return a + b.price * b.count;
    }, 0);
    setInvoiceTotalPrice(price);
    const total = invoiceTotalPrice - invoiceDiscount;
    setInvoicePrice(total);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getInvoicePrice();
  }, [invoice, invoiceDiscount, getInvoicePrice]);

  const productsList = result?.map((i, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{i.name}</td>
      <td>{i.company}</td>
      <td>{i.category}</td>
      <td>{i.price}</td>
      <td>{i.count}</td>
      <td>
        <button
          onClick={() => {
            handelSelectProduct(i.id);
          }}
          className="text-danger"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </td>
    </tr>
  ));
  const productsList2 = invoice?.map((i, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{i.name}</td>
      <td>{i.company}</td>
      <td>{i.category}</td>
      <td>{i.price}</td>
      <td>{i.count}</td>
      <td>
        <button
          onClick={() => {
            handelRemoveProduct(i.id);
          }}
          className="text-danger"
        >
          {i.count > 1 ? (
            <i className="fa-solid fa-minus"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            handelSelectProduct(i.id);
          }}
          className="text-danger"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </td>
    </tr>
  ));
  const handelSubmitInvoice = () => {
    if (customerName !== "") {
      const newInvoice = {
        id: shortid.generate(),
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        name: customerName,
        invoiceItems: invoice,
        priceBefor: invoiceTotalPrice || 0,
        invoiceDiscount: invoiceDiscount || 0,
        invoicePrice: invoicePrice || 0,
      };
      dispatch({
        type: "SUBMIT_INVOICE",
        newInvoice: newInvoice,
      });
      setCustomerName("");
      setSearchWord("");
      setInvoiceDiscount(0);
    }
  };
  return (
    <div>
      <div className="input-div d-flex align-items-center justify-content-center w-100 my-3">
        <input
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          className="p-1 rounded-3 text-center w-50"
          type="text"
          placeholder={lang === "en" ? "Search" : "بحث"}
        />
      </div>
      <DataForm productsList={productsList} theadItems={th} />
      <DataForm productsList={productsList2} theadItems={th} />
      <div className="tfoot-div d-flex">
        <div className="tfoot d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 ">
          <input
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
            }}
            className="p-1 rounded-3 text-center"
            type="text"
            placeholder={lang === "en" ? "Customer Name" : "إسم العميل"}
          />
          <input
            value={invoiceDiscount}
            onChange={(e) => {
              setInvoiceDiscount(e.target.value);
            }}
            className="p-1 rounded-3 text-center"
            type="number"
            placeholder={lang === "en" ? "Discount" : "الخصم"}
          />
          <div className="d-flex flex-md-column align-items-center justify-content-between">
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <span> {lang === "en" ? "Total Price" : "السعر الكلى"} </span>
                  <span>{value}</span>
                </>
              )}
              decimalScale={2}
              value={invoicePrice}
              displayType="text"
              thousandSeparator={true}
            />
          </div>
          <button onClick={handelSubmitInvoice}>
            {lang === "en" ? "Done" : "تم"}
          </button>
        </div>
      </div>
    </div>
  );
};
