import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { PropertyPanel } from '@haichuang/components';
import { Box, Button, Divider, Grid, makeStyles, SxProps } from '@mui/material';
import { reaction } from 'mobx';
import { hcEditor } from '../store/HcEditor';
import { getMaterialDetail } from '../api/gisReq';
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

export interface GisPropertyPanelProps extends PropertyPanelProps {
  footerShow: boolean;
  onConfirm?: (models: Record<string, unknown>) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}
const Property: React.FC<GisPropertyPanelProps> = ({
  footerShow,
  options,
  models,
  onConfirm,
  onCancel,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [opts, setOpts] = useState<PropsOption[]>([]);
  const [mods, setMods] = useState(models);
  const onValuesChange = (
    changeVal: Record<string, unknown>,
    allVal: Record<string, unknown>
  ) => {
    setMods(allVal);
  };
  const onConfirmClick = () => {
    onConfirm?.(mods);
  };
  const footer = () => {
    if (footerShow) {
      return (
        <Grid container spacing={5} sx={{ pl: 1.5 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirmClick}
            >
              提交
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="inherit" onClick={onCancel}>
              取消
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error" onClick={onDelete}>
              删除
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={5} sx={{ pl: 1.5 }}>
          <Grid item>
            <Button variant="contained" color="inherit" onClick={onCancel}>
              关闭
            </Button>
          </Grid>
        </Grid>
      );
    }
  };
  const header = () => {
    return <Box>{title}</Box>;
  };
  let setPanelCallback = useCallback(async () => {
    console.log(hcEditor.CurrentOverlay.attr.id);
    let res = await getMaterialDetail(hcEditor.CurrentOverlay.attr.id);
    let f = res[0].panelField;
    setOpts([...f]);
    setMods(res[0].panelVal);
    // setMods({
    //   'D-92D4C5A5-395B-4667-AAE0-5C2C3EEA617D': 11,
    //   'D-1C9C91AA-75B0-43CE-86FF-1B66F1D54C5E': 22,
    //   'D-D9EACAAC-729A-41F8-BF59-945BCB2CA446': 3,
    // });

    setTitle(res[0].name);
  }, []);

  useEffect(() => {
    setPanelCallback();
    let dispose = reaction(
      () => hcEditor.Open,
      () => {
        if (hcEditor.Open) {
          setPanelCallback();
        }
      }
    );
    return () => {
      dispose();
    };
  }, []);
  return (
    <Box>
      {header()}
      <Divider light sx={{ mt: 1, mb: 1 }} />
      <Box sx={{ maxHeight: 250, overflow: 'auto' }}>
        <PropertyPanel
          sx={{
            overflowX: 'auto',
            width: 280,
            p: 1,
            '& .css-1xx1wee-MuiFormLabel-root': { padding: '0 8px 0 0' },
          }}
          options={opts}
          models={mods}
          labelPosition="left"
          labelWidth="70px"
          onValuesChange={onValuesChange}
        />
      </Box>
      <Divider light sx={{ mt: 1, mb: 1 }} />
      {footer()}
    </Box>
  );
};
export default Property;
