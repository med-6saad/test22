import {gql} from '@apollo/client'
export const CREATE_CATEGORY=gql`
    mutation createCategory($name:String,$smallDescription:String,$description:String){
        createCategory(category:{name:$name,smallDescription:$smallDescription,description:$description}){
            name
            smallDescription
            description
        }
    }
`
export const CREATE_PRODUCT=gql`
    mutation createProduct($nameProduct:String,$priceProduct:String,$smallDescription:String,$description:String,$fileName:String,$category:String){
        createProduct(product:{nameProduct:$nameProduct,priceProduct:$priceProduct,smallDescription:$smallDescription,description:$description,fileName:$fileName,category:$category}){
            nameProduct
            priceProduct
            smallDescription
            description
            fileName
            category
        }
    }
`
export const CHECK=gql`
    mutation check($id:String,$checked:Boolean){
        check(id:$id,checked:{checked:$checked}){
            name
            smallDescription
            description
        }
    }
`