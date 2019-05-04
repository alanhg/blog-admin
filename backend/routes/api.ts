const express = require('express');
import {NextFunction, Request, Response} from 'express';
import fs from 'fs';
import process from 'child_process';

const router = express.Router();
const ROOT_DIR: string = require('../config').default.rootDir;
const POST_DIR: string = ROOT_DIR + require('../config').default.postDir;
const POST_SUFFIX = '.md';

/**
 * 鉴权中间件，如果用户session丢失，无权
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
        next();
    } else {
        return res.status(401).json({error: '请登录!'});
    }
};


/**
 * 获取所有博客列表
 */
router.get('/posts', function (req: Request, res: Response, next: NextFunction) {
    let files = fs.readdirSync(POST_DIR).map(function (v: any) {
            return {
                title: v,
                time: fs.statSync(POST_DIR + v).ctime.getTime(),
                createTime: fs.statSync(POST_DIR + v).ctime
            };
        }
    ).filter((it: any) => !it.title.startsWith('.'))
        .sort(function (a: any, b: any) {
            return b.time - a.time;
        }).map(function (v: any) {
            return {
                title: v.title.substring(0, v.title.lastIndexOf('.')),
                createTime: v.createTime
            };
        });
    if (req.query.q) {
        files = files.filter((it: any) => it.title.toLowerCase().includes(req.query.q));
    }
    res.send({posts: files, count: files.length});
});

/**
 * 获取单篇博客信息
 */
router.get('/posts/:title', function (req: Request, res: Response) {
    const file = fs.readFileSync(
        `${POST_DIR}${req.params.title}${POST_SUFFIX}`, 'utf-8');
    res.json({content: file, title: req.params.title});
});

/**
 * 新建博客
 */
router.post('/posts', function (req: Request, res: Response) {
    if (typeof req.body.title === 'undefined') {
        return res.status(400).json({error: '标题不能为空'});
    }
    let outInfo = process.execSync(`cd ${POST_DIR} && hexo new '${req.body.title}'`, {
        cwd: ROOT_DIR,
        encoding: 'utf8'
    }).toString();
    const realFileName = outInfo.substring(outInfo.lastIndexOf('/') + 1, outInfo.length - 4); // 去除末尾的/n
    const content = fs.readFileSync(
        `${POST_DIR}${realFileName}${POST_SUFFIX}`, 'utf-8');
    const createTime = fs.statSync(`${POST_DIR}${realFileName}${POST_SUFFIX}`).ctime;
    res.json({title: realFileName, content: content, createTime: createTime});
});

/**
 * 更新单篇博客
 */
router.put('/posts', function (req: Request, res: Response) {
    fs.writeFileSync(`${POST_DIR}${req.body.title}${POST_SUFFIX}`, req.body.content);
    res.json({status: 'ok'});
});

/**
 * 删除单篇博客
 */
router.delete('/posts/:title', function (req: Request, res: Response) {
    fs.unlinkSync(`${POST_DIR}${req.params.title}${POST_SUFFIX}`);
    res.json({status: 'OK'});
});
/**
 * 发布
 */
router.get('/deploy', function (req: Request, res: Response) {
    let result;
    try {
        result = process.execSync(`git add . && git commit -m 'Update post' && git push && hexo g`, {
            cwd: `${ROOT_DIR}`,
            encoding: 'utf8'
        });
    } catch (ex) {
        result = ex.stdout;
    }
    res.status(200);
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

router.post('/login', (req: Request, res: Response) => {
        const user = (<any>appUsers)[req.body.email];
        if (user && user.password === req.body.password) {
            const userWithoutPassword = {...user};
            delete userWithoutPassword.password;
            req!.session!.user = userWithoutPassword;
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

router.get('/login', (req: Request, res: Response) => {
    req!.session!.user ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
});

router.get('/logout', function (req: Request, res: Response) {
    req!.session!.destroy((err) => {
        if (err) {
            res.status(500).send('Could not log out.');
        } else {
            res.status(200).send({});
        }
    });
});
export default router;
