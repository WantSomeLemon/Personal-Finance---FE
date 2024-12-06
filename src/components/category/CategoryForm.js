import {
  TextInput,
  Title,
  Modal,
  Group,
  Button,
  Container,
  Grid,
  Textarea,
  Radio,
  Text,
  LoadingOverlay
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, closeCategoryForm, fetchCategory } from "../../features/categorySlice";
import { useState } from "react";

export default function CategoryForm(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const addCategoryInProcess = useSelector((state) => state.category.addCategoryInProcess);
  const [showDiscard, setShowDiscard] = useState(false);

  // Khởi tạo form với các giá trị ban đầu và quy tắc xác thực
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      type: "",
    },
    validate: {
      name: (value) => (value !== "" ? null : "Tên là bắt buộc"),
      type: (value) => (value !== "" ? null : "Chọn loại danh mục"),
    },
  });

  // Xử lý khi gửi form để thêm danh mục
  async function handleSubmit() {
    try {
      // Gửi action addCategory để lưu danh mục mới
      await dispatch(addCategory({ ...form.values, token: token }));
      // Lấy lại danh sách danh mục sau khi thêm mới
      await dispatch(fetchCategory({ token: token }));
      form.reset(); // Reset form sau khi gửi
    } catch (error) {
      console.error("Thêm danh mục không thành công:", error); // Ghi log bất kỳ lỗi nào xảy ra khi gửi form
    }
  }

  // Xử lý khi hủy bỏ form mà không lưu
  function handleDiscard() {
    form.reset(); // Reset form
    setShowDiscard(false); // Đóng modal xác nhận hủy bỏ
    dispatch(closeCategoryForm()); // Đóng form danh mục
  }

  // Hủy bỏ hành động hủy và đóng modal hủy bỏ
  function handleDiscardCancel() {
    setShowDiscard(false);
  }

  return (
    <Modal
      radius="lg"
      size="sm"
      opened={props.open}
      withCloseButton={false}
      closeOnClickOutside={false}
      overlayProps={{
        color: "white",
        opacity: 0.55,
        blur: 3,
      }}
      onClose={() => {
        props.close(); // Đóng modal form danh mục
      }}
      centered
    >
      {/* Hiển thị overlay tải trong khi đang thêm danh mục */}
      <LoadingOverlay visible={addCategoryInProcess} overlayBlur={2} />
      
      <Title style={{ marginLeft: 10 }} order={3}>
        Thêm Danh Mục
      </Title>
      <Container size="md">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit())} // Xử lý khi gửi form
        >
          {/* Trường nhập liệu cho tên danh mục */}
          <TextInput
            data-autofocus
            radius="md"
            style={{ marginTop: 16 }}
            withAsterisk
            label="Tên"
            placeholder="Tên"
            type="text"
            {...form.getInputProps("name")}
          />
          {/* Textarea cho mô tả danh mục */}
          <Textarea
            radius="md"
            style={{ marginTop: 16 }}
            label="Mô tả"
            placeholder="Mô tả"
            type="textarea"
            {...form.getInputProps("description")}
          />
          {/* Các radio button cho loại danh mục */}
          <Radio.Group
            radius="md"
            style={{ marginTop: 16 }}
            name="categoryType"
            label="Loại"
            description="Chọn loại danh mục"
            withAsterisk
            {...form.getInputProps("type")}
          >
            <Group mt="xs">
              <Radio value="expense" label="Chi phí" />
              <Radio value="income" label="Thu nhập" />
            </Group>
          </Radio.Group>

          {/* Các nút để hủy bỏ hoặc lưu */}
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
                onClick={() => setShowDiscard(true)} // Hiển thị modal xác nhận hủy bỏ
              >
                Hủy bỏ
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

      {/* Modal để xác nhận hành động hủy bỏ */}
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
        onClose={handleDiscardCancel}
        radius="lg"
        centered
        withCloseButton={false}
        title="Xác nhận Hủy bỏ"
      >
        <Text size={"sm"} c={"dimmed"} style={{ marginBottom: 10 }}>
          Bạn sẽ mất tất cả nội dung đã nhập
        </Text>
        <Grid>
          <Grid.Col span={"auto"}>
            <Button
              radius="md"
              color="gray"
              fullWidth
              onClick={() => setShowDiscard(false)} // Đóng modal xác nhận hủy bỏ
            >
              Không
            </Button>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Button
              color={"red"}
              onClick={() => handleDiscard()} // Hủy bỏ và đóng form
              radius="md"
              fullWidth
              type="submit"
            >
              Có
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </Modal>
  );
}
