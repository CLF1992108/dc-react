import React, { useState } from 'react';
import { DraggableDialog } from '../../components/common/DraggableDialog';
import { AddLayerStepper } from './AddLayerStepper';

interface AddLayerProps {
  id?: number;
  open: boolean;
  close: () => void;
}

export const AddLayer: React.FC<AddLayerProps> = ({ open, close, id }) => {
  return (
    <DraggableDialog
      open={open}
      title="图层编辑"
      confirm={() => {
        close();
      }}
      close={close}
      confirmButton={false}
      cancelButton={false}
    >
      <AddLayerStepper close={close} id={id}></AddLayerStepper>
    </DraggableDialog>
  );
};
