const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Users = new Schema({
    id: {type: ObjectId, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
});

// var CalendarEvents = new Schema({
//     id: {type: ObjectId, required: true},
//     date: {type: String, required: true},
//     title: {type: String, required: true},
//     description: {type: String, required: true},
// });
//
// var Journal = new Schema({
//     id: {type: ObjectId, required: true},
//     date: {type: String, required: true},
//     title: {type: String, required: true},
//     entry: {type: String, required: true},
// });

module.exports = mongoose.model('Users', Users);
// module.exports = mongoose.model('CalendarEvents', CalendarEvents);
// module.exports = mongoose.model('Journal', Journal);
