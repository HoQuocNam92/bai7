import React, { useState } from "react";
import axios from "axios";

function VnpayButton() {
  const [amount, setAmount] = useState<any>(10000);
  const [bankCode, setBankCode] = useState("");

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/payment/create_payment_url",
        {
          amount,
          bankCode,
          orderDescription: "Thanh toán sách",
          orderType: "book",
        },
      );

      if (res.data.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (err) {
      console.error("Lỗi khi tạo thanh toán:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Thanh toán qua VNPAY</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Nhập số tiền"
        className="border p-2 mr-2"
      />
      <select
        value={bankCode}
        onChange={(e) => setBankCode(e.target.value)}
        className="border p-2 mr-2"
      >
        <option value="">Chọn ngân hàng (tùy chọn)</option>
        <option value="NCB">NCB</option>
        <option value="VNPAYQR">VNPAY QR</option>
        <option value="VISA">VISA</option>
      </select>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-red px-4 py-2 rounded"
      >
        Thanh toán
      </button>
    </div>
  );
}

export default VnpayButton;
