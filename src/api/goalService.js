import axios from "axios";
import { baseUrl } from "./config";

// Tạo mục tiêu mới và chuyển các dữ liệu cần thiết sang chữ thường
export async function createGoal(token, body) {
  const localToken = localStorage.getItem("token");
  return await axios.post(
    `${baseUrl}/goals`,
    {
      name: body.name.toLowerCase(), // Chuyển tên mục tiêu thành chữ thường
      description: body.description.toLowerCase(), // Chuyển mô tả thành chữ thường
      targetAmount: body.targetAmount,
      status: body.status.toLowerCase(), // Chuyển trạng thái thành chữ thường
      targetDate: body.targetDate,
    },
    {
      headers: { Authorization: `Bearer ${localToken}` },
    }
  );
}

// Lấy danh sách mục tiêu và chuyển các thông tin cần thiết sang chữ thường
export async function getGoal(token) {
  const localToken = localStorage.getItem("token");
  const response = await axios.get(`${baseUrl}/goals`, {
    headers: { Authorization: `Bearer ${localToken}` },
  });

  // Chuyển dữ liệu trả về thành chữ thường nếu cần thiết
  const normalizedResponse = response.data.map((goal) => ({
    ...goal,
    name: goal.name.toLowerCase(), // Chuyển tên mục tiêu thành chữ thường
    description: goal.description.toLowerCase(), // Chuyển mô tả thành chữ thường
    status: goal.status.toLowerCase(), // Chuyển trạng thái thành chữ thường
  }));

  return normalizedResponse;
}

// Cập nhật mục tiêu và chuyển các thông tin cần thiết sang chữ thường
export async function updateGoal(token, body) {
  const localToken = localStorage.getItem("token");
  return await axios.put(
    `${baseUrl}/goals/${body.goalId}`,
    {
      name: body.name.toLowerCase(), // Chuyển tên mục tiêu thành chữ thường
      description: body.description.toLowerCase(), // Chuyển mô tả thành chữ thường
      targetAmount: body.targetAmount,
      status: body.status.toLowerCase(), // Chuyển trạng thái thành chữ thường
      targetDate: body.targetDate,
    },
    {
      headers: { Authorization: `Bearer ${localToken}` },
    }
  );
}

// Xóa mục tiêu
export async function deleteGoal(token, goalId) {
  const localToken = localStorage.getItem("token");
  return await axios.delete(`${baseUrl}/goals/${goalId}`, {
    headers: { Authorization: `Bearer ${localToken}` },
  });
}
