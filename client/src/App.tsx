import "@styles/main.scss";
import { RouterProvider } from "react-router";
import { Suspense } from "react";
import { router } from "./routes/index";
import { AuthProvider } from "@context/AuthContext";
import { ProductProvider } from "@context/ProductContext";
import { CartProvider } from "@context/CartContext";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
