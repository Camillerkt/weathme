// React imports
import { useContext } from "react";

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

const WeatherCard = ({ weatherInformations }) => {
  const app = useContext(AppContext);

  return (
    <div className="WeatherCard">
      <h2>{weatherInformations.date}</h2>
      <img src={images[`${weatherInformations.description}.png`]} />
      <footer>
        <p>
          {weatherInformations.temperatureMax}
          {app.unitOfTemperature}{" "}
          <span id="min_temp">
            {weatherInformations.temperatureMin}
            {app.unitOfTemperature}
          </span>
        </p>
      </footer>
    </div>
  );
};

export default WeatherCard;
