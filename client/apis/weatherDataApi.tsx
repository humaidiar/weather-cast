import request from 'superagent'
import { Weather } from '../typing'

export function getWeather(city: string) {
  return request
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_KEY}`
    )
    .then((res) => {
      const WeatherData: Weather = {
        name: res.body.name,
        main: res.body.weather[0].main,
        description: res.body.weather[0].description,
        humidity: res.body.main.humidity,
        speed: res.body.wind.speed,
        temp: res.body.main.temp,
        cod: res.body.cod,
      }
      return WeatherData
    })
    .catch((err) => console.log('Err message:' + err))
}
