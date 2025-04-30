import "@styles/main.scss";
import { RouterProvider } from "react-router";
import { Suspense } from "react";
import router from "./routes/index";
import { AuthProvider } from "@context/AuthContext";
import { ProductProvider } from "@context/ProductContext";
import { CartProvider } from "@context/CartContext";
import { UserProvider } from "@context/UserContext";
function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <RouterProvider router={router} />

            </Suspense>
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
