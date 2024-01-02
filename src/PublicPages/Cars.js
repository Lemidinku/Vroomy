import React, { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import CarsContainer from "../Components/CarsContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrashCan } from "@fortawesome/free-solid-svg-icons";

// css imports
import "./Cars.css";
import "../Components/MinusPlusInput.css";

const Cars = () => {
  const [carsList, setCarsList] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // filtering and sorting  states
  const [sortParam, setSortParam] = React.useState(
    searchParams.get("sort") || ""
  );
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("query") || ""
  );
  const [searchType, setSearchType] = React.useState(
    searchParams.get("search") || ""
  );
  const [seats, setSeats] = React.useState(
    parseInt(searchParams.get("seats")) || 0
  );
  const [startDate, setStartDate] = React.useState(
    searchParams.get("start") || ""
  );
  const [endDate, setEndDate] = React.useState(searchParams.get("end") || "");
  const [electric, setElectric] = React.useState(
    searchParams.get("electric") || false
  );

  const location = useLocation();

  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch(
        `http://localhost:9000/api/v1/cars${location.search}`,
        (Headers = { "Content-Type": "application/json", method: "GET" })
      );
      const data = await res.json();
      setCarsList(data);
    };
    fetchCars();
  }, [sortParam, searchQuery, searchType, seats]);

  console.log(carsList);
  function genNewSearchParamString(key, value) {
    const sp = new URLSearchParams(searchParams);
    if (value === null || value == false) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    return sp.toString();
  }

  const changeSortParams = (e) => {
    setSearchParams(genNewSearchParamString("sort", e.target.value));
    setSortParam(e.target.value);
  };

  const changeSearchParams = (e) => {
    setSearchParams(genNewSearchParamString("query", e.target.value));
    setSearchQuery(e.target.value);
  };
  const changeSearchType = (e) => {
    setSearchParams(genNewSearchParamString("search", e.target.value));
    setSearchType(e.target.value);
  };

  const changeSeatsParams = (e) => {
    setSearchParams(genNewSearchParamString("seats", e.target.value));
    setSeats(e.target.value);
  };
  const increment = () => {
    if (seats + 1 > 20) return;
    setSeats((seats) => seats + 1);
    setSearchParams(genNewSearchParamString("seats", seats + 1));
  };
  const decrement = () => {
    if (seats - 1 < 2) return;
    setSeats((seats) => seats - 1);
    setSearchParams(genNewSearchParamString("seats", seats - 1));
  };

  const changeStartDate = (e) => {
    setSearchParams(genNewSearchParamString("start", e.target.value));
    setStartDate(e.target.value);
  };
  const changeEndDate = (e) => {
    setSearchParams(genNewSearchParamString("end", e.target.value));
    setEndDate(e.target.value);
  };

  const changeElectric = (e) => {
    setSearchParams(genNewSearchParamString("electric", !electric));
    setElectric((prev) => !prev);
  };

  const clearFilter = () => {
    location.search = "";
    setSearchParams("");
    setSortParam("");
    setSearchQuery("");
    setSearchType("");
    setSeats(0);
    setStartDate("");
    setEndDate("");
    setElectric(false);
  };

  return (
    <div>
      <div className="search-container">
        <div className="search__section">
          <input
            className="search__input"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={searchQuery}
            onChange={changeSearchParams}
          />
          <FontAwesomeIcon className="custom-icon" icon={faSearch} />
        </div>
        <div className="search__selection">
          <select
            name="search"
            id="search"
            onChange={(e) => changeSearchType(e)}
          >
            <option value="">search by..</option>
            <option value="type">Type</option>
            <option value="owner">Owner</option>
          </select>
        </div>
      </div>

      <div id="main-container">
        <aside className="filter-container">
          <div className="flex filter__header shadow rounded">
            <label htmlFor="filter">Filter</label>
            <button id="filter" onClick={clearFilter}>
              <FontAwesomeIcon
                className="clear-filter-icon"
                icon={faTrashCan}
              />
            </button>
          </div>
          <ul className="shadow filter__body rounded">
            <li className="filter__body__blocks">
              <h4 className="p-1">Sort by</h4>

              <ul>
                <li className="filter__body__blocks__items">
                  <label htmlFor="rating">Rating</label>
                  <input
                    type="radio"
                    value=""
                    checked={sortParam == ""}
                    name="sortby"
                    id="rating"
                    onChange={(e) => changeSortParams(e)}
                  />
                </li>
                <li className="filter__body__blocks__items">
                  <label htmlFor="price">Price</label>
                  <input
                    className="checkbox"
                    value="price"
                    checked={sortParam == "price"}
                    type="radio"
                    name="sortby"
                    id="price"
                    onChange={(e) => changeSortParams(e)}
                  />
                </li>
                <li className="filter__body__blocks__items">
                  <label htmlFor="year">Year</label>
                  <input
                    className="checkbox"
                    value="year"
                    checked={sortParam == "year"}
                    type="radio"
                    name="sortby"
                    id="year"
                    onChange={(e) => changeSortParams(e)}
                  />
                </li>
              </ul>
            </li>
            <li className="filter__body__blocks">
              <h4 className="p-1">Availability</h4>

              <ul>
                <li className="filter__body__blocks__items">
                  <label htmlFor="start-date">Start</label>
                  <input
                    type="date"
                    name="start-date"
                    id="start-date"
                    min={new Date().toISOString().split("T")[0]}
                    value={startDate}
                    onChange={changeStartDate}
                  />
                </li>
                <li className="filter__body__blocks__items">
                  <label htmlFor="end-date">End</label>
                  <input
                    type="date"
                    name="end-date"
                    id="end-date"
                    min={startDate || new Date().toISOString().split("T")[0]}
                    value={endDate}
                    onChange={changeEndDate}
                  />
                </li>
              </ul>
            </li>
            <li className="filter__body__blocks">
              <h4 class="p-1">Seating Capacity</h4>
              <ul>
                <li class="filter__body__blocks__items">
                  {/* <MinusPlusInput inputValues= {{defaultValue:2, minValue:2, maxValue:20, incrementValue:1}} externalState =  {seats} externalSet = {setSeats} /> */}
                  <div className="minus-plus">
                    <div class="input-group">
                      <input
                        type="button"
                        value="-"
                        class="button-minus"
                        onClick={decrement}
                      />
                      <input
                        type="number"
                        step="1"
                        max=""
                        value={seats}
                        name="quantity"
                        class="quantity-field"
                        onChange={changeSeatsParams}
                      />
                      <input
                        type="button"
                        value="+"
                        class="button-plus"
                        onClick={increment}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            <div className="filter__body__blocks">
              <div className="filter__body__blocks__items">
                <label htmlFor="electric">Electric</label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="electric"
                  id="electric"
                  checked={electric}
                  onChange={changeElectric}
                />
              </div>
            </div>
          </ul>
        </aside>

        <CarsContainer style={{ width: "600px" }} />
      </div>
    </div>
  );
};

export default Cars;
