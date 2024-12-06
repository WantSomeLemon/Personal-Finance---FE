import {
  TextInput,
  Title,
  Checkbox,
  Modal,
  Group,
  Button,
  Container,
  Grid,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAccount,
  closeAccountForm,
  fetchAccount,
} from "../../features/accountSlice";

export default function AccountForm(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token); // Lấy token người dùng từ store
  const addAccountInProcess = useSelector(
    (state) => state.account.addAccountInProcess // Kiểm tra xem việc thêm tài khoản có đang diễn ra không
  );
  const [showDiscard, setShowDiscard] = useState(false); // Trạng thái hiển thị modal xác nhận bỏ qua

  // Khởi tạo form và các validation
  const form = useForm({
    initialValues: {
      name: "",
      currentBalance: "",
      paymentTypes: [],
    },
    validate: {
      name: (value) => (value ? null : "Name is required"), // Kiểm tra tên tài khoản có được nhập không
      currentBalance: (value) =>
        value ? null : "Enter the current balance of your account", // Kiểm tra số dư có được nhập không
      paymentTypes: (value) =>
        value.length > 0 ? null : "Select at least one payment type", // Kiểm tra loại thanh toán có được chọn không
    },
  });

  // Hàm xử lý khi gửi thông tin tài khoản
  async function handleSubmit() {
    try {
      // Gửi action để thêm tài khoản mới và lấy danh sách tài khoản mới
      await dispatch(addAccount({ ...form.values, token }));
      await dispatch(fetchAccount({ token }));
      form.reset(); // Reset lại form sau khi thêm thành công
    } catch (error) {
      // Xử lý lỗi nếu có khi dispatch các action
      console.error("Error adding account:", error); // Log lỗi ra console
    }
  }

  // Hàm xử lý khi nhấn nút "Discard"
  function handleDiscard() {
    try {
      form.reset(); // Reset lại form
      setShowDiscard(false); // Ẩn modal xác nhận
      dispatch(closeAccountForm()); // Đóng form tạo tài khoản
    } catch (error) {
      console.error("Error discarding form:", error); // Log lỗi nếu có
    }
  }

  // Hàm xử lý khi hủy bỏ bỏ qua
  function handleDiscardCancel() {
    setShowDiscard(false); // Đóng modal xác nhận
  }

  return (
    <Modal
      overlayProps={{
        color: "white",
        opacity: 0.55,
        blur: 3,
      }}
      withCloseButton={false}
      closeOnClickOutside={false}
      radius="lg"
      size="sm"
      opened={props.open}
      onClose={props.close}
      centered
    >
      {/* Overlay hiển thị khi đang xử lý thêm tài khoản */}
      <LoadingOverlay visible={addAccountInProcess} overlayBlur={2} />
      <Title style={{ marginLeft: 10 }} order={3}>
        Add Account
      </Title>
      <Container size="md">
        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          {/* Input cho tên tài khoản */}
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Name"
            placeholder="E.g., MBBank, Vietcombank"
            type="text"
            {...form.getInputProps("name")}
          />
          {/* Input cho số dư tài khoản */}
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Balance"
            placeholder="E.g., 500,000"
            type="number"
            {...form.getInputProps("currentBalance")}
          />
          {/* Checkbox group cho loại thanh toán */}
          <Checkbox.Group
            style={{ marginTop: 16 }}
            {...form.getInputProps("paymentTypes")}
            label="Payment Type"
            withAsterisk
          >
            <Group style={{ marginTop: 10 }} mt="xs">
              <Checkbox value="Debit Card" label="Debit Card" />
              <Checkbox value="Credit Card" label="Credit Card" />
              <Checkbox value="Cash" label="Cash" />
            </Group>
          </Checkbox.Group>
          {/* Các nút hành động */}
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
                variant="default"
                onClick={() => setShowDiscard(true)} // Hiển thị modal xác nhận bỏ qua
                fullWidth
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
      
      {/* Modal xác nhận bỏ qua */}
      <Modal
        overlayProps={{
          color: "red",
          blur: 3,
        }}
        size="auto"
        withinPortal
        closeOnClickOutside={false}
        trapFocus={false}
        withOverlay={false}
        opened={showDiscard}
        onClose={handleDiscardCancel}
        radius="lg"
        centered
        withCloseButton={false}
        title="Confirm Discard"
      >
        <Text size="sm" c="dimmed" style={{ marginBottom: 10 }}>
          You will lose all the content you entered.
        </Text>
        <Grid>
          <Grid.Col span={"auto"}>
            <Button
              radius="md"
              color="gray"
              fullWidth
              onClick={handleDiscardCancel} // Hủy bỏ bỏ qua
            >
              No
            </Button>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Button
              color="red"
              onClick={handleDiscard} // Xác nhận bỏ qua và reset form
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
