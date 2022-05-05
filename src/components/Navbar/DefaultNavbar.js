// React imports
import { useState, useEffect, useContext } from "react";

// Contexts
import { AppContext } from "../../Contexts";

// Assets
const importAllImagesFromADirectory = (r) => {
  let images = {};
  r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
  return images;
};

const images = importAllImagesFromADirectory(
  require.context("../../assets/images/", false, /\.(png|jpe?g|svg)$/)
);

const DefaultNavbar = ({ setNavbarStatus }) => {
  const app = useContext(AppContext);

  const date = new Date().toLocaleDateString("en-gb", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const [actualWeatherInformations, setActualWeatherInformations] = useState(
    {}
  );

  const getTheGeoLocationOfUser = () => {
    app.geoLocationOfUser().then((cityName) => {
      app.setActualLocation(cityName);
    });
  };

  const changeNavbarStatus = () => {
    setNavbarStatus("search");
  };

  useEffect(() => {
    app
      .getWeatherInformationsFromLocation("today")
      .then((locationInformation) => {
        setActualWeatherInformations({
          temperature: locationInformation.temperature,
          description: locationInformation.description,
        });
      });
  }, []);

  return (
    <div className="DefaultNavbar">
      <div className="buttons">
        <button onClick={changeNavbarStatus}>Search for places</button>
        <button id="locationBtn" onClick={getTheGeoLocationOfUser}>
          <span className="material-icons md-18 icon">my_location</span>
        </button>
      </div>

      <div className="centered">
        <img
          src={images[`${actualWeatherInformations.description}.png`]}
          alt={actualWeatherInformations.description}
        />

        <h1>
          {actualWeatherInformations.temperature}{" "}
          <span>{app.unitOfTemperature}</span>
        </h1>

        <h2>{actualWeatherInformations.description}</h2>

        <footer>
          <p>
            Today <span>•</span> {date}
          </p>

          <h3>
            <span className="material-icons md-18 icon">pin_drop</span>{" "}
            {app.actualLocation}
          </h3>
        </footer>
      </div>
    </div>
  );
};

export default DefaultNavbar;
