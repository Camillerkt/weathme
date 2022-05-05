// React imports
import { useContext, useEffect, useState } from "react";

// Contexts
import { AppContext } from "../../Contexts";

// Components
import NextDaysWeather from "./NextDaysWeather";
import HightlightCard from "./HightlightCard";

const Interface = () => {
  const app = useContext(AppContext);

  const [actualWeatherInformations, setActualWeatherInformations] = useState(
    {}
  );

  const convertUnitTo = (unit) => {
    // Create localstorage to store the unit
    localStorage.setItem("weathme-unit", unit);

    // Refresh the page to apply modifications
    window.location.reload(false);
  };

  useEffect(() => {
    app
      .getWeatherInformationsFromLocation("today")
      .then((locationInformation) => {
        setActualWeatherInformations({
          wind_speed: locationInformation.wind_speed,
          wind_deg: locationInformation.wind_deg,
          humidity: locationInformation.humidity,
          air_pressure: locationInformation.air_pressure,
        });
      });
  }, [app.actualLocation]);

  return (
    <div className="Interface">
      <div className="buttons">
        <button
          className={app.unitOfTemperature === "°C" ? "active" : "non-active"}
          onClick={() => convertUnitTo("°C")}
        >
          °C
        </button>
        <button
          className={app.unitOfTemperature === "°F" ? "active" : "non-active"}
          onClick={() => convertUnitTo("°F")}
        >
          °F
        </button>
      </div>

      <div className="weather">
        <NextDaysWeather />
      </div>

      <div className="hightlights">
        <h1>Today's Hightlights</h1>

        <div className="hightlightsCards">
          <HightlightCard
            type="Wind Status"
            value={actualWeatherInformations.wind_speed}
          />
          <HightlightCard
            type="Humidity"
            value={actualWeatherInformations.humidity}
          />
          <HightlightCard
            type="Wind Direction"
            value={actualWeatherInformations.wind_deg}
          />
          <HightlightCard
            type="Air Pressure"
            value={actualWeatherInformations.air_pressure}
          />
        </div>
      </div>

      <footer id="interfaceFooter">
        <p>
          A{" "}
          <a
            href="https://devchallenges.io/challenges/mM1UIenRhK808W8qmLWv"
            target="_blank"
            rel="noreferrer"
          >
            DevChallenge
          </a>{" "}
          made at &#127968; by{" "}
          <a href="https://camillerakoto.fr" target="_blank" rel="noreferrer">
            Camille Rakotoarisoa
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Interface;
