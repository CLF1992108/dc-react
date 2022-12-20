import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { getOverlaysByLayerId, getTypeList } from '../api/gisReq';
import { hcEditor } from '../store/HcEditor';
import { TypeProps } from '../types/Overlay';
import { hcOverlay } from '../core/HcOverlay';
import { reaction } from 'mobx';
import Property, { PropsOption } from './Property';
import { createRoot } from 'react-dom/client';
export interface LayerManageProps {}

const LayerManage: React.FC<LayerManageProps> = ({}) => {
  const [types, setTypes] = useState<TypeProps[]>([]);
  const [options, setOptions] = useState<PropsOption[]>([]);
  const [models, setModels] = useState({});
  const fetchData = useCallback(async () => {
    const param = {};
    let res = await getTypeList(param),
      resTypes = res.result;
    createLayer(resTypes);
    setTypes([...types, ...resTypes]);
  }, []);
  const getOverlays = async (layer: any) => {
    let params = {
      type: layer.attr.type,
    };
    let res = await getOverlaysByLayerId(params);
    res.forEach((element: any) => {
      let overlay: any;
      if (element.eleType === 'billboard') {
        let position = new DC.Position(
          element.position['lng'],
          element.position['lat']
        );
        overlay = new DC.Billboard(position, layer.attr.icon);
      } else if (element.eleType === 'polyline') {
        overlay = new DC.Polyline(element.positions);
        overlay.setStyle({
          width: layer.attr.width,
          material: new Cesium.Color.fromCssColorString(layer.attr.color), //颜色
        });
      } else if (element.eleType === 'polygon') {
        overlay = new DC.Polygon(element.positions);
        overlay.setStyle({
          material: new Cesium.Color.fromCssColorString(layer.attr.color), //颜色
        });
      }
      overlay.attr = element;
      layer.addOverlay(overlay);
      overlay.on(DC.MouseEventType.CLICK, () => {
        hcEditor.Plot.edit(overlay, () => {
          hcOverlay.update(overlay);
        });
      });
      overlay.on(DC.MouseEventType.RIGHT_CLICK, (e: any) => {
        hcEditor.CurrentOverlay = overlay;
        hcEditor.Open = false;
        hcEditor.diolog(e, overlay);
      });
    });
  };
  const createLayer = (resTypes: TypeProps[]) => {
    resTypes.map((item: TypeProps) => {
      let layer = hcEditor.createLayer(item.type);
      layer.attr = item;
      hcEditor.getLayer(item.type).show = item.checked;

      getOverlays(layer);
      let json = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              id: '123123123123',
            },
            geometry: {
              coordinates: [23.589367664910725, 12.053289003883052],
              type: 'Point',
            },
          },
          {
            type: 'Feature',
            properties: {
              id: '11111',
            },
            geometry: {
              coordinates: [
                [47.27580860160984, 22.644875980882503],
                [36.613978991421874, 0.06300818076823589],
                [58.021194131897715, -10.272348909080776],
                [59.59664678261976, 0.8694361316624821],
              ],
              type: 'LineString',
            },
          },
          {
            type: 'Feature',
            properties: {
              id: '222222',
            },
            geometry: {
              coordinates: [
                [
                  [22.086384642673806, 34.83479695068948],
                  [-4.831112666565417, 34.83479695068948],
                  [-4.831112666565417, 20.313680421912593],
                  [22.086384642673806, 20.313680421912593],
                  [22.086384642673806, 34.83479695068948],
                ],
              ],
              type: 'Polygon',
            },
          },
          {
            type: 'Feature',
            properties: {
              id: '9999',
            },
            geometry: {
              coordinates: [
                [
                  [-10.476678502550953, -3.5789344235096934],
                  [13.674046004562143, -8.213445824037208],
                  [8.534934751269873, 7.486304322892963],
                  [-23.590603456772328, 11.593415369761416],
                  [-23.54157359206033, 0.3390850276846322],
                  [-23.280014568083175, -12.142124530150113],
                  [-10.476678502550953, -3.5789344235096934],
                ],
              ],
              type: 'Polygon',
            },
          },
        ],
      };

      let geojsonLayer = new DC.GeoJsonLayer('id', json);
      geojsonLayer.eachOverlay((item: any) => {
        // item 为一个entity,
        if (item.polyline) {
          //todo
          let polyline = DC.Polyline.fromEntity(item);
          layer.addOverlay(polyline);
        }
        if (item.polygon) {
          //todo
          let polygon = DC.Polygon.fromEntity(item);
          layer.addOverlay(polygon);
        }
        if (item.billboard) {
          //todo
          let point = DC.Point.fromEntity(item);
          let divIcon = DC.DivIcon.fromEntity(item);
          let billboard = DC.Billboard.fromEntity(item);
          layer.addOverlay(point);
          // layer.addOverlay(divIcon);
          layer.addOverlay(billboard);
          let layerDom = new DC.HtmlLayer('dom');
          layerDom.addOverlay(divIcon);
          // hcEditor.getView;
        }
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleChange = (id: string) => {
    return (e: any) => {
      types.forEach((ele) => {
        if (ele.id === id) {
          ele.checked = !ele.checked;
          hcEditor.getLayer(ele.type).show = ele.checked;
        }
      });
      setTypes([...types]);
    };
  };
  const onCancel = () => {
    hcEditor.Open = false;
  };
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
              footerShow={false}
              options={options}
              models={models}
              onCancel={onCancel}
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
    <Box
      sx={{
        width: '120px',
        maxHeight: '500px',
        overflow: 'auto',
      }}
    >
      <FormGroup>
        {types.map((item) => (
          <FormControlLabel
            sx={{ p: 0, m: 0 }}
            key={item.id}
            control={
              <Checkbox
                checked={item.checked}
                onChange={handleChange(item.id)}
                name={item.type}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
export default observer(LayerManage);
