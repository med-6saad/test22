const mongoose=require('mongoose');
const CategorySchema=new mongoose.Schema({
    name:String,
    smallDescription:String,
    description:String,
    checked:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model('category',CategorySchema);