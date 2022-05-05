const HightlightCard = ({ type, value }) => {
  if (type === "Wind Status") {
    return (
      <div className="HightlightCard">
        <h5>{type}</h5>
        <h1>
          {value} <span className="unit">mph</span>
        </h1>
      </div>
    );
  } else if (type === "Humidity") {
    return (
      <div className="HightlightCard">
        <h5>{type}</h5>
        <h1>
          {value} <span className="unit">%</span>
        </h1>
        <div className="progressBar">
          <progress id="file" max="100" value="70">
            {" "}
            {value} %
          </progress>
          <label>%</label>
        </div>
      </div>
    );
  } else if (type === "Wind Direction") {
    return (
      <div className="HightlightCard">
        <h5>{type}</h5>
        <h1>
          {value} <span className="unit">deg</span>{" "}
        </h1>
        <p id="wind_direction">
          <span
            className="material-icons md-24 icon"
            style={{ transform: `rotate(${value}deg)` }}
          >
            arrow_circle_up
          </span>
        </p>
      </div>
    );
  } else if (type === "Air Pressure") {
    return (
      <div className="HightlightCard">
        <h5>{type}</h5>
        <h1>
          {value} <span className="unit">mb</span>
        </h1>
      </div>
    );
  } else {
    return null;
  }
};

export default HightlightCard;
