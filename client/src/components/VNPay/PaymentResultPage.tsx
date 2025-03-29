import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentResultPage = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra query params để xác định trạng thái thanh toán
    const queryParams = new URLSearchParams(location.search);
    const vnpSecureHash = queryParams.get("vnp_SecureHash");
    const vnpTxnRef = queryParams.get("vnp_TxnRef");

    // Gửi yêu cầu xác minh với backend
    axios
      .get(
        `/order/vnpay_return?vnp_SecureHash=${vnpSecureHash}&vnp_TxnRef=${vnpTxnRef}`,
      )
      .then((response) => {
        setPaymentStatus(response.data); // Hiển thị thông báo thanh toán thành công hoặc thất bại
        if (response.data.includes("thành công")) {
          // Điều hướng đến trang khác nếu thanh toán thành công
          setTimeout(() => navigate("/order/success"), 3000); // Thay "/order/success" bằng route thực tế của bạn
        }
      })
      .catch((error) => {
        console.error("Lỗi khi xử lý kết quả thanh toán:", error);
        setPaymentStatus("Có lỗi xảy ra khi xử lý thanh toán.");
      });
  }, [location.search, navigate]);

  return (
    <div className="container">
      <h3>Kết quả thanh toán</h3>
      <p>{paymentStatus}</p>
    </div>
  );
};

export default PaymentResultPage;
