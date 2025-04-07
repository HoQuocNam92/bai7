import "@styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import routers from "./routes/index";
import { AuthProvider } from "@context/AuthContext";
import { ProductProvider } from "@context/ProductContext";
import MainLayout from "@layouts/mainLayout";
import ScrollToTop from "./ScrollToTop";
import { CartProvider } from "@context/CartContext";
function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route element={<MainLayout />}>
                  {routers
                    .filter((route) => !route.hideLayout)
                    .map((item, index) => (
                      <Route
                        key={index}
                        path={item.path}
                        element={<item.component />}
                      />
                    ))}
                </Route>
                {routers
                  .filter((route) => route.hideLayout)
                  .map((item, index) => (
                    <Route
                      key={index}
                      path={item.path}
                      element={<item.component />}
                    />
                  ))}
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
