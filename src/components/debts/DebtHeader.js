import { Button, Grid, Title } from '@mantine/core';
import { useDispatch } from "react-redux";
import { showDebtForm } from "../../features/debtSlice";

export default function DebtHeader() {
  const dispatch = useDispatch();

  // Hàm xử lý sự kiện khi nhấn vào nút "Add Debt"
  const handleAddDebt = () => {
    try {
      dispatch(showDebtForm()); // Gửi action để mở form thêm nợ
    } catch (error) {
      console.error("Error when opening the debt form:", error); // Xử lý lỗi nếu có vấn đề khi gửi action
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <Grid>
        {/* Hiển thị tiêu đề "Debts" */}
        <Grid.Col span={"content"}>
          <Title style={{ margin: 5 }} order={2}>Debts</Title>
        </Grid.Col>
        {/* Hiển thị nút "Add Debt" */}
        <Grid.Col span={"content"}>
          <Button 
            fullWidth 
            radius="md" 
            onClick={handleAddDebt} // Sử dụng hàm xử lý sự kiện
            style={{ margin: 8 }}
          >
            Add Debt
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
}
