import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Store from "./components/Store";
import Product from "./components/Product";
import Cart from "./components/Cart";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/Store/:category" component={Store} />
    <Route exact path="/Store" component={Store} />
    <Route
      exact
      path="/Product/:id"
      component={connect(state => state)(props => {
        let {
          products,
          match: {
            params: { id }
          }
        } = props;
        if (products.length) {
          return (
            <Product product={products.find(c => +c.id === +id)} {...props} />
          );
        } else {
          return <CircularProgress />;
        }
      })}
    />
    <Route path="/cart" component={Cart} />
  </Switch>
);
