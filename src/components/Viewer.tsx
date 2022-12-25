import React, { useEffect } from 'react';
import { hcEditor } from '../store/HcEditor';
export interface ViewerProps {
  onViewerCreated: (viewer: any) => void;
}

export const Viewer: React.FC<ViewerProps> = ({ onViewerCreated }) => {
  useEffect(() => {
    DC.ready(() => {
      const viewer = new DC.Viewer('viewer-container');
      onViewerCreated(viewer);
      hcEditor.init(viewer);
    });
  }, []);

  return <div className="viewer-container" id="viewer-container"></div>;
};
