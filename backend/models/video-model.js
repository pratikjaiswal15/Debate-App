const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({

    title : {
        type : String,
        required : [true, 'Video must have a title']
    },

    url : {
        type : String,
        required : [true, 'Video must have a title']
    },

    date : {
        type : Date,
        required : [true, 'Enter date']
    },

    thumbnail : {
        type: String,
        required : [true, 'Video must have a thumbnail']
    },

    conference_id : {
        type: String,
        unique : true,
        required : [true, 'Video must have conference id']
    },

    duration : {
        type : Number,
        required : [true, 'Video must have duration']

    },

    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
})

const Video = mongoose.model('videos' , VideoSchema)
module.exports = Video