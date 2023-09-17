import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <p>{data.name}</p>
          {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          <div>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        <div className="middle">
          {data.sys ? (
            <div>
              <p>Country</p>
              <h1>{data.sys.country}</h1>{" "}
            </div>
          ) : null}
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels Like</p>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
