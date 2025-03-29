import React from "react";
import { useNavigate } from "react-router-dom";

interface PaymentResultProps {
  code: string;
}

const PaymentResult: React.FC<PaymentResultProps> = ({ code }) => {
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate("/order");
  };

  return (
    <div style={{ textAlign: "center" }}>
      {code === "00" ? (
        <p>GD thành công</p>
      ) : (
        <p style={{ color: "red" }}>GD thất bại</p>
      )}
      <p>
        <button className="btn btn-default" onClick={handleBackToList}>
          Về danh sách
        </button>
      </p>
    </div>
  );
};

export default PaymentResult;
