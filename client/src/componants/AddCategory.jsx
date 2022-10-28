import styled from "styled-components";
import { useEffect ,useState,useRef} from "react";
import * as React from 'react';
import {gql,useMutation,useQuery} from '@apollo/client';
import {getAllCategories} from '../Graphql/Query';
import {CREATE_CATEGORY} from '../Graphql/Mutation';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {CHECK} from '../Graphql/Mutation';
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
`
const Form=styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 55%;
`
const Input=styled.input`
    width: 200px;
    height: 30px;
    border: none;
    outline: none;
    padding: 5px;
`
const Label=styled.label`
    
`
const Button=styled.button`
    padding: 5px;
    border: none;
`
const TextAria=styled.textarea`
    max-width: 200px;
    max-height: 100px;
    min-width: 200px;
    padding: 5px;
    border: none;
    outline: none;
`
const CategoriesContainer=styled.div`
    width: 90%;
    height: 90%;
    border: 2px solid gray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow-y: scroll;
`
const ContainerCategory=styled.div`
    width: 420px;
    height: 40px;
    background: white;
    margin: 10px 0px;
    border-radius:20px;
`
function AddCategory() {
    const {data:dataCategories,loading:loadingCategories,error:errorCategories}=useQuery(getAllCategories)
    const [createCategory,{err}]=useMutation(CREATE_CATEGORY)
    const [category,setCategory]=useState([])
    const name=useRef();
    const smallDescription=useRef();
    const description=useRef();
    const [check,{errCheck}]=useMutation(CHECK);
    const handelChange=(e,idx)=>{
        check({
            variables:{
                id:idx,
                checked:e.target.checked
            }
        })

    }
    const handelSubmit=(e)=>{
        createCategory({
            variables:{
                name:name.current.value,
                smallDescription:smallDescription.current.value,
                description:description.current.value
            }
        })
    }
  return (
    <Container>
        
        <Wrapper>
            <Left>
                <Title>Categories</Title>
                <Form action='#' onSubmit={(e)=>handelSubmit(e)}>
                    <Label>Name Category</Label>
                    <Input type='test' ref={name} placeholder="enter your gategory name" required/>
                    <Label>Small description</Label>
                    <TextAria ref={smallDescription} placeholder="enter your small description" required>

                    </TextAria>
                    <Label>Description</Label>
                    <TextAria ref={description} placeholder="entr your descriptoin">

                    </TextAria>
                    <Button type="submit">submit</Button>
                </Form>
            </Left>
            <Right>
                {
                    loadingCategories?'':
                    <CategoriesContainer>
                        <FormGroup>
      
                            {dataCategories.getAllCategories.map((category,idx)=>(
                                    <ContainerCategory key={idx}>
                                        <FormControlLabel style={{marginLeft:'10px'}} onChange={(e)=>handelChange(e,category.id)} control={category.checked?<Checkbox defaultChecked />:<Checkbox/>} label={category.name} />
                                    </ContainerCategory>
                                ))
                            }
                        </FormGroup>

                    </CategoriesContainer>
                }
            </Right>
        </Wrapper>
    </Container>
  )
}

export default AddCategory