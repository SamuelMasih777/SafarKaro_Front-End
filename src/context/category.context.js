import { createContext, useContext, useState } from "react";

const inititalValue = "National Parks";

const CategoryContext = createContext(inititalValue);

const CategoryProvider = ({ children }) => {
  const [hotelCategory, setHotelCategory] = useState(inititalValue);

  return (
    <CategoryContext.Provider value={{ hotelCategory, setHotelCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
const useCategory = () => useContext(CategoryContext);
export { useCategory, CategoryProvider };
