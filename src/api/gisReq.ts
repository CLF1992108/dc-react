import { getReq, IResponseResult, postReq, ResponseStatus } from "../utils/axios";
import { LayerApi, MaterialApi, SceneApi, UploadApi } from ".";
import { ViewProps } from "../views/Scenes";
import { Type } from "typescript";
export type GetResponseDataProps = {
  rows: [],
  total: number
}
// export type getResponseProps = {
//   code: number,
//   message: string,
//   data: GetResponseDataProps
// }
// export type PostResponseDataProps = {
//   id: number,
//   count: number
// }
export type PostResponseProps = {
  code: number,
  message: string,
  data: PostResponseProps
}
export type QueryParamProps = {
  filter?: string
}
export type SceneProps = {
  id?: number,
  name: string,
  remark: string,
  cover: string,
  view: string | ViewProps,
  logo: string,
  weigh?: number,
  userId?: number,
  status?: string
}
export type LayerProps = {
  id?: number | undefined;
  pid?: number | undefined;
  sceneId: number;
  name: string;
  type: string;
  property: string | PointLayerAttr | PolylineLayerAttr | PolygonLayerAttr;
  panelField: string | Record<string, string | number | boolean>[];
  weigh?: number,
  userId?: number,
  adminId?: number,
  tenantId?: number,
  createdAt?: string,
  updatedAt?: string,
  status?: string
}
export type LayerAttr = {
  id?: string | undefined;
  name: string;
  show: boolean;
  type: string;
}
export type PointLayerAttr = {
  pixelSize: number;
  icon: string;
} & LayerAttr
export type PolylineLayerAttr = {
  meterial: string;
  width: number;
} & LayerAttr
export type PolygonLayerAttr = {
  meterial: string;
  outline: boolean, //是否显示边框
  outlineColor: string, //边框颜色
  outlineWidth: number, //边框宽度
} & LayerAttr
export type UploadResProps = {
  url: string,
  fullurl: string
}
export type MaterialProps = {
  pid: number,
  sceneId: number,
  layerId: number,
  uuid: string,
  name: string,
  type: string,
  point: string,
  line: string,
  plane: string,
  property: string,
  status: string

}
export type UploadMaterialProps = {
  type: string,
  uploadType: string,
  layerId?: number | undefined,
  layerName: string,
  file: Blob | null,
  sceneId: number
}
export async function upload(file: File): Promise<UploadResProps | null> {
  const fd = new FormData();
  fd.append("0", "[");
  fd.append("1", "]");
  fd.append("category", "");
  fd.append("file", file);
  const result = await postReq(UploadApi.upload, fd, { headers: { "content-type": "multiparty/form-data" } })
  if (result.code === ResponseStatus.Ok) {
    let data = result.data
    return data;
  }
  return null
}
export async function getSceneList(params: QueryParamProps) {
  const result: any = await getReq(SceneApi.list, { params })
  if (result.code === ResponseStatus.Ok) {
    if (result.data) {
      let data = result.data
      data["rows"][0].view = data["rows"][0].view && JSON.parse(data["rows"][0].view as string)
      return data && data["rows"];
    }

  }
  return null
}
export async function addScene(params: SceneProps) {
  const result = await postReq(SceneApi.add, params)
  return result.code === ResponseStatus.Ok
}
export async function editScene(ids: number, row: SceneProps) {
  const result = await postReq(SceneApi.edit, { ids, row })
  return result.code === ResponseStatus.Ok
}
export async function delScene(ids: string) {
  const result = await postReq(SceneApi.del, { ids })
  return result.code === ResponseStatus.Ok
}
export async function getLayerList(params: QueryParamProps) {
  const result: any = await getReq(LayerApi.list, { params })
  if (result.code === ResponseStatus.Ok) {
    if (result.data) {
      let data = result.data
      if (Array.isArray(data["rows"])) {
        data["rows"][0].property = data["rows"][0].property && JSON.parse(data["rows"][0].property as string)
        data["rows"][0].panelField = data["rows"][0].panelField && JSON.parse(data["rows"][0].panelField as string)

      }
      return data && data["rows"];
    }

  }
  return null
}
export async function addLayer(params: LayerProps) {
  const result = await postReq(LayerApi.add, params)
  return result.code === ResponseStatus.Ok
}
export async function editLayer(ids: number, row: LayerProps) {
  const result = await postReq(LayerApi.edit, { ids, row })
  return result.code === ResponseStatus.Ok
}
export async function delLayer(ids: string) {
  const result = await postReq(LayerApi.del, { ids })
  return result.code === ResponseStatus.Ok
}
export async function getMaterialList(params: QueryParamProps) {
  const result: any = await getReq(MaterialApi.list, { params })
  if (result.code === ResponseStatus.Ok) {
    if (result.data) {
      let data = result.data
      data["rows"][0].property = data["rows"][0].property && JSON.parse(data["rows"][0].property as string)
      return data && data["rows"];
    }

  }
  return null
}
export async function addMaterial(params: MaterialProps) {
  const result = await postReq(MaterialApi.add, params)
  return result.code === ResponseStatus.Ok
}
export async function editMaterial(ids: number, row: MaterialProps) {
  const result = await postReq(MaterialApi.edit, { ids, row })
  return result.code === ResponseStatus.Ok
}
export async function delMaterial(ids: string) {
  const result = await postReq(MaterialApi.del, { ids })
  return result.code === ResponseStatus.Ok
}
export async function uploadMaterial(params: UploadMaterialProps) {
  const fd = new FormData();
  fd.append("SceneId", String(params["sceneId"]));
  params["layerId"] && fd.append("LayerId", String(params["layerId"]));
  fd.append("LayerName", params["layerName"]);
  fd.append("Type", params["type"]);
  fd.append("UploadType", params["uploadType"]);
  params["file"] && fd.append("file", params["file"]);
  const result = await postReq(MaterialApi.upload, fd, { headers: { "content-type": "multiparty/form-data" } })
  return result.code === ResponseStatus.Ok
}




