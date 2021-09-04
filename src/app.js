const path = require('path')
const express= require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app=express()
const port = process.env.PORT ||3000

//Define Path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//To setup route, use app.get('route/url',function)
app.get('',(req,res)=>{
    res.render('index',{
       title:'Weather App',
       name: 'Kajal Gupta'
    })
})

/*app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Kajal Gupta'
    })
})*/

/*No longer needed as seperate static file for html created in /src/public folder, later when replaced with hbs files(for dynamic content), routes will be needed.
app.get('/help',(req,res)=>{
    res.send([{Name:'Kajal'},{Age:23}])
})

app.get('/about',(req,res)=>{
    res.send('<h1>About page</h1>')
})
*/

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }

    geocode(req.query.address,(error,{Lattitude,Longitude,Location}={})=>{
        if(error){
               return res.send({error})
            }
        forecast(Lattitude,Longitude,(error,forecastData)=>{
            if(error){
               return res.send({error})
            }
        res.send({
            Address: req.query.address,
            Location,
            Forecast: forecastData
        })
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
    title:404,
    name :'Kajal Gupta',
    errorMessage : 'Page not found'
    })
})

//To start a server, use app.listen(port,function that shows server is up and running)
app.listen(port,()=>{
    console.log('Server started up successfully on port '+ port)
})