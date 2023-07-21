import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { Player } from '@lottiefiles/react-lottie-player'
import { ChangeEvent, useEffect, useState } from 'react'
import { Weather, OptionType } from '../typing'
import { getWeather } from '../apis/weatherDataApi'

const WeatherCastingTwo = (): JSX.Element => {
  const dataEmpty = {
    name: '',
    main: '',
    description: '',
    temp: 0,
    humidity: 0,
    speed: 0,
    cod: 0,
  } as Weather

  const [searchCity, setSearchCity] = useState<OptionType | null>(null)
  const [options, setOptions] = useState<[]>([])

  const [weatherObj, setWeatherObj] = useState<Weather>(dataEmpty)
  const [errorState, setErrorState] = useState(false)
  const [term, setTerm] = useState('')

  const getSearchOption = (value: string) => {
    //get the city list using geocoding
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=3&appid=${
        process.env.WEATHER_KEY
      }&lang=en`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setOptions(data)
      })
      .catch((err) => console.log('Err message:' + err))
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // trim for not trigger the api call when you enter space in your input
    const value = e.target.value.trim()
    setTerm(value)
    if (value === '') return
    getSearchOption(value)
  }

  const onOptionSelect = (option: OptionType) => {
    setSearchCity(option)
  }

  const handleClick = () => {
    const cityName = (searchCity?.name as string) || term
    return cityName === ''
      ? (setErrorState(true), showingPage())
      : getWeather(cityName)
          .then((obj) => {
            if (obj.cod === '404') {
              showingPage()
              setErrorState(true)
            } else {
              setErrorState(false)
              showingPage()
              setWeatherObj(obj as Weather)
            }
          })
          .catch((err) => {
            console.log('Err message: ' + err)
          })
  }

  useEffect(() => {
    if (searchCity) {
      setTerm(searchCity.name)
      setOptions([])
    }
  }, [searchCity])

  // to render pic weather according the API
  const weatherPic = () => {
    switch (weatherObj?.main) {
      case 'Clear':
        return './img/clear.png'

      case 'Rain':
        return './img/rain.png'

      case 'Snow':
        return './img/snow.png'

      case 'Clouds':
        return './img/cloud.png'

      case 'Haze':
        return './img/mist.png'

      default:
        return ''
    }
  }

  // Render ErrorState && WeatherShowing
  // Problem : After Showing Error and You type right City, it does not show the WeatherShowing Property *Fixed

  const showingPage = () => {
    const container = document.querySelector('.container')
    container.style.height = '550px'
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
              value={term}
              onChange={onInputChange}
              placeholder="Enter your city"
            />
            <button onClick={handleClick} className="fa-solid">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
        <ul>
          {options.map((option: OptionType, index: number) => (
            <li key={option.name + '-' + index}>
              <button onClick={() => onOptionSelect(option)}>
                {option.name},{option.country}
              </button>
            </li>
          ))}
        </ul>

        {errorState ? (
          <div className="not-found">
            <img src="./img/404.png" alt="404" />
            <h1>Sorry, Invalid Location</h1>
          </div>
        ) : (
          <>
            <div className="weather-box">
              <h1 className="title-2">{weatherObj?.name}</h1>
              <img src={weatherPic()} alt={weatherObj?.main} />
              <p className="temperature">
                {weatherObj?.temp} <span>&#8451;</span>
              </p>
              <p className="description">{weatherObj?.main}</p>
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
          </>
        )}
      </div>
    </>
  )
}

export default WeatherCastingTwo
