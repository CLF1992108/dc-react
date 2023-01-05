//地图相关接口
export const GisApi = {
  typeList: "/type/list", //类型接口
  propertyList: "/property/list", //属性配置接口
  eleList: "/ele/list", //元件接口
  editEle: "/ele/edit", //编辑元素接口， 无id为新增，有id为修改
  deleteEle: "/ele/delete" //删除元素接口
};
export const UploadApi = {
  upload: "/admin/ajax/upload"
}
export const SceneApi = {
  list: "/admin/fast-go-gis/app/gis/scene/index",
  add: "/admin/fast-go-gis/app/gis/scene/add",
  edit: "/admin/fast-go-gis/app/gis/scene/edit",
  del: "/admin/fast-go-gis/app/gis/scene/del",

}
export const LayerApi = {
  list: "/admin/fast-go-gis/app/gis/layer/index",
  add: "/admin/fast-go-gis/app/gis/layer/add",
  edit: "/admin/fast-go-gis/app/gis/layer/edit",
  del: "/admin/fast-go-gis/app/gis/layer/del",
}
export const MaterialApi = {
  list: "/admin/fast-go-gis/app/gis/material/index",
  add: "/admin/fast-go-gis/app/gis/material/add",
  edit: "/admin/fast-go-gis/app/gis/material/edit",
  del: "/admin/fast-go-gis/app/gis/material/del",
  detail: "/admin/fast-go-gis/app/gis/material/detail",
  upload: "/admin/fast-go-gis/app/gis/material/upload"
}
