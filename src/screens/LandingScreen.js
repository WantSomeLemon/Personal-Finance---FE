import {Title, Grid, Container, Text, Button, List, Paper, Card, Center} from '@mantine/core';
import HeaderBar from '../layout/HeaderBar';
import {LeaderSVG} from "../assets/assets";
import {ArrowRightIcon} from "../assets/assets";
import {ReactComponent as ManageMoneySVG} from "../assets/Manage money.svg";
import {ReactComponent as CheckIcon} from '../assets/Check_round_fill.svg'
import {ReactComponent as ExpensesSVG} from "../assets/Receipt.svg";
import {ReactComponent as BudgetingSVG} from "../assets/Budgeting.svg";
import {ReactComponent as SavingSVG} from "../assets/Piggy bank.svg";
import {ReactComponent as DebtManageSVG} from "../assets/Debt Manage.svg";
import {AppLogo} from "../assets/assets";
import {useDispatch} from "react-redux";
import {openSignupForm} from "../features/userSlice";
export default function LandingScreen() {
    const dispatch = useDispatch()
    return (
        <div>
            <HeaderBar isLandingPage={true} />
            <Container size="xl" >
                <Container size={"lg"}  >
                <Grid style={{marginTop:40}} justify="center" align="center">
                    <Grid.Col md={6} lg={6}>
                        <Title style={{textAlign:"left" }} size="48">Empower your finances, simplify your life.</Title>
                        <Text c="dimmed" style={{marginTop:10,textAlign:"left"}}>PayMint: Simplify payments, track expenses, achieve financial goals</Text>
                        <Button onClick={() => dispatch(openSignupForm())} size={"md"} radius="xl" style={{marginTop:20}} rightIcon={<ArrowRightIcon/>}>Get started</Button>
                    </Grid.Col>
                    <Grid.Col md={6} lg={6}>
                        <Center >
                            <LeaderSVG/>
                        </Center>
                    </Grid.Col>
                </Grid>
                </Container>
                <Container size={"lg"} style={{marginTop:150}} >
                <Paper shadow="sm" radius="lg" p="md">
                <Grid >
                    <Grid.Col justify="center" align="center" md={6} lg={6}>
                        <ManageMoneySVG style={{width:350,height:350}}/>
                    </Grid.Col>
                    <Grid.Col justify="center" md={6} lg={3}>
                        <Title style={{textAlign:"left" }} size="32">Effective Money Management</Title>
                        <Text c="dimmed" style={{fontSize:18,marginTop:10,textAlign:"left"}}>Effective money management is the key to achieving financial stability and success. By taking control of your finances and making informed decisions, you can pave the way for a secure and prosperous future.</Text>
                        <List style={{marginTop:20}}
                            spacing="xs"
                            size="sm"
                            center
                            icon={
                                <CheckIcon/>
                            }
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
                <Container  size={"lg"} style={{marginTop:100,marginBottom:100}}>
                    <Title order={1}>Features</Title>
                    <Grid style={{marginTop:50}}>
                        <Grid.Col md={6} lg={3}>
                            <Card
                                shadow="sm"
                                padding="sm"
                                component="a"
                                withBorder
                                radius="lg"
                            >
                                <Card.Section>
                                    <ExpensesSVG style={{width:250,height:200}}/>
                                </Card.Section>

                                <Text weight={500} size="lg" mt="md">
                                    Track and Control Expenses
                                </Text>

                                <Text mt="xs" color="dimmed" size="sm">
                                    Maintaining a clear understanding of your expenses is crucial for effective money management. Use personal finance apps or tracking tools to monitor your spending habits.
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <Card
                                shadow="sm"
                                padding="sm"
                                component="a"
                                withBorder
                                radius="lg"
                            >
                                <Card.Section>
                                    <BudgetingSVG style={{width:250,height:200}}/>
                                </Card.Section>

                                <Text weight={500} size="lg" mt="md">
                                    Budgeting
                                </Text>

                                <Text mt="xs" color="dimmed" size="sm">
                                    Creating and sticking to a budget is fundamental to money management. Start by tracking your income and expenses, and categorize them accordingly.
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <Card
                                shadow="sm"
                                padding="sm"
                                component="a"
                                withBorder
                                radius="lg"
                            >
                                <Card.Section>
                                    <SavingSVG style={{width:250,height:200}}/>
                                </Card.Section>

                                <Text weight={500} size="lg" mt="md">
                                    Track Savings and Investings
                                </Text>

                                <Text mt="xs" color="dimmed" size="sm">
                                    Building a savings habit is crucial for financial security. Allocate a portion of your income towards savings each month.
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <Card
                                shadow="sm"
                                padding="sm"
                                component="a"
                                withBorder
                                radius="lg"
                            >
                                <Card.Section>
                                    <DebtManageSVG style={{width:250,height:200}}/>
                                </Card.Section>

                                <Text weight={500} size="lg" mt="md">
                                    Debt Management
                                </Text>

                                <Text mt="xs" color="dimmed" size="sm">
                                    Managing debt is essential to maintain a healthy financial life. Prioritize paying off high-interest debts first while making minimum payments on others.
                                </Text>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Container>

            <div style={{background:"#263238",height:300}}>
                <Container size={"lg"}>
                    <Grid style={{marginTop:50}}>
                        <Grid.Col span={4}>
                            <AppLogo style={{width:200}}></AppLogo>
                            <Text color={"gray"} style={{marginLeft:10}}>Simplify payments, track expenses, achieve financial goals</Text>
                        </Grid.Col>
                    </Grid>
                </Container>
            </div>
        </div>

    )
}