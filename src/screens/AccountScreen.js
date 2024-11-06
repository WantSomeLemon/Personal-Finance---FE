/*import Layout from "../layout/Layout";
import AccountHeader from "../components/accounts/AccountHeader";
import AccountFeature from "../components/accounts/AccountFeature";
import AccountList from "../components/accounts/AccountList";
import {useDispatch, useSelector} from "react-redux";
import {fetchAccount} from "../features/accountSlice";
import {useEffect} from "react";
import {Container, Divider, Grid, Skeleton} from "@mantine/core";
import {validateToken} from "../features/userSlice";


export default function  AccountScreen(){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
        async function fetchData() {
            await dispatch(validateToken(token))
            dispatch(fetchAccount({token:token}))
        }
        fetchData()
    },[dispatch, token])
    const fetchAccountInProcess = useSelector(state => state.account.fetchAccountInProcess)
    const accountList = useSelector(state => state.account.accountList)
    function GridSkeleton(){
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
    return(
        <Layout title={"Accounts"} load={accountList.length>0}>
            {fetchAccountInProcess    ? <div>
                    <Container size={"xxl"}>
                        <Grid style={{marginBottom:10}}>
                            <Grid.Col span={2}>
                                <Skeleton height={16} mt={10} width="80%" radius="xl" />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Skeleton style={{marginBottom: 10}} height={36} radius="md"/>
                            </Grid.Col>
                        </Grid>
                        <Grid style={{marginBottom:20}}>
                            <Grid.Col span={2}>
                                <Skeleton style={{marginBottom: 10}} height={80} radius="md"/>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Skeleton style={{marginBottom: 10}} height={80} radius="md"/>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Skeleton style={{marginBottom: 10}} height={80} radius="md"/>
                            </Grid.Col>
                        </Grid>
                        <GridSkeleton></GridSkeleton>
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
                    <AccountHeader/>
                    <AccountFeature/>
                    <AccountList/>
                </div>}

        </Layout>
)
}

*/

import React, { useState } from 'react';
import AccountList from '../components/accounts/AccountList'; // Component for account list
// import AccountForm from '../components/accounts/AccountForm'; // Component for account form
import Layout from '../layout/Layout'; // Layout containing header and sidebar

const AccountScreen = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, creditor: 'Bank A', amount: 1000 }, // Replace "creditor" with "accountName" or any other relevant field
    { id: 2, creditor: 'Bank B', amount: 2000 },
  ]); // Initial account data
  const [currentAccount, setCurrentAccount] = useState(null); // Store current account information for editing

  // Add or update account
  const handleSaveAccount = (account) => {
    if (account.id) {
      // If id exists, update account
      setAccounts(accounts.map(a => a.id === account.id ? account : a));
    } else {
      // If no id, add new account
      account.id = accounts.length + 1;
      setAccounts([...accounts, account]);
    }
    setCurrentAccount(null); // Reset form after saving
  };

  // Delete account
  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter(a => a.id !== id)); // Filter the account list to remove the deleted account
  };

  return (
    <Layout title={"Accounts"} load={accounts.length > 0}>
      {/* Current account list */}
      <AccountList accounts={accounts} onEditAccount={setCurrentAccount} onDeleteAccount={handleDeleteAccount} />
    </Layout>
  );
};

export default AccountScreen;
