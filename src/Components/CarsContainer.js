import React from "react";

import CarCard from "./CarCard";
import "./CarsContainer.css";

const CarsContainer = ({ carsList }) => {
  console.log(carsList);
  if (carsList.length === 0) {
    return <div className="cars grid">No cars found</div>;
  }
  const cars = carsList.map((car) => {
    return <CarCard key={car.id} car={car} />;
  });
  return <div className="cars grid">{cars}</div>;
};

export default CarsContainer;
