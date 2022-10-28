import styled from "styled-components"
import AddCategory from "../componants/AddCategory"
import AddProduct from "../componants/AddProduct"
import Navbar from '../componants/Nvbar'
import {BrowserRouter,Switch,Routes,Route} from 'react-router-dom';
import {gql,useMutarion,useQuery} from '@apollo/client';
import Auther from "../componants/Auther";
import {getAllCategories} from '../Graphql/Query';
import { useState ,useEffect} from "react";
const Container=styled.div`
    display: flex;
`
function Home() {
  return (
    
    <Container>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Auther/>}/>
                <Route path='/addProduct' element={<AddProduct/>}/>
                <Route path='/addCategory' element={<AddCategory/>}/>
            </Routes>
        </BrowserRouter>
    </Container>
  )
}

export default Home