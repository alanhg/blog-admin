const express = require('express');
import {NextFunction, Request, Response} from 'express';
import fs from 'fs';
import {execSync} from 'child_process';

const router = express.Router();
const ROOT_DIR: string = require('../config').default.rootDir;
const POST_DIR: string = ROOT_DIR + require('../config').default.postDir;
const POST_SUFFIX = '.md';

const EXECUTE_COMMANDS: any = {
    deploy: 'git pull --rebase --autostash && git add . && git commit -m \'Update post\' && git push && hexo generate',
    updateBlogSource: 'git pull --rebase --autostash',
    generateStaticHtml: 'hexo generate'
};

const APP_USERS = {
    'max@gmail.com': {
        email: 'max@gmail.com',
        name: 'Max Miller',
        password: '1234'
    }
};

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

router.get('/posts/:title', function (req: Request, res: Response) {
    const file = fs.readFileSync(
        `${POST_DIR}${req.params.title}${POST_SUFFIX}`, 'utf-8');
    res.json({content: file, title: req.params.title});
});

router.post('/posts', function (req: Request, res: Response) {
    if (typeof req.body.title === 'undefined') {
        return res.status(400).json({error: '标题不能为空'});
    }
    const outInfo = execSync(`cd ${POST_DIR} && hexo new '${req.body.title}'`, {
        cwd: ROOT_DIR,
        encoding: 'utf8'
    }).toString();
    const realFileName = outInfo.substring(outInfo.lastIndexOf('/') + 1, outInfo.length - 4); // 去除末尾的/n
    const content = fs.readFileSync(
        `${POST_DIR}${realFileName}${POST_SUFFIX}`, 'utf-8');
    const createTime = fs.statSync(`${POST_DIR}${realFileName}${POST_SUFFIX}`).ctime;
    res.json({title: realFileName, content: content, createTime: createTime});
});

router.put('/posts', function (req: Request, res: Response) {
    fs.writeFileSync(`${POST_DIR}${req.body.title}${POST_SUFFIX}`, req.body.content);
    res.json({status: 'ok'});
});

router.delete('/posts/:title', function (req: Request, res: Response) {
    fs.unlinkSync(`${POST_DIR}${req.params.title}${POST_SUFFIX}`);
    res.json({status: 'OK'});
});

router.get('/execute', function (req: Request, res: Response) {
    try {
        const outInfo = execSync(EXECUTE_COMMANDS[req.query.command], {
                cwd: `${ROOT_DIR}`,
                encoding: 'utf8'
            }
        );
        res.json({data: outInfo});
    } catch (e) {
        return res.status(500).send(e);
    }
});

router.post('/login', (req: Request, res: Response) => {
        const user = (<any>APP_USERS)[req.body.email];
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
