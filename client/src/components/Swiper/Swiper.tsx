import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useContext } from "react";
import { ProductContext } from "@context/ProductContext";
import "swiper/css"; // CSS cơ bản cho Swiper
import "swiper/css/navigation"; // CSS cho navigation (nút điều hướng)

const ProductOther = () => {
  const { product } = useContext(ProductContext) as any;

  return (
    <Swiper
      spaceBetween={0} // Loại bỏ hoàn toàn khoảng cách giữa các slide
      slidesPerView={4} // Hiển thị 4 sản phẩm mỗi lần
      navigation // Kích hoạt nút điều khiển (next, prev)
      modules={[Navigation]} // Kích hoạt module Navigation
    >
      {product.map((item: any) => (
        <SwiperSlide key={item.id}>
          <div className="product-item">
            <img loading="lazy" src={item.image_url} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.author}</p>
            <p className="price">{item.price} VND</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductOther;
