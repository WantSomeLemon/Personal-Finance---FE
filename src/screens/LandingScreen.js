import React from "react";
import {
  Title,
  Grid,
  Container,
  Text,
  Button,
  List,
  Paper,
  Card,
  Center,
} from "@mantine/core";
import HeaderBar from "../components/layout/HeaderBar";
import { LeaderSVG } from "../assets/assets";
import { ArrowRightIcon } from "../assets/assets";
import { ReactComponent as ManageMoneySVG } from "../assets/Manage money.svg";
import { ReactComponent as CheckIcon } from "../assets/Check_round_fill.svg";
import { ReactComponent as ExpensesSVG } from "../assets/Receipt.svg";
import { ReactComponent as BudgetingSVG } from "../assets/Budgeting.svg";
import { ReactComponent as SavingSVG } from "../assets/Piggy bank.svg";
import { ReactComponent as DebtManageSVG } from "../assets/Debt Manage.svg";
import { AppLogo } from "../assets/assets";
import { useDispatch } from "react-redux";
import { openSignupForm } from "../features/userSlice";

export default function LandingScreen() {
  const dispatch = useDispatch();

  // Exception handling and dispatching openSignupForm action when the user clicks the "Get Started" button
  const handleSignup = () => {
    try {
      // Dispatch an action to open the signup form
      dispatch(openSignupForm());
    } catch (error) {
      // Handle any errors during dispatch
      console.error("Error opening signup form:", error);
      // Optionally, show a notification to the user
    }
  };

  return (
    <div>
      {/* Header Bar */}
      <HeaderBar isLandingPage={true} />

      {/* Main Section */}
      <Container size="xl">
        {/* First Section: Empowering Finances */}
        <Container size={"lg"}>
          <Grid style={{ marginTop: 40 }} justify="center" align="center">
            <Grid.Col md={6} lg={6}>
              <Title style={{ textAlign: "left" }} size="48">
                Empower your finances, simplify your life.
              </Title>
              <Text c="dimmed" style={{ marginTop: 10, textAlign: "left" }}>
                Person-Finance: Simplify payments, track expenses, achieve
                financial goals
              </Text>
              <Button
                onClick={handleSignup} // Calls the handleSignup function on button click
                size={"md"}
                radius="xl"
                style={{ marginTop: 20 }}
                rightIcon={<ArrowRightIcon />}
              >
                Get started
              </Button>
            </Grid.Col>
            <Grid.Col md={6} lg={6}>
              <Center>
                <LeaderSVG />
              </Center>
            </Grid.Col>
          </Grid>
        </Container>

        {/* Second Section: Effective Money Management */}
        <Container size={"lg"} style={{ marginTop: 150 }}>
          <Paper shadow="sm" radius="lg" p="md">
            <Grid>
              <Grid.Col justify="center" align="center" md={6} lg={6}>
                <ManageMoneySVG style={{ width: 350, height: 350 }} />
              </Grid.Col>
              <Grid.Col justify="center" md={6} lg={3}>
                <Title style={{ textAlign: "left" }} size="32">
                  Effective Money Management
                </Title>
                <Text
                  c="dimmed"
                  style={{ fontSize: 18, marginTop: 10, textAlign: "left" }}
                >
                  Effective money management is the key to achieving financial
                  stability and success. By taking control of your finances and
                  making informed decisions, you can pave the way for a secure
                  and prosperous future.
                </Text>
                <List
                  style={{ marginTop: 20 }}
                  spacing="xs"
                  size="sm"
                  center
                  icon={<CheckIcon />}
                >
                  <List.Item>Budgeting</List.Item>
                  <List.Item>Track Saving and Investing</List.Item>
                  <List.Item>Debt Management</List.Item>
                  <List.Item>Track and Control Expenses</List.Item>
                </List>
              </Grid.Col>
            </Grid>
          </Paper>
        </Container>

        {/* Third Section: Features */}
        <Container size={"lg"} style={{ marginTop: 100, marginBottom: 100 }}>
          <Title order={1}>Features</Title>
          <Grid style={{ marginTop: 50 }}>
            {/* Expense Tracking Feature */}
            <Grid.Col md={6} lg={3}>
              <Card shadow="sm" padding="sm" component="a" withBorder radius="lg">
                <Card.Section>
                  <ExpensesSVG style={{ width: 250, height: 200 }} />
                </Card.Section>
                <Text weight={500} size="lg" mt="md">
                  Track and Control Expenses
                </Text>
                <Text mt="xs" color="dimmed" size="sm">
                  Maintaining a clear understanding of your expenses is crucial
                  for effective money management. Use personal finance apps or
                  tracking tools to monitor your spending habits.
                </Text>
              </Card>
            </Grid.Col>

            {/* Budgeting Feature */}
            <Grid.Col md={6} lg={3}>
              <Card shadow="sm" padding="sm" component="a" withBorder radius="lg">
                <Card.Section>
                  <BudgetingSVG style={{ width: 250, height: 200 }} />
                </Card.Section>
                <Text weight={500} size="lg" mt="md">
                  Budgeting
                </Text>
                <Text mt="xs" color="dimmed" size="sm">
                  Creating and sticking to a budget is fundamental to money
                  management. Start by tracking your income and expenses, and
                  categorize them accordingly.
                </Text>
              </Card>
            </Grid.Col>

            {/* Saving and Investing Feature */}
            <Grid.Col md={6} lg={3}>
              <Card shadow="sm" padding="sm" component="a" withBorder radius="lg">
                <Card.Section>
                  <SavingSVG style={{ width: 250, height: 200 }} />
                </Card.Section>
                <Text weight={500} size="lg" mt="md">
                  Track Savings and Investings
                </Text>
                <Text mt="xs" color="dimmed" size="sm">
                  Building a savings habit is crucial for financial security.
                  Allocate a portion of your income towards savings each month.
                </Text>
              </Card>
            </Grid.Col>

            {/* Debt Management Feature */}
            <Grid.Col md={6} lg={3}>
              <Card shadow="sm" padding="sm" component="a" withBorder radius="lg">
                <Card.Section>
                  <DebtManageSVG style={{ width: 250, height: 200 }} />
                </Card.Section>
                <Text weight={500} size="lg" mt="md">
                  Debt Management
                </Text>
                <Text mt="xs" color="dimmed" size="sm">
                  Managing debt is essential to maintain a healthy financial
                  life. Prioritize paying off high-interest debts first while
                  making minimum payments on others.
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Container>

      {/* Footer Section */}
      <div style={{ background: "#263238", height: 300 }}>
        <Container size={"lg"}>
          <Grid style={{ marginTop: 50 }}>
            <Grid.Col span={4}>
              <Text color={"gray"} style={{ marginLeft: 10 }}>
                Simplify payments, track expenses, achieve financial goals
              </Text>
            </Grid.Col>
            <Grid.Col justify="center" align="center" span={8}></Grid.Col>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
