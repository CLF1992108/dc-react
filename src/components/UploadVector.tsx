import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  InputBase,
  SelectChangeEvent,
} from '@mui/material';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { DraggableDialog } from './common/DraggableDialog';
import { Upload } from './common/Upload';
import { styled } from '@mui/material/styles';
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    width: 160,
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 15,
    padding: '5px 14px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));
export interface UploadVectorProps {
  open: boolean;
  close: () => void;
}
const initDataForm = {
  eleType: 'point',
  importType: 0,
  typeId: 0,
  typeName: '我的图层',
  file: null,
};
export const UploadVector: React.FC<UploadVectorProps> = ({ open, close }) => {
  const [dataForm, setDataForm] = useState(initDataForm);
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dataForm[e.target['name']] = e.target['value'];
    setDataForm({ ...dataForm });
  };
  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    dataForm.typeId = e.target.value as number;
    setDataForm({ ...dataForm });
  };
  return (
    <DraggableDialog open={open} close={close} confirm={close} title="上传">
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">数据类型</FormLabel>
          <RadioGroup
            row
            aria-label="eleType"
            name="eleType"
            value={dataForm.eleType}
            onChange={handleChange}
          >
            <FormControlLabel value="point" control={<Radio />} label="点" />
            <FormControlLabel value="line" control={<Radio />} label="线" />
            <FormControlLabel value="plane" control={<Radio />} label="面" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">导入类型</FormLabel>
          <RadioGroup
            row
            aria-label="importType"
            name="importType"
            value={dataForm.importType}
            onChange={handleChange}
          >
            <FormControlLabel value={0} control={<Radio />} label="新建" />
            <FormControlLabel value={1} control={<Radio />} label="覆盖" />
            <FormControlLabel value={2} control={<Radio />} label="追加" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ pb: 1 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">图层类型</FormLabel>
          {dataForm.importType == 0 && (
            <TextField
              name="typeName"
              sx={{
                color: '#fff',
                bgcolor: '#fff',
                width: '100%',
                '& .MuiInputBase-input': {
                  p: '5px 14px',
                },
              }}
              value={dataForm.typeName}
              onChange={handleChange}
            ></TextField>
          )}
          {dataForm.importType != 0 && (
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={dataForm.typeId}
              onChange={handleSelectChange}
              input={<BootstrapInput />}
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          )}
        </FormControl>
      </Box>
      <Upload onDrop={onDrop}></Upload>
    </DraggableDialog>
  );
};
