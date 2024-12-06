import {
  Avatar,
  Badge,
  Card,
  Grid,
  Table,
  Text,
  Pagination,
} from "@mantine/core";
import { ArrowRIcon, ArrowGIcon } from "../../assets/assets";
import Edit from "../../assets/Edit.svg";
import { useSelector } from "react-redux";
import { useState } from "react";
import TransactionEditForm from "./TransactionEditForm";

export default function TransactionList() {
  const transactionList = useSelector(
    (state) => state.transaction.transactionList
  );
  const isMobile = useSelector((state) => state.user.isMobile);

  const [currentPage, setCurrentPage] = useState(1);
  const [displayTransactionEditForm, setDisplayTransactionEditForm] =
    useState(false);
  const [selectedEditElement, setSelectedEditElement] = useState(null);

  const itemsPerPage = 6; // Số giao dịch trên mỗi trang
  const totalPages = Math.ceil(transactionList.length / itemsPerPage);

  // Lấy danh sách giao dịch hiển thị trên trang hiện tại
  const currentData = transactionList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm đóng form chỉnh sửa giao dịch
  function handleTransactionEditFormClose() {
    try {
      setDisplayTransactionEditForm(false); // Đóng form khi người dùng muốn
    } catch (error) {
      // Xử lý lỗi nếu có khi đóng form
      console.error("Error closing Transaction Edit Form:", error);
      // Có thể thông báo lỗi cho người dùng nếu cần
    }
  }

  // Hàm mở form chỉnh sửa giao dịch
  function handleTransactionEditFormOpen(element) {
    try {
      setSelectedEditElement(element); // Cập nhật giao dịch cần chỉnh sửa
      setDisplayTransactionEditForm(true); // Hiển thị form chỉnh sửa
    } catch (error) {
      // Xử lý lỗi khi mở form
      console.error("Error opening Transaction Edit Form:", error);
      // Thông báo lỗi cho người dùng nếu có vấn đề
    }
  }

  // Định dạng ngày tháng
  const dateCol = (date) => {
    try {
      const dateTime = new Date(date);
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      return isMobile ? (
        <Text fw={700} fz="md">
          {dateTime.toLocaleDateString("en-US", dateOptions)}
        </Text>
      ) : (
        <div>
          <Text fw={700} fz="md">
            {dateTime.toLocaleDateString("en-US", dateOptions)}
          </Text>
          <Text fw={500} c="dimmed" fz="sm">
            {dateTime.toLocaleTimeString("en-US")}
          </Text>
        </div>
      );
    } catch (error) {
      console.error("Error formatting date:", error);
      return <Text>Error formatting date</Text>; // Hiển thị thông báo lỗi nếu có sự cố
    }
  };

  // Định dạng loại giao dịch
  const categoryCol = (category) => {
    try {
      return category.type === "income" ? (
        <Badge color="green">{category.name}</Badge>
      ) : (
        <Badge color="red">{category.name}</Badge>
      );
    } catch (error) {
      console.error("Error processing category:", error);
      return <Badge color="gray">Unknown</Badge>; // Thông báo lỗi nếu có sự cố
    }
  };

  // Chi tiết tài khoản
  const accountDetails = (account, paymentType) => {
    try {
      return (
        <div>
          <Text fw={700} fz="md">
            {account.name}
          </Text>
          <Text fw={500} c="dimmed" fz="sm">
            {paymentType}
          </Text>
        </div>
      );
    } catch (error) {
      console.error("Error displaying account details:", error);
      return <Text>Error displaying account details</Text>; // Thông báo lỗi nếu có sự cố
    }
  };

  // Hiển thị số tiền giao dịch
  const amountCol = (amount, type) => {
    try {
      return (
        <Text
          fw={700}
          fz="md"
          style={{ color: type === "income" ? "#26AB35" : "black" }}
        >
          {type === "income" ? "+" : "-"}
          {amount.toLocaleString("en-US")} VND
        </Text>
      );
    } catch (error) {
      console.error("Error displaying amount:", error);
      return <Text>Error displaying amount</Text>; // Thông báo lỗi nếu có sự cố
    }
  };

  // Biểu tượng chỉnh sửa
  const paytype = (element) => (
    <img
      src={Edit}
      onClick={() => handleTransactionEditFormOpen(element)} // Mở form khi nhấn vào biểu tượng chỉnh sửa
      alt="Edit"
      style={{ cursor: "pointer" }}
    />
  );

  // Dữ liệu hiển thị cho từng giao dịch
  const rows = currentData.map((element) =>
    isMobile ? (
      <Card
        key={element.id}
        radius="md"
        p="sm"
        withBorder
        style={{ marginBottom: 8 }}
      >
        {/* Card content here */}
      </Card>
    ) : (
      <tr key={element.id}>
        <td>{dateCol(element.dateTime)}</td>
        <td>{categoryCol(element.category)}</td>
        <td>{accountDetails(element.account, element.paymentType)}</td>
        <td>{amountCol(element.amount, element.category.type)}</td>
        <td>{paytype(element)}</td>
      </tr>
    )
  );

  return (
    <div>
      {displayTransactionEditForm && (
        <TransactionEditForm
          element={selectedEditElement}
          open={displayTransactionEditForm}
          close={handleTransactionEditFormClose}
        />
      )}
      {isMobile ? (
        <div>
          <Text fw={"700"} style={{ marginBottom: 3, marginTop: 10 }}>
            History
          </Text>
          <Text fz={"xs"} style={{ marginBottom: 10 }}>
            Recent transactions from all your accounts
          </Text>
          <div>{rows}</div>
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>DATE & TIME</th>
              <th>TRANSACTION DETAILS</th>
              <th>ACCOUNT DETAILS</th>
              <th>AMOUNT</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={setCurrentPage}
        position="center"
        mt="md"
      />
    </div>
  );
}
