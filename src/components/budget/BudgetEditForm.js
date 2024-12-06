import {
    Title,
    Modal,
    Button,
    Container,
    Grid, LoadingOverlay, Select, NumberInput, Text
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBudget, fetchBudget, removeBudget } from "../../features/budgetSlice";
import { fetchCategory } from "../../features/categorySlice";

function BudgetEditForm(props) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const addBudgetEditInProcess = useSelector(state => state.budget.addBudgetEditInProcess);
    const [showDelete, setShowDelete] = useState(false);
    const categoryList = useSelector(state => state.category.categoryList);
    
    // Initialize the form with validation
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

    useEffect(() => {
        // Fetch categories when the component mounts
        try {
            dispatch(fetchCategory({ token: token }));
            form.setFieldValue('amount', props?.element?.amount);  // Set form values from props
            form.setFieldValue('categoryId', props?.element?.category?.categoryId);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }, [dispatch, form, props?.element?.amount, props?.element?.category?.categoryId, token]);

    // Handle submitting the edited budget
    async function handleSubmit() {
        try {
            await dispatch(editBudget({ ...form.values, token: token, budgetId: props.element.id }));
            await dispatch(fetchBudget({ token: token }));
            form.reset();
            props.close();
        } catch (error) {
            console.error("Error updating budget:", error);
        }
    }

    // Handle deleting the budget
    async function handleDelete() {
        try {
            await dispatch(removeBudget({ token: token, budgetId: props.element.id }));
            await dispatch(fetchBudget({ token: token }));
            form.reset();
            props.close();
        } catch (error) {
            console.error("Error deleting budget:", error);
        }
    }

    // Handle cancel button
    function handleCancel() {
        form.reset();
        setShowDelete(false);
        props.close();
    }

    // Handle delete confirmation cancel
    function handleDeleteCancel() {
        setShowDelete(false);
    }

    // Format category data for Select input
    function categoryData() {
        const data = [];
        // Map categoryList to the format required for Select component
        categoryList.forEach(val => {
            data.push({ value: val.categoryId, label: val.name });
        });
        return data;
    }

    return (
        <Modal overlayProps={{
            color: "white",
            opacity: 0.55,
            blur: 3,
        }} withCloseButton={false} closeOnClickOutside={true} radius="lg" size="sm" opened={props.open}
            onClose={() => {
                props.close();
            }} centered>
            <LoadingOverlay visible={addBudgetEditInProcess} overlayBlur={2} />
            <Title style={{ marginLeft: 10, marginBottom: 20 }} order={3}>Edit Budget</Title>
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
                        style={{ marginBottom: 20 }}
                    />
                    <NumberInput
                        label="Budget"
                        placeholder="Enter Budget"
                        hideControls
                        {...form.getInputProps("amount")}
                        style={{ marginBottom: 20 }}
                    />
                    <Grid style={{ marginTop: 16, marginBottom: 10 }} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" color="red"
                                fullWidth onClick={() => setShowDelete(true)}>Delete</Button>
                        </Grid.Col>
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

            {/* Confirmation Modal for Deletion */}
            <Modal
                overlayProps={{
                    color: "red",
                    blur: 3,
                }}
                size="auto" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDelete} onClose={handleDeleteCancel} radius="lg" centered withCloseButton={false} title="Confirm Delete">
                <Text size={"sm"} c={"dimmed"} style={{ marginBottom: 10 }}>This will delete this account</Text>
                <Grid>
                    <Grid.Col span={"auto"}>
                        <Button radius="md" color="gray" fullWidth onClick={() => setShowDelete(false)}>
                            No, Cancel
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <Button color={"red"} onClick={() => handleDelete()} radius="md" fullWidth>
                            Yes, Delete
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        </Modal>
    );
}

export default BudgetEditForm;
