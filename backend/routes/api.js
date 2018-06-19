const express = require('express');
const router = express.Router();
const fs = require('fs');
const process = require('child_process');
const POST_DIR = require("../config").postDir;
const ROOT_DIR = require("../config").rootDir;
const POST_SUFFIX = ".md";

/**
 * 获取所有博客列表
 */
router.get('/posts', function (req, res, next) {
    let files = fs.readdirSync(POST_DIR).map(function (v) {
            return {
                name: v,
                time: fs.statSync(POST_DIR + v).mtime.getTime()
            }
        }
    ).filter((it) => !it.name.startsWith('.'))
        .sort(function (a, b) {
            return b.time - a.time;
        }).map(function (v) {
            return v.name.substring(0, v.name.lastIndexOf("."))
        });
    if (req.query.q) {
        files = files.filter((it) => it.toLowerCase().includes(req.query.q));
    }
    res.send({posts: files, count: files.length});
});

/**
 * 获取单篇博客信息
 */
router.get('/posts/:title', function (req, res) {
    const file = fs.readFileSync(
        `${POST_DIR}${req.params.title}${POST_SUFFIX}`, 'utf-8');
    res.json({content: file, title: req.params.title});
});

/**
 * 新建博客
 */
router.post('/posts', function (req, res) {
    if (typeof req.body.title === "undefined") {
        return res.status(400).json({error: "标题不能为空"});
    }
    let outInfo = process.execSync(`cd ${POST_DIR} && hexo new '${req.body.title}'`, {
        cwd: ROOT_DIR,
        encoding: "utf8"
    }).toString();
    const realFileName = outInfo.substring(outInfo.lastIndexOf('/') + 1, outInfo.length - 4); // 去除末尾的/n
    const content = fs.readFileSync(
        `${POST_DIR}${realFileName}${POST_SUFFIX}`, 'utf-8');
    res.json({title: realFileName, content: content});
});

/**
 * 更新单篇博客
 */
router.put('/posts', function (req, res) {
    fs.writeFileSync(`${POST_DIR}${req.body.oldTitle}${POST_SUFFIX}`, req.body.content);
    fs.renameSync(`${POST_DIR}${req.body.oldTitle}${POST_SUFFIX}`, `${POST_DIR}${req.body.title}${POST_SUFFIX}`);
    res.json({status: "ok"});
});

/**
 * 删除单篇博客
 */
router.delete('/posts/:title', function (req, res, next) {
    fs.unlinkSync(`${POST_DIR}${req.params.title}${POST_SUFFIX}`);
    res.json({status: "OK"});
});
/**
 * 发布
 */
router.get('/deploy', function (req, res) {
    let result;
    try {
        result = process.execSync(`git add . && git commit -m 'Update post' && git push && hexo g`, {
            cwd: `${ROOT_DIR}`,
            encoding: 'utf8'
        });
    } catch (ex) {
        result = ex.stdout;
    }
    res.json({status: "ok"});
});
/**
 * Some hardcoded users to make the demo work
 */
const appUsers = {
    'max@gmail.com': {
        email: 'max@gmail.com',
        name: 'Max Miller',
        password: '1234' // YOU DO NOT WANT TO STORE PW's LIKE THIS IN REAL LIFE - HASH THEM FOR STORAGE
    }
};

router.post('/login', (req, res) => {
        const user = appUsers[req.body.email];
        if (user && user.password === req.body.password) {
            const userWithoutPassword = {...user};
            delete userWithoutPassword.password;
            req.session.user = userWithoutPassword;
            res.status(200).send({
                user: userWithoutPassword
            });
        } else {
            res.status(403).send({
                errorMessage: 'Permission denied!'
            });
        }
    }
);

router.get('/login', (req, res) => {
    req.session.user ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
});

router.get('/logout', function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Could not log out.');
        } else {
            res.status(200).send({});
        }
    });
});

module.exports = router;