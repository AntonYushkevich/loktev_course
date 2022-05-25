import {Router} from "express";
import fs from 'fs';
import path from 'path';

const fsp = fs.promises;
const router = Router();

const votesPath = path.resolve(__dirname, 'votes.json')

router.get('/', (req, res) => {
    res.render(path.join('task_2', 'index'))
});

router.get('/variants', (req, res) => {
    fs.readFile(path.resolve(__dirname, 'variants.json'), (err, data) => {
        if (err) {
            res.sendStatus(403);
            res.send('read variants error')
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
});

router.post('/vote', async (req, res) => {
    try {
        const data = await fsp.readFile(votesPath, {encoding: 'utf8'});
        const votes = data? JSON.parse(data) : {};

        const {vote} = req.body;
        votes[vote] = (votes[vote] || 0) + 1;
        await fsp.writeFile(votesPath, JSON.stringify(votes))
    } catch (e) {
        console.log(e);
        res.sendStatus(403)
    }finally {
        res.redirect('/task_2')
    }
});

router.get('/stat', (req, res) => {
    fsp.readFile(votesPath)
        .then(file => res.json(JSON.parse(file)))
})

module.exports = router;
