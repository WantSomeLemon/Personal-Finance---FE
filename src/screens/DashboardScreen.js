import { Divider, Grid, Paper, Text, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../api/config";
import BarChart from "../components/dashboard/BarChart";
import DashboardFeture from "../components/dashboard/DashboardFeature";
import ExpensesPieChart from "../components/dashboard/ExpensesPieChart";
import IncomePieChart from "../components/dashboard/IncomePieChart";
import Layout from "../components/layout/Layout";
import { fetchAccount } from "../features/accountSlice";
import { fetchBudget } from "../features/budgetSlice";
import { fetchGoal } from "../features/goalSlice";
import { validateToken } from "../features/userSlice";

export default function DashboardScreen() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const isMobile = useSelector((state) => state.user.isMobile);
  
  // State to hold total income and expenses data
  const [result, setResult] = useState({
    total_expenses: 0,
    total_income: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Dispatch actions to validate token and fetch data for budget, account, and goal
        await dispatch(validateToken(token));
        dispatch(fetchBudget({ token: token }));
        dispatch(fetchAccount({ token: token }));
        dispatch(fetchGoal({ token: token }));

        // Fetch the total income and expenses for this month using the local token
        const localToken = localStorage.getItem("token");
        const res = await axios.get(`${baseUrl}/dashboard/this-month/total/income-and-expenses`, {
          headers: { Authorization: `Bearer ${localToken}` },
        });
        // Update state with the fetched data
        setResult(res.data.data);
      } catch (err) {
        // Handle any errors that may occur during the data fetching
        console.error("Error fetching dashboard data:", err);
        // Optionally, you can dispatch an error action or display a message to the user
      }
    }

    // Fetch data when the component mounts
    fetchData();
  }, [dispatch, token]);

  return (
    <Layout title={"Dashboard"} load={true}>
      <div>
        <Title style={{ margin: 5, marginBottom: 10 }} order={2}>
          Dashboard
        </Title>
        {/* Dashboard Feature Section */}
        <DashboardFeture />

        <Grid style={{ height: 300 }}>
          {/* Responsive Grid layout based on screen size */}
          <Grid.Col span={12} md={6}>
            {isMobile ? (
              <div>
                {/* Mobile-specific layout for expenses and income */}
                <Paper style={{ marginBottom: 10 }} radius="md" p="md" withBorder>
                  <Grid>
                    <Grid.Col span={12} md={6}>
                      <Title order={4}>
                        {result?.total_expenses > 0
                          ? `${result?.total_expenses.toLocaleString("en-US")} .VND`
                          : `-`}
                      </Title>
                      <Text c={"dimmed"}>This Month Expenses</Text>
                    </Grid.Col>
                  </Grid>
                  <Divider my="sm" style={{ marginBottom: 20 }} />
                  <Grid>
                    <Grid.Col span={12} md={6}>
                      <ExpensesPieChart />
                    </Grid.Col>
                  </Grid>
                </Paper>

                <Paper radius="md" p="md" withBorder>
                  <Grid>
                    <Grid.Col span={12} md={6}>
                      <Title style={{ color: "#26AB35" }} order={4}>
                        {result?.total_income > 0
                          ? `${result?.total_income.toLocaleString("en-US")} .VND`
                          : `-`}
                      </Title>
                      <Text c={"dimmed"}>This Month Income</Text>
                    </Grid.Col>
                  </Grid>
                  <Divider my="sm" style={{ marginBottom: 20 }} />
                  <Grid>
                    <Grid.Col span={12} md={6}>
                      <IncomePieChart />
                    </Grid.Col>
                  </Grid>
                </Paper>
              </div>
            ) : (
              <Paper radius="md" p="md" withBorder>
                {/* Desktop layout for expenses and income */}
                <Grid>
                  <Grid.Col span={12} md={6}>
                    <Title order={4}>
                      {result?.total_expenses > 0
                        ? `${result?.total_expenses.toLocaleString("en-US")} .VND`
                        : `-`}
                    </Title>
                    <Text c={"dimmed"}>This Month Expenses</Text>
                  </Grid.Col>
                  <Grid.Col span={12} md={6}>
                    <Title style={{ color: "#26AB35" }} order={4}>
                      {result?.total_income > 0
                        ? `${result?.total_income.toLocaleString("en-US")} .VND`
                        : `-`}
                    </Title>
                    <Text c={"dimmed"}>This Month Income</Text>
                  </Grid.Col>
                </Grid>
                <Divider my="sm" style={{ marginBottom: 20 }} />
                <Grid>
                  <Grid.Col span={8} md={6}>
                    <ExpensesPieChart />
                  </Grid.Col>
                  <Grid.Col span={8} md={6}>
                    <IncomePieChart />
                  </Grid.Col>
                </Grid>
              </Paper>
            )}
          </Grid.Col>

          {/* Last 6 months chart */}
          <Grid.Col span={12} md={6}>
            <Paper radius="md" p="md" withBorder>
              <Title order={4}>Last 6 month</Title>
              <Text c={"dimmed"}>Income and expenses</Text>
              <Divider my="sm" />
              <BarChart />
            </Paper>
          </Grid.Col>
        </Grid>
      </div>
    </Layout>
  );
}
