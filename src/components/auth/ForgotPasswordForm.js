import {
  TextInput,
  Title,
  Text,
  Modal,
  Group,
  Button,
  Container,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  newPassword,
  sendVerificationCodeForFP,
  verifyCode,
} from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function ForgotPasswordForm(props) {
  // Sử dụng selectors để quản lý trạng thái tải và trạng thái của các form
  const forgotPasswordInProgress = useSelector(
    (state) => state.user.forgotPasswordInProgress
  );
  const displayMailForm = useSelector((state) => state.user.displayMailForm);
  const displayOtpForm = useSelector((state) => state.user.displayOtpForm);
  const displayPasswordForm = useSelector(
    (state) => state.user.displayPasswordForm
  );

  // Trạng thái cục bộ để quản lý dữ liệu form
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();

  // Form nhập Email
  const mailForm = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
    },
  });

  // Form nhập mã OTP
  const otpForm = useForm({
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) => (value.length === 6 ? null : "Vui lòng nhập mã OTP hợp lệ"),
    },
  });

  // Form nhập mật khẩu mới
  const passwordForm = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(
          value
        )
          ? null
          : "Mật khẩu yêu cầu ít nhất một chữ cái viết hoa, viết thường, số và ký tự đặc biệt.",
      confirmPassword: (value, { password }) =>
        value === password ? null : "Mật khẩu xác nhận không khớp",
    },
  });

  // Xử lý logic thay đổi mật khẩu
  function handleRestPassword() {
    try {
      // Gửi yêu cầu thay đổi mật khẩu mới
      console.log("formValues", formValues);
      dispatch(
        newPassword({ ...formValues, password: passwordForm.values.password })
      );
    } catch (error) {
      console.error("Lỗi khi đặt lại mật khẩu:", error);
      // Thêm logic xử lý lỗi, ví dụ hiển thị thông báo lỗi
    }
  }

  // Xử lý xác thực mã OTP
  function handleVerifyCode() {
    try {
      // Gửi yêu cầu xác thực mã OTP
      dispatch(verifyCode({ otp: otpForm.values.otp, email: formValues.email }));
    } catch (error) {
      console.error("Lỗi khi xác thực mã OTP:", error);
      // Xử lý lỗi liên quan đến xác thực OTP ở đây
    }
  }

  // Xử lý gửi mã OTP xác thực
  function handleSendVerificationCode() {
    try {
      // Cập nhật formValues với email và gửi yêu cầu gửi mã OTP
      setFormValues({ ...formValues, email: mailForm.values.email });
      dispatch(sendVerificationCodeForFP({ email: mailForm.values.email }));
    } catch (error) {
      console.error("Lỗi khi gửi mã xác thực:", error);
      // Xử lý lỗi liên quan đến gửi mã OTP ở đây
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
      <LoadingOverlay visible={forgotPasswordInProgress} overlayBlur={2} />
      <Title size="32" align="center">
        Đặt lại mật khẩu
      </Title>
      <Container size="md">
        {/* Hiển thị form nhập Email */}
        {displayMailForm && (
          <div>
            <Text style={{ marginTop: 10 }} size="md" c="dimmed">
              Nhập Email để nhận mã OTP
            </Text>
            <form
              onSubmit={mailForm.onSubmit((values) =>
                handleSendVerificationCode()
              )}
            >
              <TextInput
                radius="md"
                style={{ marginTop: 16 }}
                withAsterisk
                label="Email"
                placeholder="your@gmail.com"
                type="email"
                {...mailForm.getInputProps("email")}
              />
              <Group style={{ marginTop: 36, marginBottom: 10 }}>
                <Button radius="md" fullWidth type="submit">
                  Tiếp tục
                </Button>
              </Group>
            </form>
          </div>
        )}
        {/* Hiển thị form nhập mã OTP */}
        {displayOtpForm && (
          <div>
            <Text style={{ marginTop: 10 }} size="md" c="dimmed">
              Nhập mã bảo mật
            </Text>
            <form onSubmit={otpForm.onSubmit((values) => handleVerifyCode())}>
              <TextInput
                radius="md"
                style={{ marginTop: 16 }}
                withAsterisk
                label="Nhập mã bảo mật"
                placeholder="Ví dụ: 001666"
                type="otp"
                {...otpForm.getInputProps("otp")}
              />
              <Group style={{ marginTop: 36, marginBottom: 10 }}>
                <Button radius="md" fullWidth type="submit">
                  Xác nhận mã
                </Button>
              </Group>
            </form>
          </div>
        )}
        {/* Hiển thị form nhập mật khẩu */}
        {displayPasswordForm && (
          <div>
            <Text style={{ marginTop: 10 }} size="md" c="dimmed">
              Đặt mật khẩu mới
            </Text>
            <form
              onSubmit={passwordForm.onSubmit((values) => handleRestPassword())}
            >
              <TextInput
                radius="md"
                style={{ marginTop: 16 }}
                withAsterisk
                label="Mật khẩu mới"
                placeholder="Mật khẩu"
                type="password"
                {...passwordForm.getInputProps("password")}
              />
              <TextInput
                radius="md"
                style={{ marginTop: 16 }}
                withAsterisk
                label="Xác nhận mật khẩu"
                placeholder="Xác nhận mật khẩu"
                type="password"
                {...passwordForm.getInputProps("confirmPassword")}
              />
              <Group style={{ marginTop: 36, marginBottom: 10 }}>
                <Button radius="md" fullWidth type="submit">
                  Gửi
                </Button>
              </Group>
            </form>
          </div>
        )}
      </Container>
    </Modal>
  );
}
