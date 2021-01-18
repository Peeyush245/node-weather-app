const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

// messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.temperature
                messageThree.textContent = data.humidity
                // console.log(data.location)
                // console.log(data.temperature)
                // console.log(data.address)
            }
        })
    })
})
