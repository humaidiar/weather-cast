import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function WeatherCasting() {
  return (
    <>
      <div className="container">
        <div className="search-box">
          <div className="container-info">
            <input type="text" placeholder="Enter your location" />
            <button className="fa-solid">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <h1 className="title">Weather Cast</h1>
        </div>
      </div>
    </>
  )
}

export default WeatherCasting
