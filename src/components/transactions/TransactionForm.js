/*import {
    TextInput,
    Title,
    Radio,
    Modal,
    Group,
    Button,
    Container,
    Grid,
    Textarea,
    Select, Text, Loader,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {useDispatch, useSelector} from "react-redux";
import {addTransaction, closeTransactionForm, fetchTransaction} from "../../features/transactionSlice";
import { fetchAccount} from "../../features/accountSlice";

import {useEffect, useState} from "react";
import {fetchCategory} from "../../features/categorySlice";

export default function TransactionForm(props) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
    const isMobile = useSelector(state => state.user.isMobile)
    useSelector(state => state.transaction.addTransactionInProcess);
    useEffect(()=>{
        dispatch(fetchCategory({token:token}))
        dispatch(fetchAccount({token:token}))
    },[dispatch, token])
  const [showDiscard,setShowDiscard] = useState(false);
  const categoryList = useSelector(state => state.category.categoryList)
  const accountList = useSelector(state => state.account.accountList)
  const form = useForm({
    initialValues: {
      amount: '',
      type: '',
      accountId: '',
      paymentType: '',
      categoryId: '',
      description: '',
      dateTime: new Date()
    },
    validate: {
        amount: (value) => (
            value !== '' ? null : 'Amount is required'
        ),
        accountId: (value) => (
            value !== '' ? null : 'Select account'
        ),
        categoryId: (value) => (
            value !== '' ? null : 'Select category'
        ),
        paymentType: (value) => (
            value !== '' ? null : 'Select type'
        ),
    }
  });

    function handleDiscard(){
        form.reset()
        setShowDiscard(false)
        dispatch(closeTransactionForm())
    }

    function handleDiscardCancel(){
        setShowDiscard(false)
    }

  async function handleAddTransaction(values){
    console.log(values)
      await dispatch(addTransaction({...form.values,token:token,dateTime:form.values.dateTime.getTime()}))
      await dispatch(fetchTransaction({token:token}))
      await dispatch(fetchAccount({token:token}))
      form.reset()
      props.close()
  }

  function categoryData(){
      const data =[]
      // eslint-disable-next-line array-callback-return
      categoryList.map(val => {
          data.push({value:val.categoryId,label:val.name})
      })
      return data
  }
  function accountData(){
      const data =[]
      // eslint-disable-next-line array-callback-return
      accountList.map(val => {
          data.push({value:val.accountId,label:val.name})
      })
      return data
  }
  function paymentTypeDate(){
      const data =[]
      const selectedAccount = form.values.accountId
      let paymentType = []
      // eslint-disable-next-line array-callback-return
      accountList.map(val =>{
          if(val.accountId===selectedAccount){
              paymentType = val.paymentTypes
          }
      })
      if(paymentType.length > 0){
          // eslint-disable-next-line array-callback-return
          paymentType.map(val => {
              data.push({value:val,label:val})
          })
      }
      return data
  }

  function handleTransactionType(){
      // eslint-disable-next-line array-callback-return
      categoryList.map(val =>{
          if(val.categoryId===form.values.categoryId){
              form.values.type = val.type
          }
      })
  }
  return (
    <>
      <Modal overlayProps={{
          color: "white",
          opacity: 0.55,
          blur: 3,
      }} size={"xl"} withCloseButton={false} closeOnClickOutside={false} radius="lg" opened={props.open} onClose={() => { props.close() }} centered>
        <Title style={{ marginLeft: 10 }} order={3}>Add Transaction</Title>
        <form onSubmit={form.onSubmit((values) => handleAddTransaction(values))}>
        <Grid style={{ margin: 10 }}>
          <Grid.Col span={12} md={6}>
              <DateTimePicker
                  radius="md"
                  dropdownType="modal"
                  valueFormat="DD MMM YYYY hh:mm A"
                  label="Date and time"
                  placeholder="Pick date and time"
                  {...form.getInputProps('dateTime')}
              />
              <TextInput radius="md" style={{ marginTop: 16 }}
                         label="Amount"
                         placeholder="Ex: 5,000"
                         type='number'
                         {...form.getInputProps('amount')}
                         withAsterisk
              />
              <Textarea radius="md" style={{ marginTop: 16 }}
                        placeholder="Enter Description"
                        label="Description"
                        autosize
                        minRows={4}
                        {...form.getInputProps('description')}
              />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <Select radius="md"
              label="Category"
              placeholder="Select Category"
              searchable
              clearable
              nothingFound={categoryList.length===0 ? <Text c="blue">No data found</Text> : <Loader size="sm" variant="dots" />}
              withAsterisk
              data={categoryData()}
              onChange={handleTransactionType()}
              {...form.getInputProps('categoryId')}
            />
            <Select radius="md" style={{ marginTop: 16 }}
              label="Account"
              withAsterisk
              searchable
              clearable
              nothingFound={accountList.length===0 ? <Text c="blue">No data found</Text> : <Loader size="sm" variant="dots" />}
              placeholder="Select Account"
              data={accountData()}
                    {...form.getInputProps('accountId')}
            />
            <Select radius="md" style={{ marginTop: 16 }}
              label="Payment Type"
              withAsterisk
              disabled={form.values.accountId===''}
              clearable
              nothingFound={paymentTypeDate().length===0 ?  <Text>No data found</Text> : <Loader size="sm" variant="dots" />}
              placeholder="Select Payment Type"
              data={paymentTypeDate()}
              {...form.getInputProps('paymentType')}
            />
            <Radio.Group style={{ marginTop: 16 }}
              label="Type"
              {...form.getInputProps('type')}
            >
              <Group mt="xs">
                <Radio disabled value="expense" label="Expenses" />
                <Radio  disabled value="income" label="Income" />
              </Group>
            </Radio.Group>
            <Grid style={{ marginTop: 16 }} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
              <Grid.Col span={"auto"}>
                <Button radius="md" variant={"default"} fullWidth onClick={() => setShowDiscard(true)} >Discard</Button>
              </Grid.Col>
              <Grid.Col span={"auto"}>
                <Button radius="md" fullWidth type="submit">Save</Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        </form>
          <Modal
              overlayProps={{
                  color: "red",
                  blur: 3,
              }}
              size="sm" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDiscard} onClose={handleDiscardCancel} radius="lg" centered  withCloseButton={false} title="Confirm Discard">
              <Text size={"sm"} c={"dimmed"} style={{marginBottom:10}}>You will lose all the content you entered</Text>
              <Grid
              >
                  <Grid.Col span={"auto"}>
                      <Button radius="md" color="gray" fullWidth  onClick={() => setShowDiscard(false)}>
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
    </>
  );
}

*/

import React, { useEffect, useState } from 'react';
import './TransactionForm.css';

const TransactionForm = ({ transaction, onSave, onCancel }) => {
    const [dateTime, setDateTime] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [category, setCategory] = useState('');
    const [accountName, setAccountName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (transaction) {
            setDateTime(transaction.dateTime);
            setTransactionType(transaction.transactionType);
            setCategory(transaction.category);
            setAccountName(transaction.accountName);
            setPaymentMethod(transaction.paymentMethod);
            setAmount(transaction.amount);
        } else {
            resetForm();
        }
    }, [transaction]);

    const resetForm = () => {
        setDateTime('');
        setTransactionType('');
        setCategory('');
        setAccountName('');
        setPaymentMethod('');
        setAmount('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            id: transaction ? transaction.id : null,
            dateTime,
            transactionType,
            category,
            accountName,
            paymentMethod,
            amount: parseFloat(amount) || 0,
        };
        onSave(newTransaction);
        resetForm(); // Reset the form after saving
    };

    return (
        <div className="transaction-form">
            <h3>{transaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    placeholder="Transaction Type"
                    required
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    required
                />
                <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Account Name"
                    required
                />
                <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="Payment Method"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Save Transaction</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default TransactionForm;

