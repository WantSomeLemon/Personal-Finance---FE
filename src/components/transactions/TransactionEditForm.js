import {
  TextInput,
  Title,
  Radio,
  Modal,
  Group,
  Button,
  Container,
  Grid,
  Textarea,
  Select,
  Text,
  Loader,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import {
  editTransaction,
  fetchTransaction,
  removeTransaction,
} from "../../features/transactionSlice";
import { fetchAccount } from "../../features/accountSlice";
import { useEffect, useState } from "react";
import { fetchCategory } from "../../features/categorySlice";

export default function TransactionEditForm(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  useSelector((state) => state.transaction.addTransactionInProcess);
  const [showDiscard, setShowDiscard] = useState(false);
  const categoryList = useSelector((state) => state.category.categoryList);
  const accountList = useSelector((state) => state.account.accountList);
  const editTransactionInProcess = useSelector(
    (state) => state.transaction.editTransactionInProcess
  );
  
  // Khởi tạo form và validate các trường
  const form = useForm({
    initialValues: {
      amount: "",
      type: "",
      accountId: "",
      paymentType: "",
      categoryId: "",
      description: "",
      dateTime: new Date(),
    },
    validate: {
      amount: (value) => (value !== "" ? null : "Amount is required"),
      accountId: (value) => (value !== "" ? null : "Select account"),
      categoryId: (value) => (value !== "" ? null : "Select category"),
      paymentType: (value) => (value !== "" ? null : "Select type"),
    },
  });

  // Fetch các danh mục và tài khoản khi component được render
  useEffect(() => {
    dispatch(fetchCategory({ token: token }));
    dispatch(fetchAccount({ token: token }));
    
    // Điền giá trị ban đầu cho form từ props
    form.setFieldValue("amount", props?.element?.amount);
    form.setFieldValue("categoryId", props?.element?.category?.categoryId);
    form.setFieldValue("paymentType", props?.element?.paymentType);
    form.setFieldValue("description", props?.element?.description);
    const date = new Date(props?.element?.dateTime);
    form.setFieldValue("dateTime", date);
    form.setFieldValue("type", props?.element?.category?.type);
    form.setFieldValue("accountId", props?.element?.account?.accountId);
  }, [
    dispatch,
    form,
    props?.element?.account?.accountId,
    props?.element?.amount,
    props?.element?.category?.categoryId,
    props?.element?.category?.type,
    props?.element?.dateTime,
    props?.element?.description,
    props?.element?.paymentType,
    token,
  ]);

  function handleDiscardCancel() {
    setShowDiscard(false); // Đóng modal xác nhận hủy bỏ
  }

  // Hàm xử lý chỉnh sửa giao dịch
  async function handleEditTransaction(values) {
    try {
      // Dispatch cập nhật giao dịch
      await dispatch(
        editTransaction({
          ...form.values,
          token: token,
          dateTime: form.values.dateTime.getTime(),
          transactionId: props.element.id,
        })
      );
      // Lấy lại danh sách giao dịch và tài khoản
      await dispatch(fetchTransaction({ token: token }));
      await dispatch(fetchAccount({ token: token }));
      
      // Reset form và đóng modal
      form.reset();
      props.close();
    } catch (error) {
      // Xử lý lỗi nếu có trong quá trình chỉnh sửa giao dịch
      console.error("Error editing transaction:", error);
      alert("There was an error updating the transaction. Please try again.");
    }
  }

  // Hàm xử lý lấy danh mục cho Select
  function categoryData() {
    const data = [];
    categoryList.map((val) => {
      data.push({ value: val.categoryId, label: val.name });
    });
    return data;
  }

  // Hàm xử lý lấy tài khoản cho Select
  function accountData() {
    const data = [];
    accountList.map((val) => {
      data.push({ value: val.accountId, label: val.name });
    });
    return data;
  }

  // Hàm xử lý lấy loại thanh toán dựa trên tài khoản đã chọn
  function paymentTypeDate() {
    const data = [];
    const selectedAccount = form.values.accountId;
    let paymentType = [];
    accountList.map((val) => {
      if (val.accountId === selectedAccount) {
        paymentType = val.paymentTypes;
      }
    });
    if (paymentType.length > 0) {
      paymentType.split(", ").map((val) => {
        data.push({ value: val, label: val });
      });
    }
    return data;
  }

  // Hàm xử lý loại giao dịch dựa trên danh mục
  function handleTransactionType() {
    categoryList.map((val) => {
      if (val.categoryId === form.values.categoryId) {
        form.values.type = val.type;
      }
    });
  }

  // Hàm xử lý hủy chỉnh sửa
  function handleCancel() {
    form.reset();
    props.close();
  }

  // Hàm xử lý xóa giao dịch
  async function handleDelete() {
    try {
      // Dispatch xóa giao dịch
      await dispatch(
        removeTransaction({ token: token, transactionId: props.element.id })
      );
      // Lấy lại danh sách giao dịch và tài khoản
      await dispatch(fetchTransaction({ token: token }));
      await dispatch(fetchAccount({ token: token }));
      
      // Reset form và đóng modal
      form.reset();
      props.close();
    } catch (error) {
      // Xử lý lỗi nếu có khi xóa giao dịch
      console.error("Error deleting transaction:", error);
      alert("There was an error deleting the transaction. Please try again.");
    }
  }

  return (
    <>
      <Modal
        overlayProps={{
          color: "white",
          opacity: 0.55,
          blur: 3,
        }}
        size={"xl"}
        withCloseButton={false}
        closeOnClickOutside={false}
        radius="lg"
        opened={props.open}
        onClose={() => {
          props.close();
        }}
        centered
      >
        <Title
          style={{ marginLeft: 10 }}
          order={3}
        >{`Edit Transaction: `}</Title>
        <form onSubmit={form.onSubmit((values) => handleEditTransaction())}>
          <Grid style={{ margin: 10 }}>
            <Grid.Col span={6}>
              <Container size="md">
                <DateTimePicker
                  radius="md"
                  dropdownType="modal"
                  valueFormat="DD MMM YYYY hh:mm A"
                  label="Date and time"
                  placeholder="Pick date and time"
                  maw={400}
                  mx="auto"
                  {...form.getInputProps("dateTime")}
                />
                <TextInput
                  radius="md"
                  style={{ marginTop: 16 }}
                  label="Amount"
                  placeholder="Vd: 500,000"
                  type="number"
                  {...form.getInputProps("amount")}
                  withAsterisk
                />
                <Textarea
                  radius="md"
                  style={{ marginTop: 16 }}
                  placeholder="Enter Description"
                  label="Description"
                  autosize
                  minRows={4}
                  {...form.getInputProps("description")}
                />
              </Container>
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                radius="md"
                label="Category"
                placeholder="Select Category"
                searchable
                clearable
                nothingFound={
                  categoryList.length === 0 ? (
                    <Text c="blue">No data found</Text>
                  ) : (
                    <Loader size="sm" variant="dots" />
                  )
                }
                withAsterisk
                data={categoryData()}
                onChange={handleTransactionType()}
                {...form.getInputProps("categoryId")}
              />
              <Select
                radius="md"
                style={{ marginTop: 16 }}
                label="Account"
                withAsterisk
                searchable
                clearable
                nothingFound={
                  accountList.length === 0 ? (
                    <Text c="blue">No data found</Text>
                  ) : (
                    <Loader size="sm" variant="dots" />
                  )
                }
                placeholder="Select Account"
                data={accountData()}
                {...form.getInputProps("accountId")}
              />
              <Select
                radius="md"
                style={{ marginTop: 16 }}
                label="Payment Type"
                withAsterisk
                disabled={form.values.accountId === ""}
                clearable
                nothingFound={
                  paymentTypeDate().length === 0 ? (
                    <Text>No data found</Text>
                  ) : (
                    <Loader size="sm" variant="dots" />
                  )
                }
                placeholder="Select Payment Type"
                data={paymentTypeDate()}
                {...form.getInputProps("paymentType")}
              />
              <Radio.Group
                style={{ marginTop: 16 }}
                label="Type"
                {...form.getInputProps("type")}
              >
                <Group mt="xs">
                  <Radio disabled value="expense" label="Expense" />
                  <Radio disabled value="income" label="Income" />
                </Group>
              </Radio.Group>
            </Grid.Col>
          </Grid>
          <Group position="right" mt="md">
            <Button variant="default" onClick={() => handleCancel()}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="green"
              disabled={editTransactionInProcess}
            >
              Save Changes
            </Button>
          </Group>
        </form>
        <Modal
          opened={showDiscard}
          onClose={() => setShowDiscard(false)}
          title="Confirm Discard"
        >
          <Text>
            Are you sure you want to discard the changes made to this transaction?
          </Text>
          <Group position="right" mt="md">
            <Button variant="outline" onClick={handleDiscardCancel}>
              Cancel
            </Button>
            <Button color="red" onClick={() => props.close()}>
              Discard
            </Button>
          </Group>
        </Modal>
      </Modal>
    </>
  );
}
