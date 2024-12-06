import React from "react";
import { Text, Paper, Grid } from "@mantine/core";
import { useSelector } from "react-redux";

export default function BudgetFeature() {
  // Lấy danh sách ngân sách từ Redux store
  const budgetList = useSelector((state) => state.budget.budgetList);

  // Tính tổng ngân sách
  function handleTotalBudget() {
    try {
      return budgetList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );
    } catch (error) {
      console.error("Lỗi khi tính tổng ngân sách:", error);
      return 0; // Trả về 0 nếu có lỗi xảy ra
    }
  }

  // Tính tổng ngân sách đã sử dụng
  function handleTotalUsed() {
    try {
      return budgetList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.used,
        0
      );
    } catch (error) {
      console.error("Lỗi khi tính tổng ngân sách đã sử dụng:", error);
      return 0; // Trả về 0 nếu có lỗi xảy ra
    }
  }

  // Tính tổng ngân sách còn lại
  function handleTotalLeft() {
    try {
      return budgetList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.balance,
        0
      );
    } catch (error) {
      console.error("Lỗi khi tính tổng ngân sách còn lại:", error);
      return 0; // Trả về 0 nếu có lỗi xảy ra
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <Grid>
        <Grid.Col span={6} md={"content"}>
          <Paper miw={"180px"} radius="md" p="md" withBorder>
            <Text size={"lg"} fw={700}>{`${handleTotalBudget()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed">
              TỔNG NGÂN SÁCH
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={6} md={"content"}>
          <Paper miw={"180px"} radius="md" p="md" withBorder>
            <Text size={"lg"} fw={700}>{`${handleTotalUsed()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
              TỔNG ĐÃ SỬ DỤNG
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={12} md={"content"}>
          <Paper miw={"180px"} radius="md" p="md" withBorder>
            <Text
              size={"lg"}
              fw={700}
              style={{ color: "#26AB35" }} // Styling cho số tiền 'Total Left'
            >{`${handleTotalLeft()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
              TỔNG CÒN LẠI
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
