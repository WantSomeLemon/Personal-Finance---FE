import { Grid, Skeleton } from "@mantine/core";
import axios from "axios";
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import tinycolor from "tinycolor2";
import { baseUrl } from "../../api/config";
import { ReactComponent as NoDataSVG } from "../../assets/No-data-1.svg";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const IncomePieChart = () => {
    const [result, setResult] = useState([]); // Trạng thái lưu trữ dữ liệu biểu đồ
    let tempresult = []; // Mảng tạm để lưu trữ dữ liệu đã xử lý
    const isMobile = useSelector(state => state.user.isMobile); // Kiểm tra thiết bị di động
    const [pieChartLoading, setPieChartLoading] = useState(false); // Trạng thái loading biểu đồ
    const token = useSelector(state => state.user.token); // Token từ Redux
    const localToken = localStorage.getItem('token'); // Token từ localStorage

    // Fetch dữ liệu từ API khi component mount hoặc khi token thay đổi
    useEffect(() => {
        setPieChartLoading(true); // Bắt đầu trạng thái loading
        axios.get(`${baseUrl}/dashboard/this-month/income`, {
            headers: { Authorization: `Bearer ${localToken}` } // Gửi token qua header
        }).then((res) => {
            setResult(res.data.data); // Lưu trữ kết quả trả về vào state
            setPieChartLoading(false); // Dừng trạng thái loading
            console.log("res", res.data.data); // Log kết quả trả về từ API
        }).catch((err) => {
            setPieChartLoading(false); // Dừng trạng thái loading nếu có lỗi
            console.error("Lỗi khi lấy dữ liệu: ", err); // Log lỗi
        });
    }, [token]); // Thực hiện lại khi token thay đổi

    // Mảng chứa các nhãn và dữ liệu chi phí
    const labels = [];
    const incomeData = [];
    const colorPalette = ['#C8DEFF', '#6DA8FF', '#247CFF', '#0057DB', '#0042A4']; // Bảng màu cho biểu đồ
    const colorCount = colorPalette.length;
    const MAX_CATEGORIES = 5; // Giới hạn số lượng danh mục hiển thị

    // Xử lý dữ liệu khi số lượng danh mục vượt quá giới hạn
    if (result.length > MAX_CATEGORIES) {
        const topCategories = result.slice(0, MAX_CATEGORIES);
        const otherCategories = result.slice(MAX_CATEGORIES);

        // Tính tổng thu nhập của các danh mục "Khác"
        const otherIncomeSum = otherCategories.reduce(
            (sum, item) => sum + item.income, 0
        );

        topCategories.push({ category: 'Others', income: otherIncomeSum });
        tempresult = topCategories; // Gộp các danh mục chính và "Others"
    } else {
        tempresult = result; // Dùng tất cả dữ liệu nếu không vượt quá giới hạn
    }

    // Dữ liệu cho biểu đồ
    const data = {
        labels,
        datasets: [
            {
                data: incomeData,
                backgroundColor: [], // Mảng màu nền cho từng phần của biểu đồ
                borderWidth: 0, // Không có viền
            },
        ],
    };

    // Duyệt qua dữ liệu để điền nhãn, dữ liệu và màu sắc cho biểu đồ
    tempresult.forEach((item, index) => {
        labels.push(item.category); // Thêm nhãn danh mục
        incomeData.push(item.income); // Thêm giá trị thu nhập vào biểu đồ

        // Tính màu sắc dựa trên chỉ số và bảng màu
        const colorIndex = index % colorCount;
        const color = tinycolor(colorPalette[colorIndex]);

        // Điều chỉnh độ sáng của màu sắc
        const brightness = (index / (result.length - 1)) * (0.4 - 0.1) + 0.1;
        const adjustedColor = color.darken(brightness).toString();

        // Thêm màu nền vào biểu đồ
        data.datasets[0].backgroundColor.push(adjustedColor);
    });

    // Hàm để xác định vị trí của legend (chú giải) tùy theo thiết bị
    function legend() {
        return isMobile ? 'right' : 'top'; // Chế độ mobile sẽ đặt legend ở bên phải
    }

    // Hàm để xác định tỷ lệ khung hình của biểu đồ
    function aspectRatio() {
        return isMobile ? 2 : 1; // Tỷ lệ khung hình khác nhau cho mobile và desktop
    }

    // Các tùy chọn cho biểu đồ
    const options = {
        responsive: true,
        aspectRatio: aspectRatio(), // Thiết lập tỷ lệ khung hình
        plugins: {
            legend: {
                position: legend(), // Đặt vị trí của legend
            },
        },
    };

    return (
        <div>
            {pieChartLoading ? (
                // Hiển thị skeleton loader trong khi dữ liệu đang được tải
                <div>
                    <Grid mb={5}>
                        <Grid.Col span={4}>
                            <Skeleton height={8} mt={6} width="70%" radius="xl" />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Skeleton height={8} mt={6} width="70%" radius="xl" />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Skeleton height={8} mt={6} width="70%" radius="xl" />
                        </Grid.Col>
                    </Grid>
                    <Skeleton height={190} circle />
                </div>
            ) : (
                <div>
                    {result.length > 0 ? (
                        // Hiển thị biểu đồ nếu có dữ liệu
                        <Pie data={data} options={options} />
                    ) : (
                        // Hiển thị hình ảnh "Không có dữ liệu" nếu không có kết quả
                        <NoDataSVG style={{ height: 230 }} />
                    )}
                </div>
            )}
        </div>
    );
};

export default IncomePieChart;
