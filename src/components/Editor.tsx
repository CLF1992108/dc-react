import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getTypeList } from "../api/layerReq";
import { hcEditor } from "../store/HcEditor";
import { TypeProps } from "../types/Overlay";
import Property from "./Property";
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
      hcEditor.draw(item);
    };
  };

  reaction(()=>hcEditor.Open1,()=>{
    if(hcEditor.Open1){
      debugger
      ReactDOM.render(<Property/>, document.getElementById('popup'))
    }else{
        console.log(2)
    }
  })
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
