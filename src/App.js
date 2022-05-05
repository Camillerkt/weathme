// React imports
import { useState, useEffect } from "react";
import axios from "axios";

// Contexts
import { AppContext } from "./Contexts";

// Pages
import Interface from "./components/Interface/Interface";

// Components
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  // Default geocoords in Paris but will be overwritten by the user's geolocation
  const [geoLocationCoordsLatitude, setGeoLocationCoordsLatitude] =
    useState("48.856614");
  const [geoLocationCoordsLongitude, setGeoLocationCoordsLongitude] =
    useState("2.3522219");

  const [actualLocation, setActualLocation] = useState(null);

  const apiKey = "b190a0605344cc4f3af08d0dd473dd25";

  const kelvinToCelsius = (kelvin) => kelvin - 273.15;
  const kelvinToFarenheit = (kelvin) => (kelvin - 273.15) * 1.8 + 32;

  let unitOfTemperature = "°C";

  if ("weathme-unit" in localStorage) {
    unitOfTemperature = localStorage.getItem("weathme-unit");
  } else {
    unitOfTemperature = "°C";
  }

  const unixTimeToDate = (unixTime) =>
    new Date(unixTime * 1000).toLocaleDateString("en-gb", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const geoLocationOfUser = async () => {
    const getHisCoords = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeoLocationCoordsLatitude(position.coords.latitude);
          setGeoLocationCoordsLongitude(position.coords.longitude);
        });
      } else {
        return "geodisabled";
      }
    };
    const coordsStatus = await getHisCoords();

    const getHisCityNameWithHisCoords = async () => {
      const getCityName = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${geoLocationCoordsLatitude}&lon=${geoLocationCoordsLongitude}&appid=${apiKey}`
      );
      const cityName = getCityName.data[0].name;
      return cityName;
    };

    if (coordsStatus !== "geodisabled") {
      return getHisCityNameWithHisCoords().then((cityName) => cityName);
    } else {
      alert(
        "Désolé mais l'application a besoin d'avoir la permission de vous localiser pour trouver la météo correspondant à votre ville. Nous vous plaçons donc par défaut sur Paris. Actualisez la page pour réautoriser l'accès à votre position."
      );
      return "Paris";
    }
  };

  const getWeatherInformationsFromLocation = async (date) => {
    const getLocation = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${actualLocation}&appid=${apiKey}`
    );
    const locationCoords = {
      lat: getLocation.data[0].lat,
      lon: getLocation.data[0].lon,
    };

    const getLocationTodayInformations = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${locationCoords.lat}&lon=${locationCoords.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`
    );
    const locationTodayInformations = getLocationTodayInformations.data;

    if (date === "today") {
      return {
        temperature:
          unitOfTemperature === "°C"
            ? Math.round(
                kelvinToCelsius(
                  locationTodayInformations.daily[0].feels_like.day
                )
              )
            : Math.round(
                kelvinToFarenheit(
                  locationTodayInformations.daily[0].feels_like.day
                )
              ),
        description: locationTodayInformations.daily[0].weather[0].main,
        wind_speed: Math.round(locationTodayInformations.daily[0].wind_speed),
        wind_deg: Math.round(locationTodayInformations.daily[0].wind_deg),
        humidity: Math.round(locationTodayInformations.daily[0].humidity),
        air_pressure: Math.round(locationTodayInformations.daily[0].pressure),
      };
    } else if (date === "five_days") {
      let informationsInFiveDays = [];

      locationTodayInformations.daily.map((information) => {
        informationsInFiveDays.push({
          temperatureMax:
            unitOfTemperature === "°C"
              ? Math.round(kelvinToCelsius(information.temp.max))
              : Math.round(kelvinToFarenheit(information.temp.max)),
          temperatureMin:
            unitOfTemperature === "°C"
              ? Math.round(kelvinToCelsius(information.temp.min))
              : Math.round(kelvinToFarenheit(information.temp.min)),
          description: information.weather[0].main,
          date: unixTimeToDate(information.dt),
        });
      });

      // Remove the elements which are not useful (keep only 5 days)
      const removeValFrom = [0, 6, 7];
      informationsInFiveDays = informationsInFiveDays.filter(
        (value, index) => removeValFrom.indexOf(index) === -1
      );

      // Change date of the first day to "tomorrow" :
      informationsInFiveDays[0].date = "Tomorrow";

      return informationsInFiveDays;
    }
  };

  useEffect(() => {
    geoLocationOfUser().then((cityName) => {
      setActualLocation(cityName);
    });
  }, [geoLocationCoordsLatitude, geoLocationCoordsLongitude]);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          actualLocation,
          setActualLocation,
          getWeatherInformationsFromLocation,
          geoLocationOfUser,
          unitOfTemperature,
          apiKey,
        }}
      >
        <div className="left">
          <Navbar />
        </div>
        <div className="right">
          <Interface />
        </div>
      </AppContext.Provider>
    </div>
  );
};

export default App;
