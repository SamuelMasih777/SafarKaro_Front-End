import "./FinalPrice.css";
import { useDate ,useAuth,useAlert} from "../../context";
import { DateSelector } from "../DateSelector/DateSelector";
import { useNavigate } from "react-router-dom";
import {Alert} from "../../components"

export const FinalPrice = ({ singleHotel }) => {
  const { _id, price, rating } = singleHotel;
  const { guests, checkInDate, checkOutDate, dateDispatch } = useDate();
  const { authDispatch, accessToken } = useAuth();
  const {alert,setAlert} = useAlert();
  const navigate = useNavigate();
  const handleGuestChange = (event) => {
    dateDispatch({
      type: "GUESTS",
      payload: event.target.value,
    });
  };
  const handleReserveClick = () => {
    if(accessToken){
      navigate(`/confirm-booking/stay/${_id}`);
    }else{
      navigate('/')
      authDispatch({
        type: "SHOW_AUTH_MODAL",
      });
      // {alert.open && <Alert />}
    }
    
  };
  return (
    <div className="price-details-container d-flex direction-column gap shadow">
      <div className="price-rating d-flex align-center justify-space-between">
        <p>
          <span className="fs-bold fs-large">Rs. {price}</span> night
        </p>
        <span className="rating d-flex align-center">
          <span className="material-symbols-outlined">star</span>
          <span>{rating}</span>
        </span>
      </div>
      <div className="d-flex direction-column">
        <div className="grid-container-two-col selected-dates">
          <div className="checkin loc-container">
            <label className="label">Check In</label>
            <DateSelector checkInType="in" placeholder="Add Date" />
          </div>
          <div className="checkin loc-container">
            <label className="label">Check Out</label>
            <DateSelector checkInType="out" placeholder="Add Date" />
          </div>
        </div>
        <div className="guests gutter-sm">
          <p>Guests</p>
          {guests <= 0 ? (
            <input
              className="guest-count-input"
              type="number"
              placeholder="Add Guests"
              value={guests}
              onChange={handleGuestChange}
            />
          ) : (
            <span>{guests} Guests</span>
          )}
        </div>
      </div>
      <div>
        <button
          className="button btn-reserve btn-primary cursor"
          onClick={handleReserveClick}
          disabled={checkInDate && checkOutDate && guests > 0 ? false : true}
        >
          Reserve
        </button>
      </div>
      <div className="price-distribution d-flex direction-column">
        <div className="final-price d-flex align-center justify-space-between">
          <span className="span">Rs. {price} x 2 nights</span>
          <span className="span">Rs. {price * 2}</span>
        </div>
        <div className="final-price d-flex align-center justify-space-between">
          <span className="span">Service Fees</span>
          <span className="span">Rs. 200</span>
        </div>
        <div className="final-price d-flex align-center justify-space-between">
          <span className="span">Total</span>
          <span className="span">Rs. {price * 2 + 200}</span>
        </div>
      </div>
    </div>
  );
};
