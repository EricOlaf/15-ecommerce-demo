import React, { Component } from "react";
import "./Cart.css";
import axios from "axios";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }
  componentDidMount() {
    axios.get("/api/cart").then(res => {
      this.setState({ cart: res.data });
    });
  }
  updateQuantity = (id, quantity) => {
    if (quantity > 0) {
      axios
        .put("/api/update/" + id, { quantity })
        .then(res => {
          this.setState({ cart: res.data });
        })
        .catch(console.log);
    } else {
      axios
        .delete(`/api/delete/${id}`)
        .then(res => {
          this.setState({ cart: res.data });
        })
        .catch(console.log);
    }
  };
  render() {
    let cart = this.state.cart.map(prod => {
      return (
        <div key={prod.id} className="prod_container">
          <ul>
            <li>{prod.name}</li>
            <img alt={prod.name} height="50px" src={prod.img_url} />
            <li>{prod.size}</li>
            <li>
              <span
                onClick={() => this.updateQuantity(prod.id, prod.quantity - 1)}
              >
                -
              </span>
              {prod.quantity}
              <span
                onClick={() => this.updateQuantity(prod.id, prod.quantity + 1)}
              >
                +
              </span>
              {"            "}
              {"            "}
              <span onClick={() => this.updateQuantity(prod.id, 0)}>
                &#128465;
              </span>{" "}
            </li>
            <li>${prod.price}</li>
          </ul>
          <hr />
        </div>
      );
    });
    let total = this.state.cart.reduce(
      (tot, cur) => tot + cur.price * cur.quantity,
      0
    );
    return (
      <div className="">
        <div className="cart_container">
          {cart}
          <div className="total">Total: ${total}</div>
        </div>
      </div>
    );
  }
}
export default Cart;
