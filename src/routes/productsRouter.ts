import express from "express";
import { Product } from "../data/product";
import { productListManager } from "../data/productList";
import { authenticateJWT } from "../middleware/authenticateJWT";

export const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.json(productListManager.getAllProducts());
});

productsRouter.get("/name/:name", (req, res) => {
  const name = req.params.name;
  const product = productListManager.getProductByName(name);
  if (!product) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }
  res.json(product);
});

productsRouter.get("/categories", (req, res) => {
  res.json(productListManager.getCategories());
});

productsRouter.get("/category/:category", (req, res) => {
  const category = req.params.category;
  res.json(productListManager.getProductsByCategory(category));
});

productsRouter.get("/exists/:name", (req, res) => {
  const name = req.params.name;
  res.json(productListManager.productExists(name));
});

productsRouter.get("/count/total", (req, res) => {
  res.json(productListManager.getTotalProducts());
});

productsRouter.get("/:id", (req, res) => {
  const productId = req.params.id;
  const product = productListManager.getProductById(productId);
  if (!product) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }
  res.json(product);
});

// Lecture : publique. Écriture (POST / PUT / DELETE) : token JWT obligatoire.
productsRouter.post("/", authenticateJWT, (req, res) => {
  const product = new Product(
    "",
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.category,
    req.body.stock,
  );

  const created = productListManager.addProduct(product);
  if (!created) {
    return res.status(400).json({ message: "Produit avec ce nom existe déjà" });
  }
  res.json(product);
});

productsRouter.put("/:id", authenticateJWT, (req, res) => {
  const productId = req.params.id;
  const updatedProduct = new Product(
    productId,
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.category,
    req.body.stock,
  );

  const updated = productListManager.updateProduct(productId, updatedProduct);
  if (!updated) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }
  res.json(updatedProduct);
});

productsRouter.delete("/name/:name", authenticateJWT, (req, res) => {
  const name = req.params.name;
  const deleted = productListManager.deleteProductByName(name);
  if (!deleted) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }
  res.json({ message: `Produit "${name}" supprimé` });
});

productsRouter.delete("/:id", authenticateJWT, (req, res) => {
  const productId = req.params.id;
  const deleted = productListManager.deleteProduct(productId);
  if (!deleted) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }
  res.json({ message: `Produit avec id ${productId} supprimé` });
});
