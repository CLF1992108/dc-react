import React, { useEffect, useCallback } from "react";
import { hcEditor } from "../store/HcEditor";
import Editor from "./Editor";
import { TabsContainer } from "@haichuang/components";
import LayerManage from "./LayerManage";
import { Box } from "@mui/material";
import { Update } from "./common/Upload";
import { DraggableDialog } from "./common/DraggableDialog";
export interface ViewerProps {
  onViewerCreated: (viewer: any) => void;
}
const tabs = [
  { title: "图层管理", value: 0, component: <LayerManage /> },
  { title: "编辑元素", value: 1, component: <Editor /> },
];

export const Viewer: React.FC<ViewerProps> = ({ onViewerCreated }) => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    DC.ready(() => {
      const viewer = new DC.Viewer("viewer-container");
      onViewerCreated(viewer);
      hcEditor.init(viewer);
    });
  }, []);
  const handleChange = (v: string | number) => {
    let val = typeof v === "number" ? v : Number(v);
    hcEditor.Open = false;
    hcEditor.CurrentModule = val;
    setValue(val);
    setOpen(!open);
  };
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    debugger;
  }, []);
  return (
    <div className="viewer-container" id="viewer-container">
      <Box
        bgcolor="#fff"
        sx={{
          position: "absolute",
          zIndex: 1,
          color: "#000",
        }}
      >
        <TabsContainer
          isRow={true}
          tabs={tabs}
          value={value}
          onChange={handleChange}
        />
        <DraggableDialog
          open={open}
          close={() => {
            setOpen(false);
          }}
          confirm={() => {
            setOpen(false);
          }}
          title="上传"
        >
          <Update onDrop={onDrop}></Update>
        </DraggableDialog>
      </Box>
    </div>
  );
};
