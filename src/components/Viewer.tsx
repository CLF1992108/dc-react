import React, { useEffect, useState } from "react";
import { hcEditor } from "../store/HcEditor";
import Editor from "./Editor";
import Property from "./Property";
import Test from "./Test";
export interface ViewerProps {
  onViewerCreated: (viewer: any) => void;
}
export const Viewer: React.FC<ViewerProps> = ({ onViewerCreated }) => {
  useEffect(() => {
    DC.ready(() => {
      const viewer = new DC.Viewer("viewer-container");
      onViewerCreated(viewer);
      hcEditor.init(viewer);
    });
  }, [onViewerCreated]);
  
  return (
    <div className="viewer-container" id="viewer-container">
      <Test/>
      <Editor></Editor>
    </div>
  );
};

