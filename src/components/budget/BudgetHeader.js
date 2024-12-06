import { Button, Grid, Title } from '@mantine/core';
import { useDispatch } from "react-redux";
import { showBudgetForm } from "../../features/budgetSlice";

export default function BudgetHeader() {
    const dispatch = useDispatch();

    // Hàm xử lý khi nhấn nút 'Add Budget'
    function handleAddBudgetClick() {
        try {
            // Gửi action để hiển thị form thêm ngân sách
            dispatch(showBudgetForm());
        } catch (error) {
            // Log lỗi nếu có sự cố trong quá trình dispatch action
            console.error("Lỗi khi mở form thêm ngân sách:", error);
        }
    }

    return (
        <div style={{ marginBottom: 10 }}>
            <Grid>
                {/* Tiêu đề hiển thị "Budgets" */}
                <Grid.Col span={"content"}>
                    <Title style={{ margin: 5 }} order={2}>Budgets</Title>
                </Grid.Col>
                {/* Nút "Add Budget" để mở form thêm ngân sách */}
                <Grid.Col span={"content"}>
                    <Button 
                        fullWidth 
                        radius="md" 
                        onClick={handleAddBudgetClick} 
                        style={{ margin: 8 }}
                    >
                        Add Budget
                    </Button>
                </Grid.Col>
            </Grid>
        </div>
    );
}
