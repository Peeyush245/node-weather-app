const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Peeyush'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me' ,
        name: 'Peeyush'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is help text',
        title: 'Help',
        name: 'Peeyush'
    })
})
// app.get('', (req, res) => {
//    res.send('<h1>Weather</h1')
// })

// app.get('/help', (req,res) => {
//     res.send([
//         {
//             name : 'Peeyush'
//         },
//         {
//             name: 'Pandey'
//         }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('about')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
       
        forecast(latitude, longitude, (error, temperature, humidity) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                location: location,
                temperature: temperature,
                address: req.query.address,
                humidity: humidity
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Peeyush',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Peeyush Pandey',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up at port '+port)
})