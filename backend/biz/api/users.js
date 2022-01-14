const User = require('../model/User');
const Cryto = require('crypto');
const uuid = require('uuid');
const multer = require('multer');
const ERROR_CODE_MESSAGE = {
    'USER_OK': {
        'code': '0x00010000',
        'message': 'OK',
    },
    'USER_NONAME': {
        'code': '0x00010001',
        'message': 'Invalid user name',
    },
    'USER_NOPASSWORD': {
        'code': '0x00010002',
        'message': 'Invalid password',
    },
    'USER_NOEXIST': {
        'code': '0x00010003',
        'message': 'User not exist or password error',
    },
    'USER_PASSWORDERROR': {
        'code': '0x00010004',
        'message': 'User not exist or password error',
    },
};
const upload = multer({
    dest: './static/upload',
})

const apis = (app) => {
    app.get('/api/users', async (req, res) => {
        User.find().exec((e, users) => {
            try {
                const user = await User.find();
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

    app.post('/api/users', async (req, res) => {
        try {
            const {
                username,
                password,
                confirmpass,
            } = req.body;
            if (!username) {
                return res.json({
                    errorCode: '00010001',
                    message: 'Invalid user name'
                })
            }
            if (!password) {
                // retError("Invalid password")();
            }
            if (!confirmpass) {
                // retError("Invalid confirm password")();
            }
            if (!(confirmpass == password)) {
                // retError("Password is different with confirm password")();
            }
            const user = await User.findOne({
                username
            });
            if (user) {
                // retError("User name is already exists.")();
            }
            const passwordCryped = Crypto.createHash('sha1').update(password).digest('hex');
            const newUser = {
                username: username,
                password: passwordCryped,
            };
            const newuser = new User(newUser);
            await newuser.save();
            return res.json({
                errorCode: '00010000',
                message: 'add user OK'
            })
        } catch (e) {
            res.status(400).json({
                message: e.message,
            });
        }
    });

    app.post('/api/users/login', async (req, res) => {
        const errResult = (res, errCode, errMsg) => res.status(400).json({
            errorCode: errCode,
            message: errMsg,
        });

        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const { username, password, } = req.body;
            if (!username) {
                return formError('USER_NONAME');
            }
            if (!password) {
                return formError('USER_NOPASSWORD');
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
        try {
            const { username, token, } = req.body;
            if (!username) {
                return formError('USER_NONAME');
            }
            if (!token) {
                return formError('USER_NOTOKEN');
            }
            const user = await User.findOne({   //if user not exists?
                username,
                token,
            }).select('-password -token');
            if (!user) {
                return formError(ERROR_CODE_MESSAGE.USER_TOKENEXPIRED);
            }
            return res.json({
                message: ERROR_CODE_MESSAGE.USER_AUTHOK,
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

        try {
            const { username, token } = req.body;
            if (!username) {
                return formError('USER_NONAME');
            }
            if (!token) {
                return formError('USER_NOTOKEN');
            }
            const user = await User.findOne({
                username,
            }).select('-password');
            if (!user) {
                return formError(ERROR_CODE_MESSAGE.USER_NOEXIST);
            }
            user.token = null;
            await user.save();

            return res.json({
                message: ERROR_CODE_MESSAGE.USER_EXITOK,
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message;
            })
        }

    });

    app.patch('/api/users', upload.single('avatar'), async(req, res)=>{
        try {
            const {username, token, description} = req.body;
            if (!username) {
                return formError('USER_NONAME');
            }
            if (!token) {
                return formError('USER_NOTOKEN');
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
                user.description = description;
                await user.save();
            }
            return res.json({
                message: ERROR_CODE_MESSAGE.USER_MODIFYOK,
            })
        } catch (e) {
            return res.status(400).json({
                message: e.message,
            })
        }
    })
}

module.exports.apis = apis;
