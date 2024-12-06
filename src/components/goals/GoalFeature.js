import { Text, Paper, Grid } from "@mantine/core";
import { useSelector } from "react-redux";

export default function GoalFeature() {
  // Lấy danh sách mục tiêu từ Redux store
  const goalList = useSelector((state) => state.goal.goalList);

  // Hàm tính toán số lượng mục tiêu đang chờ (Pending)
  function pendingGoals() {
    try {
      let pendings = 0;
      // Duyệt qua danh sách mục tiêu để đếm số mục tiêu có trạng thái "Pending"
      for (let i = 0; i < goalList.length; i++) {
        if (goalList[i].status === "Pending") {
          pendings = pendings + 1;
        }
      }
      return pendings;
    } catch (error) {
      console.error("Lỗi khi tính toán số mục tiêu pending: ", error);
      // Xử lý lỗi nếu có (ví dụ: trả về 0 nếu có lỗi)
      return 0;
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <Grid>
        {/* Hiển thị tổng số mục tiêu */}
        <Grid.Col span={"content"}>
          <Paper miw={"200px"} radius="md" p="md" withBorder>
            <Text size={"lg"} fw={700}>
              {goalList.length} {/* Số lượng mục tiêu */}
            </Text>
            <Text size={"sm"} fw={700} c="dimmed">
              TOTAL GOALS {/* Mô tả tổng số mục tiêu */}
            </Text>
          </Paper>
        </Grid.Col>
        
        {/* Hiển thị số mục tiêu đang chờ */}
        <Grid.Col span={"content"}>
          <Paper miw={"200px"} radius="md" p="md" withBorder>
            <Text size={"lg"} style={{ color: "#F03C2E" }} fw={700}>
              {pendingGoals()} {/* Số mục tiêu đang chờ */}
            </Text>
            <Text size={"sm"} fw={700} c="dimmed">
              PENDING GOALS {/* Mô tả mục tiêu đang chờ */}
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
