import WeatherCastingTwo from './Forecast'
// import WeatherCasting from './WeatherCast'

function App() {
  return (
    <>
      <header className="header">
        <h1 style={{ color: 'white' }}>Weather App</h1>
      </header>
      <section className="main">
        {/* <WeatherCasting /> */}
        <WeatherCastingTwo />
      </section>
    </>
  )
}

export default App
