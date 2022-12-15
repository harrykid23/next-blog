import { parse } from "postcss";

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DateString = ({ timestamp }) => {
  const dateObj = new Date(parseInt(timestamp));
  const date = dateObj.getDate();
  const month = monthList[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return (
    <>
      {month} {date}, {year}
    </>
  );
};

export default DateString;
