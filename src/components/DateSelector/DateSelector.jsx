// import "./DateSelector.css";
import DatePicker from "react-datepicker";
import "./DateSelector.css";
import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";
import { useDate } from "../../context";

export const DateSelector = ({placeholder, checkInType}) => {
    const {checkInDate,checkOutDate,dateDispatch} = useDate();
    const handleDateChange= (date) =>{
        dateDispatch({
            type: checkInType === "in" ? "CHECK_IN" : "CHECK_OUT",
            payload:date
        })
    }
    // const [currentDate, setCurrentDate] = useState(new Date())
    // console.log({checkInDate,checkOutDate})
    const handleDateFocus =()=>{
        dateDispatch({
            type:"DATE_FOCUS",
        })
    }
  return (
    <DatePicker
    className="search-dest input"
      selected={checkInType === "in" ? checkInDate : checkOutDate}
      onChange={(date) => handleDateChange(date)}
      dateFormat="dd/MM/yyy"
      onFocus={handleDateFocus}
      placeholderText={placeholder}
      closeOnScroll={true}
    />
  );
};
