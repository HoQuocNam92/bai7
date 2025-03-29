import React, { useState } from "react";

interface RefundFormProps {
  title: string;
}

const RefundForm: React.FC<RefundFormProps> = ({ title }) => {
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [transType, setTransType] = useState("02");
  const [transDate, setTransDate] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      orderId,
      amount,
      transType,
      transDate,
      user,
    };
    // Gửi dữ liệu này đến API hoặc xử lý logic ở đây
    console.log(formData);
  };

  return (
    <div className="table-responsive">
      <h3>{title}</h3>
      <form action="refund" method="POST" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã giao dịch (vnp_TxnRef):</label>
          <input
            type="text"
            className="form-control"
            name="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Số tiền hoàn:</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Kiểu hoàn tiền (vnp_TransactionType):</label>
          <select
            className="form-control"
            name="transType"
            value={transType}
            onChange={(e) => setTransType(e.target.value)}
          >
            <option value="02">Hoàn toàn phần</option>
            <option value="03">Hoàn một phần</option>
          </select>
        </div>
        <div className="form-group">
          <label>Thời gian tạo giao dịch (vnp_TransactionDate):</label>
          <input
            type="text"
            className="form-control"
            name="transDate"
            placeholder="yyyyMMddHHmmss"
            value={transDate}
            onChange={(e) => setTransDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>User thực hiện hoàn (vnp_CreateBy):</label>
          <input
            type="text"
            className="form-control"
            name="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-default">
          Refund
        </button>
      </form>
    </div>
  );
};

export default RefundForm;
