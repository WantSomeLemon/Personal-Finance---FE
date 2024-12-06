import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";
import { AppShell, Text, Header, Title } from "@mantine/core";
import { ReactComponent as NoDataSVG } from "../../assets/No-data.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Layout(props) {
  // Kiểm tra xem người dùng có đang sử dụng thiết bị di động hay không
  const isMobile = useSelector((state) => state.user.isMobile);
  
  // State để kiểm soát việc mở/đóng navbar
  const [navOpened, setNavOpened] = useState(false);
  
  // Hàm xử lý lỗi khi xảy ra exception trong quá trình render
  const renderContent = () => {
    try {
      // Kiểm tra nếu props.load là true, hiển thị children (nội dung chính)
      if (props.load) {
        return props.children;
      } else {
        // Nếu không có dữ liệu, hiển thị thông báo và hình ảnh
        return (
          <div>
            <Title style={{ margin: 5 }} order={2}>
              {props.title}
            </Title>
            <div
              style={{
                textAlign: "center",
                alignSelf: "center",
                marginTop: 50,
              }}
            >
              <NoDataSVG />
              <Text>You Haven't Created Any {props.title} Yet.</Text>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error("Error rendering content: ", error); // Log lỗi nếu có
      return <Text>An error occurred while loading content.</Text>; // Hiển thị thông báo lỗi
    }
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <SideBar
          navOpened={navOpened}
          isMobile={isMobile}
          currentPage={props.title}
        />
      }
      header={
        <Header height={60} p="xs">
          {
            <HeaderBar
              navOpened={navOpened}
              setNavOpened={setNavOpened}
              isMobile={isMobile}
            />
          }
        </Header>
      }
    >
      {/* Render nội dung chính hoặc thông báo lỗi nếu có */}
      {renderContent()}
    </AppShell>
  );
}
