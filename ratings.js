const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/productRatings", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      rating: {
        type: Number,
        required: true
      }
    }
  ]
});

const Product = mongoose.model("Product", ProductSchema);

// Create product
app.post("/api/products", (req, res) => {
  const newProduct = new Product({
    name: req.body.name
  });
  newProduct
    .save()
    .then(product => res.json(product))
    .catch(err => res.status(400).json({ success: false }));
});

// Get all products
app.get("/api/products", (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json({ success: false }));
});

// Rate product
app.post("/api/products/:id/rate", (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.ratings.push({ user: req.body.userId, rating: req.body.rating });
      product
        .save()
        .then(product => res.json(product))
        .catch(err => res.status(400).json({ success: false }));
    })
    .catch(err => res.status(400).json({ success: false }));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));