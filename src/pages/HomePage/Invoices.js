import React, { useEffect, useMemo, useState } from "react";
import { DataForm } from "../../Components/DataForm";
import { useRedCon } from "../../Context/State";
import CurrencyFormat from "react-currency-format";

export const Invoices = () => {
  const {
    lang,
    dispatch,
    purchaseInvoices,
    invoiceItems,
    setInvoiceToShow,
    invoiceToShow,
    invoices,
  } = useRedCon();
  const en = ["No", "Name", "Date"];
  const ar = ["الرقم", "الإسم", "التاريخ"];
  const th = lang === "en" ? en : ar;
  const en1 = ["No", "Name", "Company", "Category", "Price", "Count"];
  const ar1 = ["الرقم", "الإسم", "الشركة", "الفئة", "السعر", "الكمية"];
  const th1 = lang === "en" ? en1 : ar1;
  const en2 = ["Name", "Date", "Price Befor", "Discount", "Price After"];
  const ar2 = ["الاسم", "التاريخ", "السعر قبل", "الخصم", "السعر بعد"];
  const th2 = lang === "en" ? en2 : ar2;
  const showDetails = (id) => {
    dispatch({
      type: "SHOW_INVOICE_ITEMS",
      invoice: invoiceToShow,
      id: id,
    });
  };
  const productsList = invoiceItems.invoiceItems?.map((i, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{i.name}</td>
      <td>{i.date ? i.date : i.company}</td>
      <td>{i.category}</td>
      <td>{i.price}</td>
      <td>{i.count}</td>
    </tr>
  ));
  const [isActive, setIsActive] = useState("");
  const productsListg = invoiceToShow?.map((i, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td
        onClick={() => {
          showDetails(i.id);
          setIsActive(i.id);
        }}
      >
        <p
          style={{
            margin: "0",
            backgroundColor: isActive === i.id ? "#ffc107" : "#292929",
            color: isActive === i.id ? "#ff2600" : "white",
            cursor: "pointer",
            padding: "2px",
          }}
          className="rounded"
        >
          {i.name}
        </p>
      </td>
      <td>{i.date}</td>
    </tr>
  ));
  const invoicesTotalPrice = useMemo(
    () => invoiceToShow.reduce((acc, i) => acc + i.invoicePrice, 0),
    [invoiceToShow]
  );

  return (
    <div>
      <div className="input-div d-flex align-items-center justify-content-around w-100 my-3">
        <button
          className="route-btn"
          onClick={() => {
            setInvoiceToShow(invoices);
          }}
        >
          {lang === "en" ? "Invoices" : "فواتير المبيعات"}
        </button>
        <button
          className="route-btn"
          onClick={() => {
            setInvoiceToShow(purchaseInvoices);
          }}
        >
          {lang === "en" ? "Purchase Invoices" : "فواتير المشتريات"}
        </button>
      </div>
      <DataForm
        productsList={productsListg}
        style={{ cursor: "pointer" }}
        theadItems={th}
      />

      <CurrencyFormat
        renderText={(value) => (
          <h4 className="text-center">
            {lang === "en" ? "Invoices Total Price" : "إجمالى سعر الفواتير"}:{" "}
            {value} {lang === "en" ? "EGP" : "جنيها"}
          </h4>
        )}
        decimalScale={2}
        value={invoicesTotalPrice}
        displayType="text"
        thousandSeparator={true}
      />
      <DataForm productsList={productsList} theadItems={th1} />
      <table className="test">
        <thead>
          <tr>
            {th2.map((i, index) => (
              <td key={index}> {i} </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {invoiceItems.name} </td>
            <td> {invoiceItems.date} </td>
            <CurrencyFormat
              renderText={(value) => <td>{value}</td>}
              decimalScale={2}
              value={invoiceItems.priceBefor}
              displayType="text"
              thousandSeparator={true}
            />
            <CurrencyFormat
              renderText={(value) => <td>{value}</td>}
              decimalScale={2}
              value={invoiceItems.invoiceDiscount}
              displayType="text"
              thousandSeparator={true}
            />
            <CurrencyFormat
              renderText={(value) => <td>{value}</td>}
              decimalScale={2}
              value={invoiceItems.invoicePrice}
              displayType="text"
              thousandSeparator={true}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};
