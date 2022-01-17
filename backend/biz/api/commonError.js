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
        'message': 'User does not exist or password error',
    },
    'USER_PASSWORDERROR': {
        'code': '0x00010004',
        'message': 'User not exist or password error',
    },
    'USER_ERROR_CONFIRM_PASSWORD': {
        'code': '0x00010005',
        'message': 'Confirm password is not the same with password',
    },
    'USER_ALREADY_EXISTS': {
        'code': '0x00010006',
        'message': 'User already exists',
    },
    'USER_NOTOKEN': {
        'code': '0x00010007',
        'message': 'Invalid token',
    },
    'USER_TOKENEXPIRED': {
        'code': '0x00010008',
        'message': 'Wrong token or token has expired',
    },
    'USER_WRONG_TOKEN': {
        'code': '0x00010009',
        'message': 'Wrong token',
    },
    'THREAD_NOTITLE': {
        'code': '0x00020001',
        'message': 'No thread title',
    },
    'THREAD_NOCONTENT': {
        'code': '0x00020002',
        'message': 'No thread content',
    },
    'THREAD_NOTID': {
        'code': '0x00020003',
        'message': 'No thread ID',
    },
    'THREAD_NOEXIST': {
        'code': '0x00020004',
        'message': 'The thread id does not exists',
    },
    'THREAD_NOTAUTHOR': {
        'code': '0x00020005',
        'message': 'No author',
    },
    // '': {
    //     'code': '0x00010009',
    //     'message': 'Wrong token',
    // },
};

/**
 * General error message body
 * 
 * @param {res} response 
 * @param {*} errCode 
 * @param {*} errMsg 
 * @returns the error message body
 */
const errResult = (res, errCode, errMsg) => res.status(400).json({
    code: errCode,
    message: errMsg,
});

module.exports.errResult = errResult;
module.exports.ERROR_CODE_MESSAGE = ERROR_CODE_MESSAGE;
// export { _ERROR_CODE_MESSAGE as ERROR_CODE_MESSAGE };
// export { errResult as errResult};