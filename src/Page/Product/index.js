import React from 'react'
import TableApp from '../../conponents/TableApp'
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import FormProduct from './compunent/FormProduct';


export default function Product() {

    const [product, setProduct] = useState([]);
    const [column] = useState(["ProductID", "ProductName", "Price", "Quantity", "Description", "", ""])
    const [isGetProduct, setIsGetProduct] = useState();

    useEffect(() => {
        getProduct();
    }, [isGetProduct])



    const getProduct = async () => {
        const res = await fetch('http://localhost:3000/product');
        const data = await res.json();
        setProduct(data)
    }

    return (
        <>
            <h1>Product</h1>
            <Container >
                <div>
                    <FormProduct setIsGetProduct={setIsGetProduct} />
                </div>
                <br></br>
                <hr></hr>
                <TableApp product={product} column={column} setIsGetProduct={setIsGetProduct} />
            </Container>
        </>

    )
}
