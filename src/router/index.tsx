import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import App from "../views";

class RouteList extends React.PureComponent {
  override render() {
    return (
      <Router>
        <Route path="/" component={App} />
      </Router>
    );
  }
}
export default RouteList;
