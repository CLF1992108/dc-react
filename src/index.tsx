import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

import { DcLoader, HttpLoader } from "./loader";
import RouteList from "./router";
import "./themes/index.scss";
(() => {
  let loaderPromise = new Promise((resolve) => {
    new DcLoader().load();
    new HttpLoader().load();
    resolve(true);
  });
  Promise.all([axios.get("config/config.json"), loaderPromise]).then(
    ([res]) => {
      global.Config = res.data;
      const { Cesium } = DC.Namespace;
      global["Cesium"] = Cesium;
      const container = document.getElementById("root");
      const root = createRoot(container);
      root.render(<RouteList />);
    }
  );
})();
