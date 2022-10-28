const Category=require('./models/Category.model');
const Product=require('./models/Product.model');
const mongoose=require('mongoose');
const resolvers={
    Query:{
        hello:()=>{
            return "hello world..."
        },
        getAllCategories:async()=>{
            return await Category.find({});
        },
        getCategoriesByChecked:async()=>{
            return await Category.find({checked:true})
        },
        getAllProducts:async()=>{
            return await Product.find({});
        }
    },
    Mutation:{
        createCategory:async(parent,args,context,info)=>{
            const {name,smallDescription,description}=args.category;
            const category=await new Category({name,smallDescription,description}).save()
            return category
        },
        createProduct:async(parent,args,context,info)=>{
            const {nameProduct,priceProduct,smallDescription,description,fileName,category}=args.product;
            const product=await new Product({nameProduct,priceProduct,smallDescription,description,fileName,category}).save();
            return product;
        }
        ,
        check:async(parent,args,context,ingo)=>{
            console.log(args)
            const {id}=args;
            
            const {checked}=args.checked;
            const category=await Category.findOneAndUpdate(mongoose.Types.ObjectId(id),{checked},{new:false})
            return category;
        }
    }
}
module.exports=resolvers;