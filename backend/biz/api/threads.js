const mongoose = require('mongoose');
const Thread = require('../model/Thread')
const Comment = require('../model/Comment')
const User = require('../model/User');
const { errResult, ERROR_CODE_MESSAGE } = require('./commonError');
const bodyParser = require('body-parser');
const Crypto = require('crypto');
const multer = require('multer');
const users = require('./users');

const apis = (app) => {
    /**
     * new thead
     * Param：username
     * token
     * title
     * content
     * 
     */
    app.post('/api/threads', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const { username, token, title, content } = req.body;
            if (!username) return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            if (!token) return formError(ERROR_CODE_MESSAGE.USER_NOTOKEN);
            if (!title) return formError(ERROR_CODE_MESSAGE.THREAD_NOTITLE);
            if (!content) return formError(ERROR_CODE_MESSAGE.THREAD_NOCONTENT);

            const user = await User.findOne({ username: username, token: token, });
            if (!user) return formError(ERROR_CODE_MESSAGE.USER_TOKENEXPIRED);

            const newThread = {
                title: title,
                content: content,
                author: user,
            };
            const thread = new Thread(newThread);
            await thread.save();

            user.threads.push(thread);
            await user.save();

            return res.json({ message: ERROR_CODE_MESSAGE.USER_OK.message });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });

    app.post('/api/comments/:tid', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const { tid, } = req.params;
            const { username, token, content } = req.body;

            if (!tid) return formError(ERROR_CODE_MESSAGE.THREAD_NOTID);
            if (!username) return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            if (!token) return formError(ERROR_CODE_MESSAGE.USER_NOTOKEN);
            if (!content) return formError(ERROR_CODE_MESSAGE.THREAD_NOCONTENT);
            const user = await User.findOne({ username: username, token: token, });
            if (!user) return formError(ERROR_CODE_MESSAGE.USER_TOKENEXPIRED);
            const thread = await Thread.findById(tid);
            if (!thread) {
                return formError(ERROR_CODE_MESSAGE.THREAD_NOEXIST);
            }
            const newComment = {
                content: content,
                author: user,
                target: tid,
            };
            const comment = new Comment(newComment);
            await comment.save();
            return res.json({ message: ERROR_CODE_MESSAGE.USER_OK.message });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });

    app.get('/api/threads', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const threads = await Thread.find().populate('author', 'username avatar');
            return res.json({ data: threads });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });

    app.get('/api/threads/:tid', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const { tid } = req.params;
            if (!tid) return formError(ERROR_CODE_MESSAGE.THREAD_NOTID);

            const thread = await Thread.findById(tid).populate('author', 'username description avatar');
            if (!thread) {
                return formError(ERROR_CODE_MESSAGE.THREAD_NOEXIST);
            }
            const comments = await Comment.find({ target: tid }).populate('author', 'username avatar deescription')
            return res.json({
                data: {
                    thread: thread,
                    comments: comments,
                }
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });

    app.patch('/api/threads/:tid', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const { tid } = req.params;
            const { username, token, title, content } = req.body;

            if (!tid) return formError(ERROR_CODE_MESSAGE.THREAD_NOTID);
            if (!username) return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            if (!token) return formError(ERROR_CODE_MESSAGE.USER_NOTOKEN);
            if (!title) return formError(ERROR_CODE_MESSAGE.THREAD_NOTITLE);
            if (!content) return formError(ERROR_CODE_MESSAGE.THREAD_NOCONTENT);
            const user = await User.findOne({ username: username, token: token, });
            if (!user) return formError(ERROR_CODE_MESSAGE.USER_TOKENEXPIRED);
            const thread = await Thread.findById(tid);
            if (!thread) {
                return formError(ERROR_CODE_MESSAGE.THREAD_NOEXIST);
            }

            if (String(user._id) !== String(thread.author)) {
                return formError(ERROR_CODE_MESSAGE.THREAD_NOTAUTHOR);
            }

            thread.title = title;
            thread.content = content;
            await thread.save();

            return res.json({ message: ERROR_CODE_MESSAGE.USER_OK.message });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });

    app.delete('/api/threads/:tid', async (req, res) => {
        const formError = (errEntity) => errResult(res, errEntity.code, errEntity.message);

        try {
            const { tid } = req.params;
            const { username, token, } = req.body;

            if (!tid) return formError(ERROR_CODE_MESSAGE.THREAD_NOTID);
            if (!username) return formError(ERROR_CODE_MESSAGE.USER_NONAME);
            if (!token) return formError(ERROR_CODE_MESSAGE.USER_NOTOKEN);
            const user = await User.findOne({ username: username, token: token, });
            if (!user) return formError(ERROR_CODE_MESSAGE.USER_TOKENEXPIRED);
            const thread = await Thread.findById(tid);
            if (!thread) {
                return formError(ERROR_CODE_MESSAGE.THREAD_NOEXIST);
            }
            if (String(user._id) !== String(thread.author)) {
                return formError(ERROR_CODE_MESSAGE.THREAD_NOTAUTHOR);
            }

            await Comment.deleteMany({
                target: mongoose.Types.ObjectId(tid),
            })
            user.threads.pull(thread);
            await user.save();
            await thread.remove();

            return res.json({ message: ERROR_CODE_MESSAGE.USER_OK.message });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });

    /*
    app.post('', async (req, res) => {
        try {
            const { } = req.body;
            return res.json({ message: ERROR_CODE_MESSAGE.USER_OK.message });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
    */
}
module.exports.apis = apis;