export async function getGeoJson(type: string) {
  let geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "id": "123123123123"
        },
        "geometry": {
          "coordinates": [
            23.589367664910725,
            12.053289003883052
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "11111"
        },
        "geometry": {
          "coordinates": [
            [
              47.27580860160984,
              22.644875980882503
            ],
            [
              36.613978991421874,
              0.06300818076823589
            ],
            [
              58.021194131897715,
              -10.272348909080776
            ],
            [
              59.59664678261976,
              0.8694361316624821
            ]
          ],
          "type": "LineString"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "222222"
        },
        "geometry": {
          "coordinates": [
            [
              [
                22.086384642673806,
                34.83479695068948
              ],
              [
                -4.831112666565417,
                34.83479695068948
              ],
              [
                -4.831112666565417,
                20.313680421912593
              ],
              [
                22.086384642673806,
                20.313680421912593
              ],
              [
                22.086384642673806,
                34.83479695068948
              ]
            ]
          ],
          "type": "Polygon"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "9999"
        },
        "geometry": {
          "coordinates": [
            [
              [
                -10.476678502550953,
                -3.5789344235096934
              ],
              [
                13.674046004562143,
                -8.213445824037208
              ],
              [
                8.534934751269873,
                7.486304322892963
              ],
              [
                -23.590603456772328,
                11.593415369761416
              ],
              [
                -23.54157359206033,
                0.3390850276846322
              ],
              [
                -23.280014568083175,
                -12.142124530150113
              ],
              [
                -10.476678502550953,
                -3.5789344235096934
              ]
            ]
          ],
          "type": "Polygon"
        }
      }
    ]
  }
  return geojson
}
export async function getTypeList(params: any) {
  // const result = await axios(GisApi.typeList, {
  //   params: params,
  // });
  const result = {
    "result": [

      {
        "id": "1",
        "icon": "icon1.jpg",
        "name": "高压管段",
        "type": "polyline",
        "checked": true,
        "width": 5,
        "color": "rgba(255,0,0, .9)",

      },
      {
        "id": "2",
        "icon": "icon2.jpg",
        "name": "中压管段",
        "type": "polyline",
        "checked": true,
        "width": 3,
        "color": "rgba(111,22,255,0.8)",
      },
      {
        "id": "3",
        "icon": "icon3.jpg",
        "name": "低压管段",
        "type": "polyline",
        "checked": true,
        "width": 1,
        "color": "rgba(0,255,0, .9)",
      },
      {
        "id": "4",
        "icon": "icon4.jpg",
        "name": "高危区域",
        "type": "polygon",
        "checked": true,
        "color": "rgba(255,0,0, .9)",
      },
      {
        "id": "5",
        "icon": "icon5.jpg",
        "name": "中危区域",
        "type": "polygon",
        "checked": true,
        "color": "rgba(0,0,255, .9)",
      },
      {
        "id": "6",
        "icon": "icon6.jpg",
        "name": "低危区域",
        "type": "polygon",
        "checked": true,
        "color": "rgba(0,255,0, .9)",
      },
      {
        "id": "7",
        "icon": "http://am-img.gkiiot.com/editor/textures/暖色2.jpg",
        "name": "工业用户",
        "type": "billboard",
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
          "type": "string",
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
        //   "type": string,
        //   "label": "客户",
        //   "name": "FC3"
        // },
        // {
        //   "key": "FC4",
        //   "type": string,
        //   "label": "客户",
        //   "name": "FC4"
        // },
        // {
        //   "key": "FC5",
        //   "type": string,
        //   "label": "客户",
        //   "name": "FC5"
        // },
        // {
        //   "key": "FC6",
        //   "type": string,
        //   "label": "客户",
        //   "name": "FC6"
        // },
        // {
        //   "key": "FC7",
        //   "type": string,
        //   "label": "客户",
        //   "name": "FC7"
        // },
        // {
        //   "key": "FC8",
        //   "type": string,
        //   "label": "客户",
        //   "name": "FC8"
        // },
        // {
        //   "key": "FC9",
        //   "type": string,
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
          "type": "string",
          "label": "字段4",
          "name": "FC1",
          disabled: true
        },
        {
          "key": "FC2",
          "type": "string",
          "label": "字段5",
          "name": "FC2",
          disabled: true
        },
        {
          "key": "FC3",
          "type": "string",
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
          "type": "string",
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
  // let result: { id: string; type: string; name: string; type: string; position: number[]; positions: string; property: Record<string, unknown> }[]

  // if (params.type === "type01") {
  //   result = [
  //     {
  //       "id": "1",
  //       "type": "type01",
  //       "name": "设备2",
  //       "type": "polyline",
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
  //       "type": "billboard",
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
  // let overlays = window.localStorage.getItem(params['type'] as string)
  // let objs
  // objs = overlays !== null && JSON.parse(overlays)
  // objs.forEach((element: { id: unknown; property: Record<string, unknown> }) => {
  //   if (element.id === params['id']) {
  //     element.property = params['property'] as Record<string, unknown>
  //   }
  // });
  // window.localStorage.setItem(params['type'] as string, JSON.stringify(objs));
}
export async function deleteOverlay(params: any) { }

