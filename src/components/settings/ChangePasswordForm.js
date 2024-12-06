import React from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { editPassword } from "../../features/userSlice";

export default function ChangePasswordForm({ close }) {
  // Khởi tạo form với các trường và validate
  const form = useForm({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      oldPassword: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(
          value
        )
          ? null
          : "Requires at least one lowercase, uppercase, number and special character.",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(
          value
        )
          ? null
          : "Requires at least one lowercase, uppercase, number and special character.",
      confirmPassword: (value, { password }) =>
        value === password ? null : "Passwords do not match",
    },
  });

  const token = useSelector((state) => state.user.token); // Lấy token người dùng từ store Redux
  const dispatch = useDispatch();

  // Hàm xử lý thay đổi mật khẩu
  async function handleEditPassword(values) {
    try {
      console.log(values); // Để kiểm tra dữ liệu đầu vào

      // Gửi action để cập nhật mật khẩu với dữ liệu form và token
      await dispatch(editPassword({ ...form.values, token: token }));

      // Đóng form sau khi cập nhật thành công
      close();
    } catch (error) {
      console.error("Error updating password:", error);
      // Thông báo lỗi nếu có sự cố xảy ra
      alert("There was an issue updating your password. Please try again.");
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleEditPassword(values))}>
      {/* Trường nhập mật khẩu cũ */}
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Old Password"
        type="password"
        {...form.getInputProps("oldPassword")}
      />
      {/* Trường nhập mật khẩu mới */}
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="New Password"
        type="password"
        {...form.getInputProps("password")}
      />
      {/* Trường xác nhận mật khẩu mới */}
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Confirm Password"
        type="password"
        {...form.getInputProps("confirmPassword")}
      />
      {/* Nút submit */}
      <Group style={{ marginTop: 36, marginBottom: 36 }}>
        <Button radius="md" fullWidth type="submit">
          Update
        </Button>
      </Group>
    </form>
  );
}
