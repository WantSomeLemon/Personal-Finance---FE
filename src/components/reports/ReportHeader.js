import { Title } from '@mantine/core';

export default function ReportHeader() {
  try {
    // Trả về tiêu đề "Reports" trong ứng dụng
    return (
      <div>
        <Title style={{ margin: 5 }} order={2}>Reports</Title>
      </div>
    );
  } catch (error) {
    // Xử lý lỗi nếu có vấn đề khi render component
    console.error("Error rendering ReportHeader: ", error);
    return (
      <div>
        <Title order={2} style={{ color: 'red' }}>
          Error: Unable to load report
        </Title>
      </div>
    );
  }
}
