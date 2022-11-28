import { Box, FormGroup, List, ListItem, ListItemText } from "@mui/material";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { createRoot, Root } from "react-dom/client";
import { getTypeList } from "../api/layerReq";
import { hcOverlay } from "../core/Overlay";
import { hcEditor } from "../store/HcEditor";
import { TypeProps } from "../types/Overlay";
import Property, { PropsOption } from "./Property";
export interface EditorProps {}
const Editor: React.FC<EditorProps> = ({}) => {
  const [types, setTypes] = useState<TypeProps[]>([]);
  const [options, setOptions] = useState<PropsOption[]>([]);
  const [models, setModels] = useState({});
  const fetchData = useCallback(async () => {
    const param = {};
    let res = await getTypeList(param),
      resTypes = res.result;
    setTypes([...types, ...resTypes]);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleClick = (item: TypeProps) => {
    return () => {
      hcEditor.draw(item);
    };
  };
  const onConfirm = (mods: Record<string, unknown>) => {
    setModels(mods);
    hcEditor.CurrentOverlay.attr.property = mods;
    hcOverlay.update(hcEditor.CurrentOverlay.attr);
    hcEditor.Open = false;
  };
  const onCancel = () => {
    hcEditor.Open = false;
  };
  const onDelete = () => {
    hcOverlay.delete(hcEditor.CurrentOverlay);
    hcEditor.Open = false;
  };
  useEffect(() => {
    let root: Root;
    let dispose = reaction(
      () => hcEditor.Open,
      async () => {
        if (hcEditor.Open) {
          const container = document.getElementById("popup");
          if (container) {
            root = createRoot(container);
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
          }
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
        width: "120px",
        maxHeight: "500px",
        overflow: "auto",
      }}
    >
      <FormGroup>
        <List component="nav" aria-label="secondary mailbox folders">
          {types.map((item) => (
            <ListItem
              button
              onClick={handleClick(item)}
              key={item.id}
              sx={{ pt: 0, m: 0 }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </FormGroup>
    </Box>
  );
};
export default observer(Editor);
