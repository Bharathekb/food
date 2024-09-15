import React, { useState, useEffect } from "react";
import Product from "./Product";
import Dropdownbox from "./Dropdownbox";
import Process from "./Process";

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null); // State to track selected meal

  const fetchData = () => {
    let url = "";
    if (selectedOption) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedOption}`;
    } else if (search.trim() !== "") {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    }

    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data.meals || []);
          setIsSubmitted(true);
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  };

  const fetchMealDetails = (idMeal) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedMeal(data.meals[0]);
      })
      .catch((err) => console.error("Error fetching meal details:", err));
  };

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((response) => response.json())
      .then((data) => {
        const fetchedOptions = data.meals.map((category) => ({
          value: category.strCategory.toLowerCase(),
          label: category.strCategory,
        }));
        setOptions(fetchedOptions);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const handleSelect = (value) => {
    setSelectedOption(value);
    setSearch("");
    setIsSubmitted(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSelectedOption("");
    fetchData();
  };

  const handleSeeMoreClick = (meal) => {
    fetchMealDetails(meal.idMeal); // Fetch detailed meal information
  };

  const handleBackClick = () => {
    setSelectedMeal(null); // Clear selected meal
  };

  return (
    <div className="Main pt-4">
      <div className="container-fluid">
        <div className="d-flex gap-5">
          <div className="Left fixed-left">
            <div className="Form-box">
              <form onSubmit={submitHandler} className="mb-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Search for a meal..."
                />
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary"
                />
              </form>
              <Dropdownbox options={options} onSelect={handleSelect} />
            </div>
          </div>
          <div className="Right">
            <div className="Food-container">
              {selectedMeal ? (
                <Process meal={selectedMeal} onBack={handleBackClick} />
              ) : data.length > 0 ? (
                <Product data={data} onSeeMoreClick={handleSeeMoreClick} />
              ) : (
                isSubmitted && <p>Your item "{search}" not found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
