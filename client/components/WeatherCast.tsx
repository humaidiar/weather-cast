import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faWater,
  faWind,
} from '@fortawesome/free-solid-svg-icons'

import { Player } from '@lottiefiles/react-lottie-player'
import { ChangeEvent, useState } from 'react'
import { Weather } from '../typing'
import { getWeather } from '../apis/weatherDataApi'

function WeatherCasting() {
  const [searchCity, setSearchCity] = useState('')
  const [weatherObj, setWeatherObj] = useState<Weather | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value)
  }

  const handleClick = () => {
    return getWeather(searchCity)
      .then((obj) => {
        setWeatherObj(obj)
      })
      .catch((err) => {
        console.log('Err message: ' + err)
      })
  }

  return (
    <>
      <div className="container">
        <div className="search-box">
          <Player
            src="https://lottie.host/b4b1c0ab-43e9-45e1-b78e-7304d8baaa2b/rHqk1E7Wz1.json"
            loop
            autoplay
            speed={1}
            style={{ width: '50px' }}
          />
          <div className="container-info">
            <input
              type="text"
              value={searchCity}
              onChange={handleChange} 
              placeholder="Enter your location"
            />
            <button onClick={handleClick} className="fa-solid">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>

        <div>
          <h1 className="title-2">{weatherObj?.name}</h1>
        </div>

        <div className="not-found">
          <img src="./img/404.png" alt="404" />
          <p>Sorry, Invalid Location</p>
        </div>

        <div className="weather-box">
          <img src="" alt="" />
          <p className="temperature"></p>
          <p className="description"></p>
        </div>

        <div className="weather-details">
          <div className="humidity">
            <i className="fa-solid">
              <FontAwesomeIcon icon={faWater} />
            </i>
            <div className="text">
              <span></span>
              <p>Humidity</p>
            </div>

            <div className="wind">
              <i className="fa-solid">
                <FontAwesomeIcon icon={faWind} />
              </i>
              <div className="text">
                <span></span>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeatherCasting
