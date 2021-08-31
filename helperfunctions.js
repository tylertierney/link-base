export const convertDate = (postedAt) => {
  const date = new Date(postedAt);
  const day = date.toDateString();

  return day.substr(0, day.length - 5);
};

export const formatLocationData = (location_api_response) => {
  const city = location_api_response.city;
  const state_code = location_api_response.principalSubdivisionCode;
  const state_abbreviation = state_code.substr(3, state_code.length);
  return city + ", " + state_abbreviation;
};

export const checkForSmallScreen = () => {
  if (window.innerWidth < 600) {
    return true;
  }
  return false;
};
