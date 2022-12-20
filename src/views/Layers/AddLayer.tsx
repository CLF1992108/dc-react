import React, { useState } from 'react';
import { DraggableDialog } from '../../components/common/DraggableDialog';
import { AddLayerStepper } from './AddLayerStepper';

interface AddLayerProps {
  open: boolean;
  close: () => void;
}

export const AddLayer: React.FC<AddLayerProps> = ({ open, close }) => {
  return (
    <DraggableDialog
      open={open}
      title="新增图层"
      confirm={() => {
        close();
      }}
      close={close}
      confirmButton={false}
      cancelButton={false}
    >
      <AddLayerStepper></AddLayerStepper>
    </DraggableDialog>
  );
};
