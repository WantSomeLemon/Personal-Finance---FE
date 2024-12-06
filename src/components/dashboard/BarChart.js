import { Skeleton } from "@mantine/core";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { baseUrl } from "../../api/config";
import { ReactComponent as NoDataSVG } from "../../assets/No-data-1.svg";

// Đăng ký các phần mở rộng của ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Khởi tạo các state
  const [result, setResult] = useState([]); // Lưu dữ liệu lấy từ API
  const token = useSelector((state) => state.user.token); // Lấy token từ Redux store
  const [barChartLoading, setBarChartLoading] = useState(false); // Quản lý trạng thái tải biểu đồ
  const isMobile = useSelector((state) => state.user.isMobile); // Kiểm tra xem người dùng có đang sử dụng điện thoại di động không
  const localToken = localStorage.getItem("token"); // Lấy token từ localStorage

  useEffect(() => {
    setBarChartLoading(true); // Bắt đầu tải dữ liệu
    axios
      .get(`${baseUrl}/dashboard/monthly-data`, {
        headers: { Authorization: `Bearer ${localToken}` }, // Gửi token qua header
      })
      .then((res) => {
        setBarChartLoading(false); // Dừng trạng thái tải sau khi nhận dữ liệu
        setResult(res.data.data); // Lưu dữ liệu nhận được vào state
        console.log("res", res.data.data); // Ghi log dữ liệu để kiểm tra
      })
      .catch((err) => {
        setBarChartLoading(false); // Dừng trạng thái tải nếu có lỗi
        console.error("Lỗi khi lấy dữ liệu:", err); // Ghi log lỗi nếu có
      });
  }, [token]); // Chạy lại mỗi khi token thay đổi

  // Tạo mảng nhãn cho biểu đồ
  const labels = [];
  for (let i = result.length - 1; i >= 0; i--) {
    labels.push(result[i].month); // Lấy tháng từ dữ liệu và tạo mảng nhãn
  }

  // Lấy dữ liệu chi tiêu và thu nhập từ API
  const expensesData = result.map((item) => item.expenses);
  const incomeData = result.map((item) => item.income);

  // Kiểm tra xem có dữ liệu hợp lệ để hiển thị không
  function handleHasData() {
    let hasData = false;
    for (let i = result.length - 1; i >= 0; i--) {
      if (result[i].expenses > 0 || result[i].income > 0) {
        hasData = true; // Nếu có dữ liệu chi tiêu hoặc thu nhập lớn hơn 0
      }
    }
    return hasData; // Trả về true nếu có dữ liệu hợp lệ
  }

  // Cấu hình dữ liệu cho biểu đồ
  const data = {
    labels,
    datasets: [
      {
        label: "Expenses", // Tên của dataset chi tiêu
        data: expensesData, // Dữ liệu chi tiêu
        backgroundColor: "#63ABFD", // Màu nền của cột chi tiêu
        borderColor: "#165BAA", // Màu viền của cột chi tiêu
        borderWidth: 3,
        borderRadius: 8, // Bo tròn các góc của cột chi tiêu
      },
      {
        label: "Income", // Tên của dataset thu nhập
        data: incomeData, // Dữ liệu thu nhập
        backgroundColor: "#003380", // Màu nền của cột thu nhập
        borderColor: "#63ABFD", // Màu viền của cột thu nhập
        borderWidth: 3,
        borderRadius: 20, // Bo tròn các góc của cột thu nhập
      },
    ],
  };

  // Cập nhật dữ liệu cho biểu đồ với các tháng và giá trị
  result.forEach((item) => {
    const index = labels.indexOf(item.month); // Tìm kiếm chỉ số của tháng trong mảng nhãn
    if (index !== -1) {
      data.datasets[0].data[index] = item.expenses; // Cập nhật dữ liệu chi tiêu
      data.datasets[1].data[index] = item.income; // Cập nhật dữ liệu thu nhập
    }
  });

  // Hàm tính tỷ lệ khung nhìn biểu đồ
  function aspectRatio() {
    if (isMobile) {
      return 1.5; // Tỷ lệ khung nhìn khi sử dụng điện thoại di động
    } else {
      return 2; // Tỷ lệ khung nhìn cho desktop
    }
  }

  // Tính toán giá trị tối đa và bước kích thước cho trục Y
  const maxDataValue = Math.max(...expensesData, ...incomeData);
  const stepSize = Math.ceil(maxDataValue / 5 / 500) * 500;

  // Cấu hình cho biểu đồ
  const options = {
    aspectRatio: aspectRatio(), // Tỷ lệ khung nhìn
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Hiển thị legend dưới biểu đồ
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Tắt hiển thị lưới trên trục X
        },
      },
      y: {
        beginAtZero: false, // Trục Y không bắt đầu từ 0
        grid: {
          display: false, // Tắt hiển thị lưới trên trục Y
        },
        ticks: {
          stepSize: stepSize, // Bước kích thước cho các tick trên trục Y
          callback: (value) => {
            if (value === 0) return value.toString(); // Hiển thị 0 nếu giá trị là 0
            const number = value / 1000; // Chuyển đổi giá trị thành đơn vị nghìn
            if (number >= 1) {
              return number.toString() + "k"; // Thêm 'k' nếu giá trị >= 1k
            }
            return "";
          },
        },
      },
    },
  };

  return (
    <div>
      {/* Hiển thị Skeleton khi biểu đồ đang tải */}
      {barChartLoading ? (
        <Skeleton height={250}></Skeleton>
      ) : (
        <div>
          {/* Nếu có dữ liệu hợp lệ, hiển thị biểu đồ, nếu không thì hiển thị biểu tượng không có dữ liệu */}
          {handleHasData() ? (
            <Bar options={options} data={data} />
          ) : (
            <NoDataSVG style={{ height: 230 }}></NoDataSVG>
          )}
        </div>
      )}
    </div>
  );
};

export default BarChart;
