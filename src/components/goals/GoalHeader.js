import { Grid, Title, Button } from '@mantine/core';
import { showGoalForm } from "../../features/goalSlice";
import { useDispatch } from "react-redux";

export default function GoalHeader() {
    const dispatch = useDispatch();

    // Hàm xử lý sự kiện khi người dùng nhấn nút "Add Goals"
    const handleAddGoals = () => {
        try {
            // Gọi action showGoalForm để mở form thêm mục tiêu
            dispatch(showGoalForm());
        } catch (error) {
            // Xử lý lỗi nếu có vấn đề xảy ra khi dispatch action
            console.error("Lỗi khi mở form thêm mục tiêu:", error);
        }
    };

    return (
        <div style={{ marginBottom: 10 }}>
            <Grid>
                <Grid.Col span={"content"}>
                    <Title style={{ margin: 5 }} order={2}>
                        Goals {/* Tiêu đề phần mục tiêu */}
                    </Title>
                </Grid.Col>
                <Grid.Col style={{ margin: 8 }} span={"content"}>
                    <Button
                        radius="md"
                        miw={"120px"}
                        onClick={handleAddGoals}  /* Khi nhấn nút, gọi hàm handleAddGoals */
                        fullWidth
                    >
                        Add Goals /* Nút để thêm mục tiêu */
                    </Button>
                </Grid.Col>
            </Grid>
        </div>
    );
}
