import { Fragment, useEffect, useState } from "react";
import { HotelDetails, Navbar } from "../../components";
import "./SingleHotel.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HotelImages } from "../../components/index";
import { FinalPrice } from "../../components";

export const SingleHotel = () => {
  const { hotelId } = useParams();
  // console.log(hotelId);
  const [singleHotel, setSingleHotel] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travelapp-backend-3xg0.onrender.com/api/hotels/${hotelId}`
        );
        // console.log(
        //   `https://travelapp-backend-3xg0.onrender.com/api/hotels/${hotelId}`
        // )
        setSingleHotel(data);
        // console.log(data)
        // console.log(singleHotel)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [hotelId]);
  // console.log(singleHotel)
  const { name, state, country } = singleHotel;
  return (
    <Fragment>
      <Navbar />
      <main className="single-hotel-page">
        <span className="hotel-name-add">
          {name} - {state}, {country}
        </span>
        <HotelImages singleHotel={singleHotel} />
        <div className="d-flex">
          <HotelDetails singleHotel={singleHotel}/>
          <FinalPrice singleHotel={singleHotel}/>
        </div>
      </main>
    </Fragment>
  );
};
