import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { getOverlaysByLayerId, getTypeList } from "../api/layerReq";
import { hcEditor } from "../store/HcEditor";
import { TypeProps } from "../types/Overlay";
import { hcOverlay } from "../core/Overlay";
export interface LayerManageProps {}

const LayerManage: React.FC<LayerManageProps> = ({}) => {
  const [types, setTypes] = useState([]);
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
    let res = await getOverlaysByLayerId(params),
      overlay: any;

    res.forEach((element) => {
      if (element.eleType === "billboard") {
        let position = new DC.Position(
          element.position[0],
          element.position[1]
        );
        overlay = new DC.Billboard(position, layer.attr.icon);
      } else if (element.eleType === "polyline") {
        overlay = new DC.Polyline(element.points);

        console.log(layer.attr.color);
        overlay.setStyle({
          width: layer.attr.width,
          material: new Cesium.Color.fromCssColorString(layer.attr.color), //颜色
        });
      } else if (element.eleType === "polygon") {
        overlay = new DC.Polygon("120,20;120,30;122,30");
      }
      hcOverlay.setOverlayAttr(overlay, layer.attr);
      layer.addOverlay(overlay);
      overlay.on(DC.MouseEventType.CLICK, () => {
        hcEditor.Plot.edit(overlay, () => {
          hcEditor.editorComplete(overlay);
        });
      });
      overlay.on(DC.MouseEventType.RIGHT_CLICK, (e: any) => {
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

          console.log(hcEditor.getLayer(ele.type));
          hcEditor.getLayer(ele.type).show = ele.checked;
        }
      });
      setTypes([...types]);
    };
  };
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
