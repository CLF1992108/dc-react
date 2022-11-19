import React, { useEffect, useState } from "react";
import { Viewer } from "../components/Viewer";
import HcViewer from "../core/HCViewer";
import { MapOptions } from "../core/type";

export interface AppProps {}

const App: React.FC<AppProps> = (AppProps) => {
  const _onViewerCreated = (viewer: any) => {
    const aMapImgOptions: MapOptions = {
      iconUrl: "https://dc.dvgis.cn/examples/images/icon/img.png",
      iconName: "高德影像",
      style: "img",
      crs: "WGS84",
      cva: true,
      type: DC.ImageryType.AMAP,
    };
    const aMapVecOptions: MapOptions = {
      iconUrl: "https://dc.dvgis.cn/examples/images/icon/elec.png",
      iconName: "高德电子",
      style: "vec",
      crs: "WGS84",
      cva: true,
      type: DC.ImageryType.AMAP,
    };
    const tdtImgOptions: MapOptions = {
      iconUrl: "https://dc.dvgis.cn/examples/images/icon/img.png",
      iconName: "天地图影像",
      key: "02a9d2a704f39cf2d5d7c6b668c51330",
      style: "img",
      cva: true,
      type: DC.ImageryType.TDT,
    };
    const tdtVecOptions: MapOptions = {
      iconUrl: "https://dc.dvgis.cn/examples/images/icon/elec.png",
      iconName: "天地图电子",
      key: "02a9d2a704f39cf2d5d7c6b668c51330",
      style: "vec",
      cva: true,
      type: DC.ImageryType.TDT,
    };
    const nightOptions: MapOptions = {
      iconUrl: "http://am-img.gkiiot.com/editor/textures/暖色2.jpg",
      iconName: "暖色",
      url: "http://am-img.gkiiot.com/editor/textures/map19x1_5.png",
      type: DC.ImageryType.SINGLE_TILE,
    };
    let baseLayers = [
      aMapImgOptions,
      aMapVecOptions,
      tdtImgOptions,
      tdtVecOptions,
      nightOptions,
    ];
    let viewerApi = new HcViewer(viewer);
    viewerApi.addBaseLayer(baseLayers);
    global.viewerApi = viewerApi;
  };
  return (
    <div className="home">
      <Viewer onViewerCreated={_onViewerCreated} />
    </div>
  );
};

export default App;
