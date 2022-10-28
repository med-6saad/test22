import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useEffect ,useState} from 'react'
const Container=styled.div`
    flex: 1;
    background: #403535;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: white;
`
const Wrapper=styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title=styled.h2`
    
`
const Ul=styled.ul`
    width: 70%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const Li=styled.li`
    list-style: none;
    
`
function Nvbar() {
 
  return (
    <Container>
        <Title>Products</Title>
        <Wrapper>
            <Ul>
                <Li><Link to={'/'} style={{textDecoration:"none",color:"white"}}>auther</Link></Li>
                <Li><Link to={'/addProduct'} style={{textDecoration:"none",color:"white"}}>add Product</Link></Li>
                <Li><Link to={'/addCategory'} style={{textDecoration:"none",color:"white"}}>add Category</Link></Li>
                <Li>Product</Li>
                <Li>Product</Li>
                <Li>Product</Li>
                <Li>Product</Li>
                <Li>Product</Li>
            </Ul>
        </Wrapper>
    </Container>
  )
}

export default Nvbar
