const {gql}=require('apollo-server-express');
const typeDefs=gql`
    type Query{
        hello:String!
        getAllCategories:[Category]
        getCategoriesByChecked:[Category]
        getAllProducts:[Product]
    }
    type Category{
        id:ID
        name:String
        smallDescription:String
        description:String
        checked:Boolean
    }
    input CategoryInput{
        name:String
        smallDescription:String
        description:String
    }
    input CheckedInput{
        checked:Boolean
    }
    input ProductInput{
        nameProduct:String
        priceProduct:String
        smallDescription:String
        description:String
        fileName:String
        category:String
    }
    type Product{
        id:ID
        nameProduct:String
        priceProduct:String
        smallDescription:String
        description:String
        fileName:String
        category:String
    }
    type Mutation{
        createCategory(category:CategoryInput):Category
        check(id:String,checked:CheckedInput):Category
        createProduct(product:ProductInput):Product
    }
    
    
`
module.exports=typeDefs;