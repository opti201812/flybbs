const mongoose = require('mongoose');
const express = require('express');
const DB = 'mongodb://172.25.202.232:27017/bbs';
const bodyParser = require('body-parser');
const User = require('./model/User');
const Thread = require('./model/Thread');

mongoose.connect(DB, (err) => {
    if (err) throw err;
    console.log('Already connected.')

    const user = new User({
        username: "Test",
        password: '123456'
    });
    user.save();

    const thread = new Thread({
        title: 'Happy new year!',
        content: 'Merry christmas & happy new year',
        author: user,
    });

    user.threads.push(thread);
    user.save();
    thread.save();


    const app = express();
    app.use(express.static('static'));
    app.use(bodyParser.json());

    app.get('/api/sayhello', (req, res) => {
        res.send('Hello FlyBBS!');
    });

    app.post('/api/saytitle', (req, res) => {
        const data = req.body;
        let title;

        if (data.gender === 'Male') {
            title = `Mr. ${data.name[0]}`;
        } else if (data.gender === 'Female') {
            title = `Mrs. ${data.name[0]}`;
        } else {
            title = data.name;
        }

        res.json({
            title: title
        })
    });

    app.post('/api/user', async(req, res) => {
        User.find().exec((e, users) => {
            try {
                const user=await User.find();
                return res.json({
                    data: users
                });
            } catch (error) {
                res.status(400).json({
                    message: e.message
                });
            }
        });
    });
    app.listen(3000);

})

