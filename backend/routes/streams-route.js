const express = require('express');
const router = express.Router();
const User = require('../models/user-model')


router.get('/info', (req, res) => {

    if (req.query.streams) {
        let streams = JSON.parse(req.query.streams);
        let query = { $or: [] };
        for (let stream in streams) {
            if (!streams.hasOwnProperty(stream)) continue;
            query.$or.push({ stream_key: stream });
        }

        User.find(query, {name : 1, email : 1, stream_key : 1}, (err, users) => {
            if (err)
                return;
            if (users) {
         //       console.log(users)
                res.json(users);
            }
        });
    }
    else {
        res.send("no nof")
    }
});

module.exports = router;