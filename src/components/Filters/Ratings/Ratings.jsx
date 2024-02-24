import { useFilter } from "../../../context";

const ratings = ["1", "2", "3", "4", "5"];

export const Ratings = () => {
    const {safarkaroRating,filterDispatch} = useFilter()
    const handleRatingsClick=(rating)=>{
        filterDispatch({
            type:"RATING",
            payload:rating,
        })
    }
  return (
    <div className="filter-container">
      <span className="filter-label">Ratings</span>
      <div className="d-flex align-center gap">
        {ratings.map((rating) => (
          <span
            className={`span-label aminity-count star d-flex align-center justify-center cursor-pointer on-hover ${ safarkaroRating === rating ? "selected" : "" }`}
            key={rating}
            onClick={()=>handleRatingsClick(rating)}
          >
            {rating}
            <span className="material-symbols-outlined">star</span>
          </span>
        ))}
      </div>
    </div>
  );
};
