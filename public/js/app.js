// console.log('Client side javascript file is loaded!')

// fetch('https://puzzle.mead.io/puzzle').then((response) =>  {
//   response.json().then((data) => {
//     console.log(data)
//   })
// })

const weatherForm = document.querySelector('form')
const typedLoc = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) =>  {
  event.preventDefault()
  
  const location = typedLoc.value

  console.log(location)

  messageOne.textContent = 'Location: ' + location
  messageTwo.textContent = 'Forecast: Loading...'

  fetch('/weather?address=' + location).then((response) => {  
  response.json().then((data) =>  {
    if(data.error){
      return(
        messageOne.textContent = 'Error: ' + data.error,
        messageTwo.textContent = ''
      )
    }    
    messageTwo.textContent = 'Forecast: ' + data.forecast
    // console.log(data.location)
    // console.log(data.forecast)
  })
})
})