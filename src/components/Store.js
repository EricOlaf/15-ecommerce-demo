import React, { Component } from "react";
import SideNav from "./SideNav";
import { connect } from "react-redux";
import "./Store.css";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goToProduct = id => {
    this.props.history.push(`/product/${id}`);
  };
  render() {
    let {
      products,
      match: {
        params: { category }
      },
      location: { search }
    } = this.props;

    let searchTerm = search
      .replace(/[?]/, "")
      .split("=")
      .pop();

    let productItems = products
      .filter(p => (category ? p.category === category : true))
      .filter(p => {
        if (!searchTerm) return true;
        return Object.values(p).some(c =>
          c
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      })
      .map(p => {
        return (
          <div
            onClick={() => this.goToProduct(p.id)}
            key={p.id}
            className="img_card"
          >
            <img alt={p.desc} height="150px" src={p.img_url} />
            <h6> {p.name} </h6>
            <h6> ${p.price}</h6>
          </div>
        );
      });

    return (
      <div className="store_container">
        <SideNav />
        <div className="store_body">
          <div className="items_container">{productItems}</div>
        </div>
      </div>
    );
  }
}
export default connect(({ products }) => ({ products }))(Store);
