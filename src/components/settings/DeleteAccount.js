import React from 'react';
import { Button, Group, Text } from '@mantine/core';

export default function DeleteAccount() {
  // Hàm xử lý khi người dùng nhấn nút "Delete"
  async function handleDeleteAccount() {
    try {
      // Gửi yêu cầu xóa tài khoản (thực hiện logic gọi API hoặc Redux action ở đây)
      console.log('Deleting account...'); // Ví dụ log thông tin
      // Giả sử API call thành công
      alert('Your account has been deleted successfully.');
    } catch (error) {
      // Bắt lỗi và thông báo nếu có vấn đề khi xóa tài khoản
      console.error('Error deleting account:', error);
      alert('There was an issue deleting your account. Please try again.');
    }
  }

  return (
    <>
      {/* Văn bản hỏi người dùng xác nhận */}
      <Text fz="lg">Are you sure you want to delete your account?</Text>
      
      {/* Nút Delete */}
      <Group position="right" mt="md">
        <Button type="submit" color="red" onClick={handleDeleteAccount}>
          Delete
        </Button>
      </Group>
    </>
  );
}
