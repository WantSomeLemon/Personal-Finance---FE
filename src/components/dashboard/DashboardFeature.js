/*
import {Grid, Paper, Text} from "@mantine/core";
import {useSelector} from "react-redux";

export default function  DashboardFeture(){
    const accountList = useSelector(state => state.account.accountList)
    const budgetList = useSelector(state => state.budget.budgetList)
    const debtPending = 0;
    const goalList = useSelector(state => state.goal.goalList)
    function handleTotalBalanace(){
        return accountList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.currentBalance,
            0
        );
    }

    function pendingGoals(){
        let pendings=0
        for (let i=0;i<goalList.length;i++){
            if(goalList[i].status === 'Pending'){
                pendings = pendings +1
            }
        }
        return pendings
    }

    function handleTotalBudget(){
        return budgetList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.amount,
            0
        );
    }
    function handleTotalUsed(){
        return budgetList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.used,
            0
        );
    }
    return(
        <div>
            <Paper style={{ marginBottom: 16 }} radius="md" p="md" withBorder>
                <Grid>
                    <Grid.Col span={6} sm={6} md={3}>
                        <Text size={"xl"} fw={700}>{handleTotalBalanace()>0 ? `Rs. ${handleTotalBalanace().toLocaleString("en-US")}` : `-`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            TOTAL BALANCE
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={6} sm={6} md={3}>
                        <Text size={"xl"} fw={700}>{handleTotalBudget()>0 ? `${Math.floor((100 * handleTotalUsed()) / handleTotalBudget())}%` : `-`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            BUDGET USED
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={6} sm={6} md={3}>
                        <Text size={"xl"} fw={700}>{`${debtPending} `}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            DEBTS PENDING
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={6} sm={6} md={3}>
                        <Text size={"xl"} fw={700}>{`${pendingGoals()} / ${goalList.length}`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            GOALS COMPLETED
                        </Text>
                    </Grid.Col>
                </Grid>
            </Paper>
        </div>
    )
}
*/


// DashboardFeature.js
import React from 'react';

const DashboardFeature = ({ label, value }) => {
    return (
        <div style={{ padding: '10px', textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '18px', color: '#333' }}>{label}</div>
            <strong style={{ fontSize: '20px', color: '#000' }}>{value}</strong>
        </div>
    );
};

export default DashboardFeature;
