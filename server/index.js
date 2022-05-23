import express from 'express';
const PORT = 3005;
const app = express();

app.listen(PORT, function () {
    console.log('server started at: ' + PORT)
})
