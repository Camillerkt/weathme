// React imports
import { useState, useContext, useEffect } from "react";

// Contexts
import { AppContext } from "../../Contexts";

// Components
import WeatherCard from "./WeatherCard";

const NextDaysWeather = () => {
  const app = useContext(AppContext);

  const [fiveDaysWeatherInformations, setFiveDaysWeatherInformations] =
    useState([]);

  useEffect(() => {
    app
      .getWeatherInformationsFromLocation("five_days")
      .then((informations) => setFiveDaysWeatherInformations(informations));
  }, [app.actualLocation]);

  return (
    <div className="NextDaysWeather">
      {fiveDaysWeatherInformations.map((dayWeather) => (
        <WeatherCard weatherInformations={dayWeather} key={dayWeather.date} />
      ))}
    </div>
  );
};

export default NextDaysWeather;
