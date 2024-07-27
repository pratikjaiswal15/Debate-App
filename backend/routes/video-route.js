const express = require('express');
const router = express.Router();
const Video = require('../models/video-model');


router.get('/videos', (req, res, next) => {
    
    Video.find().populate('user', ['name', 'photo']).then(data => {
        res.send(data)
    }).catch(next)
})


router.get('/videos/:id', (req, res, next) =>{

    Video.findById(req.params.id).then(data => {
        if(data){
            res.send(data)
        }
        else {
            res.send('no data found')
        }
    }).catch(next)
})


router.post('/videos', (req, res, next) => {

    let video = {
        title : req.body.title,
        date : new Date,
        thumbnail : req.body.thumbnail,
        conference_id : req.body.conference_id,
        duration : req.body.duration,
        user : req.body.user

    }
    Video.create(video).then(data => {
        console.log(data)
        res.send(data)
    }).catch(next)
})


router.delete('/videos/:id', (req, res, next) => {

    Video.findByIdAndRemove({ _id: req.params.id }).then(data => {
        if (data) {
            res.send("successfully deleted")
        }
        else {
            res.send("No video found")
        }
    }).catch(next)
})

router.patch('/videos/:id', (req, res, next) => {

    var opts = { runValidators: true };

    Video.findByIdAndUpdate({ _id: req.params.id }, req.body, opts).then(() => {
        Video.findOne({ _id: req.params.id }).then(data => {
            res.send(data)
        }).catch(next)
    }).catch(next)

})



router.get('/videos/:id/user', (req, res, next) =>{

    Video.findById(req.params.id).populate('user').then(data => {
        if(data){
            res.send(data)
        }
        else {
            res.send('no data found')
        }
    }).catch(next)
})

module.exports = router