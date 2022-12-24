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
import { useCallback, useEffect, useState } from 'react';
import { DraggableDialog } from './common/DraggableDialog';
import { Upload } from './common/Upload';
import { styled } from '@mui/material/styles';
import { LayerProps, uploadMaterial, UploadMaterialProps } from '../api/gisReq';
import { TypeProps } from '../types/Overlay';
import { VectorLayer } from '../core/Layer/VectorLayer';
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

const initDataForm: UploadMaterialProps = {
  type: 'point',
  uploadType: "新建",
  layerId: undefined,
  layerName: '我的图层',
  file: null,
  sceneId: 1
};
export const UploadVector: React.FC<UploadVectorProps> = ({ open, close }) => {
  const [dataForm, setDataForm] = useState(initDataForm);
  const [types, setTypes] = useState<TypeProps[]>([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    let params = {...dataForm}
    params.file = acceptedFiles[0]
    uploadMaterial(params)
  }, [dataForm]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    dataForm[e.target['name']] = e.target['value'];
    setDataForm({ ...dataForm });
  };
  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    
      dataForm.layerId = e.target.value as number;
      setDataForm({ ...dataForm });
  };
  

  const fetchData = useCallback(async () => {
    let res = await VectorLayer.getAllLayers();
      if(res){
        setTypes([...types, ...res])
      }else{
        setTypes([])
      };
    
  }, []);
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <DraggableDialog open={open} close={close} confirm={close} title="上传">
      <Box>
        <FormControl component="fieldset">
          <FormLabel component="legend">数据类型</FormLabel>
          <RadioGroup
            row
            aria-label="type"
            name="type"
            value={dataForm.type}
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
            aria-label="uploadType"
            name="uploadType"
            value={dataForm.uploadType}
            onChange={handleChange}
          >
            <FormControlLabel value="新建" control={<Radio />} label="新建" />
            <FormControlLabel value="覆盖" control={<Radio />} label="覆盖" />
            <FormControlLabel value="追加" control={<Radio />} label="追加" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ pb: 1 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">图层类型</FormLabel>
          {dataForm.uploadType == "新建" && (
            <TextField
              name="layerName"
              sx={{
                color: '#fff',
                bgcolor: '#fff',
                width: '100%',
                '& .MuiInputBase-input': {
                  p: '5px 14px',
                },
              }}
              value={dataForm.layerName}
              onChange={handleChange}
            ></TextField>
          )}
          {dataForm.uploadType != "新建" && (
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={dataForm.layerId}
              onChange={handleSelectChange}
              input={<BootstrapInput />}
            >
              {types.map((type)=><MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)}
            </Select>
          )}
        </FormControl>
      </Box>
      <Upload onDrop={onDrop}></Upload>
    </DraggableDialog>
  );
};
