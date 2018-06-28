import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./Product.css";

class Product extends Component {
  state = {
    size: "",
    quantity: 1
  };
  handleChange = (prop, val) => {
    this.setState({ [prop]: val });
  };

  handleAddToCart = () => {
    axios
      .post("/api/addtocart", {
        id: this.props.product.id,
        quantity: this.state.quantity,
        size: this.state.size
      })
      .then(res => {
        this.props.history.push("/");
      })
      .catch(console.log);
  };
  render() {
    let { product } = this.props;
    return (
      <div className="product_container">
        <div className="left_col">
          <img alt={product.name} src={product.img_url} />
          <h2>{product.name}</h2>
          <h3>{product.desc}</h3>
        </div>
        <div className="right_col">
          <Select
            style={{ width: "250px" }}
            value={this.state.size}
            onChange={e => this.handleChange("size", e.target.value)}
          >
            <MenuItem value={"Small"}>Small</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Large"}>Large</MenuItem>
          </Select>
          <TextField
            id="name"
            label="Name"
            style={{ width: "250px" }}
            value={this.state.quantity}
            onChange={e => this.handleChange("quantity", e.target.value)}
            margin="normal"
            type="number"
          />
          <br />
          <Button onClick={this.handleAddToCart} variant="contained">
            Add to cart
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(({ products }) => ({ products }))(Product);
