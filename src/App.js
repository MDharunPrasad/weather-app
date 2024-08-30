import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=500901888f3c4c89e51e6cc2ee60d6ba`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          alert("Location not found. Please enter a valid city name.");
          console.error("Error fetching weather data:", error);
        });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          type="text"
          placeholder="Enter the city name"
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
        
                {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
              </p>
              <p>Feels Like</p>
            </div>

            <div className="humidity">
              <p className="bold">
                {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
              </p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind ? <p>{data.wind.speed.toFixed()}MPH</p> : null}
              </p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;