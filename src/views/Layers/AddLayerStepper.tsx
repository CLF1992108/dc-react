import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { PropertyPanel } from '@haichuang/components';

const steps = ['设置基础属性', '设置自定义属性'];
interface AddLayerStepperProps {}
const initPointProp = {
  name: '',
  icon: '',
  pixelSize: 0,
  show: true,
};
const initLineProp = {
  name: '',
  meterial: '',
  show: true,
};
const initPolygenProp = {
  name: '',
  outline: true,
  outlineColor: '',
  outlineWidth: 1,
  show: true,
};
const config = {};
const initDataForm = {
  name: '',
  sceneId: 0,
  type: 'point',
  property: initPointProp,
  panelField: [],
};
const options = [
  {
    key: '0',
    name: 'name',
    label: '元素名称',
    type: 'String',
  },
  {
    key: '1',
    name: 'type',
    label: '元素类别',
    type: 'List',
    children: [
      {
        key: 1,
        value: '2d',
        label: '2D元素',
      },
      {
        key: 2,
        value: '3d',
        label: '3D元素',
      },
      {
        key: 3,
        value: 'model',
        label: '模型',
      },
      {
        key: 4,
        value: 'project',
        label: '项目',
      },
      {
        key: 5,
        value: 'app',
        label: '场景',
      },
    ],
  },
  {
    key: 'opt3',
    name: 'isIndex',
    label: '是否首页',
    type: 'Boolean',
  },
];
const models = {
  name: '测试1',
  type: 'project',
  isIndex: true,
};
export const AddLayerStepper: React.FC<AddLayerStepperProps> = ({}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '300px' }}>
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
      {activeStep === 0 && (
        <PropertyPanel
          sx={{ width: 500 }}
          options={options}
          models={m}
          labelPosition="left"
          labelWidth="80px"
          onValuesChange={onValuesChange}
        />
      )}
      {activeStep === 1 && <>2</>}
      <>
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
    </Box>
  );
};
