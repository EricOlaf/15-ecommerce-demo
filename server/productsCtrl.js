module.exports = {
  getProducts(req, res) {
    const db = req.app.get("db");
    db.products
      .find()
      .then(products => res.status(200).json(products))
      .catch(console.log);
  },
  addToCart(req, res) {
    const db = req.app.get("db");
    let { id, quantity, size } = req.body;
    db.cart
      .insert({
        product_id: id,
        quantity,
        size,
        user_id: req.session.user.id
      })
      .then(resp => {
        return res.status(200).json(resp);
      })
      .catch(console.log);
  },
  checkForUserOrAdd(req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      const db = req.app.get("db");
      db.customer.insert({ session_id: req.sessionID }).then(user => {
        req.session.user = user;
        return next();
      });
    }
  },
  getCart(req, res) {
    const db = req.app.get("db");
    db.getCart(req.session.user.id)
      .then(cart => {
        console.log("cart: ", cart);
        return res.status(200).json(cart);
      })
      .catch(console.log);
  },
  updateCart(req, res) {
    const db = req.app.get("db");
    let { quantity } = req.body;
    db.cart.update({ id: req.params.id }, { quantity }).then(() => {
      db.getCart(req.session.user.id)
        .then(cart => {
          console.log("cart: ", cart);
          return res.status(200).json(cart);
        })
        .catch(console.log);
    });
  },
  deleteFromCart(req, res) {
    const db = req.app.get("db");
    db.query("delete from cart where id = $1", req.params.id).then(() => {
      db.getCart(req.session.user.id)
        .then(cart => {
          console.log("cart: ", cart);
          return res.status(200).json(cart);
        })
        .catch(console.log);
    });
  }
};
