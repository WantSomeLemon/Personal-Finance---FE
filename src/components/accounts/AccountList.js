import { Badge, Card, Grid, Pagination, Table, Text } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as EditSVG } from "../../assets/Edit.svg";
import AccountEditForm from "./AccountEditForm";

export default function AccountList() {
  const accountList = useSelector((state) => state.account.accountList); // Lấy danh sách tài khoản từ Redux store
  const isMobile = useSelector((state) => state.user.isMobile); // Kiểm tra xem người dùng có đang dùng thiết bị di động không

  const [currentPage, setCurrentPage] = useState(1); // Trạng thái theo dõi trang hiện tại cho phân trang
  const [displayAccountEditForm, setDisplayAccountEditForm] = useState(false); // Trạng thái điều khiển hiển thị form chỉnh sửa tài khoản
  const [selectedEditElement, setSelectedEditElement] = useState(null); // Trạng thái lưu trữ tài khoản đã chọn để chỉnh sửa

  const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang
  const totalPages = Math.ceil(accountList.length / itemsPerPage); // Tính số trang dựa trên độ dài của danh sách tài khoản

  // Lấy danh sách tài khoản để hiển thị trên trang hiện tại
  const currentData = accountList.slice(
    (currentPage - 1) * itemsPerPage, // Chỉ số bắt đầu của danh sách tài khoản cho trang hiện tại
    currentPage * itemsPerPage // Chỉ số kết thúc của danh sách tài khoản cho trang hiện tại
  );

  // Xử lý khi nhấn vào nút chỉnh sửa
  function handleEdit(element) {
    setSelectedEditElement(element); // Lưu lại tài khoản đã chọn để chỉnh sửa
    setDisplayAccountEditForm(true); // Hiển thị form chỉnh sửa tài khoản
  }

  // Đóng form chỉnh sửa tài khoản
  function handleAccountEditFormClose() {
    setDisplayAccountEditForm(false); // Ẩn form chỉnh sửa tài khoản
  }

  // Tạo các dòng cho danh sách tài khoản
  const rows = currentData.map((element) => {
    // Tạo nội dung card cho chế độ di động
    const cardContent = (
      <div>
        <div style={{ margin: 10 }}>
          <Grid>
            <Grid.Col style={{ marginLeft: "auto" }} span={"content"}>
              <Badge size={"xl"} radius="md" variant="dot">
                {element.name} {/* Hiển thị tên tài khoản */}
              </Badge>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={"content"}>
              <Text style={{ marginTop: 20 }}>Tổng Số Dư Có Sẵn</Text>
              <Badge variant="filled" size={"xl"}>
                <Text fw={700}>
                  VND. {element.currentBalance} {/* Hiển thị số dư hiện tại */}
                </Text>
              </Badge>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col style={{ marginLeft: "auto" }} span={"content"}>
              <Text style={{ marginTop: 28 }} size={"xs"}>
                {element.paymentTypes} {/* Hiển thị loại thanh toán */}
              </Text>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    );

    // Trả về một Card cho chế độ di động
    if (isMobile) {
      return (
        <Card
          key={element.accountId}
          radius="md"
          withBorder
          style={{ marginBottom: 8, padding: 0, borderWidth: 1.5 }}
        >
          {cardContent} {/* Hiển thị nội dung card */}
        </Card>
      );
    }

    // Trả về một dòng Table cho chế độ desktop
    return (
      <tr key={element.accountId}>
        <td>
          <Text fw={700}>{element.name}</Text> {/* Hiển thị tên tài khoản */}
        </td>
        <td>
          <Text fw={700}>{`${element.totalIncome} .VND`}</Text> {/* Hiển thị tổng thu nhập */}
        </td>
        <td>
          <Text fw={700}>{`${element.totalExpense} .VND`}</Text> {/* Hiển thị tổng chi tiêu */}
        </td>
        <td>
          <Text fw={700} style={{ color: "#26AB35" }}>
            {`${element.currentBalance.toLocaleString("en-US")} .VND`} {/* Hiển thị số dư hiện tại với định dạng */}
          </Text>
        </td>
        <td>{<EditSVG onClick={() => handleEdit(element)} />}</td> {/* Nút chỉnh sửa */}
      </tr>
    );
  });

  return (
    <div>
      {/* Hiển thị form chỉnh sửa tài khoản nếu đang mở */}
      {displayAccountEditForm && (
        <AccountEditForm
          element={selectedEditElement} // Truyền tài khoản đã chọn vào form
          open={displayAccountEditForm}
          close={handleAccountEditFormClose} // Truyền hàm đóng form vào form
        />
      )}

      {/* Hiển thị tài khoản tùy thuộc vào chế độ di động hoặc desktop */}
      {isMobile ? (
        <div>
          <Text fw={"700"} style={{ marginBottom: 3, marginTop: 28 }}>
            Tài Khoản Của Bạn
          </Text>
          <Text fz={"xs"} style={{ marginBottom: 10 }}>
            Các tài khoản với số dư hiện tại
          </Text>
          <div>{rows}</div> {/* Hiển thị các dòng tài khoản */}
        </div>
      ) : (
        <Table verticalSpacing="lg">
          <thead>
            <tr>
              <th>
                <Text c="dimmed">CHI TIẾT TÀI KHOẢN</Text>
              </th>
              <th>
                <Text c="dimmed">TỔNG THU NHẬP</Text>
              </th>
              <th>
                <Text c="dimmed">TỔNG CHI TIÊU</Text>
              </th>
              <th>
                <Text c="dimmed">SỐ DƯ HIỆN TẠI</Text>
              </th>
              <th>
                <Text c="dimmed">CHỈNH SỬA</Text>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody> {/* Hiển thị các dòng tài khoản */}
        </Table>
      )}

      {/* Phân trang */}
      <Pagination
        total={totalPages} // Tổng số trang cho phân trang
        value={currentPage} // Trang hiện tại
        onChange={setCurrentPage} // Xử lý khi thay đổi trang
        position="center"
        mt="md"
      />
    </div>
  );
}
