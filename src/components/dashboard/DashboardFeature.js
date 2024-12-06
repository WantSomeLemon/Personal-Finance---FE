import { Grid, Paper, Text } from "@mantine/core";
import { useSelector } from "react-redux";

export default function DashboardFeature() {
  // Lấy danh sách tài khoản, ngân sách, và mục tiêu từ Redux store
  const accountList = useSelector((state) => state.account.accountList);
  const budgetList = useSelector((state) => state.budget.budgetList);
  const goalList = useSelector((state) => state.goal.goalList);

  // Hàm tính tổng số dư của tất cả tài khoản
  function handleTotalBalance() {
    try {
      return accountList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.currentBalance,
        0
      );
    } catch (error) {
      console.error("Error calculating total balance: ", error);
      return 0; // Nếu có lỗi, trả về 0
    }
  }

  // Hàm tính số mục tiêu đang chờ xử lý
  function pendingGoals() {
    try {
      let pendings = 0;
      for (let i = 0; i < goalList.length; i++) {
        if (goalList[i].status === "Pending") {
          pendings += 1; // Tính số mục tiêu có trạng thái "Pending"
        }
      }
      return pendings;
    } catch (error) {
      console.error("Error calculating pending goals: ", error);
      return 0; // Nếu có lỗi, trả về 0
    }
  }

  // Hàm tính tổng ngân sách
  function handleTotalBudget() {
    try {
      return budgetList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );
    } catch (error) {
      console.error("Error calculating total budget: ", error);
      return 0; // Nếu có lỗi, trả về 0
    }
  }

  // Hàm tính tổng ngân sách đã sử dụng
  function handleTotalUsed() {
    try {
      return budgetList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.used,
        0
      );
    } catch (error) {
      console.error("Error calculating total used: ", error);
      return 0; // Nếu có lỗi, trả về 0
    }
  }

  return (
    <div>
      <Paper style={{ marginBottom: 16 }} radius="md" p="md" withBorder>
        <Grid>
          {/* Hiển thị tổng số dư tài khoản */}
          <Grid.Col span={6} sm={6} md={3}>
            <Text size={"xl"} fw={700}>
              {handleTotalBalance() > 0
                ? `${handleTotalBalance().toLocaleString("en-US")} VND`
                : `- `} {/* Hiển thị số dư hoặc dấu - nếu không có */}
            </Text>
            <Text size={"sm"} fw={700} c="dimmed">
              TOTAL BALANCE
            </Text>
          </Grid.Col>

          {/* Hiển thị tỷ lệ ngân sách đã sử dụng */}
          <Grid.Col span={6} sm={6} md={3}>
            <Text size={"xl"} fw={700}>
              {handleTotalBudget() > 0
                ? `${Math.floor(
                    (100 * handleTotalUsed()) / handleTotalBudget()
                  )}%` // Tính tỷ lệ ngân sách đã sử dụng
                : `-`} {/* Hiển thị tỷ lệ hoặc dấu - nếu không có */}
            </Text>
            <Text size={"sm"} fw={700} c="dimmed">
              BUDGET USED
            </Text>
          </Grid.Col>

          {/* Chỗ trống cho các Grid.Column khác */}
          <Grid.Col span={6} sm={6} md={3}></Grid.Col>

          {/* Hiển thị số mục tiêu hoàn thành */}
          <Grid.Col span={6} sm={6} md={3}>
            <Text size={"xl"} fw={700}>
              {`${pendingGoals()} / ${goalList.length}`} {/* Hiển thị số mục tiêu đang chờ và tổng số mục tiêu */}
            </Text>
            <Text size={"sm"} fw={700} c="dimmed">
              GOALS COMPLETED
            </Text>
          </Grid.Col>
        </Grid>
      </Paper>
    </div>
  );
}
