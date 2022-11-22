import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import {
  getOverlaysByLayerId,
  getPropsListByType,
  getTypeList,
} from "../api/layerReq";
import { hcEditor } from "../store/HcEditor";
import { TypeProps } from "../types/Overlay";
import { hcOverlay } from "../core/Overlay";
import { reaction } from "mobx";
import ReactDOM from "react-dom";
import Property from "./Property";
export interface LayerManageProps {}

const LayerManage: React.FC<LayerManageProps> = ({}) => {
  const [types, setTypes] = useState([]);
  const [options, setOptions]: any[] = useState([]);
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
      if (element.eleType === "billboard") {
        let position = new DC.Position(
          element.position["lng"],
          element.position["lat"]
        );
        overlay = new DC.Billboard(position, layer.attr.icon);
      } else if (element.eleType === "polyline") {
        overlay = new DC.Polyline(element.positions);
        overlay.setStyle({
          width: layer.attr.width,
          material: new Cesium.Color.fromCssColorString(layer.attr.color), //颜色
        });
      } else if (element.eleType === "polygon") {
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
    reaction(
      () => hcEditor.Open,
      async () => {
        if (hcEditor.Open) {
          const container = document.getElementById("popup");
          ReactDOM.render(
            <Property
              footerShow={false}
              options={options}
              models={models}
              onCancel={onCancel}
            />,
            container
          );
        } else {
          hcEditor.popupHide();
        }
      }
    );
  }, []);
  return (
    <Box
      sx={{
        width: "120px",
        maxHeight: "500px",
        overflow: "auto",
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
