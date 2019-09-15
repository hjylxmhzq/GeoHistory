const router = require('koa-router')();
const fs = require('fs');

let content = fs.readFileSync('./www/public/comments.json');
let commentList = JSON.parse(content);
setInterval(function() {
    let contentStr = JSON.stringify(commentList);
    fs.writeFile('./www/public/comments.json', contentStr, function(err) {
        if (err) {
            throw err;
        }
    });
}, 600000);

router.get('/api/esri-deletecomments', (ctx, next) => {
    let uid = ctx.query['uid'];
    let key = '';
    let index = -1;
    Object.keys(commentList).forEach(k => {
        commentList[k].forEach((i, idx) => {
            if (i.uid === uid) {
                key = k;
                index = idx;
            }
        })
    })
    if (index > -1) {
        commentList[key].splice(index, 1);
        ctx.body = uid + ' deleted';
        ctx.status = 201;
    } else {
        ctx.body = 'no comment with uid' + uid;
        ctx.status = 400;
    }
    next();
});

router.get('/api/esri-addcomments', (ctx, next) => {
    let name = ctx.query['id'];
    let n = ctx.query['name'];
    let c = ctx.query['content'];
    if (commentList[name]) {
        commentList[name].push({
            name: n,
            content: c,
            uid: Math.random().toString().substr(2)
        })
    } else {
        commentList[name] = [{
            name: n,
            content: c,
            uid: Math.random().toString().substr(2)
        }]
    }
    ctx.body = name+' added';
    ctx.status = 202;
    next();
});

router.get('/api/esri-getcomments', (ctx, next) => {
    let name = ctx.query['id'];
    if (commentList[name]) {
        ctx.body = JSON.stringify(commentList[name]);
        ctx.status = 201;
        next();
    } else {
        ctx.body = 'error id'
        ctx.status = 204;
        next();
    }

});

module.exports = { router };