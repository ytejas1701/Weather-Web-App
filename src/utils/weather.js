import request from 'request';

const weather = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=0e3ea13ebed919d3467666e0a67aa2ce&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m';
    request({url, json: true}, (error, { body } = {})=>{
        if(error){
            callback(error.code, undefined);
        }else if(body.error){
            callback(body.error.code+': '+body.error.info, undefined);
        }else{
            callback(undefined, body.current);
        }
    })
}

export {
    weather
}