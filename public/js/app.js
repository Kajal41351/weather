const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()   

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    const location = search.value
    const path = 'http://localhost:3000/weather?address='+location
    fetch(path).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log('Error: ',data.error)
                messageOne.textContent = data.error
            }else{
                //console.log('Location: ',data.Location)
                //console.log('Forecast: ',data.Forecast)

                messageOne.textContent=data.Location
                messageTwo.textContent=data.Forecast
            }
        })
    })
    
})