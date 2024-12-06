import { Card, Button, Text, Group, Grid } from "@mantine/core";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../api/config";
import { saveAs } from "file-saver";
import { ReactComponent as ExcelIcon } from "../../assets/ExcelFile.svg";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { ReactComponent as SuccessIcon } from "../../assets/success-icon.svg";

export default function ReportList() {
  const token = useSelector((state) => state.user.token);
  const [transactionReportLoading, setTransactionReportLoading] = useState(false);

  async function handleTransactionReportExcel() {
    setTransactionReportLoading(true); // Bắt đầu tải báo cáo
    try {
      // Gửi yêu cầu tải báo cáo excel từ API
      const response = await axios.get(`${baseUrl}/report/transaction/excel`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Thiết lập kiểu phản hồi là blob (dành cho file)
      });

      // Lưu file Excel sau khi tải về
      const date = new Date();
      saveAs(
        response.data,
        `TransactionReport_${date.toLocaleDateString()}.xlsx`
      );

      // Thông báo tải xong
      setTransactionReportLoading(false);
      notifications.show({
        title: "Started downloading...",
        message: "See your downloads!!",
        icon: <SuccessIcon />,
        radius: "lg",
        autoClose: 5000,
      });
    } catch (error) {
      // Xử lý lỗi khi tải báo cáo
      console.error("Error downloading Excel file:", error);
      setTransactionReportLoading(false);
      notifications.show({
        title: "Download failed",
        message: "Please try again!!",
        radius: "lg",
        color: "red",
        autoClose: 5000,
      });
    }
  }

  return (
    <div style={{ margin: 30 }}>
      <Grid>
        <Grid.Col md={6} lg={6}>
          <Card padding="lg" radius="md" withBorder>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Transaction Report</Text>
            </Group>
            <Text size="sm" color="dimmed">
              This will generate a full report on transaction in excel format.
            </Text>
            <Button
              loading={transactionReportLoading} // Hiển thị trạng thái đang tải
              onClick={() => handleTransactionReportExcel()} // Gọi hàm khi nhấn nút
              leftIcon={<ExcelIcon style={{ height: 16, width: 16 }} />} // Biểu tượng Excel
              variant="light"
              color="green"
              fullWidth
              mt="md"
              radius="md"
            >
              Download Excel Report
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
