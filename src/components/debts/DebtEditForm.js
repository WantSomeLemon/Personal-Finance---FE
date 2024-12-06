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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDebt, fetchDebt, removeDebt } from "../../features/debtSlice";

function DebtEditForm(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const addDebtEditInProcess = useSelector(
    (state) => state.debt.addDebtEditInProcess
  );
  const [showDelete, setShowDelete] = useState(false);

  // Thiết lập xác thực cho form
  const form = useForm({
    initialValues: {
      moneyFrom: "",
      amount: "",
      dueDate: "",
      status: "",
    },
    validate: {
      moneyFrom: (value) => (value !== "" ? null : "Money From là bắt buộc"),
      amount: (value) => (value !== "" ? null : "Nhập số tiền"),
      dueDate: (value) => (value !== "" ? null : "Nhập ngày đến hạn"),
      status: (value) => (value !== "" ? null : "Nhập trạng thái"),
    },
  });

  // Tải dữ liệu ban đầu khi thay đổi prop element
  useEffect(() => {
    if (props?.element) {
      form.setFieldValue("amount", props.element.amount);
      form.setFieldValue("moneyFrom", props.element.moneyFrom);
      form.setFieldValue("dueDate", props.element.dueDate.split("T")[0]);
      form.setFieldValue("status", props.element.status || ""); // Đảm bảo trạng thái được đặt chính xác
    }
  }, [props?.element]); // Phản hồi với sự thay đổi trong dữ liệu element từ parent

  // Xử lý khi gửi (chỉnh sửa nợ)
  async function handleSubmit() {
    try {
      await dispatch(editDebt({ ...form.values, debtId: props.element.debtId }));
      await dispatch(fetchDebt({ token: token }));
      form.reset(); // Reset form sau khi gửi thành công
      props.close(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa nợ:", error);
      // Tùy chọn, bạn có thể hiển thị thông báo lỗi hoặc cảnh báo cho người dùng
    }
  }

  // Xử lý khi xóa nợ
  async function handleDelete() {
    try {
      console.log("debtId", props.element.debtId);
      await dispatch(removeDebt(props.element.debtId));
      await dispatch(fetchDebt({ token: token }));
      form.reset();
      props.close(); // Đóng modal sau khi xóa thành công
    } catch (error) {
      console.error("Lỗi khi xóa nợ:", error);
      // Tùy chọn, hiển thị thông báo lỗi hoặc cảnh báo cho người dùng
    }
  }

  // Hủy bỏ hành động chỉnh sửa
  function handleCancel() {
    form.reset(); // Reset các giá trị trong form
    setShowDelete(false); // Ẩn modal xác nhận xóa
    props.close(); // Đóng modal
  }

  // Hủy bỏ xác nhận xóa
  function handleDeleteCancel() {
    setShowDelete(false);
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
        props.close(); // Đóng modal khi nhấn nút đóng
      }}
      centered
    >
      <LoadingOverlay visible={addDebtEditInProcess} overlayBlur={2} />
      <Title style={{ marginLeft: 10, marginBottom: 20 }} order={3}>
        Chỉnh sửa nợ
      </Title>
      <Container size="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit())}>
          <TextInput
            label="Nguồn tiền"
            placeholder="Nhập nguồn tiền"
            {...form.getInputProps("moneyFrom")}
            style={{ marginBottom: 20 }}
          />
          <NumberInput
            label="Số tiền"
            placeholder="Nhập số tiền"
            hideControls
            {...form.getInputProps("amount")}
            style={{ marginBottom: 20 }}
          />
          <TextInput
            label="Ngày đến hạn"
            placeholder="Chọn ngày đến hạn"
            type="date"
            {...form.getInputProps("dueDate")}
            style={{ marginBottom: 20 }}
          />
          <Select
            label="Trạng thái"
            placeholder="Chọn trạng thái"
            data={[
              { value: "pending", label: "Đang chờ" },
              { value: "paid", label: "Đã thanh toán" },
              { value: "overdue", label: "Quá hạn" },
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
                color="red"
                fullWidth
                onClick={() => setShowDelete(true)} // Hiển thị modal xác nhận xóa
              >
                Xóa
              </Button>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Button
                radius="md"
                variant={"default"}
                fullWidth
                onClick={handleCancel} // Hủy bỏ hành động chỉnh sửa
              >
                Hủy
              </Button>
            </Grid.Col>
            <Grid.Col span={"auto"}>
              <Button radius="md" fullWidth type="submit">
                Lưu
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Container>
      {/* Modal xác nhận xóa */}
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
        opened={showDelete}
        onClose={handleDeleteCancel}
        radius="lg"
        centered
        withCloseButton={false}
        title="Xác nhận xóa"
      >
        <Text size={"sm"} c={"dimmed"} style={{ marginBottom: 10 }}>
          Hành động này sẽ xóa nợ này
        </Text>
        <Grid>
          <Grid.Col span={"auto"}>
            <Button
              radius="md"
              color="gray"
              fullWidth
              onClick={() => setShowDelete(false)} // Hủy bỏ hành động xóa
            >
              Không, hủy bỏ
            </Button>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Button
              color={"red"}
              onClick={() => handleDelete()} // Tiến hành xóa
              radius="md"
              fullWidth
            >
              Có, xóa
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </Modal>
  );
}

export default DebtEditForm;
