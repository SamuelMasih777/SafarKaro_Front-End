import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';
import {
  CategoryProvider,
  DataProvider,
  FilterProvider,
  AuthProvider,
  WishlistProvider,
  HotelProvider,
  AlertProvider,
} from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <DataProvider>
          <FilterProvider>
            <AuthProvider>
              <WishlistProvider>
                <HotelProvider>
                  <AlertProvider>
                    <App />
                  </AlertProvider>
                </HotelProvider>
              </WishlistProvider>
            </AuthProvider>
          </FilterProvider>
        </DataProvider>
      </CategoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
