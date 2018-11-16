const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Entries = new Schema({
    entry_id: {type: ObjectId, required: true},
    user_id: {type: ObjectId, required: true},
    habit_id: {type: ObjectId},
    start_date: {type: Number, required: true},
    end_date: {type: Number, required: true},
    start_time: {type: Number},
    end_time: {type: Number},
    type: {type: String, required: true},
    title: {type: String, required: true},
    status: {type: String, required: true},
    description: {type: String},
    multi_day: {type: Boolean, required: true},
});

module.exports = mongoose.model('Entries', Entries);
