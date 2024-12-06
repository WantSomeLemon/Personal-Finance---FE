import React from "react";
import { Text, Paper, Grid } from "@mantine/core";
import { useSelector } from "react-redux";

export default function DebtFeature() {
  const debtList = useSelector((state) => state.debt.debtList);

  // Hàm tính tổng nợ
  function handleTotalDebt() {
    try {
      return debtList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );
    } catch (error) {
      console.error("Lỗi khi tính tổng nợ:", error);
      return 0; // Trả về 0 nếu có lỗi
    }
  }

  // Hàm tính tổng nợ đã thanh toán
  function handleTotalPaid() {
    try {
      return debtList.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue.status === "Paid" ? currentValue.amount : 0),
        0
      );
    } catch (error) {
      console.error("Lỗi khi tính tổng nợ đã thanh toán:", error);
      return 0; // Trả về 0 nếu có lỗi
    }
  }

  // Hàm tính tổng nợ chưa thanh toán
  function handleTotalUnpaid() {
    try {
      return debtList.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue.status === "Unpaid" ? currentValue.amount : 0),
        0
      );
    } catch (error) {
      console.error("Lỗi khi tính tổng nợ chưa thanh toán:", error);
      return 0; // Trả về 0 nếu có lỗi
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <Grid>
        <Grid.Col span={6} md={"content"}>
          <Paper miw={"180px"} radius="md" p="md" withBorder>
            <Text size={"lg"} fw={700}>{`${handleTotalDebt()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed">
              TỔNG NỢ
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={6} md={"content"}>
          <Paper miw={"180px"} radius="md" p="md" withBorder>
            <Text size={"lg"} fw={700}>{`${handleTotalPaid()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
              TỔNG NỢ ĐÃ THANH TOÁN
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={12} md={"content"}>
          <Paper miw={"180px"} radius="md" p="md" withBorder>
            <Text
              size={"lg"}
              fw={700}
              style={{ color: "#FF0000" }}
            >{`${handleTotalUnpaid()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
              TỔNG NỢ CHƯA THANH TOÁN
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
