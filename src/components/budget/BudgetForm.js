/*
import {
    Title,
    Modal,
    Button,
    Container,
    Grid, LoadingOverlay, Select, NumberInput, Text
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addBudget, closeBudgetForm, fetchBudget} from "../../features/budgetSlice";

function BudgetForm(props) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const addBudgetInProcess = useSelector(state => state.budget.addBudgetInProcess)
    const [ showCancel,setShowCancel] = useState(false);
    const categoryList = useSelector(state => state.category.categoryList)
    const form = useForm({
        initialValues: {
            categoryId: '',
            amount: ''
        },
        validate: {
            category: (value) => (
                value !== '' ? null : 'Category is required'
            ),
            budget: (value) => (
                value !== '' ? null : 'Enter Budget'
            ),
        }
    });

    async function handleSubmit() {
        console.log(form.values)
        await dispatch(addBudget({...form.values, token: token}))
        await dispatch(fetchBudget({token:token}))
        form.reset()
    }

    function handleCancel() {
        form.reset()
        setShowCancel(false)
        dispatch(closeBudgetForm())
    }
    function handleCancelConfirm(){
        setShowCancel(false)
    }
    function categoryData(){
        const data =[]
        // eslint-disable-next-line array-callback-return
        categoryList.map(val => {
            data.push({value:val.categoryId,label:val.name})
        })
        return data
    }

    return (
        <Modal overlayProps={{
            color: "white",
            opacity: 0.55,
            blur: 3,
        }} withCloseButton={false} closeOnClickOutside={true} radius="lg" size="sm" opened={props.open}
               onClose={() => {
                   props.close()
               }} centered>
            <LoadingOverlay visible={addBudgetInProcess} overlayBlur={2}/>
            <Title style={{marginLeft: 10,marginBottom:20}} order={3}>Add Budget</Title>
            <Container size="md">
                <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                    <Select
                        label="Category"
                        placeholder="Select Category"
                        searchable
                        nothingFound="No category found"
                        data={categoryData()}
                        maxDropdownHeight={150}
                        {...form.getInputProps("categoryId")}
                        style={{marginBottom:20}}
                    />
                    <NumberInput
                        label="Budget"
                        placeholder="Enter Budget"
                        hideControls
                        {...form.getInputProps("amount")}
                        style={{marginBottom:20}}

                    />
                    <Grid style={{marginTop: 16, marginBottom: 10}} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" variant={"default"}
                                    fullWidth onClick={handleCancel}>Cancel</Button>
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" fullWidth type="submit">Save</Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Container>
            <Modal
                overlayProps={{
                    color: "red",
                    blur: 3,
                }}
                size="auto" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showCancel} onClose={handleCancelConfirm} radius="lg" centered  withCloseButton={false} title="Confirm">
                <Text size={"sm"} c={"dimmed"} style={{marginBottom:10}}>You will lose all entered data</Text>
                <Grid
                >
                    <Grid.Col span={"auto"}>
                        <Button radius="md" variant={"default"} fullWidth  onClick={() => setShowCancel(false)}>
                            No
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <Button color={"red"} onClick={()=> handleCancel()} radius="md" fullWidth>
                            Yes
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        </Modal>
    )
}
export default BudgetForm;
*/


import React, { useEffect, useState } from 'react';
import './BudgetForm.css'; // Nhập tệp CSS

const BudgetForm = ({ budget, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');
    const [usedAmount, setUsedAmount] = useState('');

    useEffect(() => {
        if (budget) {
            setName(budget.name);
            setBudgetAmount(budget.budget);
            setUsedAmount(budget.usedAmount);
        } else {
            setName('');
            setBudgetAmount('');
            setUsedAmount('');
        }
    }, [budget]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBudget = {
            id: budget ? budget.id : null,
            name,
            budget: parseFloat(budgetAmount),
            usedAmount: parseFloat(usedAmount),
        };
        onSave(newBudget);
        onClose();
    };

    return (
        <div className="budget-form">
            <h3>{budget ? 'Edit Budget' : 'Add Budget'}</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Budget Name" required />
                <input type="number" value={budgetAmount} onChange={(e) => setBudgetAmount(e.target.value)} placeholder="Total Budget" required />
                <input type="number" value={usedAmount} onChange={(e) => setUsedAmount(e.target.value)} placeholder="Used Amount" required />
                <button type="submit">Save Budget</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default BudgetForm;


