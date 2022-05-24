const { default: mongoose } = require("mongoose");

module.exports = mongoose.model('order',{
    date:String,
    medicine:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"medicines"
    },
    bill:Number,
    customer:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"medicineUsers"
    },
}) 