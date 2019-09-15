const Koa = require('koa'),
    baiduUtils = require('./utils/baidu'),
    esrirouter = require('./esri'),
    http = require('http'),
    https = require('https'),
    static = require('koa-static'),
    fs = require('fs'),
    path = require('path');

const app = new Koa();

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
})

const staticPath = '../www/public'
const absoluteStaticPath = path.resolve( __dirname, staticPath)
app.use(static(
    absoluteStaticPath
))
console.log('staticPath: '+absoluteStaticPath);

app.use(async (ctx, next) => {
    console.log(ctx.path)
    if (ctx.method === 'GET' && ctx.path === '/baiduroute') {
        let origin = ctx.query['origin']
        let destination = ctx.query['destination']
        let result = await baiduUtils.getBaiduRoute(origin, destination);
        ctx.body = result;
        ctx.type = 'application/json';
        ctx.set('Access-Control-Allow-Origin', '*');
    }
    await next();
});

app.use(esrirouter.routes());

http.createServer(app.callback()).listen(8007);

console.log('https server is running');