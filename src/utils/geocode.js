import request from 'request';

const geocode = (address, callback)=>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=2a71bf653574aa917eb97fec18fd54ca&query='+encodeURIComponent(address);
    request({url, json: true}, (error, { body } = {})=>{
        if(error){
            callback(error.code, undefined);
        }else if(body.error){
            callback(body.error.code+': '+body.error.context.query.message, undefined);
        }else if(body.data.length === 0){
            callback('Invalid location', undefined);
        } else{
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                label: body.data[0].label
            });
        }
    })
}

export { geocode };