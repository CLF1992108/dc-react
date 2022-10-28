import React, { useEffect } from "react";

export interface ViewerProps {
  onViewerCreated: (viewer: any) => void;
}
export const Viewer: React.FC<ViewerProps> = ({ onViewerCreated }) => {
  useEffect(() => {
    DC.ready(() => {
      let viewer = new DC.Viewer("viewer-container");
      onViewerCreated(viewer);
    });
  }, [onViewerCreated]);

  return <div className="viewer-container" id="viewer-container" />;
};
