import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./Index.css";

import UserAuthContext from "./utility/AuthContext.jsx";
import { CategoryProvider } from "./utility/CategoryContext.jsx";
import { CartWishlistProvider } from "./utility/CartWishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuthContext>
      <CategoryProvider>
        <CartWishlistProvider>
          <App />
        </CartWishlistProvider>
      </CategoryProvider>
    </UserAuthContext>
  </StrictMode>
);
