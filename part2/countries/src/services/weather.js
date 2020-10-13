import axios from 'axios'

const getWeather = (city) => {
    const apiKey = process.env.REACT_APP_API_KEY
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default { getWeather }

