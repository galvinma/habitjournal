const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Entries = new Schema({
    entry_id: {type: ObjectId, required: true},
    user_id: {type: ObjectId, required: true},
    habit_id: {type: ObjectId},
    date: {type: Number, required: true},
    type: {type: String, required: true},
    title: {type: String, required: true},
    status: {type: String, required: true},
    description: {type: String},
});

module.exports = mongoose.model('Entries', Entries);
