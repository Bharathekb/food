import React from "react";
import { Button } from "react-bootstrap";

const Product = ({ data, onSeeMoreClick }) => {
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
              <Button
                className="btn btn-dark F-500"
                onClick={() => onSeeMoreClick(meal)}
              >
                See more
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
