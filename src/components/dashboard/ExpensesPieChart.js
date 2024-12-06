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
import tinycolor from 'tinycolor2';
import { baseUrl } from "../../api/config";
import { ReactComponent as NoDataSVG } from "../../assets/No-data-1.svg";

// Đăng ký các thành phần của chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const ExpensesPieChart = () => {
    const [result, setResult] = useState([]); // Trạng thái lưu trữ dữ liệu cho biểu đồ
    const [pieChartLoading, setPieChartLoading] = useState(false); // Trạng thái loading của biểu đồ
    const isMobile = useSelector(state => state.user.isMobile); // Kiểm tra nếu người dùng đang sử dụng thiết bị di động
    let tempresult = []; // Mảng tạm để lưu trữ dữ liệu đã xử lý
    const token = localStorage.getItem('token'); // Lấy token từ local storage

    // Fetch dữ liệu khi component mount hoặc khi token thay đổi
    useEffect(() => {
        setPieChartLoading(true); // Bắt đầu trạng thái loading
        axios.get(`${baseUrl}/dashboard/this-month/expenses`, {
            headers: { Authorization: `Bearer ${token}` } // Gửi token trong header yêu cầu
        }).then((res) => {
            setResult(res.data.data); // Lưu trữ dữ liệu trả về vào trạng thái result
            setPieChartLoading(false); // Dừng trạng thái loading
            console.log("res", res.data.data); // Log dữ liệu trả về
        }).catch((err) => {
            setPieChartLoading(false); // Dừng trạng thái loading khi có lỗi
            console.log("Lỗi khi lấy dữ liệu: ", err); // Log lỗi nếu có
        });
    }, [token]);

    // Xử lý dữ liệu để vẽ biểu đồ
    const labels = [];
    const expensesData = [];
    const colorPalette = ['#C8DEFF', '#6DA8FF', '#247CFF', '#0057DB', '#0042A4']; // Bảng màu cho các phần của biểu đồ
    const colorCount = colorPalette.length;
    const MAX_CATEGORIES = 4; // Giới hạn số lượng danh mục hiển thị

    // Nếu có nhiều danh mục hơn giới hạn, gộp các danh mục còn lại vào một danh mục "Others"
    if (result.length > MAX_CATEGORIES) {
        const topCategories = result.slice(0, MAX_CATEGORIES);
        const otherCategories = result.slice(MAX_CATEGORIES);

        const otherExpensesSum = otherCategories.reduce(
            (sum, item) => sum + item.expenses, 0
        );

        topCategories.push({ category: 'Others', expenses: otherExpensesSum });
        tempresult = topCategories; // Gộp các danh mục top với "Others"
    } else {
        tempresult = result; // Sử dụng tất cả các danh mục nếu ít hơn giới hạn
    }

    // Chuẩn bị dữ liệu cho biểu đồ Pie
    const data = {
        labels,
        datasets: [
            {
                data: expensesData,
                backgroundColor: [], // Mảng lưu trữ màu nền cho các phần của biểu đồ
                borderWidth: 0, // Không có viền cho các phần của biểu đồ
            },
        ],
    };

    // Lặp qua các danh mục để điền vào dữ liệu biểu đồ và màu sắc
    tempresult.forEach((item, index) => {
        labels.push(item.category); // Thêm nhãn cho danh mục
        expensesData.push(item.expenses); // Thêm dữ liệu chi phí cho biểu đồ

        // Tính màu sắc dựa trên chỉ số và bảng màu
        const colorIndex = index % colorCount;
        const color = tinycolor(colorPalette[colorIndex]);

        // Điều chỉnh độ sáng của màu sắc dựa trên chỉ số và tổng số danh mục
        const brightness = (index / (result.length - 1)) * (0.4 - 0.1) + 0.1;
        const adjustedColor = color.darken(brightness).toString();

        // Đặt màu nền cho các phần của biểu đồ
        data.datasets[0].backgroundColor.push(adjustedColor);
    });

    // Hàm xác định vị trí của legend (chú giải) tùy thuộc vào kích thước màn hình
    function legend() {
        return isMobile ? 'right' : 'top'; // Đặt vị trí chú giải cho mobile và desktop
    }

    // Hàm xác định tỷ lệ khung hình (aspect ratio) tùy thuộc vào kích thước màn hình
    function aspectRatio() {
        return isMobile ? 2 : 1; // Đặt tỷ lệ khung hình cho mobile và desktop
    }

    // Các tùy chọn cho biểu đồ Pie
    const options = {
        responsive: true,
        aspectRatio: aspectRatio(),
        plugins: {
            legend: {
                position: legend(),
            },
        }
    };

    return (
        <div>
            {pieChartLoading ? (
                // Hiển thị skeleton loader trong khi đang tải dữ liệu
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
                    <Skeleton height={190} circle mb="xl" />
                </div>
            ) : (
                // Hiển thị biểu đồ Pie hoặc SVG "Không có dữ liệu" nếu không có dữ liệu
                <div>
                    {result.length > 0 ? (
                        <Pie data={data} options={options} />
                    ) : (
                        <NoDataSVG style={{ height: 230 }} />
                    )}
                </div>
            )}
        </div>
    );
};

export default ExpensesPieChart;
