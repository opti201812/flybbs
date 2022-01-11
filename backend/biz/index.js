const mongoose = require('mongoose');

const DB = 'mongodb://172.25.202.232:27017/bbs';

mongoose.connect(DB, (err)=> {
    if (err) throw err;
    console.log('Already connected.')
})