import React from "react";
import { Button } from "react-bootstrap";
const Product = ({ data }) => {
  return (
    <div className="row">
      {data.map((meal) => (
        <div className="col-md-4 mb-48" key={meal.idMeal}>
          <div className="Food-box">
            <div className="Image-box mb-4">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="img-fluid"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <p className="my-para text-center mb-4">{meal.strMeal}</p>
            <div className="text-center">
              <button className="btn btn-dark F-500">See more</button>
            </div>
          </div>
          <div className="Process">
            <div className="col-md-8">
              <h2>{meal.strMeal}</h2>
              <p>
                <strong>Category:</strong> {meal.strCategory}
              </p>
              <p>
                <strong>Area:</strong> {meal.strArea}
              </p>
              <h4>Instructions:</h4>
              <p>{meal.strInstructions}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
