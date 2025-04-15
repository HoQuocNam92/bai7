const ProductService = require("../services/product.service");
const client = require("../config/redisClient");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const cacheData = await client.get("products");
      if (cacheData) return res.json(JSON.parse(cacheData));

      const products = await ProductService.getAllProducts();
      if (!products)
        return res.status(404).json({ message: "No products found" });

      await client.setEx("products", 3600, JSON.stringify(products));
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const cacheKey = `productById${req.params.id}`;
      const cacheData = await client.get(cacheKey);
      if (cacheData) return res.json(JSON.parse(cacheData));

      const product = await ProductService.getProductById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      await client.setEx(cacheKey, 3600, JSON.stringify(product));
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
module.exports = productController;
