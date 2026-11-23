
import { Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./context/ProductContext";
import PublicLayout from "./components/PublicLayout";

import LandingPage from "./pages/LandingPage";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <ProductsProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ProductsProvider>
  );
}
