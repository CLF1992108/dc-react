import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LayerTree } from './LayerTree';
import { BaseProperty } from './BaseProperty';
import { AddLayer } from './AddLayer';
import { useEffect, useState } from 'react';

export const Layers = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const mySubscriber = (msg: string, data: any) => {
    setOpen(true);
    data['id'] && setId(data['id']);
  };
  useEffect(() => {
    PubSub.subscribe('CHANGE_TYPE', mySubscriber);

    return () => {
      PubSub.unsubscribe('CHANGE_TYPE');
    };
  }, []);
  return (
    <>
      <Stack
        direction="column"
        display="flex"
        sx={{
          maxHeight: 'calc(100vh - 85px)',
          height: 'calc(100vh - 85px)',
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
            height: '30px',
            bgcolor: '#222',
            color: '#fff',
            fontSize: '12px',
          }}
        >
          <Stack sx={{ flexGrow: 1 }}>场景图层</Stack>
          <Box
            component={AddIcon}
            color="inherit"
            sx={{ mr: 1, cursor: 'pointer' }}
            onClick={() => {
              setId(undefined);
              setOpen(true);
            }}
          />
          {/* <Box
            component={DeleteIcon}
            color="inherit"
            sx={{ mr: 1, cursor: 'pointer' }}
            onClick={() => {
              alert(3);
            }}
          /> */}
        </Stack>
        <Stack
          sx={{
            flexGrow: 1,
            maxWidth: 320,
            height: '1000px',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ height: '800px' }}>
            <LayerTree></LayerTree>
          </Box>
        </Stack>
        {/* <Stack
          direction="row"
          display="flex"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            pl: 1,
            pr: 1,
            height: '30px',
            bgcolor: '#222',
            color: '#fff',
            fontSize: '12px',
          }}
        >
          <Stack sx={{ flexGrow: 1, pt: 0.5, pb: 0.5 }}>基础属性</Stack>
        </Stack>
        <Stack sx={{ overflowY: 'auto' }}>
          <Box sx={{ height: '500px' }}>
            <BaseProperty></BaseProperty>
          </Box>
        </Stack> */}
      </Stack>
      <AddLayer
        open={open}
        close={() => {
          setOpen(false);
        }}
        id={id}
      ></AddLayer>
    </>
  );
};
