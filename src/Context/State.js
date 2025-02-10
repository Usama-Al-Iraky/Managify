import { createContext, useContext, useReducer, useState } from "react";
import { MainReducer, initialState } from "./Reducer";

const Context = createContext();
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initialState);
  const [invoiceToShow, setInvoiceToShow] = useState([]);
  const handelChangeLang = () => {
    dispatch({
      type: "CHANGE_LANG",
    });
  };
  return (
    <Context.Provider
      value={{
        dispatch: dispatch,
        user: state.user,
        purchaseInvoice: state.purchaseInvoice,
        purchaseInvoices: state.purchaseInvoices,
        products: state.products,
        removed: state.removedProducts,
        invoice: state.invoice,
        invoices: state.invoices,
        invoiceItems: state.invoiceItems,
        lang: state.lang,
        done: state.done,
        invoiceToShow: invoiceToShow,
        setInvoiceToShow: setInvoiceToShow,
        handelChangeLang:handelChangeLang,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
export const useRedCon = () => {
  return useContext(Context);
};
