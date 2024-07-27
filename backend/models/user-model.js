const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create user schema and model

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: {
            validator: function (arr) {
                return arr.length > 2;
            },
            message: "Enter valid name."
        }
    },

    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Enter valid email."
        },
        required: [true, 'Email is required'],

    },

    photo: {
        type: String,
        required: false
    },

    uid: {
        type: String,
        unique: true,
        required: [true, 'This field is required']
    },

    stream_key : {
        type : String,
        unique : true,
        required: [true, 'This field is required']
    },

});


const User = mongoose.model('user', UserSchema);
module.exports = User
