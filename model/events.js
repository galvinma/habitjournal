const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Events = new Schema({
    event_id: {type: ObjectId, required: true},
    title: {type: String, required: true},
    description: {type: String},
    date: {type: String, required: true},
    start_time: {type: String},
    end_time: {type: String},
});

module.exports = mongoose.model('Events', Events);
