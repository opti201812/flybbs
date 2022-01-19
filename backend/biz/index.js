const mongoose = require('mongoose');
const express = require('express');
const DB = 'mongodb://172.25.202.232:27017/bbs';
const bodyParser = require('body-parser');
const User = require('./model/User');
const Thread = require('./model/Thread');
const users = require('./api/users');
const threads = require('./api/threads');

mongoose.connect(DB, (err) => {
    if (err) throw err;
    console.log('Successful connected to MongoDB')

    // const testuser = new User({
    //     username: "Test",
    //     password: '123456'
    // });
    // // testuser.save();

    // const thread = new Thread({
    //     title: 'Happy new year!',
    //     content: 'Merry christmas & happy new year',
    //     author: testuser,
    // });

    // testuser.threads.push(thread);
    // testuser.save();
    // thread.save();

    const app = express();
    app.use(express.static('static'));
    app.use(bodyParser.json());

    app.get('/api/sayhello', (req, res) => {
        res.send('Hello FlyBBS!');
    });

    // app.post('/api/saytitle', (req, res) => {
    //     const data = req.body;
    //     let title;

    //     if (data.gender === 'Male') {
    //         title = `Mr. ${data.name[0]}`;
    //     } else if (data.gender === 'Female') {
    //         title = `Mrs. ${data.name[0]}`;
    //     } else {
    //         title = data.name;
    //     }

    //     res.json({
    //         title: title
    //     })
    // });

    
    // app.listen(3030);
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
    // app.get('/all', function (req, res) {
    //     console.log(req.url);
    //     res.send(req.query);
    // })
    users.apis(app);
    threads.apis(app);
    app.listen(3030, function () {
        console.log("Listen: ", 3030);
    })
})

