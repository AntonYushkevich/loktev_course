import express from 'express';
import bodyParser from "body-parser";
import task1 from './src/task_1';
import task2 from './src/task_2';


const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3005;
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public', {cacheControl: isProduction}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/task_1', task1);
app.use('/task_2', task2);

app.listen(PORT, function () {
    console.log('server started at: ' + PORT)
})
