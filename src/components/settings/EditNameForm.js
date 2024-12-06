import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editName, validateToken } from "../../features/userSlice";

function EditNameForm({ close }) {
  // Lấy thông tin người dùng hiện tại từ Redux store
  const currentUser = useSelector(state => state.user.currentUser);

  // Khởi tạo form với giá trị firstName và lastName hiện tại của người dùng
  const form = useForm({
    initialValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },

    // Kiểm tra tính hợp lệ của firstName và lastName (chúng không được để trống)
    validate: {
      firstName: (value) => (value !== "" ? null : "First name is required"),
      lastName: (value) => (value !== "" ? null : "Last name is required"),
    },
  });

  // Lấy token người dùng từ Redux store
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  // Hàm xử lý khi người dùng nhấn nút "Update"
  async function handleEditName(values) {
    try {
      console.log(values); // Log thông tin values từ form (firstName, lastName mới)

      // Dispatch action cập nhật tên trong Redux
      await dispatch(editName({ ...form.values, token: token }));

      // Kiểm tra lại token sau khi cập nhật tên
      await dispatch(validateToken(token));

      // Đóng form sau khi xử lý xong
      close();
    } catch (error) {
      // Bắt lỗi và thông báo nếu có sự cố trong quá trình cập nhật
      console.error("Error updating name:", error);
      alert("There was an issue updating your name. Please try again.");
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleEditName(values))}>
      {/* Trường nhập firstName */}
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="First Name"
        {...form.getInputProps("firstName")}
      />
      {/* Trường nhập lastName */}
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Last Name"
        {...form.getInputProps("lastName")}
      />
      <Group style={{ marginTop: 36, marginBottom: 36 }}>
        {/* Nút để cập nhật tên */}
        <Button radius="md" fullWidth type="submit">
          Update
        </Button>
      </Group>
    </form>
  );
}

export default EditNameForm;
