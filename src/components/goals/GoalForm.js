/*import {
    TextInput,
    Title,
    Modal,
    Button,
    Container,
    Grid, Text, LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {addGoal, closeGoalForm, fetchGoal} from "../../features/goalSlice";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {DatePickerInput} from "@mantine/dates";

export default function GoalForm(props){
    const dispatch = useDispatch()
    const token  = useSelector(state => state.user.token)
    const addGoalInProcess = useSelector(state => state.goal.addGoalInProcess)
    const [showDiscard,setShowDiscard] = useState(false);
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            targetAmount: '',
            status: 'Pending',
            targetDate: new Date()
        },
        validate: {
            name: (value) => (
                value !== '' ? null : 'Name is required'
            ),
            targetAmount: (value) => (
                value !== '' ? null : 'Target Amount is required'
            )
        }
    });

    async function handleSubmit(){
        await dispatch(addGoal({...form.values,token:token,targetDate:form.values.targetDate.getTime()}))
        await dispatch(fetchGoal({token:token}))
        form.reset()
    }

    function handleDiscard(){
        form.reset()
        setShowDiscard(false)
        dispatch(closeGoalForm())
    }

    function handleDiscardCancel(){
        setShowDiscard(false)
    }
    return(
        <Modal overlayProps={{
            color: "white",
            opacity: 0.55,
            blur: 3,
        }} radius="lg" size="sm" opened={props.open} onClose={() => { props.close() }} centered>
            <LoadingOverlay visible={addGoalInProcess} overlayBlur={2}/>
            <Title style={{ marginLeft: 10 }} order={3}>Add Goal</Title>
            <Container size="md">
                <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Name"
                        placeholder="Ex: Emergency Fund"
                        type='Goal Name'
                        {...form.getInputProps('name')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        label="Description"
                        placeholder="Ex: For a backup"
                        type='description'
                        {...form.getInputProps('description')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Target Amount"
                        placeholder="Ex: 50,000"
                        type='amount'
                        {...form.getInputProps('targetAmount')}
                    />
                    <DatePickerInput
                        radius="md"
                        style={{marginTop: 16}}
                        label="Target Date"
                        {...form.getInputProps('targetDate')}
                    />
                    <Grid style={{marginTop:16,marginBottom:8}} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={"auto"}>
                        <Button radius="md" variant={"default"} fullWidth onClick={() => setShowDiscard(true)}>Cancel</Button>
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
                size="auto" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDiscard} onClose={handleDiscardCancel} radius="lg" centered  withCloseButton={false} title="Confirm Discard">
                <Text size={"sm"} c={"dimmed"} style={{marginBottom:10}}>You will lose all the content you entered</Text>
                <Grid
                >
                    <Grid.Col span={"auto"}>
                        <Button radius="md" variant={"default"} fullWidth  onClick={() => setShowDiscard(false)}>
                            No
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <Button color={"red"} onClick={()=> handleDiscard()} radius="md" fullWidth type="submit">
                            Yes
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        </Modal>
    )
}
    */
import React, { useEffect, useState } from 'react';
import './GoalsForm.css'; // Nhập tệp CSS

const GoalsForm = ({ goal, onClose, onSave }) => {
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [TargetAmount, setTargetAmount] = useState('');
    const [CurrentAmount, setCurrentAmount] = useState('');
    const [TargetDate, setTargetDate] = useState('');
    const [isAchieved, setIsAchieved] = useState(false);

    useEffect(() => {
        if (goal) {
            setName(goal.Name);
            setDescription(goal.Description);
            setTargetAmount(goal.TargetAmount);
            setCurrentAmount(goal.CurrentAmount);
            setTargetDate(goal.TargetDate);
            setIsAchieved(goal.isAchieved);
        } else {
            setName('');
            setDescription('');
            setTargetAmount('');
            setCurrentAmount('');
            setTargetDate('');
            setIsAchieved(false);
        }
    }, [goal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGoal = {
            GoalID: goal ? goal.GoalID : null,
            Name,
            Description,
            TargetAmount: parseFloat(TargetAmount),
            CurrentAmount: parseFloat(CurrentAmount),
            TargetDate,
            isAchieved,
            AchievedDate: isAchieved ? new Date() : null,
            UserId: 1, // Assuming a static user ID for simplicity
            isDeleted: false,
            createdAt: goal ? goal.createdAt : new Date(),
        };
        onSave(newGoal);
        onClose(); // Đóng biểu mẫu sau khi lưu
    };

    return (
        <div className="goals-form">
            <h3>{goal ? 'Edit Goal' : 'Add Goal'}</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Goal Name" required />
                <input type="text" value={Description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="number" value={TargetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="Target Amount" required />
                <input type="number" value={CurrentAmount} onChange={(e) => setCurrentAmount(e.target.value)} placeholder="Current Amount" required />
                <input type="date" value={TargetDate} onChange={(e) => setTargetDate(e.target.value)} required />
                <label>
                Achieved
                    <input type="checkbox" checked={isAchieved} onChange={() => setIsAchieved(!isAchieved)} />
                    
                </label>
                <div className="button-container">
                    <button type="submit" className="save-button">{goal ? 'Update Goal' : 'Save Goal'}</button>
                    <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default GoalsForm;
