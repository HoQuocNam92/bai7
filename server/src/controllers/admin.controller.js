const AdminService = require("../services/admin.service");
const client = require("../config/redisClient");

const adminController = {
  adminDashboard: (req, res) => {
    res.status(200).json({ message: "Welcome to Admin Dashboard" });
  },
  getAllUser: async (req, res) => {
    try {
      const userCache = await client.get("user");
      if (userCache) {
        return res.jsoN(JSON.parse(userCache));
      }
      const user = await AdminService.getAllUser();
      client.setEx("user", 3600, JSON.stringify(user));
      return res.jsoN(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  editUser: async (req, res) => {
    try {
      const id = req.params.id;
      const { role } = req.body;
      const user = await AdminService.editUser(role, id);
      if (!user) {
        return res.json({ message: "User not found or update field" });
      }
      await client.del("user");
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await AdminService.deleteUser(id);
      await client.del("user");
      return res.json({ message: "Delete user successfully ", user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      await client.del("products");
      if (req.file) {
        req.body.image_url = req.file.path;
        req.body.public_id = req.file.filename;
      }

      const product = await AdminService.createProduct(req.body);
      const updatedList = await ProductService.getAllProducts();
      await client.setEx("products", 3600, JSON.stringify(updatedList));

      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await client.del("products");
      const result = await AdminService.deleteProduct(req.params.id);
      const updatedList = await ProductService.getALLProduct();
      await client.setEx("products", 3600, JSON.stringify(updatedList));
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const productCache = await client.get("products");
      if (productCache) {
        return res.json(JSON.parse(productCache));
      }
      const product = await AdminService.getAllProduct();
      client.setEx("products", 3600, JSON.stringify(product));
      return res.json(product);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  },
  eidtProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const product = await AdminService.editProduct(id, updateData);
      await client.del("products");
      return res.jsoN(product);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  },
  uploadImages: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const uploadedImages = req.files.map((file) => ({
        imageUrl: file.path,
        publicId: file.filename,
      }));

      const result = uploadedImages.map((img) => AdminService.uploadImage(img));
      res.json({ images: result, message: "Images uploaded successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteImage: async (req, res) => {
    try {
      await AdminService.removeImage(req.params.id);
      res.json({ message: "Image removed successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = adminController;
