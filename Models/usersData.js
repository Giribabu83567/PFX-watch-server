const mongoose = require('mongoose');

const userSDataSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    gender: {type: String, require: true},
    mobile: {type: String, require: true},
    password: {type: String, require: true},
    confirmPassword: {type: String, require: true}
});

module.exports = mongoose.model('usersData', userSDataSchema);