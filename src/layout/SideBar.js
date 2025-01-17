/*import {Box, Text, Navbar, Menu, NavLink, Button, Avatar, Grid, rem, Group} from "@mantine/core";
import { ReactComponent as DashboardIcon } from "../assets/Widget.svg";
import { ReactComponent as DashboardIconBlue } from "../assets/Widget_Blue.svg";
import { ReactComponent as TransactionsIcon } from "../assets/Collapse.svg";
import { ReactComponent as TransactionsIconBlue } from "../assets/Collapse_Blue.svg";
import { ReactComponent as AccountsIcon } from "../assets/Database.svg";
import { ReactComponent as AccountsIconBlue } from "../assets/Database_fill_Blue.svg";
import { ReactComponent as BudgetIcon } from "../assets/Date_range.svg";
import { ReactComponent as BudgetIconBlue } from "../assets/Date_range_Blue.svg";
import { ReactComponent as GoalsIcon } from "../assets/Road_finish.svg";
import { ReactComponent as GoalsIconBlue } from "../assets/Road_finish_Blue.svg";
import { ReactComponent as DebtsIcon } from "../assets/Calendar.svg";
import { ReactComponent as DebtsIconBlue } from "../assets/Calendar_fill_Blue.svg";
import { ReactComponent as ReportsIcon } from "../assets/Desk_alt.svg";
import { ReactComponent as ReportsIconBlue } from "../assets/Desk_alt_Blue.svg";
import {AddIcon} from "../assets/assets";
import { ReactComponent as AddCategoryIcon } from "../assets/Folder_add_duotone_line.svg";
import { ReactComponent as AddDebtIcon } from "../assets/Calendar_add_duotone.svg";
import { ReactComponent as AddBudgetIcon } from "../assets/Date_range_duotone.svg";
import { ReactComponent as AddTransactionIcon } from "../assets/Collapse_light_duotone.svg";
import { ReactComponent as AddAccountIcon } from "../assets/Database_duotone.svg";
import { ReactComponent as AddGoalIcon } from "../assets/Road_finish_duotone_line.svg";
import {ReactComponent as AvatarIcon} from "../assets/User_duotone.svg";
import React from "react";


import { useNavigate } from "react-router-dom";
import CategoryForm from '../components/category/CategoryForm';
import {useDispatch, useSelector} from "react-redux";
import {closeCategoryForm, showCategoryForm} from "../features/categorySlice";
import {closeTransactionForm, showTransactionForm} from "../features/transactionSlice";
import {closeAccountForm, showAccountForm} from "../features/accountSlice";
import AccountForm from '../components/accounts/AccountForm';
import TransactionForm from '../components/transactions/TransactionForm'; // Đảm bảo đường dẫn đúng

import BudgetForm from '../components/budget/BudgetForm';
import { showBudgetForm} from "../features/budgetSlice";
import GoalForm from '../components/goals/GoalForm';
import {closeGoalForm, showGoalForm} from "../features/goalSlice";


export default function SideBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const displayCategoryForm = useSelector(state => state.category.displayCategoryForm)
  const displayTransactionForm = useSelector(state => state.transaction.displayTransactionForm)
  const displayAccountForm = useSelector(state => state.account.displayAccountForm)
  const displayBudgetForm = useSelector(state => state.budget.displayBudgetForm)
  const displayGoalForm = useSelector(state => state.goal.displayGoalForm)
  const currentUser = useSelector(state => state.user.currentUser)
  function handleCategoryFormClose() {
    dispatch(closeCategoryForm());
  }
  function handleTransactionFormClose() {
    dispatch(closeTransactionForm());
  }
  function handleAccountFormClose() {
    dispatch(closeAccountForm());
  }


  function handleBudgetFormClose() {
    dispatch(closeGoalForm());
  }

  
  function navStyle(){
    if(props.isMobile){
      return {
        display: props.navOpened ? 'block' : 'none'
      }
    }else{
      return {}
    }
  }

  function fontSize(){
    if(props.isMobile){
      return "lg"
    }else {
      return "sm"
    }

  }
  return (
    <div>
      <Navbar style={navStyle()}
        width={{
          // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
          sm: 300,

          // When viewport is larger than theme.breakpoints.lg, Navbar width will be 400
          lg: 250,

          // When other breakpoints do not match base width is used, defaults to 100%
          base: 0,
        }}
      >
        <Navbar.Section grow >
          <div style={{ padding: 10 }}>
            {props.isMobile ?
                <Box style={{ padding: 10 }}>
                  <Grid style={{marginTop:5}}>
                    <Grid.Col style={{ display: 'flex', justifyContent: 'center' }}>
                      <AvatarIcon  style={{
                        width: 100,
                        height: 100,
                        objectFit: "contain",
                        borderStyle:"solid",
                        borderWidth:1,
                        borderColor:"rgba(0,0,0,0.2)",
                        borderRadius: "1000px",
                      }}/>
                    </Grid.Col>
                  </Grid>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={{height: rem(58),marginBottom:20}} radius={"md"} variant={"subtle"}>
                      <Grid>
                        <Grid.Col>
                          <Group style={{margin:10}}>
                            <div style={{ flex: 1 }}>
                              <Text size="lg" fw={700}>{currentUser.firstName}
                              </Text>
                              <Text c={"dimmed"} size="sm">{currentUser.email.length>16 ? `${currentUser.email.slice(0,16)}...`:currentUser.email}
                              </Text>
                            </div>
                          </Group>
                        </Grid.Col>
                      </Grid>
                    </Button>
                  </div>
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10}}
                      label={props.currentPage === "Dashboard" ?<Text size={"lg"} fw={600}>Dashboard</Text>:<Text size={"lg"}>Dashboard</Text>}
                      icon={props.currentPage === "Dashboard" ?<DashboardIconBlue style={{width:22,height:22}}/> : <DashboardIcon style={{width:22,height:22}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/dashboard")}
                      active={props.currentPage === "Dashboard"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Transactions" ?<Text size={"lg"} fw={600}>Transactions</Text>:<Text size={"lg"}>Transactions</Text>}
                      icon={props.currentPage === "Transactions" ?<TransactionsIconBlue style={{width:22,height:22}}/> : <TransactionsIcon style={{width:22,height:22}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/transaction")}
                      active={props.currentPage === "Transactions"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10}}
                      label={props.currentPage === "Accounts" ?<Text size={"lg"} fw={600}>Accounts</Text>:<Text size={"lg"}>Accounts</Text>}
                      icon={props.currentPage === "Accounts" ?<AccountsIconBlue style={{width:22,height:22}}/> : <AccountsIcon style={{width:22,height:22}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/account")}
                      active={props.currentPage === "Accounts"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Budgets" ?<Text size={"lg"} fw={600}>Budgets</Text>:<Text size={"lg"}>Budgets</Text>}
                      icon={props.currentPage === "Budgets" ?<BudgetIconBlue style={{width:22,height:22}}/> : <BudgetIcon style={{width:22,height:22}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/budget")}
                      active={props.currentPage === "Budgets"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Goals" ?<Text size={"lg"} fw={600}>Goals</Text>:<Text size={"lg"}>Goals</Text>}
                      icon={props.currentPage === "Goals" ?<GoalsIconBlue style={{width:22,height:22}}/> : <GoalsIcon style={{width:22,height:22}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/goal")}
                      active={props.currentPage === "Goals"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Debts" ?<Text size={"lg"} fw={600}>Debts</Text>:<Text size={"lg"}>Debts</Text>}
                      icon={props.currentPage === "Debts" ?<DebtsIconBlue style={{width:22,height:22}}/> : <DebtsIcon style={{width:22,height:22}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/debts")}
                      active={props.currentPage === "Debts"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Reports" ?<Text size={"lg"} fw={600}>Reports</Text>:<Text size={"lg"}>Reports</Text>}
                      icon={props.currentPage === "Reports" ?<ReportsIconBlue style={{width:22,height:22}}/> : <ReportsIcon style={{width:22,height:22}}/>}
                      onClick={() => navigate("/report")}
                      rightSection={<></>}
                      active={props.currentPage === "Reports"}
                  />
                </Box>
                :
                <Box>
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10}}
                      label={props.currentPage === "Dashboard" ?<Text fw={600}>Dashboard</Text>:<Text>Dashboard</Text>}
                      icon={props.currentPage === "Dashboard" ?<DashboardIconBlue style={{width:16,height:16}}/> : <DashboardIcon style={{width:16,height:16}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/dashboard")}
                      active={props.currentPage === "Dashboard"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Transactions" ?<Text fw={600}>Transactions</Text>:<Text>Transactions</Text>}
                      icon={props.currentPage === "Transactions" ?<TransactionsIconBlue style={{width:16,height:16}}/> : <TransactionsIcon style={{width:16,height:16}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/transaction")}
                      active={props.currentPage === "Transactions"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10}}
                      label={props.currentPage === "Accounts" ?<Text fw={600}>Accounts</Text>:<Text>Accounts</Text>}
                      icon={props.currentPage === "Accounts" ?<AccountsIconBlue style={{width:16,height:16}}/> : <AccountsIcon style={{width:16,height:16}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/account")}
                      active={props.currentPage === "Accounts"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Budgets" ?<Text fw={600}>Budgets</Text>:<Text>Budgets</Text>}
                      icon={props.currentPage === "Budgets" ?<BudgetIconBlue style={{width:16,height:16}}/> : <BudgetIcon style={{width:16,height:16}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/budget")}
                      active={props.currentPage === "Budgets"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Goals" ?<Text fw={600}>Goals</Text>:<Text>Goals</Text>}
                      icon={props.currentPage === "Goals" ?<GoalsIconBlue style={{width:16,height:16}}/> : <GoalsIcon style={{width:16,height:16}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/goal")}
                      active={props.currentPage === "Goals"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Debts" ?<Text fw={600}>Debts</Text>:<Text>Debts</Text>}
                      icon={props.currentPage === "Debts" ?<DebtsIconBlue style={{width:16,height:16}}/> : <DebtsIcon style={{width:16,height:16}}/>}
                      rightSection={<></>}
                      onClick={() => navigate("/debts")}
                      active={props.currentPage === "Debts"}
                  />
                  <NavLink
                      style={{ borderRadius: 8,marginBottom:10 }}
                      label={props.currentPage === "Reports" ?<Text fw={600}>Reports</Text>:<Text>Reports</Text>}
                      icon={props.currentPage === "Reports" ?<ReportsIconBlue style={{width:16,height:16}}/> : <ReportsIcon style={{width:16,height:16}}/>}
                      onClick={() => navigate("/report")}
                      rightSection={<></>}
                      active={props.currentPage === "Reports"}
                  />
                </Box>}
          </div>
        </Navbar.Section>
        <Navbar.Section>
          {props.isMobile ? <div></div> :
              <Menu position="right" radius={"md"} withArrow shadow="xl" width={200} transitionProps={{ transition: 'scale-x', duration: 150 }}>
                <Menu.Target >
                  <div style={{ padding: 10 }}>
                    <Button
                        leftIcon={<AddIcon style={{width:16,height:16}}/>}
                        radius={"md"}
                        fullWidth
                    >
                      Add
                    </Button>
                  </div>

                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<AddCategoryIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() => dispatch(showCategoryForm())}>
                    <Text size={"sm"}>Add Category</Text>
                  </Menu.Item>
                  <Menu.Item icon={<AddAccountIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() => dispatch(showAccountForm())}>
                    Add Account
                  </Menu.Item>
                  <Menu.Item icon={<AddTransactionIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() => dispatch(showTransactionForm())}>
                    Add Transaction
                  </Menu.Item>
                  <Menu.Item icon={<AddBudgetIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() =>dispatch(showBudgetForm())}>
                    Add Budget
                  </Menu.Item>
                  <Menu.Item icon={<AddGoalIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }} onClick={() => dispatch(showGoalForm())}>
                    Add Goal
                  </Menu.Item>
                  <Menu.Item icon={<AddDebtIcon style={{height:20,width:20}} />}  transitionProps={{ transition: 'rotate-right', duration: 150 }}  >
                    Add Debt
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
          }
          <CategoryForm
            open={displayCategoryForm}
            close={handleCategoryFormClose}
          ></CategoryForm>
          <AccountForm
              open={displayAccountForm}
              close={handleAccountFormClose}></AccountForm>
          <TransactionForm
              open={displayTransactionForm}
              close={handleTransactionFormClose}></TransactionForm>
          <BudgetForm open={displayBudgetForm} close={handleBudgetFormClose}/>
          <GoalForm open={displayGoalForm} close={handleBudgetFormClose}/>

        </Navbar.Section>
      </Navbar>
    </div>
  );
}

*/
import {
  Box,
  Text,
  Navbar,
  Menu,
  NavLink,
  Button,
  Avatar,
  Grid,
  rem,
  Group,
} from "@mantine/core";
import { ReactComponent as DashboardIcon } from "../assets/Widget.svg";
import { ReactComponent as DashboardIconBlue } from "../assets/Widget_Blue.svg";
import { ReactComponent as TransactionsIcon } from "../assets/Collapse.svg";
import { ReactComponent as TransactionsIconBlue } from "../assets/Collapse_Blue.svg";
import { ReactComponent as AccountsIcon } from "../assets/Database.svg";
import { ReactComponent as AccountsIconBlue } from "../assets/Database_fill_Blue.svg";
import { ReactComponent as BudgetIcon } from "../assets/Date_range.svg";
import { ReactComponent as BudgetIconBlue } from "../assets/Date_range_Blue.svg";
import { ReactComponent as GoalsIcon } from "../assets/Road_finish.svg";
import { ReactComponent as GoalsIconBlue } from "../assets/Road_finish_Blue.svg";
import { ReactComponent as DebtsIcon } from "../assets/Calendar.svg";
import { ReactComponent as DebtsIconBlue } from "../assets/Calendar_fill_Blue.svg";
import { ReactComponent as ReportsIcon } from "../assets/Desk_alt.svg";
import { ReactComponent as ReportsIconBlue } from "../assets/Desk_alt_Blue.svg";
import { AddIcon } from "../assets/assets";
import { ReactComponent as AddCategoryIcon } from "../assets/Folder_add_duotone_line.svg";
import { ReactComponent as AddDebtIcon } from "../assets/Calendar_add_duotone.svg";
import { ReactComponent as AddBudgetIcon } from "../assets/Date_range_duotone.svg";
import { ReactComponent as AddTransactionIcon } from "../assets/Collapse_light_duotone.svg";
import { ReactComponent as AddAccountIcon } from "../assets/Database_duotone.svg";
import { ReactComponent as AddGoalIcon } from "../assets/Road_finish_duotone_line.svg";
import { ReactComponent as AvatarIcon } from "../assets/User_duotone.svg";
import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCategoryForm,
  showCategoryForm,
} from "../features/categorySlice";
import {
  closeTransactionForm,
  showTransactionForm,
} from "../features/transactionSlice";
import { closeAccountForm, showAccountForm } from "../features/accountSlice";
import { closeGoalForm, showGoalForm } from "../features/goalSlice";
import { showBudgetForm } from "../features/budgetSlice";
import DebtForm from '../components/debts/DebtForm'; // Ensure you import your DebtForm component
import TransactionForm from '../components/transactions/TransactionForm'; // Import TransactionForm
import AccountForm from '../components/accounts/AccountForm'; // Import AccountForm
import GoalForm from '../components/goals/GoalForm'; // Import GoalForm
import BudgetForm from '../components/budget/BudgetForm'; // Import BudgetForm

