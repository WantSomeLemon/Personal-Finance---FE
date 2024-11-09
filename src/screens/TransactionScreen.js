/*import Layout from "../layout/Layout"
import TransactionHeader from "../components/transactions/TransactionHeader"
import TransactionList from "../components/transactions/TransactionList"
import TransactionForm from "../components/transactions/TransactionForm"
import {useDispatch, useSelector} from "react-redux";
import {fetchTransaction} from "../features/transactionSlice";
import {useEffect} from "react";
import {Container, Divider, Grid, Skeleton} from '@mantine/core';
import {validateToken} from "../features/userSlice";

export default function TransactionScreen() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const fetchTransactionInProcess = useSelector(state => state.transaction.fetchTransactionInProcess)
    useEffect( () => {
        async function fetchData() {
            await dispatch(validateToken(token))
            await dispatch(fetchTransaction({token: token}))
        }
        fetchData()
    },[dispatch, token])
    const transactionList = useSelector(state => state.transaction.transactionList)
    function GridSkeleton(){
        return(
            <Grid style={{height:90}}>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="50%" radius="xl" />
                    <Skeleton height={10} mt={10} width="20%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="50%" radius="xl" />
                    <Skeleton height={8} mt={10} width="60%" radius="xl" />
                    <Skeleton height={8} mt={10} width="30%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="30%" radius="xl" />
                    <Skeleton height={10} mt={10} width="50%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={10} width="30%" radius="xl" />
                </Grid.Col>

            </Grid>
        )
    }

    function SmallGridSkeleton(){
        return(
            <Grid style={{height:60}}>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="50%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="50%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={6} width="30%" radius="xl" />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Skeleton height={12} mt={10} width="30%" radius="xl" />
                </Grid.Col>

            </Grid>
        )
    }
  return (
    <Layout title={"Transactions"} load={transactionList.length>0}>
        {fetchTransactionInProcess ? <div>
            <Container size={"xxl"}>
                <Grid style={{marginBottom:20}}>
                    <Grid.Col span={2}>
                        <Skeleton height={16} mt={10} width="80%" radius="xl" />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Skeleton style={{marginBottom: 10}} height={36} radius="md"/>
                    </Grid.Col>
                </Grid>
                <SmallGridSkeleton></SmallGridSkeleton>
                <Divider style={{marginBottom:20}}></Divider>
                <GridSkeleton></GridSkeleton>
                <Divider style={{marginBottom:10}}></Divider>
                <GridSkeleton></GridSkeleton>
                <Divider style={{marginBottom:10}}></Divider>
                <GridSkeleton></GridSkeleton>
                <Divider style={{marginBottom:10}}></Divider>
                <GridSkeleton></GridSkeleton>
            </Container>
        </div> :
            <div>
                <TransactionHeader />
                <TransactionList/>
                <TransactionForm/>
            </div>}

    </Layout>
  )
}
*/
import React, { useState } from "react";
import TransactionList from "../components/transactions/TransactionList";
import Layout from "../layout/Layout";

const TransactionScreen = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      dateTime: "August 2, 2023 11:42:37 AM",
      transactionType: "Spent on",
      category: "Utilities",
      accountName: "Techcombank",
      paymentMethod: "Cash",
      amount: -1000,
    },
    {
      id: 2,
      dateTime: "August 2, 2023 11:41:54 AM",
      transactionType: "Spent on",
      category: "Groceries",
      accountName: "MBbank",
      paymentMethod: "Cash",
      amount: -3000,
    },
    {
      id: 3,
      dateTime: "August 2, 2023 11:41:54 AM",
      transactionType: "Spent on",
      category: "Groceries",
      accountName: "MBbank",
      paymentMethod: "Cash",
      amount: -3000,
    },
    {
      id: 4,
      dateTime: "August 2, 2023 11:41:54 AM",
      transactionType: "Spent on",
      category: "Groceries",
      accountName: "MBbank",
      paymentMethod: "Cash",
      amount: -3000,
    },
    {
      id: 5,
      dateTime: "August 2, 2023 11:41:54 AM",
      transactionType: "Spent on",
      category: "Groceries",
      accountName: "MBbank",
      paymentMethod: "Cash",
      amount: -3000,
    },
    {
      id: 6,
      dateTime: "August 2, 2023 11:41:54 AM",
      transactionType: "Spent on",
      category: "Groceries",
      accountName: "MBbank",
      paymentMethod: "Cash",
      amount: -3000,
    },
    {
      id: 7,
      dateTime: "August 2, 2023 11:41:54 AM",
      transactionType: "Spent on",
      category: "Groceries",
      accountName: "MBbank",
      paymentMethod: "Cash",
      amount: -3000,
    },
  ]);

  const handleSaveTransaction = (newTransaction) => {
    if (newTransaction.id) {
      // Update existing transaction
      setTransactions(
        transactions.map((t) =>
          t.id === newTransaction.id ? { ...t, ...newTransaction } : t
        )
      );
    } else {
      // Create new transaction
      const newId =
        transactions.length > 0
          ? Math.max(...transactions.map((t) => t.id)) + 1
          : 1;
      setTransactions([...transactions, { ...newTransaction, id: newId }]);
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <Layout title="Transactions" load={transactions.length > 0}>
      <div className="transaction-screen">
        <TransactionList
          transactions={transactions}
          onAddTransaction={handleSaveTransaction} // Pass the function to add transactions
          onEditTransaction={handleSaveTransaction} // Pass the same function for editing
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </Layout>
  );
};

export default TransactionScreen;
