import { Title, Button, Grid, TextInput } from "@mantine/core";
import { ReactComponent as SearchIcon } from "../../assets/Search.svg";
import { ReactComponent as AddIconBlue } from "../../assets/Add_round_Blue.svg";
import { ReactComponent as SearchIconBlue } from "../../assets/Search_Blue.svg";
import { ReactComponent as FilterIconBlue } from "../../assets/Filter_Blue.svg";
import { useDispatch, useSelector } from "react-redux";
import { showTransactionForm } from "../../features/transactionSlice";

export default function TransactionHeader() {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.user.isMobile);

  // Hàm xử lý sự kiện khi người dùng nhấn vào nút "Add Transactions"
  const handleAddTransactionClick = () => {
    try {
      // Gửi yêu cầu để hiển thị form thêm giao dịch
      dispatch(showTransactionForm());
    } catch (error) {
      // Xử lý lỗi nếu có khi dispatch action
      console.error("Error dispatching showTransactionForm:", error);
      // Bạn có thể thêm thông báo lỗi cho người dùng tại đây, ví dụ dùng toast
    }
  };

  // Hàm xử lý sự kiện khi người dùng nhấn vào nút tìm kiếm
  const handleSearchClick = () => {
    try {
      // Xử lý tìm kiếm nếu có (ví dụ gọi API tìm kiếm)
      console.log("Searching..."); // Thêm logic tìm kiếm nếu cần
    } catch (error) {
      // Xử lý lỗi khi tìm kiếm
      console.error("Error during search:", error);
      // Hiển thị thông báo lỗi nếu cần
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      {isMobile ? (
        <Grid>
          <Grid.Col span={"content"}>
            <Title style={{ margin: 5 }} order={3}>
              Transactions
            </Title>
          </Grid.Col>
          <Grid.Col span={"content"} style={{ marginLeft: "auto" }}>
            {/* Nút Add Transaction */}
            <AddIconBlue
              style={{ margin: 8 }}
              onClick={handleAddTransactionClick} // Xử lý khi nhấn nút Add
            ></AddIconBlue>
            {/* Nút tìm kiếm */}
            <SearchIconBlue
              style={{ margin: 8 }}
              onClick={handleSearchClick} // Xử lý khi nhấn vào tìm kiếm
            ></SearchIconBlue>
            {/* Nút bộ lọc */}
            <FilterIconBlue style={{ margin: 8 }}></FilterIconBlue>
          </Grid.Col>
        </Grid>
      ) : (
        <Grid>
          <Grid.Col span={12} md={6}>
            <Grid>
              <Grid.Col span={"content"} md={"content"}>
                <Title style={{ margin: 5 }} order={2}>
                  Transactions
                </Title>
              </Grid.Col>
              <Grid.Col span={"content"}>
                {/* Nút Add Transaction */}
                <Button
                  radius="md"
                  style={{ margin: 8 }}
                  onClick={handleAddTransactionClick} // Xử lý khi nhấn nút Add
                >
                  Add Transactions
                </Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={12} md={6}>
            {/* Tìm kiếm */}
            <TextInput
              style={{ margin: 8 }}
              icon={<SearchIcon />}
              radius="md"
              placeholder="Search..."
              value={""} // Chưa có giá trị tìm kiếm, cần thêm logic để gắn giá trị
              onClick={handleSearchClick} // Xử lý khi nhấn tìm kiếm
            />
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
}
