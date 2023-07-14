import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { Player } from '@lottiefiles/react-lottie-player'
import { ChangeEvent, useState } from 'react'
import { Weather } from '../typing'
import { getWeather } from '../apis/weatherDataApi'

function WeatherCasting() {
  const dataEmpty = {
    name: '',
    main: '',
    description: '',
    temp: 0,
    humidity: 0,
    speed: 0,
    cod: 0,
  } as Weather

  const [searchCity, setSearchCity] = useState('')
  const [weatherObj, setWeatherObj] = useState<Weather>(dataEmpty)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value)
  }
  const handleClick = () => {
    return searchCity === ''
      ? setErrorState()
      : getWeather(searchCity)
          .then((obj) => {
            if (obj.cod === '404') {
              setErrorState()
            } else {
              setWeatherObj(obj as Weather)
            }
          })
          .catch((err) => {
            console.log('Err message: ' + err)
          })
  }

  function setErrorState() {
    const container = document.querySelector('.container')
    const weatherBox = document.querySelector('.weather-box')
    const weatherDetails = document.querySelector('.weather-details')
    const error404 = document.querySelector('.not-found')
    const containerInfo = document.querySelector('.container-info')

    container.style.height = '400px'
    weatherBox.style.display = 'none'
    weatherDetails.style.display = 'none'
    error404.style.display = 'block'
    error404.classList.add('fadeIn')
    containerInfo.classList.remove('active')
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

        <div className="not-found">
          <img src="./img/404.png" alt="404" />
          <p>Sorry, Invalid Location</p>
        </div>

        <div className="weather-box">
          <h1 className="title-2">{weatherObj?.name}</h1>
          <img src="./img/clear.png" alt="" />
          <p className="temperature">
            {weatherObj?.temp} <span>&#8451;</span>
          </p>
          <p className="description">{weatherObj?.description}</p>
        </div>

        <div className="weather-details">
          <div className="humidity">
            <span>{weatherObj?.humidity}%</span>
            <p>Humidity</p>
          </div>

          <div className="wind">
            <span>{weatherObj?.speed} km/h</span>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeatherCasting
