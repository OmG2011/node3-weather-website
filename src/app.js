const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { rmSync } = require('fs')
const { query } = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express conifig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)  =>  {
  res.render('index', {
    title: 'Weather App',
    name: 'Om Goyal',
  })
})

app.get('/about', (req, res)  =>  {
  res.render('about', {
    title: 'About Me',
    name: 'Om Goyal'
  })
})

app.get('/help', (req, res) =>  {
  res.render('help', {
    title: 'Help Page',
    body: 'If you want help, God will help you.',
    name: 'Om Goyal'
  })
})

// app.get('/help', (req, res) =>  {
//   res.send({
//     name: 'Andrew',
//     age: 27
//   })
// })

// app.get('/about', (req, res)  =>  {
//   res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res)  =>  {
  if (!req.query.address){
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location, region, country } = {}) => {
    if(error) {
      return res.send(error)
    }  

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send(error)
      }
      // console.log('Location: ' + location)
      // console.log('Weather Conditions: ' + forecastData)
      res.send({        
        forecast:forecastData,
        location: location, region, country
      })
    })
  })  
})

app.get('/products', (req, res) =>  {
  if (!req.query.search) {
    return fres.send({
      error: 'You must provide a search term!'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) =>  {
  res.render('404', {
    title: 'Help Page not found!',
    body: 'The help page that you\'re looking for needs help itself.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error Code: 404.',
    body: 'The page that you\'re searching for is currently missing. If you find it do let us know.'
  })
})

app.listen(port, () =>  {
  console.log('The server is up and running on port ' + port)
})