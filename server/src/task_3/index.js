import {Router} from "express";
import path from 'path';
const fs = require('fs');

const router = Router();

const votesPath = path.resolve(__dirname, '..', 'task_2', 'votes.json')

router.get('/', (req, res) => {
    res.render(path.join('task_3', 'index'))
});

router.get('/download', (req, res) => {
    fs.readFile(votesPath, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.setHeader('Cache-Control', 'max-age=0');
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    })
});

module.exports = router;
