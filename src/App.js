import "./App.css";
import { Home, SearchResults, SingleHotel, Wishlist, Payment, OrderSummary } from "./pages/index";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/hotels/:name/:address/:hotelId/reserve"
          element={<SingleHotel />}
        />
        <Route path="/hotels/:address" element={<SearchResults/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/confirm-booking/stay/:id" element={<Payment/>}/>
        <Route path="/order-summary" element={<OrderSummary/>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
