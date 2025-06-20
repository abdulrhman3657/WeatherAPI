import axios from "axios"
import Weather from "../models/weather.model.js"
import History from "../models/history.model.js"
import User from "../models/user.model.js"

export const getWeather = async (req, res) => {
    try {

        const user = req.user

        console.log(user.email)

        // console.log(req.user._id) // new ObjectId('685566541729148e410583bc')
        // console.log(req.user.id) // 685566541729148e410583bc

        const { lat, lon } = req.query

        const API_KEY = "63da34eb511e418be469e9f5a30012f3"

        const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

        const weather = await axios.get(API)

        const weatherAPI = weather.data

        const openWeather = {
            "source": "openweather",
            "coordinates": { "lat":weatherAPI.coord.lat, "lon":weatherAPI.coord.lon },
            "tempC": weatherAPI.main.temp,
            "humidity": weatherAPI.main.humidity,
            "description": weatherAPI.weather[0].description,
            "fetchedAt": new Date()
        }

        const cachedWeather = {
            "source": "cache",
            "coordinates": { "lat":weatherAPI.coord.lat, "lon":weatherAPI.coord.lon },
            "tempC": weatherAPI.main.temp,
            "humidity": weatherAPI.main.humidity,
            "description": weatherAPI.weather[0].description,
            "fetchedAt": new Date()
        }

        // check if the weather is aleardy stored
        const checWeather = await Weather.findOne({ lat:lat, lon:lon });

        if (checWeather) {

            const history = new History({
                user: user,
                weather: checWeather._id
            })
            await history.save();

            // elapsed time in minutes
            const elapsedTime = ( new Date() - checWeather.fetchedAt ) / (1000 * 60)

            // if the cached weather date is more than 30 minutes (old)
            if(elapsedTime >= 30){
                // update the cached weather
                await Weather.findByIdAndUpdate(checWeather._id, cachedWeather, { new: true });
                // return the api weather
                res.status(200).json(openWeather)
                return
            } else {
                // return the cached weather
                res.status(200).json(checWeather.data);
                return
            }
        }
        
        const storeWeather = new Weather(cachedWeather)
        await storeWeather.save();

        const history = new History({
            user: user,
            weather: storeWeather._id
        })
        await history.save();

        // return the api weather
        res.status(200).json(openWeather)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}