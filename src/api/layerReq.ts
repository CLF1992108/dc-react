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
        "icon": "icon1.jpg",
        "name": "流量计",
        "eleType": "point",
        "checked": true
      },
      {
        "id": "1",
        "type": "type02",
        "icon": "icon2.jpg",
        "name": "高压管段",
        "eleType": "line",
        "checked": false
      }
    ]
  }
  return result;
}

