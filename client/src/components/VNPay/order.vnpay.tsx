import React, { useState } from "react";

interface PaymentFormProps {
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("VNPAYQR");
  const [language, setLanguage] = useState<string>("vn");
  const [amountValue, setAmountValue] = useState<number>(amount);

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(Number(event.target.value));
  };

  return (
    <div className="table-responsive">
      <form action="create_payment_url" method="POST">
        <div className="form-group">
          <label>Số tiền</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="Số tiền"
            value={amountValue}
            onChange={handleAmountChange}
          />
        </div>

        <div className="form-group">
          <label>Chọn Phương thức thanh toán:</label>
          <div className="controls">
            <label className="radio-inline">
              <input
                type="radio"
                name="bankCode"
                id="defaultPaymentMethod"
                value="VNPAYQR"
                checked={selectedPaymentMethod === "VNPAYQR"}
                onChange={handlePaymentMethodChange}
              />
              Cổng thanh toán VNPAYQR
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="bankCode"
                id="vnpayqrPaymentMethod"
                value="VNPAYQR"
                checked={selectedPaymentMethod === "VNPAYQR"}
                onChange={handlePaymentMethodChange}
              />
              Thanh toán qua ứng dụng hỗ trợ VNPAYQR
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="bankCode"
                id="vnbankPaymentMethod"
                value="VNBANK"
                checked={selectedPaymentMethod === "VNBANK"}
                onChange={handlePaymentMethodChange}
              />
              Thanh toán qua ATM-Tài khoản ngân hàng nội địa
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="bankCode"
                id="intcardPaymentMethod"
                value="INTCARD"
                checked={selectedPaymentMethod === "INTCARD"}
                onChange={handlePaymentMethodChange}
              />
              Thanh toán qua thẻ quốc tế
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Ngôn ngữ</label>
          <div className="controls">
            <label className="radio-inline">
              <input
                type="radio"
                name="language"
                id="vnLanguage"
                value="vn"
                checked={language === "vn"}
                onChange={handleLanguageChange}
              />
              Tiếng việt
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="language"
                id="enLanguage"
                value="en"
                checked={language === "en"}
                onChange={handleLanguageChange}
              />
              Tiếng anh
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-default" id="btnPopup">
          Thanh toán
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
