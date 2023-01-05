import * as React from 'react';
import { Box, Drawer, Toolbar } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from 'antd';
export type Anchor = 'left' | 'right';
export interface HDrawerProps {
  title: string;
  anchor: Anchor;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const HDrawer: React.FC<HDrawerProps> = ({
  title,
  anchor,
  open,
  onClose,
  children,
}) => {
  return (
    <>
      {open && (
        <Box
          sx={{
            width: '320px',
            top: '40px',
            height: 'calc(100vh - 40px)',
            backgroundColor: '#333',
            position: 'fixed',
            zIndex: 9999,
          }}
        >
          <Stack
            direction="row"
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              pl: 1,
              pr: 1,
              height: '45px',
              bgcolor: '#3c3c3c',
              color: '#fff',
            }}
          >
            <Stack sx={{ flexGrow: 1, alignItems: 'center' }}>{title}</Stack>
            <Stack onClick={onClose} sx={{ flexShrink: 0, cursor: 'pointer' }}>
              X
            </Stack>
          </Stack>

          {children}
        </Box>
      )}
    </>
  );
};
