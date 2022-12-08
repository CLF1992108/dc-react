import { PropertyPanel } from "@haichuang/components";
import { SxProps } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import PubSub from "pubsub-js";
type TFormValues = Record<string, unknown>;
type SelectProps = {
  key: string | number;
  value: string;
  label: string;
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
  required?: boolean; // 是否必选
  type?: string; // 校验类型
  message?: string; // 校验文案
  len?: number; // 字段长度
  pattern?: RegExp; // 正则表达式
  min?: number; // 最小值
  max?: number; // 最大值
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
interface BasePropertyProps {}
const layerOpts = [
  {
    key: "FC1",
    type: "String",
    label: "名称",
    name: "FC1",
    disabled: false,
  },
  {
    key: "FC2",
    type: "Color",
    label: "颜色",
    name: "FC2",
    disabled: false,
  },
  {
    key: "FC3",
    type: "Number",
    label: "宽度",
    name: "FC3",
    disabled: false,
  },
];
const layerModels = {
  FC1: 1,
  FC2: "#fff",
};
const overlayOpts = [
  {
    key: "FC1",
    type: "String",
    label: "名称",
    name: "FC1",
    disabled: false,
  },
];
const overlayModels = {
  FC1: 2,
};
export const BaseProperty: React.FC<BasePropertyProps> = ({}) => {
  const [opts, setOpts] = useState<PropsOption[]>([]);
  const [mods, setMods] = useState({});
  const mySubscriber = function (msg: string, data: any) {
    debugger;
    if (data === "Layer") {
      setOpts([...layerOpts]);
      setMods({ ...layerModels });
    } else {
      setOpts([...overlayOpts]);
      setMods({ ...overlayModels });
    }
  };
  useEffect(() => {
    PubSub.subscribe("CHANGE_TYPE", mySubscriber);

    return () => {
      // PubSub.unsubscribe("CHANGE_TYPE");
    };
  }, []);
  const onValuesChange = (
    changeVal: Record<string, unknown>,
    allVal: Record<string, unknown>
  ) => {
    setMods(allVal);
  };
  return (
    <PropertyPanel
      sx={{
        overflowX: "auto",
        width: 280,
        p: 1,
        "& .MuiFormLabel-root": {
          padding: "0 8px 0 0",
          color: "#fff",
        },
        "& .MuiInputBase-input": {
          color: "#fff",
        },
      }}
      options={opts}
      models={mods}
      labelPosition="left"
      labelWidth="70px"
      onValuesChange={onValuesChange}
    />
  );
};
