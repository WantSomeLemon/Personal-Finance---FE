import { Grid, Paper, Text } from "@mantine/core";
import { useSelector } from "react-redux";

export default function AccountFeature() {
  // Lấy danh sách tài khoản từ state
  const accountList = useSelector((state) => state.account.accountList);

  // Hàm tính tổng số tài khoản
  function handleTotalAccount() {
    try {
      return accountList.length; // Trả về số lượng tài khoản
    } catch (error) {
      console.error("Error calculating total accounts:", error); // Xử lý lỗi nếu có
      return 0; // Trả về 0 nếu có lỗi
    }
  }

  // Hàm tính tổng thu nhập từ tất cả các tài khoản
  function handleTotalIncome() {
    try {
      return accountList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalIncome, // Cộng dồn thu nhập của mỗi tài khoản
        0
      );
    } catch (error) {
      console.error("Error calculating total income:", error); // Xử lý lỗi nếu có
      return 0; // Trả về 0 nếu có lỗi
    }
  }

  // Hàm tính tổng chi phí từ tất cả các tài khoản
  function handleTotalExpense() {
    try {
      return accountList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalExpense, // Cộng dồn chi phí của mỗi tài khoản
        0
      );
    } catch (error) {
      console.error("Error calculating total expenses:", error); // Xử lý lỗi nếu có
      return 0; // Trả về 0 nếu có lỗi
    }
  }

  // Hàm tính tổng số dư tài khoản
  function handleTotalBalanace() {
    try {
      return accountList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.currentBalance, // Cộng dồn số dư của mỗi tài khoản
        0
      );
    } catch (error) {
      console.error("Error calculating total balance:", error); // Xử lý lỗi nếu có
      return 0; // Trả về 0 nếu có lỗi
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <Grid>
        {/* Hiển thị tổng số tài khoản */}
        <Grid.Col span={6} md={"content"}>
          <Paper radius="md" miw={"180px"} p="md" withBorder>
            <Text size={"lg"} fw={700}>
              {handleTotalAccount().toLocaleString("en-US")}
            </Text>
            <Text size={"sm"} fw={700} c="dimmed">
              TOTAL ACCOUNTS
            </Text>
          </Paper>
        </Grid.Col>
        {/* Hiển thị tổng thu nhập */}
        <Grid.Col span={6} md={"content"}>
          <Paper radius="md" miw={"180px"} p="md" withBorder>
            <Text size={"lg"} fw={700}>{`${handleTotalIncome()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed">
              TOTAL INCOME
            </Text>
          </Paper>
        </Grid.Col>
        {/* Hiển thị tổng chi phí */}
        <Grid.Col span={6} md={"content"}>
          <Paper radius="md" miw={"180px"} p="md" withBorder>
            <Text size={"lg"} fw={700}>{`${handleTotalExpense()} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed">
              TOTAL EXPENSES
            </Text>
          </Paper>
        </Grid.Col>
        {/* Hiển thị tổng số dư với màu xanh */}
        <Grid.Col span={6} md={"content"}>
          <Paper radius="md" miw={"180px"} p="md" withBorder>
            <Text
              size={"lg"}
              fw={700}
              style={{ color: "#26AB35" }} // Màu sắc cho số dư
            >{`${handleTotalBalanace().toLocaleString("en-US")} .VND`}</Text>
            <Text size={"sm"} fw={700} c="dimmed">
              TOTAL BALANCE
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
