import {
    TextInput,
    Title,
    Modal,
    Button,
    Container,
    Grid, Text, LoadingOverlay, Select
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { editGoal, fetchGoal, removeGoal } from "../../features/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { DatePickerInput } from "@mantine/dates";

export default function GoalEditForm(props) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const addGoalInProcess = useSelector(state => state.goal.addGoalInProcess);
    const [showDelete, setShowDelete] = useState(false);
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            targetAmount: '',
            status: '',
            targetDate: new Date()
        },
        validate: {
            name: (value) => (
                value !== '' ? null : 'Name is required'
            ),
            targetAmount: (value) => (
                value !== '' ? null : 'Target Amount is required'
            )
        }
    });

    // UseEffect để thiết lập các trường form khi component được mount hoặc prop element thay đổi
    useEffect(() => {
        form.setFieldValue('name', props?.element?.name);
        form.setFieldValue('description', props?.element?.description);
        form.setFieldValue('targetAmount', props?.element?.targetAmount);
        const date = new Date(props?.element?.targetDate);
        form.setFieldValue('targetDate', date);
        form.setFieldValue('status', props?.element?.status);
    }, [form, props?.element]);

    // Xử lý khi người dùng gửi form để chỉnh sửa mục tiêu
    async function handleSubmit() {
        try {
            // Dispatch hành động editGoal để cập nhật mục tiêu
            await dispatch(editGoal({
                ...form.values,
                goalId: props.element.id,
                token: token,
                targetDate: form.values.targetDate.getTime()
            }));
            // Lấy dữ liệu mục tiêu đã cập nhật
            await dispatch(fetchGoal({ token: token }));
            form.reset(); // Reset form sau khi gửi
            props.close(); // Đóng modal
        } catch (error) {
            console.error("Lỗi khi cập nhật mục tiêu: ", error);
            // Xử lý lỗi (ví dụ: hiển thị thông báo cho người dùng)
        }
    }

    // Xử lý khi người dùng muốn xóa mục tiêu
    async function handleDelete() {
        try {
            // Dispatch hành động removeGoal để xóa mục tiêu
            await dispatch(removeGoal({ goalId: props.element.id, token: token }));
            // Lấy lại dữ liệu mục tiêu đã cập nhật
            await dispatch(fetchGoal({ token: token }));
            form.reset(); // Reset form sau khi xóa
            setShowDelete(false); // Đóng modal xác nhận xóa
            props.close(); // Đóng modal chính
        } catch (error) {
            console.error("Lỗi khi xóa mục tiêu: ", error);
            // Xử lý lỗi (ví dụ: hiển thị thông báo cho người dùng)
        }
    }

    return (
        <Modal
            overlayProps={{
                color: "white",
                opacity: 0.55,
                blur: 3,
            }}
            radius="lg"
            withCloseButton={false}
            closeOnClickOutside={false}
            size="sm"
            opened={props.open}
            onClose={() => { props.close() }}
            centered
        >
            <LoadingOverlay visible={addGoalInProcess} overlayBlur={2} />
            <Title style={{ marginLeft: 10 }} order={3}>Chỉnh sửa Mục tiêu</Title>
            <Container size="md">
                <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                    <TextInput
                        radius="md"
                        style={{ marginTop: 16 }}
                        withAsterisk
                        label="Tên"
                        placeholder="Ví dụ: Quỹ khẩn cấp"
                        type='Tên Mục Tiêu'
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        radius="md"
                        style={{ marginTop: 16 }}
                        label="Mô tả"
                        placeholder="Ví dụ: Dành cho dự phòng"
                        type='description'
                        {...form.getInputProps('description')}
                    />
                    <TextInput
                        radius="md"
                        style={{ marginTop: 16 }}
                        withAsterisk
                        label="Số tiền mục tiêu"
                        placeholder="Ví dụ: 50,000"
                        type='amount'
                        {...form.getInputProps('targetAmount')}
                    />
                    <DatePickerInput
                        radius="md"
                        style={{ marginTop: 16 }}
                        label="Ngày mục tiêu"
                        {...form.getInputProps('targetDate')}
                    />
                    <Select
                        radius="md"
                        style={{ marginTop: 16 }}
                        label="Trạng thái"
                        withAsterisk
                        placeholder="Chọn trạng thái"
                        data={[{ value: "Pending", label: "Chưa hoàn thành" }, { value: "Completed", label: "Hoàn thành" }]}
                        {...form.getInputProps('status')}
                    />
                    <Grid style={{ marginTop: 16, marginBottom: 8 }} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" color="red" fullWidth onClick={() => setShowDelete(true)} >Xóa</Button>
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" variant={"default"} fullWidth onClick={() => props.close()}>Hủy</Button>
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" fullWidth type="submit">Lưu</Button>
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
                onClose={() => setShowDelete(false)}
                radius="lg"
                centered
                withCloseButton={false}
                title="Xác nhận xóa"
            >
                <Text size={"sm"} c={"dimmed"} style={{ marginBottom: 10 }}>Điều này sẽ xóa mục tiêu này.</Text>
                <Grid>
                    <Grid.Col span={"auto"}>
                        <Button radius="md" variant={"default"} fullWidth onClick={() => setShowDelete(false)}>
                            Không, Hủy
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <Button color={"red"} onClick={() => handleDelete()} radius="md" fullWidth type="submit">
                            Có, Xóa
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        </Modal>
    );
}
