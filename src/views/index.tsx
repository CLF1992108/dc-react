import { Box } from '@mui/material';
import { reaction } from 'mobx';
import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getMaterialList, LayerProps } from '../api/gisReq';
import { HDrawer } from '../components/common/HDrawer';
import { Msg } from '../components/common/Msg';
import Property from '../components/Property';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Viewer } from '../components/Viewer';
import { hcOverlay } from '../core/HcOverlay';
import HcViewer from '../core/HcViewer';
import { VectorLayer } from '../core/Layer/VectorLayer';
import { MapOptions } from '../core/type';
import { hcEditor } from '../store/HcEditor';
import { PropsOption } from './Layers/AddLayerStepper';

import { modules } from './viewConfig';
export interface AppProps {}

const App: React.FC<AppProps> = (AppProps) => {
  const [open, setOpen] = useState(true);
  const [module, setModule] = useState(0);
  const [layers, setLayers] = useState<LayerProps[]>([]);
  const [options, setOptions] = useState<PropsOption[]>([]);
  const [models, setModels] = useState({});
  const _onViewerCreated = (viewer: any) => {
    const aMapImgOptions: MapOptions = {
      iconUrl: 'https://dc.dvgis.cn/examples/images/icon/img.png',
      iconName: '高德影像',
      style: 'img',
      crs: 'WGS84',
      cva: true,
      type: DC.ImageryType.AMAP,
    };
    const aMapVecOptions: MapOptions = {
      iconUrl: 'https://dc.dvgis.cn/examples/images/icon/elec.png',
      iconName: '高德电子',
      style: 'vec',
      crs: 'WGS84',
      cva: true,
      type: DC.ImageryType.AMAP,
    };
    const tdtImgOptions: MapOptions = {
      iconUrl: 'https://dc.dvgis.cn/examples/images/icon/img.png',
      iconName: '天地图影像',
      key: '02a9d2a704f39cf2d5d7c6b668c51330',
      style: 'img',
      cva: true,
      type: DC.ImageryType.TDT,
    };
    const tdtVecOptions: MapOptions = {
      iconUrl: 'https://dc.dvgis.cn/examples/images/icon/elec.png',
      iconName: '天地图电子',
      key: '02a9d2a704f39cf2d5d7c6b668c51330',
      style: 'vec',
      cva: true,
      type: DC.ImageryType.TDT,
    };
    const nightOptions: MapOptions = {
      iconUrl: 'http://am-img.gkiiot.com/editor/textures/暖色2.jpg',
      iconName: '暖色',
      url: 'http://am-img.gkiiot.com/editor/textures/map19x1_5.png',
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
    let globeRotate = new DC.GlobeRotate(viewer, {
      duration: 0.001,
      callback: () => {
        viewer.flyToPosition(
          new DC.Position(120.38105869, 31.10115627, 1e5, 0, -90)
        );
      },
    });
    globeRotate.start();
  };
  const mySubscriber = (msg: string, data: any) => {
    let globeRotate = new DC.GlobeRotate(hcEditor.Viewer, {
      duration: 0.001,
      callback: () => {
        hcEditor.Viewer.flyToPosition(
          new DC.Position(data.view.lng, data.view.lat, data.view.alt, 0, -90)
        );
      },
    });
    globeRotate.start();
  };
  const onConfirm = (mods: Record<string, unknown>) => {
    setModels(mods);
    hcEditor.CurrentOverlay.attr.panelVal = mods;
    console.log(hcEditor.CurrentOverlay.attr);
    hcOverlay.update(hcEditor.CurrentOverlay.attr);
    hcEditor.Open = false;
  };
  const onCancel = () => {
    hcEditor.Open = false;
  };
  const onDelete = () => {
    hcOverlay.delete(hcEditor.CurrentOverlay.attr);
    hcEditor.Open = false;
  };
  useEffect(() => {
    PubSub.subscribe('VIEW', mySubscriber);
    PubSub.subscribe('SAVE', () => {
      PubSub.publish('MSG', {
        severity: 'success',
        content: '保存成功',
      });
    });
    return () => {
      PubSub.unsubscribe('VIEW');
      PubSub.unsubscribe('SAVE');
    };
  }, []);
  const fetchData = useCallback(async () => {
    let res = await VectorLayer.getAllLayers();
    if (res) {
      setLayers([...res]);
      Array.isArray(res) &&
        res.forEach((element: LayerProps) => {
          let layer = hcEditor.LayerGroup.getLayer(String(element.id));
          layer && hcEditor.LayerGroup.removeLayer(layer);
          layer =
            element.id && hcEditor.createLayer(String(element.id), element);
          getOverlays(layer);
        });
    } else {
      setLayers([]);
    }
  }, []);
  const getOverlays = async (layer: any) => {
    const filter = { layerId: layer.id };
    let res = await getMaterialList({
      filter: JSON.stringify(filter),
    });
    Array.isArray(res) &&
      res.forEach((element: any) => {
        debugger;
        let overlay: any;
        if (element.type === 'point') {
          let position = new DC.Position(
            element.point.coordinates[0],
            element.point.coordinates[1]
          );
          overlay = new DC.Billboard(position, layer.attr.property['icon']);
          overlay.size = [
            layer.attr.property['pixelSize'],
            layer.attr.property['pixelSize'],
          ];
        } else if (element.type === 'line') {
          overlay = new DC.Polyline(element.line.coordinates);
          overlay.setStyle({
            width: layer.attr.property.width,
            material: new Cesium.Color.fromCssColorString(
              layer.attr.property.material
            ), //颜色
          });
          if (layer.attr.property['brighten']) {
            overlay.setStyle({
              width: layer.attr.property.width,
              material: new DC.PolylineLightingMaterialProperty({
                color: new Cesium.Color.fromCssColorString(
                  layer.attr.property.material
                ),
              }),
            });
          }
          if (layer.attr.property['brightenflow']) {
            overlay.setStyle({
              width: layer.attr.property.width,
              material: new DC.PolylineLightingTrailMaterialProperty({
                color: new Cesium.Color.fromCssColorString(
                  layer.attr.property.material
                ),
              }),
            });
          }
        } else if (element.type === 'plane') {
          overlay = new DC.Polygon(element.plane.coordinates[0]);
          overlay.setStyle({
            height: 1, //高度
            material: new Cesium.Color.fromCssColorString(
              layer.attr.property.material
            ), //颜色
            outline: layer.attr.property['outline'], //是否显示边框
            outlineColor: new Cesium.Color.fromCssColorString(
              layer.attr.property['outlineColor']
            ), //是否显示边框
          });
        }
        overlay.attr = element;
        layer.addOverlay(overlay);
        overlay.on(DC.MouseEventType.CLICK, () => {
          try {
            let layer = hcEditor.LayerGroup.getLayer(
              String(overlay.attr.layerId)
            );
            if (layer.attr['property']['brightenflow']) {
              PubSub.publish('MSG', {
                severity: 'error',
                content: '发光流动线不可编辑，先取消选择',
              });
              return;
            }
            hcEditor.Plot.edit(overlay, () => {
              hcOverlay.update(overlay.attr);
            });
          } catch (e) {
            console.log('发光线不可编辑');
          }
        });
        overlay.on(DC.MouseEventType.RIGHT_CLICK, (e: any) => {
          hcEditor.CurrentOverlay = overlay;
          hcEditor.Open = false;
          hcEditor.diolog(e, overlay);
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    PubSub.subscribe('REFRESH_VIEW', fetchData);
    return () => {
      PubSub.unsubscribe('REFRESH_VIEW');
    };
  }, []);
  useEffect(() => {
    let root: any;
    let dispose = reaction(
      () => hcEditor.Open,
      async () => {
        if (hcEditor.Open) {
          const container = document.getElementById('popup');
          root = container && createRoot(container);
          root.render(
            <Property
              footerShow={true}
              options={options}
              models={models}
              onCancel={onCancel}
              onConfirm={onConfirm}
              onDelete={onDelete}
            />
          );
        } else {
          root.unmount();
          hcEditor.popupHide();
        }
      }
    );
    return () => {
      dispose();
    };
  }, []);
  return (
    <>
      <ResponsiveAppBar
        onClick={(e: number) => {
          setOpen(true);
          setModule(e);
        }}
      ></ResponsiveAppBar>
      <HDrawer
        title={modules[module].title}
        open={open}
        anchor="left"
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{
            color: '#fff',
          }}
        >
          {modules[module].component}
        </Box>
      </HDrawer>

      <div
        id="viewer"
        className="home"
        style={{ height: 'calc(100vh - 40px)' }}
      >
        <Viewer onViewerCreated={_onViewerCreated} />
      </div>
      <Msg></Msg>
    </>
  );
};

export default App;
