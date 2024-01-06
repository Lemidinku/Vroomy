import { useEffect, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";

import "./Calendar.css";

const Calendar = ({ carId }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [currDate, setCurrDate] = useState(new Date());
  let currYear = currDate.getFullYear(),
    currMonth = currDate.getMonth();

  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

  let liTag = [];

  useEffect(() => {
    const fetchBookedDates = async () => {
      const res = await fetch(
        `http://localhost:9000/api/v1/bookings/month-availability/${carId}?startDate=${
          new Date(currYear, currDate.getMonth(), 2).toISOString().split("T")[0]
        }&endDate=${
          new Date(currYear, currDate.getMonth(), lastDateofMonth + 1)
            .toISOString()
            .split("T")[0]
        }`,
        (Headers = { "Content-Type": "application/json", method: "GET" })
      );
      const data = await res.json();
      setBookedDates(data.bookedDates);
    };
    fetchBookedDates();
  }, [currDate]);

  // the key is so that react can keep track of the list items
  // the key should be unique for each list item
  // I didn't use a meaningful key here.

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag.push(
      <li className="inactive" key={i - 31}>
        {lastDateofLastMonth - i + 1}
      </li>
    );
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === currDate.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    if (
      bookedDates &&
      bookedDates.includes(
        new Date(currYear, currMonth, i + 1).toISOString().split("T")[0]
      )
    ) {
      isToday += " unavailable";
    }

    liTag.push(
      <li className={isToday} key={i}>
        {i}
      </li>
    );
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag.push(
      <li className="inactive" key={31 + i}>
        {i - lastDayofMonth + 1}
      </li>
    );
  }

  const changeMonth = (e) => {
    if (e.target.value === "prev" && currDate > new Date()) {
      setCurrDate(new Date(currYear, currMonth - 1, new Date().getDate()));
    }
    if (e.target.value === "next") {
      setCurrDate(new Date(currYear, currMonth + 1, new Date().getDate()));
    }

    if (currDate.getMonth() < 0) {
      setCurrDate(new Date(currYear - 1, 11 - currMonth, new Date().getDate()));
    }
    if (currDate.getMonth() > 11) {
      setCurrDate(new Date(currYear + 1, 0, new Date().getDate()));
    }
  };
  return (
    <div className="calendar grid rounded shadow">
      <header className="calendar__header">
        <MaterialSymbol
          icon="chevron_left"
          size="large"
          color="black"
          id="prev"
          className=" btn"
          value="prev"
          onClick={(e) => changeMonth(e)}
        />
        <p className="current-date">
          {currDate.toLocaleString("default", { month: "long" })},{" "}
          {currDate.getFullYear()}
        </p>
        <MaterialSymbol
          icon="chevron_right"
          size="large"
          color="black"
          id="next"
          className=" btn"
          value="next"
          onClick={(e) => changeMonth(e)}
        />
      </header>
      <ul className="calendar__weeks">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul className="calendar__days">{liTag}</ul>
    </div>
  );
};

export default Calendar;
