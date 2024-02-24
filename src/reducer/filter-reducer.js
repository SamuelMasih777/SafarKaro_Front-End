export const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case "SHOW_FILTER_MODAL":
      return {
        ...state,
        isFilterModalOpen: !state.isFilterModalOpen,
      };
    case "MINIMUM_PRICE":
      return {
        ...state,
        priceRange: [payload.newValue[0], payload.priceRange[1]],
      };
    case "MAXIMUM_PRICE":
      return {
        ...state,
        priceRange: [
          payload.priceRange[0],
          Math.max(
            payload.newValue[1],
            payload.priceRange[0] + payload.minDifference
          ),
        ],
      };
    case "BEDROOMS":
      return {
        ...state,
        noOfBedrooms: payload === "Any" ? payload : Number(payload),
      };
    case "BATHROOMS":
      return {
        ...state,
        noOfBathrooms: payload === "Any" ? payload : Number(payload),
      };
    case "BEDS":
      return {
        ...state,
        noOfBeds: payload === "Any" ? payload : Number(payload),
      };
    case "PROPERTY_TYPE":
      return {
        ...state,
        propertyType: payload,
      };
    case "RATING":
      return {
        ...state,
        safarkaroRating: Number(payload),
      };
    case "FREE_CANCEL":
      return {
        ...state,
        isCancelable: payload,
      };
    case "CLEAR_ALL":
      return {
        ...state,
        priceRange: [300, 20000],
        noOfBathrooms: "Any",
        noOfBedrooms: "Any",
        noOfBeds: "Any",
        propertyType: "Any",
        safarkaroRating: "1",
        isCancelable: true,
      };
    default:
      return state;
  }
};
