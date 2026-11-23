import { createContext, useContext } from "react";
import useFetch from "../hooks/UseFetch";

export const ProductContext = createContext(null);
export const ProductsContext = ProductContext;
const PRODUCTS_URL = "http://localhost:3001/menu";

export function ProductsProvider({ children }) {
  const { data, loading, error, refetch } = useFetch(PRODUCTS_URL);

  const value = {
    products: data || [],
    loading,
    error,
    refetch,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}


export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside <ProductsProvider>");
  return ctx;
}