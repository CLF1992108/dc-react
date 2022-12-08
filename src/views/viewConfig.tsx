import { Layers } from "./Layers";
import { Scenes } from "./Scenes";
import React from "react";
import { Import } from "./Import";
export const modules = [
  {
    title: "场景信息",
    component: <Scenes></Scenes>,
  },
  {
    title: "图层管理",
    component: <Layers></Layers>,
  },
  {
    title: "导入素材",
    component: <Import></Import>,
  },
];
export default modules;
