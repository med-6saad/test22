const mongoose=require('mongoose');
const ProductSchema=mongoose.Schema({
    nameProduct:String,
    priceProduct:String,
    smallDescription:String,
    description:String,
    fileName:String,
    category:String
})
module.exports=mongoose.model('Product',ProductSchema);