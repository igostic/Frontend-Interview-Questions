import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListing from "./pages/product-listing";
import ProductDetail from "./pages/product-detail";
import Home from "./pages/home";

import "./styles.css";
import Breadcrumbs from "./components/breadCrumbs";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        {/* Routes - react-router-dom ->  */}
        <Routes>
          {/* Home page with '/' */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
