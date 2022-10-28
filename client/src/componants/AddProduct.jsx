import React, { useRef } from 'react'
import styled from 'styled-components';
import { useEffect,useState } from 'react';
import axios from 'axios';
import {useQuery,useMutation} from '@apollo/client'
import {getCategoriesByChecked} from '../Graphql/Query'
import {CREATE_PRODUCT} from '../Graphql/Mutation';
import {getAllProducts} from '../Graphql/Query';
const Container=styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Wrapper=styled.div`
    width: 95%;
    height: 90vh;
    background-color: #aac5df;
    display: flex;
`
const Title=styled.h1`

`
const Left=styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-right: 1px solid black;
`
const Right=styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow-y: scroll;
`

const Input=styled.input`
    width: 200px;
    height: 30px;
    border: none;
    outline: none;
    padding: 5px;
`


const TextAria=styled.textarea`
    max-width: 200px;
    max-height: 100px;
    min-width: 200px;
    padding: 5px;
    border: none;
    outline: none;
`
const InputFile=styled.input`
    width: 120px;
`
const FormUpload=styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    height: 55%;
`
const ButtonUpload=styled.button`
    background-color: green;
`
const ImgUpload=styled.img`
    width: 150px;
    height: 100px;
    border-radius: 50%;
    background: white;
`
const Label=styled.label`
    
`
const Select=styled.select`
    
`
const Option=styled.option`
    
`
const ProductWrapper=styled.div`
    width: 200px;
    height: 250px;
    background: white;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const ProductImg=styled.img`
    width: 180px;
    
`
const ProductTitle=styled.h2`
    
`
const ProductSmallDesc=styled.p`
    
`
const ProductCategory=styled.h4`
    
`
const ProductBtn=styled.button`
    
`
function AddProduct() {
  const nameProduct=useRef()
  const priceProduct=useRef()
  const smallDescription=useRef()
  const description=useRef()
  const category=useRef();
    const {data:categoriesChecked,loading:loadingCatChecked,error:errChecked}=useQuery(getCategoriesByChecked);
    const [file,setFile]=useState('')
  const [fileName,setFileName]=useState('Chose File')
  const [uploadedFile,setUploadedFile]=useState({})
  const handelChangeFile=(e)=>{
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
    console.log(fileName)
  }
    const [createProduct,{errCreateProduct}]=useMutation(CREATE_PRODUCT)
  const handleUpload= async (e)=>{
    //upload image of product
    const data=new FormData();
    const fileName=Date.now()+file.name;
    const product={
        nameProduct:nameProduct.current.value,
        priceProduct:priceProduct.current.value,
        smallDescription:smallDescription.current.value,
        description:description.current.value,
        fileName,
        category:category.current.value
    }
    createProduct({
        variables:product
    })
    data.append("name",fileName);
    data.append("file",file)
    try{
        await axios.post('http://localhost:4000/server/upload',data)
    }catch(err){
        console.log(err)
    }
  }
  //get all products
    const {data:dataAllProducs,loading:loadingAllProduct,error:errorAllProduct}=useQuery(getAllProducts)
  
  return (
    <Container>
        <Wrapper>
            <Left>
                <Title>Add Products</Title>
                <Label htmlFor='file'>
                    {file?<ImgUpload src={URL.createObjectURL(file)}/>:<ImgUpload src='/images/upload.png'/>}
                </Label>
                <FormUpload onSubmit={(e)=>handleUpload(e)}>
                    <InputFile hidden type='file' name='file' id='file' onChange={(e)=>handelChangeFile(e)}/>
                    <Label>Name Product</Label>
                    <Input type='test' ref={nameProduct} placeholder="enter your gategory name" required/>
                    <Select name='category' ref={category}>
                        <Option value=''>Choose a category</Option>
                        {loadingCatChecked?'':
                            categoriesChecked.getCategoriesByChecked.map((category,index)=>(
                                <Option value={category.name} key={index}>{category.name}</Option>
                            ))
                        }
                    </Select>

                    <Label>Price</Label>
                    <Input type='number' ref={priceProduct} placeholder="enter price of product" required/>

                    <Label>Small description</Label>
                    <TextAria ref={smallDescription} placeholder="enter your small description" required>

                    </TextAria>
                    <Label>Description</Label>
                    <TextAria ref={description} placeholder="entr your descriptoin">

                    </TextAria>
                    <ButtonUpload>upload</ButtonUpload>
                </FormUpload>
                
            </Left>
            <Right>
                {
                    loadingAllProduct?'':
                    dataAllProducs.getAllProducts.map((product,index)=>(
                        <ProductWrapper key={index}>
                            <ProductImg src={`http://localhost:4000/images/${product.fileName}`}/>
                            <ProductTitle>{product.nameProduct}</ProductTitle>
                            <ProductSmallDesc>
                                Desc:{product.smallDescription}
                            </ProductSmallDesc>
                            <ProductCategory>
                                Cat:{product.category}
                            </ProductCategory>
                            <ProductBtn>add to card</ProductBtn>
                        </ProductWrapper>
                    ))
                }
            </Right>
        </Wrapper>
    </Container>
  )
}

export default AddProduct
