import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Navbar,
  HotelCard,
  Categories,
  SearchStayWithDate,
  Filter,
  AuthModal,
  ProfileDropDown,
  Alert
} from "../../components";
import "./Home.css";
import { useCategory, useDate, useFilter, useAuth, useAlert } from "../../context";
import {
  getHotelsByPrice,
  getHotelsByRoomsAndBeds,
  getHotelsByPropertyType,
  getHotelsByRatings,
  getHotelsByCancelation,
} from "../../utils";

export const Home = () => {
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(16);
  const [testData, setTestData] = useState([]);
  const [hotels, setHotels] = useState([]);
  const { hotelCategory } = useCategory();
  const { isSearchModalOpen } = useDate();
  const {
    isFilterModalOpen,
    priceRange,
    noOfBathrooms,
    noOfBedrooms,
    noOfBeds,
    propertyType,
    safarkaroRating,
    isCancelable,
  } = useFilter();

  const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
  const { alert } = useAlert();

  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travelapp-backend-3xg0.onrender.com/api/hotels?category=${hotelCategory}`
        );

        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
        setIsLoading(false); 
      } catch (err) {
        console.log(err);
        setIsLoading(false); 
      }
    })();
  }, [hotelCategory]);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (hotels && hotels.length > 0) {
        setHotels(
          hotels.concat(testData.slice(currentIndex, currentIndex + 16))
        );
        setCurrentIndex((prev) => prev + 16);
      } else {
        setHotels([]);
      }
    }, 1000);
  };

  const filteredHotelsByPrice = getHotelsByPrice(hotels, priceRange);
  const filteredHotelsByBedsAndRooms = getHotelsByRoomsAndBeds(
    filteredHotelsByPrice,
    noOfBathrooms,
    noOfBedrooms,
    noOfBeds
  );
  const filteredHotelsByPropertyType = getHotelsByPropertyType(
    filteredHotelsByBedsAndRooms,
    propertyType
  );

  const filteredHotelsByRatings = getHotelsByRatings(
    filteredHotelsByPropertyType,
    safarkaroRating
  );

  const filteredHotelsByCancelation = getHotelsByCancelation(
    filteredHotelsByRatings,
    isCancelable
  );

  return (
    <div className="relative">
      <Navbar route="home" />
      <Categories />
      {isLoading ? (
        <div className="loading-text">Loading...</div>
      ) : hotels && hotels.length > 0 ? (
        <InfiniteScroll
          dataLength={hotels.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <h3 className="alert-text">Loading...</h3>
          }
          endMessage={<p className="alert-text">You have seen it all</p>}
        >
          <main className="main d-flex align-center wrap gap-larger">
            {filteredHotelsByCancelation &&
              filteredHotelsByCancelation.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
          </main>
        </InfiniteScroll>
      ) : (
        <></>
      )}
      {isDropDownModalOpen && <ProfileDropDown />}
      {isSearchModalOpen && <SearchStayWithDate />}
      {isFilterModalOpen && <Filter />}
      {isAuthModalOpen && <AuthModal />}
      {alert.open && <Alert />}
    </div>
  );
};