import React, { useState, useEffect } from "react";
//import './DebtForm.css'; // Đảm bảo bạn có file CSS cho DebtForm

const DebtForm = ({ debt, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    creditor: "",
    amount: "",
    dueDate: "",
    notes: "",
    isPaid: false,
    paidDate: "",
    owner: "",
  });

  useEffect(() => {
    if (debt) {
      setFormData({
        creditor: debt.creditor,
        amount: debt.amount,
        dueDate: debt.dueDate,
        notes: debt.notes,
        isPaid: debt.isPaid,
        paidDate: debt.paidDate || "",
        owner: debt.owner || "",
      });
    } else {
      setFormData({
        creditor: "",
        amount: "",
        dueDate: "",
        notes: "",
        isPaid: false,
        paidDate: "",
        owner: "",
      });
    }
  }, [debt]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (formData.amount <= 0) {
      alert("Amount must be a positive number.");
      return;
    }

    if (!formData.owner) {
      alert("Owner field cannot be empty.");
      return;
    }

    // Nếu đã thanh toán, tự động điền ngày thanh toán với ngày hiện tại
    const updatedData = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: debt ? debt.id : null,
      paidDate: formData.isPaid
        ? formData.paidDate || new Date().toISOString().split("T")[0]
        : "",
    };

    onSave(updatedData);
    alert(`Debt ${debt ? "updated" : "added"} successfully!`); // Thông báo thành công
    onClose();
  };

  return (
    <div className="debt-form-container">
      <h3 className="form-title">{debt ? "Edit Debt" : "Add Debt"}</h3>
      <form onSubmit={handleSubmit} className="debt-form">
        {["creditor", "amount", "dueDate", "notes", "owner"].map(
          (field, idx) => (
            <div className="form-group" key={idx}>
              <label className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={
                  field === "amount"
                    ? "number"
                    : field === "dueDate"
                    ? "date"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field !== "notes"} // 'notes' field is optional
                className="form-input"
              />
            </div>
          )
        )}

        <div className="form-group">
          <label className="form-label">Is Paid</label>
          <input
            type="checkbox"
            name="isPaid"
            checked={formData.isPaid}
            onChange={handleChange}
            className="form-checkbox"
          />
        </div>

        {formData.isPaid && (
          <div className="form-group">
            <label className="form-label">Paid Date</label>
            <input
              type="date"
              name="paidDate"
              value={formData.paidDate || ""}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {debt ? "Update Debt" : "Add Debt"}
          </button>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DebtForm;
