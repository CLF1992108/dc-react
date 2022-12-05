import { Layers } from "./Layers";
import { Scenes } from "./Scenes";
import React from "react";
export const modules = [
  {
    title: "场景信息",
    component: <Scenes></Scenes>,
  },
  {
    title: "图层管理",
    component: <Layers></Layers>,
  },
];
export default modules;
