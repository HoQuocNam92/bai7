import styles from "./Style.module.scss";
function ProductDetails() {
  const { Container } = styles;

  return (
    <div className={Container}>
      <h2>Product Details</h2>
    </div>
  );
}

export default ProductDetails;
