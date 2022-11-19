import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { autorun, reaction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getPropsListByType, getTypeList } from "../api/layerReq";
import { hcEditor } from "../store/HcEditor";
import { TypeProps } from "../types/Overlay";
import Property, { PropsOption } from "./Property";
export interface EditorProps {}
const Editor: React.FC<EditorProps> = ({}) => {
  const [types, setTypes] = useState([]);
  const [options, setOptions]: any[] = useState([]);
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
    console.log("onConfirm");
    // hcEditor.Open = false;
    setModels(mods);
    console.log(models);
  };
  const onCancel = () => {
    hcEditor.Open = false;
    console.log("onCancel");
  };
  const onDelete = () => {
    hcEditor.Open = false;
    console.log("onDelete");
  };
  const init = async () => {
    debugger;
    if (!hcEditor.CurrentOverlay) {
      return;
    }
    const params = { type: hcEditor.CurrentOverlay.type };
    const res = await getPropsListByType(params);
    setOptions(res.result);
  };
  useEffect(() => {
    reaction(
      () => hcEditor.Open,
      async () => {
        if (hcEditor.Open) {
          const container = document.getElementById("popup");
          debugger;
          ReactDOM.render(
            <Property
              init={init}
              footerShow={true}
              options={options}
              models={models}
              onConfirm={onConfirm}
              onCancel={onCancel}
              onDelete={onDelete}
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
