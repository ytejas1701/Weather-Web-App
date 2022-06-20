import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import express from 'express';

import { geocode } from './utils/geocode.js';
import { weather } from './utils/weather.js';


const app = express()
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.static(publicPath)); 

app.set('view engine', 'hbs');
app.set('views', path.join(viewsPath));
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
    });
})

app.get('/weather', ({ query }, res) => {
    if(!query.location){
        return res.send({ error: 'Please enter a location' })
    }
    geocode(query.location, (error, { latitude, longitude, label } = {})=>{
        if(error) {
            return res.send({ error }); 
        }
        weather(latitude, longitude, (error, { temperature, feelslike, weather_descriptions, observation_time } = {})=>{
            if(error) {
                return res.send({ error }); 
            }
            res.send({
                temperature,
                feelslike,
                weather_descriptions,
                label,
                observation_time
            })
        })
    })
})

app.get('*', ((req, res) => {
    res.render('error', {
        title: 404 ,
        message: 'Page not Found :\\'
    })
}))

app.listen(port, () => {
    console.log('server started on port '+ port)
})