import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import TransactionHeader from "../components/transactions/TransactionHeader";
import TransactionList from "../components/transactions/TransactionList";
import TransactionForm from "../components/transactions/TransactionFrom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../features/transactionSlice";
import { Container, Divider, Grid, Skeleton } from "@mantine/core";
import { validateToken } from "../features/userSlice";

export default function TransactionScreen() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  // Trạng thái đang xử lý lấy dữ liệu giao dịch
  const fetchTransactionInProcess = useSelector(
    (state) => state.transaction.fetchTransactionInProcess
  );

  // Lấy danh sách giao dịch từ Redux Store
  const transactionList = useSelector(
    (state) => state.transaction.transactionList
  );

  // Hook useEffect để fetch dữ liệu khi component được load
  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(validateToken(token)); // Xác thực token
        await dispatch(fetchTransaction({ token: token })); // Lấy danh sách giao dịch
      } catch (error) {
        console.error("Error fetching transactions:", error);
        // Có thể hiển thị thông báo lỗi cho người dùng nếu cần
      }
    }
    fetchData();
  }, [dispatch, token]);

  // Component hiển thị hiệu ứng Skeleton khi đang tải
  function GridSkeleton() {
    return (
      <Grid style={{ height: 90 }}>
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
    );
  }

  // Component hiển thị hiệu ứng Skeleton nhỏ hơn
  function SmallGridSkeleton() {
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
    <Layout title={"Transactions"} load={transactionList.length > 0}>
      {fetchTransactionInProcess ? (
        <div>
          {/* Hiển thị hiệu ứng tải (Skeleton) khi đang tải dữ liệu */}
          <Container size={"xxl"}>
            <Grid style={{ marginBottom: 20 }}>
              <Grid.Col span={2}>
                <Skeleton height={16} mt={10} width="80%" radius="xl" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton
                  style={{ marginBottom: 10 }}
                  height={36}
                  radius="md"
                />
              </Grid.Col>
            </Grid>
            <SmallGridSkeleton />
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
        <div>
          {/* Khối try-catch để xử lý lỗi khi render các component */}
          {(() => {
            try {
              return <TransactionHeader />;
            } catch (error) {
              console.error("Error rendering TransactionHeader:", error);
              return (
                <div style={{ color: "red" }}>
                  An error occurred while loading the transaction header.
                </div>
              );
            }
          })()}

          {(() => {
            try {
              return <TransactionList />;
            } catch (error) {
              console.error("Error rendering TransactionList:", error);
              return (
                <div style={{ color: "red" }}>
                  An error occurred while loading the transaction list.
                </div>
              );
            }
          })()}

          {(() => {
            try {
              return <TransactionForm />;
            } catch (error) {
              console.error("Error rendering TransactionForm:", error);
              return (
                <div style={{ color: "red" }}>
                  An error occurred while loading the transaction form.
                </div>
              );
            }
          })()}
        </div>
      )}
    </Layout>
  );
}
