const request = require('request')

const forecast = (latitude, longitude, callback) =>  {
  const url = 'http://api.weatherstack.com/current?access_key=970e4df81567dd305e8c64851511c3e8&query= ' + latitude + ',' + longitude
  
  request({ url, json: true }, (error, { body })  =>  {
    if (error) {
        callback('Unable to connect to the weather service.', undefined)
    } else if (body.error){
        callback('Unable to find the location!', undefined)
      } else{
          callback(undefined, "The weather today is " + body.current.weather_descriptions[0] +  ". It is currently " + body.current.temperature + " degrees celsius out. It feels like " + body.current.feelslike + " degrees celsius out.")
        }
  })
}

module.exports = forecast