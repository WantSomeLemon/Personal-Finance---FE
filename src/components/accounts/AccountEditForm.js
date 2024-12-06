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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAccount,
  fetchAccount,
  removeAccount,
} from "../../features/accountSlice";

export default function AccountEditForm(props) {
  console.log(props.element); // In thông tin tài khoản cần sửa
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const addAccountInProcess = useSelector(
    (state) => state.account.addAccountInProcess
  );
  const [showDiscard, setShowDiscard] = useState(false); // Trạng thái để hiển thị modal xác nhận xóa

  const form = useForm({
    initialValues: {
      name: "",
      currentBalance: "",
      paymentTypes: [],
    },
    validate: {
      // Kiểm tra hợp lệ khi người dùng nhập thông tin
      name: (value) => (value ? null : "Name is required"),
      currentBalance: (value) =>
        value ? null : "Enter the current balance of your account",
      paymentTypes: (value) =>
        value.length > 0 ? null : "Select at least one payment type",
    },
  });

  // Khi component được mount, thiết lập giá trị ban đầu cho form
  useEffect(() => {
    form.setFieldValue("name", props?.element?.name || "");
    form.setFieldValue("currentBalance", props?.element?.currentBalance || "");
    form.setFieldValue("paymentTypes", props?.element?.paymentTypes || []);
  }, [form, props?.element]);

  // Hàm xử lý xóa tài khoản
  async function handleDelete() {
    try {
      // Thực hiện xóa tài khoản và cập nhật danh sách tài khoản
      await dispatch(
        removeAccount({ token: token, accountId: props.element.accountId })
      );
      await dispatch(fetchAccount({ token: token }));
      form.reset(); // Đặt lại form sau khi xóa
      props.close(); // Đóng modal sau khi xóa
    } catch (error) {
      console.error("Error deleting account:", error); // Xử lý lỗi nếu có
    }
  }

  // Hàm đóng modal xác nhận xóa
  function handleDiscardCancel() {
    setShowDiscard(false);
  }

  // Hàm hủy bỏ việc chỉnh sửa và đóng modal
  function handleCancel() {
    form.reset(); // Đặt lại form
    props.close(); // Đóng modal
  }

  // Hàm cập nhật tài khoản
  async function handleUpdate() {
    try {
      // Thực hiện cập nhật tài khoản và cập nhật danh sách tài khoản
      await dispatch(
        changeAccount({
          ...form.values,
          token: token,
          accountId: props.element.accountId,
        })
      );
      await dispatch(fetchAccount({ token: token }));
      form.reset(); // Đặt lại form sau khi cập nhật
      props.close(); // Đóng modal sau khi cập nhật
    } catch (error) {
      console.error("Error updating account:", error); // Xử lý lỗi nếu có
    }
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
      <LoadingOverlay visible={addAccountInProcess} overlayBlur={2} />
      <Title style={{ marginLeft: 10 }} order={3}>
        Edit Account
      </Title>
      <Container size="md">
        <form onSubmit={form.onSubmit((values) => handleUpdate())}>
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Name"
            placeholder="E.g., MBBank, Vietcombank"
            type="text"
            {...form.getInputProps("name")}
          />
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Balance"
            placeholder="E.g., 500,000"
            type="number"
            {...form.getInputProps("currentBalance")}
          />
          <Checkbox.Group
            style={{ marginTop: 16 }}
            {...form.getInputProps("paymentTypes")}
            label="Payment Type"
            withAsterisk
          >
            <Group style={{ marginTop: 10 }} mt="xs">
              <Checkbox value="Cash" label="Cash" />
              <Checkbox value="Debit Card" label="Debit Card" />
              <Checkbox value="Credit Card" label="Credit Card" />
            </Group>
          </Checkbox.Group>
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
                color="red"
                fullWidth
                onClick={() => setShowDiscard(true)} // Hiển thị modal xác nhận xóa
              >
                Delete
              </Button>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Button
                radius="md"
                variant="default"
                onClick={() => handleCancel()} // Hủy và đóng modal
                fullWidth
              >
                Cancel
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

      {/* Modal xác nhận xóa tài khoản */}
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
        title="Confirm Delete"
      >
        <Text size="sm" c="dimmed" style={{ marginBottom: 10 }}>
          This will delete this account.
        </Text>
        <Grid>
          <Grid.Col span={"auto"}>
            <Button
              radius="md"
              color="gray"
              fullWidth
              onClick={() => setShowDiscard(false)} // Hủy bỏ việc xóa
            >
              No, Cancel
            </Button>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Button
              color="red"
              onClick={() => handleDelete()} // Xác nhận xóa tài khoản
              radius="md"
              fullWidth
              type="submit"
            >
              Yes, Delete
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </Modal>
  );
}
