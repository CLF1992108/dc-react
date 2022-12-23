import React, { useEffect, useCallback } from 'react';
import { hcEditor } from '../store/HcEditor';
import Editor from './Editor';
import { TabsContainer } from '@haichuang/components';
import LayerManage from './LayerManage';
import { Box } from '@mui/material';
export interface ViewerProps {
  onViewerCreated: (viewer: any) => void;
}
const tabs = [
  { title: '图层管理', value: 0, component: <LayerManage /> },
  { title: '编辑元素', value: 1, component: <Editor /> },
];

export const Viewer: React.FC<ViewerProps> = ({ onViewerCreated }) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    DC.ready(() => {
      const viewer = new DC.Viewer('viewer-container');
      onViewerCreated(viewer);
      hcEditor.init(viewer);
    });
  }, []);

  return <div className="viewer-container" id="viewer-container"></div>;
};
