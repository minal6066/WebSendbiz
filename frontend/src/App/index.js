import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/Store";

import AppRoutes from "../Routes/index";

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    );
  }
}

export default App;
