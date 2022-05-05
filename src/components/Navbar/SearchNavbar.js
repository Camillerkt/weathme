// React imports
import { useState, useContext } from "react";
import axios from "axios";

// Contexts
import { AppContext } from "../../Contexts";

const SearchNavbar = ({ setNavbarStatus }) => {
  const app = useContext(AppContext);

  const [searchValue, setValueSearch] = useState("");
  const [
    allRetrievedCitiesFromTheSearchValue,
    setAllRetrievedCitiesFromTheSearchValue,
  ] = useState([]);

  const getAllCitiesWithCertainName = async (cityName) => {
    const getCities = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=5&appid=${app.apiKey}`
    );
    const cities = getCities.data.map((city) => city.name);

    // Remove duplicates from the cities array
    const uniqueCities = [...new Set(cities)];

    return uniqueCities;
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    getAllCitiesWithCertainName(searchValue).then((cities) =>
      setAllRetrievedCitiesFromTheSearchValue(cities)
    );
  };

  const changeNavbarStatus = () => {
    setNavbarStatus("default");
  };

  const changeActualCityLocation = (cityName) => {
    app.setActualLocation(cityName);
  };

  return (
    <div className="SearchNavbar">
      <header>
        <span
          className="material-icons md-16 icon"
          onClick={changeNavbarStatus}
        >
          close
        </span>
      </header>

      <form onSubmit={handleSubmitSearch}>
        <label>
          <span className="material-icons md-16 icon">search</span>
        </label>
        <input
          type="text"
          placeholder="Search location"
          onChange={(e) => setValueSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="displayedCities">
        {allRetrievedCitiesFromTheSearchValue.map((city) => (
          <div className="city" onClick={() => changeActualCityLocation(city)}>
            <p>{city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchNavbar;
