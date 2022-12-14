const { Router } = require("express");
const File = require("../container/File");
const Product = require("../models/products");

const productsRouter = Router();
const controller = new File("products");

productsRouter.get("/", (req, res) => {
  res.json(controller.getAll());
});

productsRouter.get("/:id", (req, res) => {
  res.json(controller.getById(req.params.id));
});

productsRouter.post("/", (req, res) => {
  let body = req.body;
  let product = new Product(
    body.name,
    body.description,
    body.code,
    body.pic,
    body.price,
    body.stock
  );
  res.json(controller.save(product));
});
productsRouter.put("/:id", (req, res) => {
  let { id } = req.params;
  let product = { ...req.body, id: parseInt(id) };
  res.json(controller.update(product));
});
productsRouter.delete("/:id", (req, res) => {
  let { id } = req.params;
  res.json(controller.deleteById(id));
});

module.exports = productsRouter;