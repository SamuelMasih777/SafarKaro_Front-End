import { createContext, useContext, useReducer } from "react";
import { dateReducer } from "../reducer";
// import (dateReducer)
const initialState = {
  guests: 0,
  destination: "",
  checkInDate: null,
  checkOutDate: null,
  isSearchModalOpen: false,
  isSearchResultOpen:true,
};
const DataContext = createContext(initialState);
const DataProvider = ({ children }) => {
  const [
    { destination, guests, checkInDate, checkOutDate, isSearchModalOpen,isSearchResultOpen },
    dateDispatch,
  ] = useReducer(dateReducer, initialState);
  return (
    <DataContext.Provider
      value={{
        destination,
        guests,
        checkInDate,
        checkOutDate,
        isSearchModalOpen,
        isSearchResultOpen,
        dateDispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
const useDate = () => useContext(DataContext);
export { useDate, DataProvider };
