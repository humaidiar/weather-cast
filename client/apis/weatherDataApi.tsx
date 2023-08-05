import request from 'superagent'
import { Weather } from '../typing'

export function getWeather(city: string) {
  return request
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&lang=en&units=metric`
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

export function getGeoApi(value: string) {
  return request
    .get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=3&appid=${
        process.env.WEATHER_KEY
      }&lang=en`
    )
    .then((res) => res.body)
}
