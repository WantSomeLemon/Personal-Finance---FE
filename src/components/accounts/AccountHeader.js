import { Grid, Title, Button } from '@mantine/core';
import { showAccountForm } from "../../features/accountSlice";
import { useDispatch } from "react-redux";

export default function AccountHeader() {
    const dispatch = useDispatch();

    // Hàm xử lý sự kiện khi nhấn nút "Add Account"
    const handleAddAccountClick = () => {
        try {
            // Gửi action để hiển thị form tạo tài khoản
            dispatch(showAccountForm());
        } catch (error) {
            // Xử lý lỗi nếu có, ví dụ ghi log lỗi vào console
            console.error("Error dispatching showAccountForm:", error);
        }
    };

    return (
        <div style={{ marginBottom: 10 }}>
            <Grid>
                {/* Cột chứa tiêu đề "Accounts" */}
                <Grid.Col span={"content"}>
                    <Title style={{ margin: 5 }} order={2}>Accounts</Title>
                </Grid.Col>
                
                {/* Cột chứa nút "Add Account" */}
                <Grid.Col span={"content"}>
                    <Button 
                        fullWidth 
                        radius="md" 
                        onClick={handleAddAccountClick}  // Gọi hàm xử lý khi nút được nhấn
                        style={{ margin: 8 }}
                    >
                        Add Account
                    </Button>
                </Grid.Col>
            </Grid>
        </div>
    );
}
