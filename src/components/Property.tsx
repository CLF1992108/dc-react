import { autorun, reaction } from "mobx";
import React, { useEffect, useRef, useState } from "react"
import { hcEditor } from "../store/HcEditor";
import { PropertyPanel } from "@haichuang/components";
import { observer } from "mobx-react-lite";
import { Box } from "@material-ui/core";
export interface PropertyProps{}
 const Property: React.FC<PropertyProps> = ({}) => {
    const [options, setOptions] = useState(()=>{
        return [
        {
          key: "name",
          name: "name",
          label: "名称",
          type: "String",
        },
        {
          key: "HorAlign",
          name: "HorAlign",
          label: "水平对齐",
          type: "Radio",
          children: [
            {
              key: 0,
              value: "0",
              label: "左",
            },
            {
              key: 1,
              value: "1",
              label: "居中",
            },
            {
              key: 2,
              value: "2",
              label: "右",
            },
          ],
        }
        ]  
    });
      const [models, setModels] = useState(() => {
        return {
          name: "",
          HorAlign: 0,
        };
      });
      const onValuesChange = (
        changeVal: Partial<any>,
        allVal: any
      ) => {}
      return (
        // <Box
        //   sx={{
        //     width: "100%",
        //     maxWidth: 360,
        //     bgcolor: "background.paper",
        //     fontSize: "14px",
        //   }}
        //   component="nav"
        //   aria-labelledby="nested-list-subheader"
        // > aaaa
        //   <PropertyPanel
        //     sx={{
        //       width: 280,
        //       p: 0,
        //       "& .css-1xx1wee-MuiFormLabel-root": { padding: "0 8px 0 0" },
        //     }}
        //     options={options}
        //     models={models}
        //     labelPosition="left"
        //     labelWidth="95px"
        //     onValuesChange={onValuesChange}
        //   />
        // </Box>
        <Box>
            
            {/* <PropertyPanel
            sx={{
              width: 280,
              p: 0,
              "& .css-1xx1wee-MuiFormLabel-root": { padding: "0 8px 0 0" },
            }}
            options={options}
            models={models}
            labelPosition="left"
            labelWidth="95px"
            onValuesChange={onValuesChange}
          /> */}
        </Box>
        )
}
export default Property