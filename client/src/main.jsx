import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>

     <BrowserRouter>
      <AuthProvider>

        <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000, 
        }}
      />
      </AuthProvider>
     </BrowserRouter>
  </StrictMode>
);