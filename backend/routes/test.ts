const express = require('express');
const router = express.Router();
import * as process from 'child_process';
import {Request, Response} from 'express';

router.get('/process', (req: Request, res: Response) => {
    const result = process.execSync(`pwd`, {
        cwd: `/Users/alan/GitHub/alanhg.github.io/source/_posts/`,
        encoding: 'utf8'
    });
    console.log(__dirname);
    res.json({data: result});
});
export default router;
