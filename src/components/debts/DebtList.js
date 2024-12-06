import { Avatar, Card, Grid, Pagination, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as EditSVG } from "../../assets/Edit.svg";
import { fetchDebt } from "../../features/debtSlice";
import DebtEditForm from "./DebtEditForm";

export default function DebtList() {
  const dispatch = useDispatch();
  const [displayDebtEditForm, setDisplayDebtEditForm] = useState(false);
  const [selectedEditElement, setSelectedEditElement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useSelector((state) => state.user.isMobile);
  const token = useSelector((state) => state.user.token);

  const itemsPerPage = 6;
  const debtList = useSelector((state) => state.debt.debtList);
  const totalPages = Math.ceil(debtList.length / itemsPerPage);
  console.log("Debt List:", debtList);

  // Lấy thông tin nợ khi component được render lần đầu tiên
  useEffect(() => {
    try {
      dispatch(fetchDebt(token)); // Gửi action để lấy dữ liệu nợ từ API
    } catch (error) {
      console.error("Error fetching debt data:", error); // Xử lý lỗi nếu có sự cố khi lấy dữ liệu
    }
  }, [dispatch, token]);

  // Đóng form chỉnh sửa khi nhấn hủy
  function handleDebtEditFormClose() {
    setDisplayDebtEditForm(false);
  }

  // Mở form chỉnh sửa khi nhấn vào nút chỉnh sửa
  function handleDebtEditFormOpen(element) {
    setSelectedEditElement(element);
    setDisplayDebtEditForm(true);
  }

  // Phân trang dữ liệu nợ
  const currentData = debtList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const rows = currentData.map((element) => {
    const formattedDueDate = new Date(element.dueDate).toLocaleDateString();
    const cardContent = (
      <div>
        <Grid>
          <Grid.Col span={2}>
            <Avatar color="blue" radius="xl">
              {element.user.firstName.slice(0, 2).toUpperCase()}
            </Avatar>
          </Grid.Col>
          <Grid.Col span={10}>
            <Text fw={"600"} style={{ marginBottom: 8 }} fz={"sm"}>{`${element.moneyFrom} (${element.status})`}</Text>
            <Text style={{ marginTop: 8, fontSize: 10 }}>{`Due Date: ${formattedDueDate}`}</Text>
            <Text style={{ marginTop: 8, fontSize: 10 }}>{`Amount: ${element.amount}`}</Text>
            <Text style={{ marginTop: 8, fontSize: 10 }}>{`User: ${element.user.firstName} ${element.user.lastName}`}</Text>
          </Grid.Col>
        </Grid>
      </div>
    );

    if (isMobile) {
      return (
        <Card
          key={element.debtId}
          radius="md"
          p="md"
          withBorder
          style={{ marginBottom: 8 }}
        >
          {cardContent}
        </Card>
      );
    }

    return (
      <tr key={element.debtId}>
        <td>
          <Text fw={700}>{element.moneyFrom}</Text>
        </td>
        <td>
          <Text fw={700}>{`${element.amount} .VND`}</Text>
        </td>
        <td>
          <Text fw={700}>{formattedDueDate}</Text>
        </td>
        <td>
          <Text
            fw={700}
            style={{ color: element.status === "Paid" ? "#26AB35" : "#FF0000" }}
          >
            {element.status}
          </Text>
        </td>
        <td>
          <Text fw={700}>{`${element.user.firstName} ${element.user.lastName}`}</Text>
        </td>
        <td>
          {/* Mở form chỉnh sửa khi nhấn vào biểu tượng chỉnh sửa */}
          <EditSVG onClick={() => handleDebtEditFormOpen(element)} />
        </td>
      </tr>
    );
  });

  return (
    <div>
      {/* Hiển thị form chỉnh sửa khi cần thiết */}
      {displayDebtEditForm && (
        <DebtEditForm
          element={selectedEditElement}
          open={displayDebtEditForm}
          close={handleDebtEditFormClose}
        />
      )}
      
      {isMobile ? (
        <div>
          <Text fw={"700"} style={{ marginBottom: 3, marginTop: 28 }}>
            This month
          </Text>
          <Text fz={"xs"} style={{ marginBottom: 10 }}>
            All your Debts for this month
          </Text>
          <div>{rows}</div>
        </div>
      ) : (
        <Table verticalSpacing="md">
          <thead>
            <tr>
              <th>
                <Text c="dimmed">MONEY FROM</Text>
              </th>
              <th>
                <Text c="dimmed">AMOUNT</Text>
              </th>
              <th>
                <Text c="dimmed">DUE DATE</Text>
              </th>
              <th>
                <Text c="dimmed">STATUS</Text>
              </th>
              <th>
                <Text c="dimmed">USER</Text>
              </th>
              <th>
                <Text c="dimmed">EDIT</Text>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}

      {/* Pagination */}
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
