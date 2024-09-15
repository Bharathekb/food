import React from "react";

const Process = ({ meal, onBack }) => {
  if (!meal) {
    return <p>No meal data available</p>;
  }

  return (
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
        <button className="btn btn-secondary" onClick={onBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Process;
