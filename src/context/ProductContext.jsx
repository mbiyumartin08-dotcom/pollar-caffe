import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";


const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const { data, loading, error, refetch } = useFetch(PRODUCTS_URL);

  const value = {
    products: data || [],
    loading,
    error,
    refetch,
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