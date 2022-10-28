import {gql} from '@apollo/client';
export const getAllCategories=gql`
    {
        getAllCategories{
            id
            name
            smallDescription
            description
            checked
        }
        
    }
`
export const getAllProducts=gql`
    {
        getAllProducts{
            nameProduct
            priceProduct
            smallDescription
            description
            fileName
            category
        }
    }
`
export const getCategoriesByChecked=gql`
    {
        getCategoriesByChecked{
            id
            name
            smallDescription
            description
            checked
        }
    }
`