const mongoose=require("mongoose");
const UsersSchema=new mongoose.Schema({
    id: String, name: String,
})
module.exports=mongoose.model('Users',UsersSchema)