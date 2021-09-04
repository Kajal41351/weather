const request = require('request')

const forecast = (longitude,lattitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=b771e64f215c09a42558680f2df2ac05&query=' + longitude +',' + lattitude + '&units=m'
    request({url,json:true},(error,{body})=>{
       if(error){
          callback('Unable to access Weather services!',undefined)
       }else if(body.error){
          callback('Unable to find location!',undefined)
       }else{
          callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
       }
    })
  }

  module.exports=forecast