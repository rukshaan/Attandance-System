const mongoose=require('mongoose')

const  AttandanceSchema=new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})

const AttandanceModel = mongoose.model('tick', AttandanceSchema, 'users');
module.exports=AttandanceModel