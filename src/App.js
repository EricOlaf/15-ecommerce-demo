import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./ducks/store";
import NavBar from "./components/Navbar";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <NavBar />
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
