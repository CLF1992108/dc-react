import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Stack } from '@mui/material';
function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
interface DraggableDialogProp {
  open: boolean;
  title: string;
  children: React.ReactNode;
  confirmButton?: boolean;
  cancelButton?: boolean;
  confirm: () => void;
  close: () => void;
}
export const DraggableDialog: React.FC<DraggableDialogProp> = ({
  open,
  title,
  children,
  confirmButton = true,
  cancelButton = true,
  confirm,
  close,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <Stack direction="row" spacing={2} justifyContent="space-between">
            {title}
            <CancelIcon
              style={{
                cursor: 'pointer',
                right: '1px',
              }}
              onClick={close}
            ></CancelIcon>
          </Stack>
        </DialogTitle>

        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {confirmButton && (
            <Button autoFocus onClick={close}>
              取消
            </Button>
          )}
          {cancelButton && <Button onClick={confirm}>确认</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
};
