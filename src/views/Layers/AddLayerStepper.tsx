import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { PropertyPanel } from '@haichuang/components';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { FormControl, IconButton, Input, List, ListItem, MenuItem, Select, Stack, SxProps, TextField } from '@mui/material';
import { addLayer, editLayer, LayerProps, PointLayerAttr, PolygonLayerAttr, PolylineLayerAttr, upload } from '../../api/gisReq';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
const steps = ['设置基础属性', '设置自定义属性'];
import { HCInput } from '@haichuang/components';
import { urlSearch } from '../../utils/util';
import { VectorLayer } from '../../core/Layer/VectorLayer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
type TFormValues = Record<string, unknown>;
type SelectProps = {
  key: string | number,
  value: string,
  label: string,
};
export interface PropsOption {
  key: string | number;
  label?: string;
  type?: string; // String Boolean List Number Color Vector Range Custom Radio Checkbox
  name: string; // 表单name属性
  children?: Array<SelectProps>;
  customRender?: (
    item: PropsOption,
    values: TFormValues,
    changeValue: (name: string, value: any) => void
  ) => ReactNode;
  hide?: boolean;
  disabled?: boolean;
  compProps?: Record<string, any>;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  required?: boolean;
  props?: Record<string, any>;
}
type RulesProp = {
  required?: boolean, // 是否必选
  type?: string, // 校验类型
  message?: string, // 校验文案
  len?: number, // 字段长度
  pattern?: RegExp, // 正则表达式
  min?: number, // 最小值
  max?: number, // 最大值
};
interface PropertyPanelProps {
  options: Array<PropsOption>;
  models: TFormValues;
  rules?: Record<string, Array<RulesProp>>; //字段验证
  onValuesChange?: (changeValues: TFormValues, allValues: TFormValues) => void; //表单值更新回调,changeValues为当前修改的值
  // onSubmit?: (changeValues: TFormValues, allValues: TFormValues) => void;
  // hasSubmit?: boolean;
  labelPosition?: string;
  labelWidth?: string;
  sx?: SxProps;
  onBlur?: (
    changeValues: TFormValues,
    allValues: TFormValues,
    evt?: React.ChangeEvent
  ) => void; //失焦更新回调,changeValues为当前修改的值
}
interface AddLayerStepperProps {
  close: ()=>void;
  id?: number;
}
const initBasePointModels = {
  type: 'point',
  name: '',
  show: true,
  icon: '',
  pixelSize: 10,
};
const initBasePolylineModels = {
  type: 'line',
  name: '',
  show: true,
  material: '',
  width: 1,
  brighten: false
};
const initBasePolygonModels = {
  type: 'plane',
  name: '',
  show: true,
  material: '',
  outline: true,
  outlineColor: '',
};

