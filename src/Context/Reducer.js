export const initialState = {
  user: null,
  done: null,
  purchaseInvoice: [],
  purchaseInvoices: [],
  products: [],
  removedProducts: [],
  invoice: [],
  invoices: [],
  invoiceItems: [],
  lang: localStorage.getItem("lang"),
};
export const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    // Log In
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    // Lang Action
    case "CHANGE_LANG":
      let langAfter;
      if (state.lang === "en") {
        langAfter = "ar";
        localStorage.setItem("lang", langAfter);
      } else {
        langAfter = "en";
        localStorage.setItem("lang", langAfter);
      }
      return {
        ...state,
        lang: langAfter,
      };
    // Create Products
    case "ADD_TO_PURCHASE":
      return {
        ...state,
        purchaseInvoice: [...state.purchaseInvoice, action.newProduct],
      };
    case "SUBMIT_PURCHASE_INVOICE":
      return {
        ...state,
        purchaseInvoices: [...state.purchaseInvoices, action.newPurchase],
        purchaseInvoice: [],
      };
    case "ADD_TO_PRODUCTS":
      let product = state.products;
      const newPurchases = action.Purchases;
      // eslint-disable-next-line array-callback-return
      newPurchases.map((purchaseItems) => {
        const index = product.findIndex(
          (item) => item.name.trim() === purchaseItems.name.trim()
        );
        if (index !== -1) {
          product[index].count += purchaseItems.count;
        } else {
          product = [...product, purchaseItems];
        }
      });
      return {
        ...state,
        products: product,
      };
    case "EDIT_PRODUCT":
      let products = state.products;
      const index = products.findIndex((i) => i.id === action.id);
      // eslint-disable-next-line eqeqeq
      if (index != -1) {
        products[index] = { ...action.updated, id: products[index].id };
      }
      return {
        ...state,
        products: products,
        done: products[index],
      };
    case "ADD_TO_INVOICE":
      const itemIndex = state.invoice.findIndex((i) => i.id === action.id);
      // eslint-disable-next-line array-callback-return
      state.products.find((item) => {
        if (item.id === action.id) {
          if (itemIndex !== -1) {
            state.invoice[itemIndex].count += 1;
          } else {
            state.invoice = [...state.invoice, { ...item, count: 1 }];
          }
        }
      });
      return {
        ...state,
        invoice: state.invoice,
      };
    case "REMOVE_FROM_INVOICE":
      const index2 = state.invoice.findIndex((i) => i.id === action.id);
      if (index2 !== -1) {
        if (state.invoice[index2].count > 1) {
          state.invoice[index2].count -= 1;
        } else {
          state.invoice = state.invoice.filter((i) => i.id !== action.id);
        }
      }
      return {
        ...state,
        invoice: state.invoice,
      };
    case "SUBMIT_INVOICE":
      state.products.map((i) => {
        const index = state.invoice.findIndex((item) => item.id === i.id);
        if (index !== -1) {
          i.count -= state.invoice[index].count;
        }
      });
      return {
        ...state,
        invoices: [...state.invoices, action.newInvoice],
        products: state.products,
        invoice: [],
      };

    case "SHOW_INVOICE_ITEMS":
      const invoiceItem = action.invoice.find((i) => i.id === action.id);
      return {
        ...state,
        invoiceItems: invoiceItem,
      };

    case "GET_DATA_FROM_FIREBASE":
      return {
        ...state,
        products: action.mainData || [],
        purchaseInvoices: action.mainPurchaseInvoices || [],
        invoices: action.mainInvoices || [],
      };
    default:
      return state;
  }
};
