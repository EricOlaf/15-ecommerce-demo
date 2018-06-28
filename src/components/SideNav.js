import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="relative">
        <div className="side_nav_container">
          <ul>
            <Link to="/store/jeans">Pants</Link>
            <Link to="/store/dress">Dresses</Link>
            <Link to="/store/shoe">Shoes</Link>
            <Link to="/store/shirt">Shirts</Link>
          </ul>
        </div>
      </div>
    );
  }
}
export default SideNav;
