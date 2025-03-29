import React, { useEffect } from "react";

const Checkout = () => {
  useEffect(() => {
    window.location.href = "http://localhost:8080/order/create_payment_url";
  });
};

export default Checkout;
