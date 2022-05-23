import {Router} from "express";
import path from "path";

const router = Router();

router.get('/', function (req, res) {

    const DEFAULT_FIELDS = {
        username: '',
        fullName: ''
    }

    const error = validateForm(req.query);
    const resData = error ? req.query : DEFAULT_FIELDS
    const resError = error || DEFAULT_FIELDS;
    const resCompleted = error ? DEFAULT_FIELDS : req.query;

    res.setHeader('Cache-Control', 'no-cache');
    res.render(path.join('task_1', 'index'), {data:resData, error: resError, completed: resCompleted})
});

function validateForm(query) {
    if (!Object.keys(query).length) {
        return null;
    }

    return Object.entries(query).reduce((obj, [key, value]) => value ? obj : {
        ...obj || {},
        [key]: 'required field'
    }, null);
}

module.exports = router;
