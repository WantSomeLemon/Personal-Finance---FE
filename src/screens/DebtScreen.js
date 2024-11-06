import React, { useState } from 'react';
import DebtList from '../components/debts/DebtList'; // Component danh sách nợ
//import DebtForm from '../components/debts/DebtForm'; // Compon
import Layout from '../layout/Layout'; // Layout chứa header và sidebar

const DebtScreen = () => {
  const [debts, setDebts] = useState([
    { id: 1, creditor: 'Bank A', amount: 1000 },
    { id: 2, creditor: 'Bank B', amount: 2000 },
  ]); // Dữ liệu nợ ban đầu
  const [currentDebt, setCurrentDebt] = useState(null); // Lưu thông tin nợ hiện tại để chỉnh sửa

  // Thêm hoặc cập nhật nợ
  const handleSaveDebt = (debt) => {
    if (debt.id) {
      // Nếu đã có id thì cập nhật nợ
      setDebts(debts.map(d => d.id === debt.id ? debt : d));
    } else {
      // Nếu chưa có id thì thêm mới
      debt.id = debts.length + 1;
      setDebts([...debts, debt]);
    }
    setCurrentDebt(null); // Reset form sau khi lưu
  };

  // Xóa nợ
  const handleDeleteDebt = (id) => {
    setDebts(debts.filter(d => d.id !== id)); // Lọc danh sách nợ bỏ nợ đã xóa
  };

  return (
    <Layout title={"Debts"} load={debts.length > 0}>
      
      
      {/* Danh sách nợ hiện có */}
      <DebtList debts={debts} onEditDebt={setCurrentDebt} onDeleteDebt={handleDeleteDebt} />
    </Layout>
  );
};

export default DebtScreen;
