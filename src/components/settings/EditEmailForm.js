import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEmail, validateToken } from "../../features/userSlice";

export default function EditEmailForm({ close }) {
  // Lấy thông tin người dùng hiện tại từ Redux store
  const currentUser = useSelector(state => state.user.currentUser);

  // Khởi tạo form với giá trị email hiện tại của người dùng
  const form = useForm({
    initialValues: {
      email: currentUser.email,
    },

    // Kiểm tra tính hợp lệ của email
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  // Lấy token người dùng từ Redux store
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  // Hàm xử lý khi người dùng nhấn nút "Update"
  async function handleEditEmail(values) {
    try {
      console.log(values); // Log thông tin values từ form (email mới)

      // Dispatch action cập nhật email trong Redux
      await dispatch(editEmail({ ...form.values, token: token }));

      // Kiểm tra lại token sau khi cập nhật email
      await dispatch(validateToken(token));

      // Đóng form sau khi xử lý xong
      close();
    } catch (error) {
      // Bắt lỗi và thông báo nếu có sự cố trong quá trình cập nhật
      console.error("Error updating email:", error);
      alert("There was an issue updating your email. Please try again.");
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleEditEmail(values))}>
      {/* Trường nhập email */}
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Email"
        {...form.getInputProps("email")}
      />
      <Group style={{ marginTop: 36, marginBottom: 36 }}>
        {/* Nút để cập nhật email */}
        <Button radius="md" fullWidth type="submit">
          Update
        </Button>
      </Group>
    </form>
  );
}
