import Layout from "../components/layout/Layout";
import AccountHeader from "../components/accounts/AccountHeader";
import AccountFeature from "../components/accounts/AccountFeature";
import AccountList from "../components/accounts/AccountList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccount } from "../features/accountSlice";
import { useEffect } from "react";
import { Container, Divider, Grid, Skeleton } from "@mantine/core";
import { validateToken } from "../features/userSlice";

export default function AccountScreen() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  // useEffect to trigger data fetching when component is mounted or token changes
  useEffect(() => {
    async function fetchData() {
      try {
        // Validate the token first
        await dispatch(validateToken(token));
        // Fetch account data using the token
        dispatch(fetchAccount({ token: token }));
      } catch (error) {
        // Handle any errors that might occur during the fetch
        console.error("Error fetching data:", error);
        // Optionally, you could dispatch an error action to show an error message
      }
    }

    // Call fetchData function
    fetchData();
  }, [dispatch, token]);

  // Select the necessary state values from the Redux store
  const fetchAccountInProcess = useSelector(
    (state) => state.account.fetchAccountInProcess
  );
  const accountList = useSelector((state) => state.account.accountList);

  // Skeleton loading component to display while the data is being fetched
  function GridSkeleton() {
    return (
      <Grid style={{ height: 60 }}>
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
    );
  }

  return (
    <Layout title={"Accounts"} load={accountList.length > 0}>
      {fetchAccountInProcess ? (
        // Show loading skeleton while fetching data
        <div>
          <Container size={"xxl"}>
            {/* Skeleton for header and features */}
            <Grid style={{ marginBottom: 10 }}>
              <Grid.Col span={2}>
                <Skeleton height={16} mt={10} width="80%" radius="xl" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton style={{ marginBottom: 10 }} height={36} radius="md" />
              </Grid.Col>
            </Grid>

            {/* Skeleton for account items */}
            <Grid style={{ marginBottom: 20 }}>
              <Grid.Col span={2}>
                <Skeleton style={{ marginBottom: 10 }} height={80} radius="md" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton style={{ marginBottom: 10 }} height={80} radius="md" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton style={{ marginBottom: 10 }} height={80} radius="md" />
              </Grid.Col>
            </Grid>

            {/* Additional skeletons to indicate loading */}
            <GridSkeleton />
            <Divider style={{ marginBottom: 20 }} />
            <GridSkeleton />
            <Divider style={{ marginBottom: 10 }} />
            <GridSkeleton />
            <Divider style={{ marginBottom: 10 }} />
            <GridSkeleton />
            <Divider style={{ marginBottom: 10 }} />
            <GridSkeleton />
          </Container>
        </div>
      ) : (
        // Render the actual content after data has been fetched
        <div>
          <AccountHeader />
          <AccountFeature />
          <AccountList />
        </div>
      )}
    </Layout>
  );
}
