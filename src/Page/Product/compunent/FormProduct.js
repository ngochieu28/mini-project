import React, { useEffect, useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Grid from '@mui/joy/Grid';
import Container from '@mui/material/Container';
import { AppConsumer } from '../../../store';


export default function FormProduct({ setIsGetProduct }) {
    const [state, dispatch] = AppConsumer();
    const [isEdit, setIsEdit] = useState(null)

    const { handleSubmit, control, reset, register, setValue } = useForm({
        defaultValues: {
            productName: "",
            price: "",
            quantity: "",
            description: ""
        }
    });

    useEffect(() => {
        setValue("productName", state.data.productName)
        setValue("price", state.data.price)
        setValue("quantity", state.data.quantity)
        setValue("description", state.data.description)

        setIsEdit(state.data)
    }, [state.data])

    const putProduct = async (data) => {
        const res = await fetch(`http://localhost:3000/product/${state.data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setIsGetProduct(data)
    }

    const onSubmit = (data) => {
        if (isEdit) {
            putProduct(data);

            setIsEdit(null)
        }
        else {
            postProduct(data)
        }
        reset();
    }

    const postProduct = async (data) => {
        if (!data.productName || !data.price) {
            return;
        }
        const res = await fetch('http://localhost:3000/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setIsGetProduct(data)
    }

    return (
        <div>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} columns={12}>
                        <Grid xs={4}>
                            <Controller name="productName" control={control} render={({ field }) => (
                                <TextField
                                    name='productName'
                                    label='ProductName'
                                    placeholder='ProductName'
                                    {...field}
                                    fullWidth
                                    {...register("productName")}
                                />
                            )} />
                        </Grid>
                        <Grid xs={4}>
                            <Controller name="price" control={control} render={({ field }) => (
                                <TextField
                                    name='price'
                                    label='price'
                                    placeholder='price'
                                    {...field}
                                    fullWidth
                                    type='number'
                                    {...register("price")}
                                />
                            )} />
                        </Grid>
                        <Grid xs={4}>
                            <Controller name="quantity" control={control} render={({ field }) => (
                                <TextField
                                    name='quantity'
                                    label='quantity'
                                    placeholder='quantity'
                                    {...field}
                                    fullWidth
                                    type='number'
                                    {...register("quantity")}
                                />
                            )} />
                        </Grid>
                        <Grid xs={12}>
                            <Controller name="description" control={control} render={({ field }) => (
                                <TextField
                                    name='description'
                                    label='description'
                                    placeholder='description'
                                    {...field}
                                    fullWidth
                                    {...register("description")}
                                />
                            )} />
                        </Grid>
                    </Grid>
                    <br></br>
                    <Button variant="contained" type='submit'>{isEdit ? "Update" : "Add"}</Button>
                </form>
            </Container>
        </div>
    )
}
