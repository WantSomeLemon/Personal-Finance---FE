import { Table, Text, Pagination } from "@mantine/core";
import { useSelector } from "react-redux";
import { ReactComponent as EditSVG } from "../../assets/Edit.svg";
import { useState } from "react";
import GoalEditForm from "./GoalEditForm";

export default function GoalList() {
  const goalList = useSelector((state) => state.goal.goalList);
  const [displayGoalEditForm, setDisplayGoalEditForm] = useState(false);
  const [selectedEditElement, setSelectedEditElement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số lượng mục hiển thị trên mỗi trang
  const totalPages = Math.ceil(goalList.length / itemsPerPage); // Tính tổng số trang

  // Hàm đóng form chỉnh sửa mục tiêu
  function handleGoalEditFormClose() {
    setDisplayGoalEditForm(false);
  }

  // Hàm xử lý sự kiện chỉnh sửa mục tiêu
  function handleEdit(element) {
    try {
      setSelectedEditElement(element); // Chọn mục tiêu cần chỉnh sửa
      setDisplayGoalEditForm(true); // Hiển thị form chỉnh sửa
    } catch (error) {
      console.error("Lỗi khi mở form chỉnh sửa:", error); // Xử lý lỗi nếu có
    }
  }

  // Hàm định dạng ngày tháng
  function handleDate(date) {
    try {
      const formatDate = new Date(date); // Chuyển đổi chuỗi ngày thành đối tượng Date
      if (isNaN(formatDate.getTime())) {
        throw new Error("Invalid date");
      }
      const dateOptions = { year: "numeric", month: "long", day: "numeric" }; // Định dạng ngày
      return formatDate.toLocaleDateString("en-US", dateOptions); // Trả về ngày theo định dạng Mỹ
    } catch (error) {
      console.error("Lỗi khi định dạng ngày:", error); // Xử lý lỗi nếu có
      return "Invalid Date"; // Trả về thông báo lỗi nếu định dạng không thành công
    }
  }

  // Lọc dữ liệu mục tiêu cho trang hiện tại
  const currentData = goalList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Tạo các hàng trong bảng từ dữ liệu hiện tại
  const rows = currentData.map((element) => (
    <tr key={element.name}>
      <td>
        <Text fw={700}>{element.name}</Text>
        <Text c={"dimmed"} size={"xs"}>
          {element.description}
        </Text>
      </td>
      <td>
        <Text fw={700}>{handleDate(element.targetDate)}</Text>
      </td>
      <td>
        <Text fw={700}>{`${element.targetAmount} .VND`}</Text>
      </td>
      <td>
        <Text fw={700}>{element.status}</Text>
      </td>
      <td>
        {/* Nút chỉnh sửa */}
        <EditSVG onClick={() => handleEdit(element)} />
      </td>
    </tr>
  ));

  return (
    <div>
      {/* Hiển thị form chỉnh sửa nếu cần */}
      {displayGoalEditForm && (
        <GoalEditForm
          element={selectedEditElement}
          open={displayGoalEditForm}
          close={handleGoalEditFormClose}
        />
      )}
      <Table verticalSpacing="lg">
        <thead>
          <tr>
            <th>
              <Text c="dimmed">NAME</Text>
            </th>
            <th>
              <Text c="dimmed">TARGET DATE</Text>
            </th>
            <th>
              <Text c="dimmed">TARGET AMOUNT</Text>
            </th>
            <th>
              <Text c="dimmed">STATUS</Text>
            </th>
            <th>
              <Text c="dimmed">EDIT</Text>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {/* Thanh phân trang */}
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
