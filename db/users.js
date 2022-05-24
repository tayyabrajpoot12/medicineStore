let mongoose = require('mongoose');

let medicalSchema = mongoose.Schema({

    name: String,
    password: String,
    email: String,
    address: String,
    contact: String,

});

let user = mongoose.model('medicineUsers', medicalSchema);

module.exports = user; 