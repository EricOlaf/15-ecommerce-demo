import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import { getProducts } from "../ducks/reducer";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { withRouter } from "react-router-dom";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    return (
      <div>
        <nav>
          <span onClick={() => this.props.history.push("/")} className="logo">
            Up Shirt Creek
          </span>
          <div className="right_nav">
            <form
              onSubmit={e => {
                e.preventDefault();
                this.props.history.push(`/Store?q=${this.state.search}`);
              }}
            >
              <Input
                onChange={e => this.setState({ search: e.target.value })}
                style={{ color: "white" }}
                inputProps={{
                  "aria-label": "Description"
                }}
                startAdornment={
                  <InputAdornment>
                    <Search />
                  </InputAdornment>
                }
              />
            </form>
            <Link to="/cart">
              <ShoppingCart />
            </Link>
            <a href={`${process.env.REACT_APP_HOST}/login`}>
              <AccountCircle />
            </a>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    { getProducts }
  )(NavBar)
);
