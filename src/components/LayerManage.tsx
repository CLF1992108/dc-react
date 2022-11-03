import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { getTypeList } from "../api/layerReq";
export interface LayerManageProps {}

const LayerManage: React.FC<LayerManageProps> = ({}) => {
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
  const handleChange = (id: string) => {
    return (e: any) => {
      types.forEach((ele) => {
        if (ele.id === id) {
          ele.checked = !ele.checked;
        }
      });
      setTypes([...types]);
    };
  };
  return (
    <Box
      bgcolor="#fff"
      sx={{
        position: "absolute",
        left: "50px",
        top: "50px",
        zIndex: 1,
        color: "#000",
        borderRadius: "10px",
      }}
    >
      <FormGroup>
        {types.map((item) => (
          <FormControlLabel
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