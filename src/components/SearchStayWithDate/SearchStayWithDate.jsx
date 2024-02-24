import { DateSelector } from "../DateSelector/DateSelector";
import "./SearchStayWithDate.css";
import { useDate, useCategory } from "../../context";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SearchStayWithDate = () => {
  const { destination, guests, isSearchResultOpen, dateDispatch } = useDate();
  const [hotels, setHotels] = useState([]);
  const { hotelCategory } = useCategory();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travelapp-backend-3xg0.onrender.com/api/hotels?category=${hotelCategory}`
        );
        // console.log(data);
        // setTestData(data);
        setHotels(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [hotelCategory]);
  const handleDestinationChange = (event) => {
    dateDispatch({
      type: "DESTINATION",
      payload: event.target.value,
    });
  };
  const handleGuestChange = (event) => {
    dateDispatch({
      type: "GUESTS",
      payload: event.target.value,
    });
  };
  const handleSearchResultClick = (address) => {
    dateDispatch({
      type: "DESTINATION",
      payload: address,
    });
  };
  const handleDestinationFocus = () => {
    dateDispatch({
      type: "SHOW_SEARCH_RESULT",
    //   payload: address,
    });
  };
  const destinationOptions = hotels.filter(
    ({ address, city, state, country }) =>
      address.toLowerCase().includes(destination.toLowerCase()) ||
      city.toLowerCase().includes(destination.toLowerCase()) ||
      state.toLowerCase().includes(destination.toLowerCase()) ||
      country.toLowerCase().includes(destination.toLowerCase())
  );
  const handleSearchButtonClick =()=>{
    dateDispatch({
        type:"CLOSE_SEARCH_MODAL"
    })
    navigate(`/hotels/${destination}`)
  }
  console.log(destinationOptions);
  return (
    <div className="destination-container">
      <div className="destination-options d-flex align-center absolute">
        <div className="location-container">
          <label className="label">Where</label>
          <input
            value={destination}
            onChange={handleDestinationChange}
            onFocus={handleDestinationFocus}
            className="input search-dest"
            placeholder="Search Destination"
            autoFocus
          />
        </div>
        <div className="location-container">
          <label className="label">Check In</label>
          <DateSelector placeholder="Add Dates" checkInType="in" />
        </div>
        <div className="location-container">
          <label className="label">Check Out</label>
          <DateSelector placeholder="Add Dates" checkInType="out" />
        </div>
        <div className="location-container">
          <label className="label">No. of Guests</label>
          <input
            value={guests}
            className="input search-dest"
            placeholder="Add Guests"
            onChange={handleGuestChange}
          />
        </div>
        <div className="search-container d-flex align-center cursor" onClick={handleSearchButtonClick}>
          <span className="material-symbols-outlined">search</span>
          <span>Search</span>
        </div>
      </div>
      {isSearchResultOpen && (
        <div className="search-result-container absolute">
          {destinationOptions &&
            destinationOptions.map(({ address, city }) => (
              <p
                className="p cursor-pointer"
                onClick={() => handleSearchResultClick(address)}
              >
                {address}, {city}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};
