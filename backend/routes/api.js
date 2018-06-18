const express = require('express');
const router = express.Router();
const fs = require('fs');
const process = require('child_process');

const jwt = require("jsonwebtoken");
const passport = require('passport');


const POST_DIR = "/Users/alan/GitHub/alanhg.github.io/source/_posts/";
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
        files = files.filter((it) => it.includes(req.query.q));
    }
    res.send({posts: files, count: files.length});
});

/**
 * 获取单篇博客信息
 */
router.get('/posts/:title', function (req, res, next) {
    console.log(req.params['title']);
    const file = fs.readFileSync(
        `${POST_DIR}${req.params.title}${POST_SUFFIX}`, 'utf-8');
    res.json({content: file});
});

/**
 * 新建博客
 */
router.post('/posts', function (req, res, next) {
    if (typeof req.body.title === "undefined") {
        return res.status(400).json({error: "标题不能为空"});
    }
    let outInfo = process.execSync(`cd ${POST_DIR} && hexo new '${req.body.title}'`, 'utf-8').toString();
    const realFileName = outInfo.substring(outInfo.lastIndexOf('/') + 1, outInfo.length - 1); // 去除末尾的/n
    const content = fs.readFileSync(
        `${POST_DIR}${realFileName}`, 'utf-8');
    res.json({title: realFileName, content: content});
});

/**
 * 更新单篇博客
 */
router.put('/posts', function (req, res) {
    fs.writeFileSync(`${POST_DIR}${req.body.title}${POST_SUFFIX}`, req.body.content);
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
router.get('/deploy', function (req, res, next) {
    // process.execSync(`cd ${POST_DIR} && git add . && git commit -m 'Update post'`, 'utf-8');
    res.json({status: "ok"});
});

router.post('/login',
    passport.authenticate('local', {session: false}),
    function (req, res) {

    }
);
router.get('/logout', function (req, res) {
    req.logout();
});

module.exports = router;