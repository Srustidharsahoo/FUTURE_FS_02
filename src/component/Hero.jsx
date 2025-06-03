import '../css/Hero.css'
import { FaWind } from "react-icons/fa";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { MdWaves } from "react-icons/md";
import { BsWater } from "react-icons/bs";
import { BiWater } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import '../css/Navbar.css'


const Hero = () => {


  const [data, setData] = useState("");
  const [city, setCity] = useState('London'); // default city
  const [inputCity, setInputCity] = useState('');

  // Function to fetch weather
  const fetchWeather = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ef55d86ac5c6d461b60df5530d0bda4c&units=metric`
      );
      console.log(res.data);
      
      setData(res.data);
    } catch (error) {
      alert("⚠️ Please enter a valid city name");
      console.error("Error fetching weather data:", error);

    }
  };

  // Load default city on first render
  useEffect(() => {
    fetchWeather(city);
  }, []);


  //search function
  const handleSearch = () => {
    if (inputCity.trim() !== '') {
      fetchWeather(inputCity);
      setInputCity('');
    }
  };
  
  return (
    
    data && data.main && (
      <>


      <div className="navbar-section">

            <div className="nav-iteams">
                <Link to="/" className="nav-link">Today</Link>
                <Link to="/about" className="nav-link">24 Hr.</Link>
                <Link to="/" className="nav-link">10 Days</Link>
            </div>

            <div className="search-section">
                <input type="text" 
                placeholder="Enter the City Name"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                />

                <div className="search-btn" onClick={handleSearch}><IoSearch /></div>
            </div>

        </div>

      

      {/* hero section */}

      <div className="hero-section">

        <div className="hero-head">

          <div className="information-box">

            <div className="information-head">

              <div className="temp">{Math.round(data.main.temp)}°C</div>
              <div className="condition">{data.weather[0].description}</div>
              <div className="icon">
                <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
              />
              </div>

            </div>

            <div className="information-footer">
              <div className="div"><span>Feels Like</span> : {Math.round(data.main.feels_like)} °C</div>
              <div className="div"><span>Today's High</span> : {Math.round(data.main.temp_max)} °C</div>
              <div className="div"><span>Today's Low</span> : {Math.round(data.main.temp_min)} °C</div>
              <div className="div"><span>Grnd Level</span> : {Math.round(data.main.grnd_level)} ft</div>
              <div className="div"><span>Sea Level</span> : {Math.round(data.main.sea_level)} m</div>
              <div className="div"><span>Time Zone</span> : {data.timezone} sec</div>
            </div>
          </div>

          <div className="city-box">
            <div className="image-box">
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
              />
            </div>
            <div className="city-desc">{data.weather[0].main}</div>
            <div className="city-name">{data.name}</div>
          </div>

        </div>








        <div className="hero-footer">

          <div className="div1">
            <div className="div1-icon"><FaWind /></div>
            <div className="div1-name">Wind Speed</div>
            <div className="div1-temp">{data.wind.speed} Km/h</div>
            <div className="div1-condition">Cold relative to Wind</div>
          </div>

          <div className="div1">
            <div className="div1-icon"><MdWaves /></div>
            <div className="div1-name">Humidity</div>
            <div className="div1-temp">{data.main.humidity} g/kg</div>
            <div className="div1-condition">Heat relative to Humidity</div>
          </div>

          <div className="div1">
            <div className="div1-icon"><BiWater /></div>
            <div className="div1-name">Pressure</div>
            <div className="div1-temp">{data.main.pressure} N/m²</div>
            <div className="div1-condition">Cold relative to Wind</div>
          </div>

          <div className="div1">
            <div className="div1-icon"><BsWater /></div>
            <div className="div1-name">Visibility</div>
            <div className="div1-temp">{data.visibility} Km</div>
            <div className="div1-condition">Visibility relative to Wind</div>
          </div>
          

        </div>



      </div>

      <div className="footer-section">
        <p>© 2025 Copyright: weatherapp.com created by <span>srusti</span>💚</p>
      </div>

    </>
    )
  )
}

export default Hero
