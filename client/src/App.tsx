import "@styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import routers from "./routes/index";
import { AuthProvider } from "@context/AuthContext";
import { ProductProvider } from "@context/ProductContext";
import MainLayout from "@layouts/mainLayout";
import ScrollToTop from "./ScrollToTop"; // (Nếu bạn có dùng ScrollToTop)
import { ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<MainLayout />}>
                {routers
                  .filter((route) => !route.hideLayout) // Ẩn layout cho các trang đặc biệt
                  .map((item, index) => (
                    <Route
                      key={index}
                      path={item.path}
                      element={<item.component />}
                    />
                  ))}
              </Route>
              {routers
                .filter((route) => route.hideLayout) // Chỉ lấy các route cần ẩn layout
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
    </ProductProvider>
  );
}

export default App;
