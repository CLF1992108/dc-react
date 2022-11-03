import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { getTypeList } from "../api/layerReq";
import { TypeProps } from "../api/types";
import { hcEditor } from "../store/HcEditor";
export interface EditorProps {}

const Editor: React.FC<EditorProps> = ({}) => {
  const [types, setTypes] = useState([]);
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
      console.log(hcEditor.Layer);
      let icon = "";
      debugger;
      item.eleType === "billboard" &&
        (icon = "http://am-img.gkiiot.com/editor/textures/暖色2.jpg");
      hcEditor.draw(item.eleType, icon);
    };
  };
  return (
    <Box
      bgcolor="#fff"
      sx={{
        position: "absolute",
        right: "50px",
        top: "50px",
        zIndex: 1,
        color: "#000",
        borderRadius: "10px",
      }}
    >
      <List component="nav" aria-label="secondary mailbox folders">
        {types.map((item) => (
          <ListItem button onClick={handleClick(item)} key={item.id}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default observer(Editor);
