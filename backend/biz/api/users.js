const User = require('../model/User');
const Crypto = require('crypto');
const uuid = require('uuid');
const multer = require('multer');
const {errResult, ERROR_CODE_MESSAGE} = require('./commonError');

const upload = multer({
    dest: './static/upload',
})

const apis = (app) => {
    app.get('/api/users', async (req, res) => {
        try {
            const users = await User.find();
            return res.json({
                data: users
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    });

    app.post('/api/users/new', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const {
                username,
                password,
                confirmpass,
            } = req.body;
            if (!username) {
                return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            }
            if (!password) {
                return formError(ERROR_CODE_MESSAGE.USER_NOPASSWORD);
            }
            if (!confirmpass) {
                return formError(ERROR_CODE_MESSAGE.USER_ERROR_CONFIRM_PASSWORD);
            }
            if (!(confirmpass == password)) {
                return formError(ERROR_CODE_MESSAGE.USER_ERROR_CONFIRM_PASSWORD);
            }
            const user = await User.findOne({
                username: username,
            });
            if (user) {
                return formError(ERROR_CODE_MESSAGE.USER_ALREADY_EXISTS);
            }
            const passwordCryped = Crypto.createHash('sha1').update(password).digest('hex');
            const newUser = {
                username: username,
                password: passwordCryped,
            };
            const newuser = new User(newUser);
            await newuser.save();
            return res.json(ERROR_CODE_MESSAGE.USER_OK)
        } catch (e) {
            res.status(400).json({
                message: e.message,
            });
        }
    });

    app.post('/api/users/login', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const { username, password, } = req.body;
            if (!username) {
                return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            }
            if (!password) {
                return formError(ERROR_CODE_MESSAGE.USER_NOPASSWORD);
            }
            const passwordCryped = Crypto.createHash('sha1').update(password).digest('hex');
            const user = await User.findOne({
                username: username,
            });
            if (!user) {
                return formError(ERROR_CODE_MESSAGE.USER_NOEXIST);
            }
            if (user.password !== passwordCryped) {
                return formError(ERROR_CODE_MESSAGE.USER_PASSWORDERROR);
            }
            const tokenstr = uuid.v4();
            const token = Crypto.createHash('sha1').update(tokenstr).digest('hex');
            user.token = token;
            await user.save();
            return res.json({
                message: ERROR_CODE_MESSAGE.USER_OK.message,
                data: {
                    username: user.username,
                    token: user.token,
                }
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message,
            })
        }
    });

    app.post('/api/users/auth', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);
        try {
            console.log(req.body);

            const { username, token, } = req.body;
            if (!username) {
                return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            }
            if (!token) {
                return formError(ERROR_CODE_MESSAGE.USER_NOTOKEN);
            }
            const user = await User.findOne({   //if user not exists?
                username: username,
                token: token,
            }).select('-password -token');
            if (!user) {
                return formError(ERROR_CODE_MESSAGE.USER_TOKENEXPIRED);
            }
            return res.json({
                message: ERROR_CODE_MESSAGE.USER_OK.message,
                data: user,
            })
        } catch (error) {
            // return formError(ERROR_CODE_MESSAGE.USER_AUTHFAIL)
            return res.status(400).json({
                message: error.message,
            })
        }
    });

    app.post('/api/users/logout', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const { username, token } = req.body;
            if (!username) {
                return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            }
            if (!token) {
                return formError(ERROR_CODE_MESSAGE.USER_NOTOKEN);
            }
            const user = await User.findOne({
                username: username,
            }).select('-password');
            if (!user) {
                return formError(ERROR_CODE_MESSAGE.USER_NOEXIST);
            }
            if (token == user.token) {
                user.token = null;
                await user.save();
            } else {
                return formError(ERROR_CODE_MESSAGE.USER_WRONG_TOKEN);
            }

            return res.json(ERROR_CODE_MESSAGE.USER_OK)
        } catch (error) {
            return res.status(400).json({
                message: error.message,
            })
        }

    });

    app.patch('/api/users', upload.single('avatar'), async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const { username, token, description } = req.body;
            if (!username) {
                return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            }
            if (!token) {
                return formError(ERROR_CODE_MESSAGE.USER_NOTOKEN);
            }
            const user = await User.findOne({   //if user not exists?
                username,
                token,
            }).select('-password -token');
            if (!user) {
                return formError(ERROR_CODE_MESSAGE.USER_TOKENEXPIRED);
            };
            if (req.file) {
                user.avatar = req.file.filename;
            }
            if (description) {
                user.description = description;
            }
            if (req.file || description) {
                await user.save();
            }
            return res.json(ERROR_CODE_MESSAGE.USER_OK);
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            })
        }
    })

    app.get('/api/users/:username', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);
        try {
            console.log(req.params)
            const { username, } = req.params;    // stake exists. aquire username from user input
            if (!username) {
                return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            }
            const user = await User.findOne({   //if user not exists?
                username,
            }).select('-password -token')
                .populate('threads', 'title posttime');
            if (!user) {
                return formError(ERROR_CODE_MESSAGE.USER_NOEXIST);
            }
            return res.json({ data: user });
        } catch (error) {

        }
    });
}

module.exports.apis = apis;
