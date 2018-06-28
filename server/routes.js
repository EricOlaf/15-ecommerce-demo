const {
  getProducts,
  addToCart,
  checkForUserOrAdd,
  getCart,
  updateCart,
  deleteFromCart
} = require("./productsCtrl");

module.exports = app => {
  app.get("/api/products", getProducts);
  app.post("/api/addtocart", checkForUserOrAdd, addToCart);
  app.get("/api/cart", checkForUserOrAdd, getCart);
  app.put("/api/update/:id", updateCart);
  app.delete("/api/delete/:id", deleteFromCart);
};
