export const convertDate = (postedAt) => {
  const date = new Date(postedAt);
  const day = date.toDateString();

  return day.substr(0, day.length - 5);
};
