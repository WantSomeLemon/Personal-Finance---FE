import {
  TextInput,
  Title,
  Modal,
  Button,
  Container,
  Grid,
  Text,
  LoadingOverlay,
  Select, // Import Select từ Mantine
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { addGoal, closeGoalForm, fetchGoal } from "../../features/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { DatePickerInput } from "@mantine/dates";

export default function GoalForm(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const addGoalInProcess = useSelector((state) => state.goal.addGoalInProcess);
  const [showDiscard, setShowDiscard] = useState(false);

  // Khởi tạo form với các giá trị mặc định và validate
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      targetAmount: "",
      status: "Pending", // Mặc định là "Pending"
      targetDate: new Date(),
    },
    validate: {
      name: (value) => (value !== "" ? null : "Name is required"), // Kiểm tra tên
      targetAmount: (value) =>
        value !== "" ? null : "Target Amount is required", // Kiểm tra số tiền mục tiêu
    },
  });

  // Hàm xử lý submit khi người dùng gửi form
  async function handleSubmit() {
    try {
      await dispatch(
        addGoal({
          ...form.values,
          token: token,
          targetDate: form.values.targetDate.getTime(),
        })
      );
      await dispatch(fetchGoal({ token: token }));
      form.reset(); // Reset form sau khi gửi
    } catch (error) {
      console.error("Lỗi khi thêm mục tiêu:", error); // Ghi lỗi nếu có sự cố trong quá trình gửi
    }
  }

  // Hàm xử lý khi người dùng muốn hủy bỏ và reset form
  function handleDiscard() {
    form.reset();
    setShowDiscard(false);
    dispatch(closeGoalForm()); // Đóng form khi hủy bỏ
  }

  // Hàm xử lý khi người dùng hủy bỏ việc xác nhận hủy
  function handleDiscardCancel() {
    setShowDiscard(false);
  }

  return (
    <Modal
      overlayProps={{
        color: "white",
        opacity: 0.55,
        blur: 3,
      }}
      radius="lg"
      size="sm"
      opened={props.open}
      onClose={() => {
        props.close(); // Đóng form khi người dùng nhấn close
      }}
      centered
    >
      <LoadingOverlay visible={addGoalInProcess} overlayBlur={2} />
      <Title style={{ marginLeft: 10 }} order={3}>
        Add Goal
      </Title>
      <Container size="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit())}>
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Name"
            placeholder="Ex: Emergency Fund"
            type="Goal Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            label="Description"
            placeholder="Vd: For a backup"
            type="description"
            {...form.getInputProps("description")}
          />
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Target Amount"
            placeholder="VD: 500,000"
            type="amount"
            {...form.getInputProps("targetAmount")}
          />
          <DatePickerInput
            radius="md"
            style={{ marginTop: 16 }}
            label="Target Date"
            {...form.getInputProps("targetDate")}
          />
          <Select
            radius="md"
            style={{ marginTop: 16 }}
            label="Status"
            placeholder="Select Status"
            data={[
              { value: "Pending", label: "Pending" },
              { value: "Completed", label: "Completed" },
            ]}
            {...form.getInputProps("status")}
          />
          <Grid
            style={{ marginTop: 16, marginBottom: 8 }}
            gutter={5}
            gutterXs="md"
            gutterMd="xl"
            gutterXl={50}
          >
            <Grid.Col span={"auto"}>
              <Button
                radius="md"
                variant={"default"}
                fullWidth
                onClick={() => setShowDiscard(true)} // Hiển thị modal xác nhận hủy
              >
                Discard
              </Button>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Button radius="md" fullWidth type="submit">
                Save
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Container>
      <Modal
        overlayProps={{
          color: "red",
          blur: 3,
        }}
        size="auto"
        withinPortal={true}
        closeOnClickOutside={false}
        trapFocus={false}
        withOverlay={false}
        opened={showDiscard}
        onClose={handleDiscardCancel} // Nếu người dùng hủy bỏ, đóng modal
        radius="lg"
        centered
        withCloseButton={false}
        title="Confirm Discard"
      >
        <Text size={"sm"} c={"dimmed"} style={{ marginBottom: 10 }}>
          You will lose all the content you entered {/* Cảnh báo người dùng sẽ mất dữ liệu nhập vào */}
        </Text>
        <Grid>
          <Grid.Col span={"auto"}>
            <Button
              radius="md"
              variant={"default"}
              fullWidth
              onClick={() => setShowDiscard(false)} // Đóng modal xác nhận hủy
            >
              No
            </Button>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Button
              color={"red"}
              onClick={() => handleDiscard()} // Thực hiện hủy bỏ và reset form
              radius="md"
              fullWidth
              type="submit"
            >
              Yes
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </Modal>
  );
}
