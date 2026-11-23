import { createContext, useContext } from "react";
import useFetch from "../hooks/UseFetch";

const PRODUCTS_URL = "http://localhost:3001/menu"; 
const CURRENCY = "KES"; 

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const { data, loading, error, refetch } = useFetch(PRODUCTS_URL);

  
  const products = data || [];

  
  const addProduct = () => {};
  const deleteProduct = () => {};

  const value = {
    products,
    currency: CURRENCY,
    addProduct,
    deleteProduct,
  };

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside <ProductsProvider>");
  return ctx;
}
