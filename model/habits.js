const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Habits = new Schema({
    habit_id: {type: ObjectId, required: true},
    user_id: {type: ObjectId, required: true},
    date: {type: Number, required: true},
    status: {type: String, required: true},
});

module.exports = mongoose.model('Habits', Habits);
