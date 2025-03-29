import About from "@components/About/About";
import Banner from "@components/Banner/Banner";
import Product from "@components/Products/Product";
import Place from "@components/Place/Place";

export default function Home() {
  return (
    <div>
      <Banner />
      <Product />
      <Place />
      <About />
    </div>
  );
}
