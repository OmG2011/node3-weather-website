const baseModule = require('hbs')
const request = require('request')

const geocode = (address, callback)  =>  {
  const url = 'http://api.positionstack.com/v1/forward?access_key=276962bf77b6437724246618e69eda63&query=' + encodeURIComponent(address) + '&limit=1'

  request({ url, json: true }, (error, { body })  =>  {
    if(error) {
      callback({error: 'Unable to connect with the location services!'}, undefined)
    } else if(JSON.stringify(body.data) === "[]")  {      
      callback({error: 'Unable to find the location. Try another search!'}, undefined)
    } else if(body.error){
      callback({error: 'Unable to find the location. Try another search!'}, undefined)
    } else  {
      callback(undefined, {        
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].name,
        region: body.data[0].region,
        country: body.data[0].country
      })
    }
  })
}

module.exports = geocode