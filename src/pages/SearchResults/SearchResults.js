import { Fragment, useEffect, useState } from "react"
import {HotelCard, Navbar} from "../../components"
import { useDate,useCategory } from "../../context"
import axios from "axios"



export const SearchResults = () =>{
    const {destination} = useDate();
    const [hotels, setHotels] = useState([]);
    const { hotelCategory } = useCategory();
    useEffect(()=>{
        (async () => {
            try {
              const { data } = await axios.get(
                `https://travelapp-backend-3xg0.onrender.com/api/hotels?category=${hotelCategory}`
              );
            //   console.log(data);              
              setHotels(data);
            } catch (error) {
              console.log(error);
            }
          })();        
    },[destination])

    const filteredSearchResults = hotels.filter(
        ({ address, city, state}) =>
          address.toLowerCase() === (destination.toLowerCase()) ||
          city.toLowerCase() === (destination.toLowerCase()) ||
          state.toLowerCase() === (destination.toLowerCase())
          );
    // console.log(filteredSearchResults);

    return(
        <Fragment>
            <Navbar/>
            <section className="main d-flex align-center  gap-larger">
                {
                    filteredSearchResults ? filteredSearchResults.map(hotel => <HotelCard key={hotel._id} hotel={hotel}/>) : (
                        <h3>Nothing Found</h3>
                    )
                }
            </section>
        </Fragment>
    )
}