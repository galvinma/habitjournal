const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Bullets = new Schema({
    bullet_id: {type: ObjectId, required: true},
    user_id: {type: ObjectId, required: true},
    date: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
});

module.exports = mongoose.model('Bullets', Bullets);
