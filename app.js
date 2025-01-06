import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Product from "./Models/product.model.js";

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // or '*'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", (req, res) => {
  res.send("Hi from Node.js");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product) {
            res.status(400).json({ message: "Product not found." });
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body)

        if(!product) {
            res.status(400).json({ message: "Product not found." });
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});

mongoose
  .connect(
    "mongodb+srv://sourav2x4x:0wUKyQsIPoehy8As@backend-db.e9e8g.mongodb.net/?retryWrites=true&w=majority&appName=Backend-DB"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Something error");
  });
