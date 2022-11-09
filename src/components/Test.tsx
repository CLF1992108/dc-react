import { PropertyPanel } from '@haichuang/components';
import { Button, TextField } from '@material-ui/core';
import React from 'react';

const options = [
  {
    key: 'opt1',
    name: 'name',
    label: '元素名称',
    type: 'String',
  },
  {
    key: 'opt2',
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
  {
    key: 'opt4',
    name: 'bgColor',
    label: '背景色',
    type: 'Color',
  },
  {
    key: 'opt5',
    name: 'light',
    label: '光照强度',
    type: 'Number',
  },
  {
    key: 'opt6',
    name: 'tx',
    label: '特效',
    type: 'Radio',
    children: [
      {
        key: 1,
        value: 'tx1',
        label: '特效1',
      },
      {
        key: 2,
        value: 'tx2',
        label: '特效2',
      },
    ],
  },
  {
    key: 'opt7',
    name: 'lzz',
    label: '粒子组',
    type: 'Checkbox',
  },
  {
    key: 'opt8',
    name: 'zb',
    label: '坐标',
    type: 'Vector',
  },
  {
    key: 'opt9',
    name: 'ranges',
    label: '范围',
    type: 'Range',
    hide: true,
  },
  {
    key: 'opt10',
    name: 'custom',
    label: '自定义',
    type: 'Custom',
    customRender: (item: { name: string; }, values: { [x: string]: unknown; }, changeValue: (arg0: string, arg1: string) => void) => (
      <TextField
        name={item.name}
        value={values[item.name]}
        onChange={(e) => changeValue(e.target.name, e.target.value)}
      />
    ),
  },
];
const models = {
  name: '测试1',
  type: 'project',
  isIndex: true,
  bgColor: '#0099ff',
  light: 9,
  tx: '',
  lzz: false,
  zb: { x: 6, y: 7, z: 8 },
  ranges: { min: 0, max: 9 },
  custom: '1234569999',
};

export default () => {
  const [m, setm] = React.useState(models);
  const onValuesChange = (changeVal: any, allVal: React.SetStateAction<{ name: string; type: string; isIndex: boolean; bgColor: string; light: number; tx: string; lzz: boolean; zb: { x: number; y: number; z: number; }; ranges: { min: number; max: number; }; custom: string; }>) => {
    console.log(changeVal, allVal);
    setm(allVal);
  };
  const click = () => {
    setm({ ...m, name: '22222' });
  };
  React.useEffect(() => {}, []);
  return (
    <>
      <Button onClick={click}>test</Button>
      <PropertyPanel
        sx={{ width: 500 }}
        options={options}
        models={m}
        labelPosition="left"
        labelWidth="80px"
        onValuesChange={onValuesChange}
      />
    </>
  );
};