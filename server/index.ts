import server from './server'
import path from 'path'
import dotenv from 'dotenv'

const envPath = path.join(__dirname, '../client/.env')
dotenv.config({ path: envPath })

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', PORT)
  //checking the .env file
  // console.log(process.env.WEATHER_KEY)
  // console.log(envPath)
})
