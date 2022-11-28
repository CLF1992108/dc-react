import axios from "axios";
import { GisApi } from "./url";

export async function getTypeList(params: any) {
  // const result = await axios(GisApi.typeList, {
  //   params: params,
  // });
  const result = {
    "result": [

      {
        "id": "1",
        "type": "type01",
        "icon": "icon1.jpg",
        "name": "高压管段",
        "eleType": "polyline",
        "checked": true,
        "width": 5,
        "color": "rgba(255,0,0, .9)",
      },
      {
        "id": "2",
        "type": "type02",
        "icon": "icon2.jpg",
        "name": "中压管段",
        "eleType": "polyline",
        "checked": true,
        "width": 3,
        "color": "rgba(111,22,255,0.8)",
      },
      {
        "id": "3",
        "type": "type03",
        "icon": "icon3.jpg",
        "name": "低压管段",
        "eleType": "polyline",
        "checked": true,
        "width": 1,
        "color": "rgba(0,255,0, .9)",
      },
      {
        "id": "4",
        "type": "type04",
        "icon": "icon4.jpg",
        "name": "高危区域",
        "eleType": "polygon",
        "checked": true,
        "color": "rgba(255,0,0, .9)",
      },
      {
        "id": "5",
        "type": "type05",
        "icon": "icon5.jpg",
        "name": "中危区域",
        "eleType": "polygon",
        "checked": true,
        "color": "rgba(0,0,255, .9)",
      },
      {
        "id": "6",
        "type": "type06",
        "icon": "icon6.jpg",
        "name": "低危区域",
        "eleType": "polygon",
        "checked": true,
        "color": "rgba(0,255,0, .9)",
      },
      {
        "id": "7",
        "type": "type07",
        "icon": "http://am-img.gkiiot.com/editor/textures/暖色2.jpg",
        "name": "工业用户",
        "eleType": "billboard",
        "checked": true,
        "width": 5,
        "color": "rgba(0,0,0,1)",
      },
    ]
  }

  return result;
}
export async function getPropsListByType(params: { type: String }) {
  // const result = await axios(GisApi.typeList, {
  //   params: params,
  // });
  let result
  if (params.type === "billboard") {
    result = {
      "result": [
        {
          "key": "FC1",
          "type": "String",
          "label": "客户名称",
          "name": "FC1",
          disabled: false
        },
        {
          "key": "FC3",
          "type": "Boolean",
          "label": "是否重要",
          "name": "FC3",
          disabled: false
        },
        {
          key: 'FC2',
          name: 'FC2',
          label: '客户类型',
          type: 'List',
          children: [
            {
              key: 1,
              value: 1,
              label: '商业用户',
            },
            {
              key: 2,
              value: 2,
              label: '工业用户',
            },
            {
              key: 3,
              value: 3,
              label: '居民用户',
            },
          ],
          disabled: false
        },
        // {
        //   "key": "FC3",
        //   "type": "String",
        //   "label": "客户",
        //   "name": "FC3"
        // },
        // {
        //   "key": "FC4",
        //   "type": "String",
        //   "label": "客户",
        //   "name": "FC4"
        // },
        // {
        //   "key": "FC5",
        //   "type": "String",
        //   "label": "客户",
        //   "name": "FC5"
        // },
        // {
        //   "key": "FC6",
        //   "type": "String",
        //   "label": "客户",
        //   "name": "FC6"
        // },
        // {
        //   "key": "FC7",
        //   "type": "String",
        //   "label": "客户",
        //   "name": "FC7"
        // },
        // {
        //   "key": "FC8",
        //   "type": "String",
        //   "label": "客户",
        //   "name": "FC8"
        // },
        // {
        //   "key": "FC9",
        //   "type": "String",
        //   "label": "客户",
        //   "name": "FC9"
        // },

      ]
    }
  } else if (params.type === "polyline") {
    result = {
      "result": [
        {
          "key": "FC1",
          "type": "String",
          "label": "字段4",
          "name": "FC1",
          disabled: true
        },
        {
          "key": "FC2",
          "type": "String",
          "label": "字段5",
          "name": "FC2",
          disabled: true
        },
        {
          "key": "FC3",
          "type": "String",
          "label": "字段6",
          "name": "FC3",
          disabled: true
        },
        // {
        //   key: 'type',
        //   name: 'type',
        //   label: '元素类别',
        //   type: 'List',
        //   children: [
        //     {
        //       key: 1,
        //       value: '2d',
        //       label: '2D元素',
        //     },
        //     {
        //       key: 2,
        //       value: '3d',
        //       label: '3D元素',
        //     },
        //     {
        //       key: 3,
        //       value: 'model',
        //       label: '模型',
        //     },
        //     {
        //       key: 4,
        //       value: 'project',
        //       label: '项目',
        //     },
        //     {
        //       key: 5,
        //       value: 'app',
        //       label: '场景',
        //     },
        //   ],
        //   disabled: true
        // },
      ]
    }
  } else {
    result = {
      "result": [
        {
          "key": "FC7",
          "type": "String",
          "label": "字段7",
          "name": "FC7",
          disabled: true
        },
        {
          "key": "FC8",
          "type": "Boolean",
          "label": "字段8",
          "name": "FC8",
          disabled: true
        },
        {
          "key": "FC9",
          "type": "Number",
          "label": "字段9",
          "name": "FC9",
          disabled: true
        }
      ]
    }
  }
  return result;
}
export async function getOverlaysByLayerId(params: { type: string }) {
  let overlays = window.localStorage.getItem(params.type)
  let objs: Record<string, any>[] = []
  if (!overlays) {
    overlays = "[]"
    window.localStorage.setItem(params.type, overlays);
  }
  objs = JSON.parse(overlays)
  // let result: { id: string; type: string; name: string; eleType: string; position: number[]; positions: string; property: Record<string, unknown> }[]

  // if (params.type === "type01") {
  //   result = [
  //     {
  //       "id": "1",
  //       "type": "type01",
  //       "name": "设备2",
  //       "eleType": "polyline",
  //       "position": [
  //         111,
  //         26
  //       ],
  //       "positions": "120,20;120,30",
  //       "property": { FC1: 3, FC2: "asdasd2", FC3: "asdasd2", opt2: 2, type: "3d" }
  //     }
  //   ]

  // } else if (params.type === "type07") {
  //   result = [
  //     {
  //       "id": "7",
  //       "type": "type07",
  //       "name": "设备2",
  //       "eleType": "billboard",
  //       "position": [
  //         111,
  //         26
  //       ],
  //       "positions": "120,20;120,30",
  //       "property": { FC1: 3, FC2: 1 }

  //     }
  //   ]


  // }
  return objs
}
export async function addOverlay(params: any) {

  let overlays = window.localStorage.getItem(params.type)
  let objs
  objs = overlays !== null && JSON.parse(overlays)
  params.id = DC.Util.uuid()
  objs.push(params)
  var reg2 = new RegExp("_", "g"); // 不加'g'，仅删除字符串里第一个"a"
  var a2 = JSON.stringify(objs).replace(reg2, "");
  window.localStorage.setItem(params.type, a2);
  return params.id
}
export async function updateOverlay(params: Record<string, unknown>) {
  let overlays = window.localStorage.getItem(params['type'] as string)
  let objs
  objs = overlays !== null && JSON.parse(overlays)
  objs.forEach((element: { id: unknown; property: Record<string, unknown> }) => {
    if (element.id === params['id']) {
      element.property = params['property'] as Record<string, unknown>
    }
  });
  window.localStorage.setItem(params['type'] as string, JSON.stringify(objs));
}
export async function deleteOverlay(params: any) { }

