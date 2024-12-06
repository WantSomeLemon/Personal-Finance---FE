import {
  Button,
  Container,
  Grid,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDebt, closeDebtForm, fetchDebt } from "../../features/debtSlice";

function DebtForm(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const addDebtInProcess = useSelector((state) => state.debt.addDebtInProcess);
  const [showCancel, setShowCancel] = useState(false);
  const form = useForm({
    initialValues: {
      moneyFrom: "",
      amount: "",
      dueDate: "",
      status: "",
    },
    validate: {
      moneyFrom: (value) => (value !== "" ? null : "Money From is required"),
      amount: (value) => (value !== "" ? null : "Enter Amount"),
      dueDate: (value) => (value !== "" ? null : "Enter Due Date"),
      status: (value) => (value !== "" ? null : "Enter Status"),
    },
  });

  // Hàm xử lý gửi form
  async function handleSubmit() {
    try {
      await dispatch(addDebt({ ...form.values, token: token })); // Thêm nợ vào Redux
      await dispatch(fetchDebt({ token: token })); // Lấy lại danh sách nợ sau khi thêm
      form.reset(); // Reset form sau khi gửi
    } catch (error) {
      console.error("Error when submitting the form:", error); // In lỗi nếu có sự cố
    }
  }

  // Hàm hủy bỏ thao tác và đóng form
  function handleCancel() {
    form.reset(); // Reset dữ liệu form
    setShowCancel(false); // Ẩn modal xác nhận
    dispatch(closeDebtForm()); // Đóng form
  }

  // Xác nhận hủy bỏ
  function handleCancelConfirm() {
    setShowCancel(false); // Đóng modal xác nhận
  }

  return (
    <Modal
      overlayProps={{
        color: "white",
        opacity: 0.55,
        blur: 3,
      }}
      withCloseButton={false}
      closeOnClickOutside={true}
      radius="lg"
      size="sm"
      opened={props.open}
      onClose={() => {
        props.close(); // Đóng form nếu đóng ngoài màn hình
      }}
      centered
    >
      <LoadingOverlay visible={addDebtInProcess} overlayBlur={2} /> {/* Hiển thị overlay khi đang thêm nợ */}
      <Title style={{ marginLeft: 10, marginBottom: 20 }} order={3}>
        Add Debt
      </Title>
      <Container size="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit())}>
          <TextInput
            label="Money From"
            placeholder="Enter Money From"
            {...form.getInputProps("moneyFrom")}
            style={{ marginBottom: 20 }}
          />
          <NumberInput
            label="Amount"
            placeholder="Enter Amount"
            hideControls
            {...form.getInputProps("amount")}
            style={{ marginBottom: 20 }}
          />
          <TextInput
            label="Due Date"
            placeholder="Select Due Date"
            type="date"
            {...form.getInputProps("dueDate")}
            style={{ marginBottom: 20 }}
          />
          <Select
            label="Status"
            placeholder="Select Status"
            data={[
              { value: "pending", label: "Pending" },
              { value: "paid", label: "Paid" },
              { value: "overdue", label: "Overdue" },
            ]}
            {...form.getInputProps("status")}
            style={{ marginBottom: 20 }}
          />
          <Grid
            style={{ marginTop: 16, marginBottom: 10 }}
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
                onClick={handleCancel} // Hủy thao tác và đóng form
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
      {/* Modal xác nhận hủy bỏ */}
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
        opened={showCancel}
        onClose={handleCancelConfirm}
        radius="lg"
        centered
        withCloseButton={false}
        title="Confirm"
      >
        <Text size={"sm"} c={"dimmed"} style={{ marginBottom: 10 }}>
          You will lose all entered data
        </Text>
        <Grid>
          <Grid.Col span={"auto"}>
            <Button
              radius="md"
              variant={"default"}
              fullWidth
              onClick={() => setShowCancel(false)} // Đóng modal khi chọn "No"
            >
              No
            </Button>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Button
              color={"red"}
              onClick={() => handleCancel()} // Xác nhận hủy bỏ và đóng form
              radius="md"
              fullWidth
            >
              Yes
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </Modal>
  );
}

export default DebtForm;