export default function SideBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  // State for showing the forms
  const [isDebtFormVisible, setIsDebtFormVisible] = useState(false);
  const [isTransactionFormVisible, setIsTransactionFormVisible] = useState(false);
  const [isAccountFormVisible, setIsAccountFormVisible] = useState(false);
  const [isGoalFormVisible, setIsGoalFormVisible] = useState(false);
  const [isBudgetFormVisible, setIsBudgetFormVisible] = useState(false);

  const navLinks = [
    { name: "Dashboard", icon: DashboardIcon, iconBlue: DashboardIconBlue },
    { name: "Transactions", icon: TransactionsIcon, iconBlue: TransactionsIconBlue },
    { name: "Accounts", icon: AccountsIcon, iconBlue: AccountsIconBlue },
    { name: "Budgets", icon: BudgetIcon, iconBlue: BudgetIconBlue },
    { name: "Goals", icon: GoalsIcon, iconBlue: GoalsIconBlue },
    { name: "Debts", icon: DebtsIcon, iconBlue: DebtsIconBlue },
    { name: "Reports", icon: ReportsIcon, iconBlue: ReportsIconBlue },
  ];

  function navStyle() {
    return props.isMobile ? { display: props.navOpened ? 'block' : 'none' } : {};
  }

  return (
    <div>
      <Navbar style={navStyle()} width={{ sm: 300, lg: 250, base: 0 }}>
        <Navbar.Section grow>
          <Box style={{ padding: 10 }}>
            {props.isMobile && (
              <Grid style={{ marginTop: 5 }}>
                <Grid.Col style={{ display: 'flex', justifyContent: 'center' }}>
                  <AvatarIcon
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "contain",
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.2)",
                      borderRadius: "1000px",
                    }}
                  />
                </Grid.Col>
              </Grid>
            )}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button style={{ height: rem(58), marginBottom: 20 }} radius={"md"} variant={"subtle"}>
                <Grid>
                  <Grid.Col>
                    <Group style={{ margin: 10 }}>
                      <div style={{ flex: 1 }}>
                        <Text size="lg" fw={700}>{currentUser.firstName}</Text>
                        <Text c={"dimmed"} size="sm">
                          {currentUser.email.length > 16 ? `${currentUser.email.slice(0, 16)}...` : currentUser.email}
                        </Text>
                      </div>
                    </Group>
                  </Grid.Col>
                </Grid>
              </Button>
            </div>

            {navLinks.map(({ name, icon: Icon, iconBlue: IconBlue }) => (
              <NavLink
                key={name}
                style={{ borderRadius: 8, marginBottom: 10 }}
                label={
                  props.currentPage === name
                    ? <Text size={"lg"} fw={600}>{name}</Text>
                    : <Text size={"lg"}>{name}</Text>
                }
                icon={props.currentPage === name ? <IconBlue style={{ width: 22, height: 22 }} /> : <Icon style={{ width: 22, height: 22 }} />}
                onClick={() => navigate(`/${name.toLowerCase()}`)}
                active={props.currentPage === name}
              />
            ))}
          </Box>
        </Navbar.Section>
        <Navbar.Section>
          {!props.isMobile && (
            <Menu position="right" radius={"md"} withArrow shadow="xl" width={200} transitionProps={{ transition: 'scale-x', duration: 150 }}>
              <Menu.Target>
                <div style={{ padding: 10 }}>
                  <Button leftIcon={<AddIcon style={{ width: 16, height: 16 }} />} radius={"md"} fullWidth>
                    Add
                  </Button>
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<AddCategoryIcon style={{ height: 20, width: 20 }} />}
                  onClick={() => dispatch(showCategoryForm())}
                >
                  <Text size={"sm"}>Add Category</Text>
                </Menu.Item>
                <Menu.Item
                  icon={<AddAccountIcon style={{ height: 20, width: 20 }} />}
                  onClick={() => {
                    setIsAccountFormVisible(true); // Show the AccountForm
                  }}
                >
                  Add Account
                </Menu.Item>
                <Menu.Item
                  icon={<AddTransactionIcon style={{ height: 20, width: 20 }} />}
                  onClick={() => {
                    setIsTransactionFormVisible(true); // Show the TransactionForm
                  }}
                >
                  Add Transaction
                  
                </Menu.Item>
                <Menu.Item
                  icon={<AddBudgetIcon style={{ height: 20, width: 20 }} />}
                  onClick={() => {
                    setIsBudgetFormVisible(true); // Show the BudgetForm
                  }}
                >
                  Add Budget
                </Menu.Item>
                <Menu.Item
                  icon={<AddGoalIcon style={{ height: 20, width: 20 }} />}
                  onClick={() => {
                    setIsGoalFormVisible(true); // Show the GoalForm
                  }}
                >
                  Add Goal
                </Menu.Item>
                <Menu.Item
                  icon={<AddDebtIcon style={{ height: 20, width: 20 }} />}
                  onClick={() => {
                    setIsDebtFormVisible(true); // Show the DebtForm
                  }}
                >
                  Add Debt
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Navbar.Section>
      </Navbar>

      {/* Modals for showing the various forms */}
      {isDebtFormVisible && (
        <div className="modal-overlay">
          <div className="debt-form-container">
            <DebtForm
              onClose={() => setIsDebtFormVisible(false)} // Close the DebtForm
            />
          </div>
        </div>
      )}
      {isTransactionFormVisible && (
        <div className="modal-overlay">
          <div className="transaction-form-container">
            <TransactionForm
              onClose={() => setIsTransactionFormVisible(false)} // Close the TransactionForm
            />
          </div>
        </div>
      )}
      {isAccountFormVisible && (
        <div className="modal-overlay">
          <div className="account-form-container">
            <AccountForm
              onClose={() => setIsAccountFormVisible(false)} // Close the AccountForm
            />
          </div>
        </div>
      )}
      {isGoalFormVisible && (
        <div className="modal-overlay">
          <div className="goal-form-container">
            <GoalForm
              onClose={() => setIsGoalFormVisible(false)} // Close the GoalForm
            />
          </div>
        </div>
      )}
      {isBudgetFormVisible && (
        <div className="modal-overlay">
          <div className="budget-form-container">
            <BudgetForm
              onClose={() => setIsBudgetFormVisible(false)} // Close the BudgetForm
            />
          </div>
        </div>
      )}
    </div>
  );
}
