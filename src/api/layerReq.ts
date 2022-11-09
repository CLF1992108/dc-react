import axios from "axios";
import { GisApi } from "./url";

export async function getTypeList(params: any) {
  // const result = await axios(GisApi.typeList, {
  //   params: params,
  // });
  const result = {
    "result": [
      {
        "id": "0",
        "type": "type01",
        "icon": "http://am-img.gkiiot.com/editor/textures/暖色2.jpg",
        "name": "流量计",
        "eleType": "billboard",
        "checked": true
      },
      {
        "id": "1",
        "type": "type02",
        "icon": "icon2.jpg",
        "name": "高压管段",
        "eleType": "polyline",
        "checked": false
      },
      {
        "id": "3",
        "type": "type03",
        "icon": "icon3.jpg",
        "name": "危险区域",
        "eleType": "polygon",
        "checked": false
      }
    ]
  }
  
  return result;
}
export async function getPropsListByType(params: {type: string}) {
  // const result = await axios(GisApi.typeList, {
  //   params: params,
  // });
  const result = {
    "result": [
      {
        "id": "0",
        "title": "FC1",
        "type": "text",
        "name": "字段1",
        "unit": ""
      },
      {
        "id": "1",
        "title": "FC2",
        "type": "float",
        "name": "字段2",
        "unit": "m"
      },
      {
        "id": "1",
        "title": "FC3",
        "type": "select",
        "name": "字段2",
        "options": [
          {
            "label": "选择1",
            "value": "1"
          },
          {
            "label": "选择2",
            "value": "2"
          }
        ],
        "unit": ""
      }
    ]
  }
  return result;
}