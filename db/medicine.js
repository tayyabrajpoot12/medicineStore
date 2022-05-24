const mongoose = require('mongoose');

let mediSchema = mongoose.Schema({
    companyName:String,
    medicineName:String,
    medicinePic:String,
    medicinePrice:String,
})

let medicine   = mongoose.model('medicines' , mediSchema);

module.exports = medicine; 