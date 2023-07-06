import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faWater,
  faWind,
} from '@fortawesome/free-solid-svg-icons'

import { Player } from '@lottiefiles/react-lottie-player'

function WeatherCasting() {
  return (
    <>
      <div className="container">
        <div className="search-box">
          <div className="container-info">
            <Player
              src="https://lottie.host/b4b1c0ab-43e9-45e1-b78e-7304d8baaa2b/rHqk1E7Wz1.json"
              loop
              autoplay
              speed={1}
              style={{ width: '50px' }}
            />
            <input type="text" placeholder="Enter your location" />
            <button className="fa-solid">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <h1 className="title">Weather Cast</h1>
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
