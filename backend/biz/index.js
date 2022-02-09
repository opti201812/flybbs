const mongoose = require('mongoose');
const express = require('express');
// const DB = 'mongodb://127.0.0.1:27017/bbs';
const DB = 'mongodb://54.82.102.69:27017/bbs';
const bodyParser = require('body-parser');
const User = require('./model/User');
const Thread = require('./model/Thread');
const users = require('./api/users');
const threads = require('./api/threads');

mongoose.connect(DB, (err) => {
    if (err) throw err;
    console.log('Successful connected to MongoDB')

    const app = express();
    app.use(express.static('static'));
    app.use(bodyParser.json());

    app.get('/api/sayhello', (req, res) => {
        res.send('Hello FlyBBS!');
    });

    // 解决跨域问题
    app.all("/*", function (req, res, next) {
        // 跨域处理
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,PATCH,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        next(); // 执行下一个路由
    })

    users.apis(app);
    threads.apis(app);
    app.listen(3030, function () {
        console.log("Listen: ", 3030);
    })
})

