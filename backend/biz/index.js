const mongoose = require('mongoose');
const express = require('express');
const DB = 'mongodb://172.25.202.232:27017/bbs';
const bodyParser = require('body-parser');
const User = require('./model/User');
const Thread = require('./model/Thread');
const users = require('./api/users')

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

    users.apis(app);
    
    app.listen(3000);

})