const initBaseOptions = [
  {
    key: 'type',
    type: 'Radio',
    label: '类型',
    name: 'type',
    disabled: false,
    children: [
      {
        key: 1,
        value: 'point',
        label: '点',
      },
      {
        key: 2,
        value: 'line',
        label: '线',
      },
      {
        key: 3,
        value: 'plane',
        label: '面',
      },
    ],
  },
  {
    key: 'name',
    type: 'String',
    label: '名称',
    name: 'name',
    disabled: false,
  },
  {
    key: 'show',
    type: 'Boolean',
    label: '显示',
    name: 'show',
    disabled: false,
  },
  
];
const uploadImg = async (e:any)=>{
    console.log(e.target.files[0])
    let urlRes = await upload(e.target.files[0])
    return urlRes
}
const basePointOptions = [
  {
    key: 'icon',
    type: 'Custom',
    label: '图标',
    name: 'icon',
    disabled: false,
    customRender: (item:any, values:any, changeValue:any) => (
      <>
        <IconButton sx={{height:"35px", width:"35px" }} color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" onChange={async (e:any) => {
            
            let url = await uploadImg(e), val;
            if(url){
              val = ASSET_URL + url?.url
              changeValue("icon", val)
            }
            
          }}/>
          {values.icon ? <img src={values.icon} width="35px" height="35px"></img> : <CloudUploadIcon />}
        </IconButton>
      </>
      // <TextField
      //   name={item.name}
      //   value={values[item.name]}
      //   onChange={(e:any) => changeValue(e.target.name, e.target.value)}
      // />
    ),
  },
  {
    key: 'pixelSize',
    type: 'Number',
    label: '尺寸',
    name: 'pixelSize',
    disabled: false,
  },
]
const basePolylineOptions = [
  {
    key: 'material',
    type: 'Color',
    label: '颜色',
    name: 'material',
    disabled: false,
  },
  {
    key: 'width',
    type: 'Number',
    label: '宽度',
    name: 'width',
    disabled: false,
  },
  {
    key: 'brighten',
    type: 'Boolean',
    label: '发光',
    name: 'brighten',
    disabled: false,
  },
]
const basePolygonOptions = [
  {
    key: 'material',
    type: 'Color',
    label: '颜色',
    name: 'material',
    disabled: false,
  },
  {
    key: 'outline',
    type: 'Boolean',
    label: '边框',
    name: 'outline',
    disabled: false,
  },
  {
    key: 'outlineColor',
    type: 'Color',
    label: '边框颜色',
    name: 'outlineColor',
    disabled: false,
  },
  // {
  //   key: 'outlineWidth',
  //   type: 'Number',
  //   label: '边框宽度',
  //   name: 'outlineWidth',
  //   disabled: false,
  // },
]
const initCustomOptions = []
const initDataForm: LayerProps = {
  name: '',
  sceneId: 0,
  type: 'Point',
  property: "",
  panelField: "",
};
export const AddLayerStepper: React.FC<AddLayerStepperProps> = ({close, id}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [baseOptions, setBaseOptions] = useState<PropsOption[]>(initBaseOptions);
  const [baseModels, setBaseModels] = useState<PointLayerAttr | PolylineLayerAttr | PolygonLayerAttr>(initBasePointModels);
  const [customPropArr,setCustomPropArr] = useState<Record<string,(string | boolean | number)>[]>([])

  const [customOptions, setCustomOptions] = useState<PropsOption[]>(initBaseOptions);
  const [customModels, setCustomModels] = useState<Record<string, unknown>>(initBasePointModels);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if(activeStep===1){
      initDataForm.name = baseModels.name
      initDataForm.type = baseModels.type
      initDataForm.sceneId = Number(urlSearch('guid'))
      initDataForm.property = baseModels;
      initDataForm.panelField = customPropArr;
      let b;
      if(id){
        b = await editLayer(id, initDataForm)
      }else{
        b = await addLayer(initDataForm)
      }
      
      if(b){
        
        PubSub.publish('REFRESH_LAYER');
        PubSub.publish("REFRESH_VIEW");
        close()
      }else{
        console.error("操作失败")
      }
      return
    }
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const onBaseValuesChange =  (changeVal: TFormValues, allVal: TFormValues) => {
    
    let m =  allVal as PointLayerAttr | PolylineLayerAttr | PolygonLayerAttr
    m && setBaseModels({ ...m });
  };
  const onCustomValuesChange = (changeVal: TFormValues, allVal: TFormValues) => {
    setCustomModels({ ...allVal });
  };
  const addCustomProp = ()=>{
    let uuid = DC.Util.uuid()
    customPropArr.push({key:uuid, name: uuid, label: "", type: "String", disabled: false})
    setCustomPropArr([...customPropArr])
  }
  const delCustomProp = (index:number)=>{
    customPropArr.splice(index, 1);
    setCustomPropArr([...customPropArr])
  }
  

  const fetchData = useCallback(async () => {
    let baseOpts, baseMods, panelField;
    if(baseModels.type === 'point'){
      baseOpts = initBaseOptions.concat(basePointOptions)
    }else if(baseModels.type === 'line'){
      baseOpts = initBaseOptions.concat(basePolylineOptions)
    }else if(baseModels.type === 'plane'){
      baseOpts = initBaseOptions.concat(basePolygonOptions)
    }
    if(id){
      const res = await VectorLayer.getLayerById(String(id))
      if(res[0].property !== ""){
        baseMods = {...res[0].property}
      }else{
        if(res[0].type === 'point'){
          baseMods = {...initBasePointModels}
        }else if(res[0].type === 'line'){
          baseMods = {...initBasePolylineModels}
        }else if(res[0].type === 'plane'){
          baseMods = {...initBasePolygonModels}
        }
      }
      
      initBaseOptions[0].disabled = true;
      panelField = res[0].panelField;
    }else{
      if(baseModels.type === 'point'){
        baseMods = {...initBasePointModels}
      }else if(baseModels.type === 'line'){
        baseMods = {...initBasePolylineModels}
      }else if(baseModels.type === 'plane'){
        baseMods = {...initBasePolygonModels}
      }
      initBaseOptions[0].disabled = false;
    }
    
    baseOpts && setBaseOptions([...baseOpts])
    baseMods && setBaseModels({...baseMods})
    panelField && setCustomPropArr([...panelField])
  }, [baseModels.type]);
  useEffect(()=>{
    fetchData()
  },[fetchData])
  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode,
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box>
        {activeStep === 0 && (
          <Box sx={{width: '320px',overflowY:"auto",pt:1, minHeight: "220px", maxHeight: "400px"}}>
            <PropertyPanel
              sx={{ width: 300 }}
              options={baseOptions}
              models={baseModels}
              labelPosition="left"
              labelWidth="70px"
              onValuesChange={onBaseValuesChange}
            />
          </Box>
        )}
        {activeStep === 1 && 
        <>
          <Button
            color="inherit"
            onClick={addCustomProp}
            sx={{ p: 0, left:"20px", "& .MuiButton-startIcon": {m:0}}}
            startIcon={<AddIcon />}
          >
            <Stack sx={{pt:0.5}}>
              添加字段
            </Stack>
          </Button>
          <Box>
            <List>
              <ListItem sx={{display:"flex", justifyContent:"space-around", p:0}}>
                <Box>名称</Box>
                <Box>类型</Box>
                <Box></Box>
              </ListItem>
              <Box sx={{width: '320px',overflowY:"auto", minHeight: "150px", maxHeight: "300px"}}>
                {
                  customPropArr.map((customProp,index)=> 
                    <ListItem key={customProp['key'] as string} sx={{display:"flex", justifyContent:"space-around", p:0}}>
                      <FormControl sx={{  width: 120 }} size="small">
                        <HCInput label="" value={customProp["label"] as string} onChange={(e)=>{
                            customProp["label"]=e.target.value
                            setCustomPropArr([...customPropArr])
                          }}></HCInput>
                      </FormControl>
                      <FormControl sx={{ width: 120 }} size="small">
                        <Select value={customProp["type"]} onChange={(e)=>{
                            customProp["type"]=e.target.value
                            setCustomPropArr([...customPropArr])
                          }} sx={{ "& .MuiSelect-select": {p: "6px 14px"}}}>
                          <MenuItem value="String">文本型</MenuItem>
                          <MenuItem value="Number">数值型</MenuItem>
                          <MenuItem value="Boolean">布尔型</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        color="inherit"
                        onClick={()=>delCustomProp(index)}
                        sx={{ p: 0, "& .MuiButton-startIcon": {m:0}, minWidth:"24px"}}
                        startIcon={<DeleteIcon />}
                      ></Button>
                    </ListItem>)
                }
              </Box>
            </List>
          </Box>
          </>
        }
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          返回
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? '完成' : '下一步'}
        </Button>
      </Box>
    </>
  );
};
