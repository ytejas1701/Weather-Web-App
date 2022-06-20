const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message = document.querySelector('#message');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    message.textContent = 'Loading...'
    fetch('/weather?location='+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return message.textContent = data.error;
            }
            message.textContent = data.label+'\r\n'+ "Observation Time: " + data.observation_time + '\r\n' + data.weather_descriptions+'. Current temperature is '+data.temperature+'°C. It feels like '+data.feelslike+'°C.'
        })
    })
    })