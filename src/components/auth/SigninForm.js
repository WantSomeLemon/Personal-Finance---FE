import {
  Button,
  Container,
  Group,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount, openForgotPasswordForm } from "../../features/userSlice";

export default function SigninForm(props) {
  const signinInProgress = useSelector((state) => state.user.signinInProgress);
  const dispatch = useDispatch();

  // Sử dụng Mantine form để quản lý các giá trị nhập vào
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
      password: (value) =>
        value
          ? null
          : "Mật khẩu yêu cầu ít nhất một chữ cái viết hoa, viết thường, số và ký tự đặc biệt.",
    },
  });

  // Hàm xử lý đăng nhập khi gửi form
  async function handleSubmit() {
    try {
      // Gửi yêu cầu đăng nhập và xử lý kết quả trả về
      const res = await dispatch(loginAccount(form.values));
      if (res.payload) {
        props.close(); // Đóng modal khi đăng nhập thành công
      }
    } catch (err) {
      // Bắt và hiển thị lỗi nếu có
      console.error("Lỗi khi đăng nhập:", err);
      // Thêm xử lý lỗi nếu cần (ví dụ: hiển thị thông báo lỗi cho người dùng)
    }
  }

  return (
    <Modal
      withCloseButton={false}
      radius="lg"
      size="sm"
      opened={props.open}
      onClose={() => {
        props.close();
      }}
      centered
    >
      <LoadingOverlay visible={signinInProgress} overlayBlur={2} />
      <Title size="32" align="center">
        Đăng nhập
      </Title>
      <Container size="md">
        {/* Form đăng nhập */}
        <form onSubmit={form.onSubmit((values) => handleSubmit())}>
          {/* Nhập Email */}
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Email"
            placeholder="your@gmail.com"
            type="email"
            {...form.getInputProps("email")}
          />
          {/* Nhập Mật khẩu */}
          <TextInput
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Mật khẩu"
            placeholder="Mật khẩu"
            type="password"
            {...form.getInputProps("password")}
          />
          {/* Liên kết tới form quên mật khẩu */}
          <Text
            onClick={() => dispatch(openForgotPasswordForm())}
            size={"sm"}
            c="blue"
            style={{ marginTop: 16, cursor: "pointer" }}
          >
            Quên mật khẩu?
          </Text>
          <Group style={{ marginTop: 16, marginBottom: 16 }}>
            {/* Nút gửi */}
            <Button radius="md" fullWidth type="submit">
              Gửi
            </Button>
          </Group>
        </form>
      </Container>
    </Modal>
  );
}
