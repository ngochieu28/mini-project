import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { AppConsumer } from '../store';
import { SET_DATA } from '../store/action';

export default function TableApp({ product, column, setIsGetProduct }) {

    const [state, dispatch] = AppConsumer();

    const handelEdit = (index) => {
        dispatch(SET_DATA(product[index]))
    }

    const handelDelete = (id) => {
        console.log(id);
        deleteProduct(id)

    }

    const deleteProduct = async (id) => {
        const res = await fetch(`http://localhost:3000/product/${id}`, {
            method: 'DELETE'
        })
        setIsGetProduct(id)
    }

    const renderTableCell = () => {
        if (product.length > 0) {
            product.map(item => {
                Object.keys(item).forEach(key => {
                    return {
                        [key]: item[key]
                    }
                })
            })

        }
    }
    renderTableCell()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {column.map((column, index) => (
                            <TableCell key={index} align="center">{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {product.map((item, index) => (
                        <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {item.id}
                            </TableCell>
                            <TableCell align="center">{item.productName}</TableCell>
                            <TableCell align="center">{item.price}</TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{item.description}</TableCell>
                            <TableCell align="center"><Button variant="contained" onClick={() => handelEdit(index)}>Edit</Button></TableCell>
                            <TableCell align="center"><Button variant="contained" onClick={() => handelDelete(item.id)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}