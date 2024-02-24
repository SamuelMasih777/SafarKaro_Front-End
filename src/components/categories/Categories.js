import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { useCategory, useFilter } from "../../context";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [noOfCategoriesToShow, setNoOfCategoriesToShow] = useState(0);
  const { hotelCategory, setHotelCategory } = useCategory();
  const {filterDispatch} = useFilter();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://travelapp-backend-3xg0.onrender.com/api/categories"
        );
        // console.log(data);
        const categoriesToShow = data.slice(
          noOfCategoriesToShow + 10 > data.length
            ? data.length - 10
            : noOfCategoriesToShow,
          noOfCategoriesToShow > data.length
            ? data.length
            : noOfCategoriesToShow + 10
        );
        setCategories(categoriesToShow);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [noOfCategoriesToShow]);

  const handleShowMoreRightClick = () => {
    setNoOfCategoriesToShow((prev) => prev + 10);
  };
  const handleShowMoreLeftClick = () => {
    setNoOfCategoriesToShow((prev) => prev - 10);
  };
  const handleCategoryClick = (category) => {
    // console.log(category)
    setHotelCategory(category);
  };
  // console.log({"hotel":hotelCategory});
  const handleFilterClick =()=>{
    filterDispatch({
      type:"SHOW_FILTER_MODAL",
      
    })
  }
  return (
    <section className="categories d-flex align-center gap-large cursor-pointer shadow">
      {noOfCategoriesToShow >= 10 && (
        <button
          className="button btn-category btn-left fixed cursor-pointer"
          onClick={handleShowMoreLeftClick}
        >
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
      )}
      {categories &&
        categories.map(({ _id, category }) => (
          <span
            className={`${category === hotelCategory ? "border-bottom" : ""}`}
            key={_id}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
      {noOfCategoriesToShow - 10 < categories.length && (
        <button
          className="button btn-category btn-right fixed cursor-pointer"
          onClick={handleShowMoreRightClick}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )}
      
        <button className="button btn-filter d-flex align-center gap-small cursor-pointer fixed" onClick={handleFilterClick}>
          <span className="material-symbols-outlined">filter_alt</span>
          <span>Filter</span>
        </button>
      
    </section>
  );
};
