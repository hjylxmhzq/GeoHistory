let request = require('request');

let baiduAK = 'r8hqpHiu8z8O7Cgo9mGveNLuNEqKZOpM';


function getBaiduRoute(origin, destination) {
    let baidurouteurl = `http://api.map.baidu.com/direction/v2/driving?origin=${origin}&destination=${destination}&ak=${baiduAK}`
    return new Promise((resolve, reject) => {
        request(baidurouteurl, {
            method: 'GET'
        }, (err, res, body) => {
            resolve(body);
        })
    })
}

module.exports = {
    getBaiduRoute
}