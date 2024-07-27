const express = require('express');
const router = express.Router();
const User = require('../models/user-model')
const shortid = require('shortid');


router.get('/users', (req, res, next) => {

    User.find({}).then(data => {
        res.send(data)
    }).catch(next)
})

router.get('/users/:id', (req, res, next) => {

    User.findById(req.params.id).then(data => {
        if (data) {
            res.send(data)
        }
        else {
            res.send("no user found")
        }
    }).catch(next)
})

router.get('/users/email/:email', (req, res, next) => {

    User.find({ email: req.params.email }).then(data => {
        if (data) {
            res.send(data)
        }
        else {
            res.send("no user found")
        }
    }).catch(next)
})

router.post('/users', (req, res, next) => {

    console.log(req.body)
    let data = {
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        uid: req.body.uid,
        stream_key: shortid.generate()
    }
    console.log(data)
    User.create(data).then(data => {
        console.log(data)
        res.send(data)
    }).catch(next);
})


router.delete('/users/:id', (req, res, next) => {

    User.findByIdAndRemove({ _id: req.params.id }).then(data => {
        if (data) {
            res.send("successfully deleted")
        }
        else {
            res.send("No user found")
        }
    }).catch(next)
})

router.patch('/users/:id', (req, res, next) => {

    var opts = { runValidators: true };

    User.findByIdAndUpdate({ _id: req.params.id }, req.body, opts).then(() => {
        User.findOne({ _id: req.params.id }).then(data => {
            res.send(data)
        }).catch(next)
    }).catch(next)

})

router.get('/users/:id/videos', (req, res, next) =>{
    User.find().populate('videos').then(data => {
        res.send(data)
    }).catch(next)
})


module.exports = router