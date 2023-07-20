export interface Weather {
  id?: number
  name: string
  main: string
  description: string
  temp: number
  humidity: number
  speed: number
  cod: number
}

export interface OptionType {
  name: string
  lat: number
  lon: number
  country: string
}
