const express = require('express');
const router = express.Router();
const process = require('child_process');

router.get('/process', (req, res) => {
    var result = process.execSync(`pwd`, {
        cwd: `/Users/alan/GitHub/alanhg.github.io/source/_posts/`,
        encoding: 'utf8'
    });
    console.log(__dirname);
    res.json({data: result});
});
module.exports = router;