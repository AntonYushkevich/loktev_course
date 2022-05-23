import express from 'express';
import task1 from './src/task_1';

const PORT = 3005;
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/task_1', task1)

app.listen(PORT, function () {
    console.log('server started at: ' + PORT)
})
