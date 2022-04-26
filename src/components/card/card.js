import React from "react";
import Moment from "react-moment";
import "./card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faRefresh } from "@fortawesome/free-solid-svg-icons";

export default function card(props) {
  const data = props.info;

  return (
    <>
      {(props.browserdetected && (
        <span className="browserdetected">
          <FontAwesomeIcon icon={faLocationArrow} />
          Current Location
        </span>
      )) ||
        ""}
      <div className="card">
        <div className="card-header">
          <h1>{data.name}</h1>
          <button onClick={props.refreshpage}>
            {" "}
            <FontAwesomeIcon icon={faRefresh} />
          </button>
        </div>
        <ul className="card-body">
          <li>
            <h2>
              <Moment format="dddd, MMMM DD, YYYY" unix>
                {data.dt}
              </Moment>
            </h2>
            <h3>{data && data.weather && data.weather[0].description}</h3>
          </li>
          <li>
            <p>Temperature: {data && data.main && data.main.temp}°C</p>
            <p>Humidity: {data && data.main && data.main.humidity}%</p>
          </li>
          <li>
            <p>
              sunrises:{" "}
              {data && data.sys && (
                <Moment format="HH:mm:ss" unix>
                  {data.sys.sunrise}
                </Moment>
              )}
              AM{" "}
            </p>
            <p>
              sunset:{" "}
              {data && data.sys && (
                <Moment format="HH:mm:ss" unix>
                  {data.sys.sunset}
                </Moment>
              )}
              PM
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
