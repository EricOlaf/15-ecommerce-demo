import React, { Component } from "react";
import SideNav from "./SideNav";
import { connect } from "react-redux";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goToProduct = id => {
    this.props.history.push("/product/" + id);
  };

  render() {
    let { products } = this.props;
    let saleItems = products
      .filter(prod => prod.sale)
      .slice(-3)
      .map(p => {
        return (
          <div
            onClick={() => this.goToProduct(p.id)}
            key={p.id}
            className="img_card"
          >
            <img alt={p.desc} height="100px" src={p.img_url} />
            <h6> {p.name} </h6>
          </div>
        );
      });
    return (
      <div className="home_container">
        <SideNav />
        <div className="home_body">
          <div
            onClick={() => this.props.history.push("/store")}
            className="img_container"
          />
          <div className="sale_items_container">{saleItems}</div>
        </div>
      </div>
    );
  }
}
export default connect(({ products }) => ({ products }))(Home);
