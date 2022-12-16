import { Viewer as DCViewer, VectorLayer as DcVectorLayer } from "dc";
import { getGeoJson } from "../../api/gisReq";
import { ILayer } from "../../interfaces/ILayer";
import { Overlay } from "../Overlay";
export type LayerProps = {
  id?: string | undefined;
  show: boolean;
  attr: Record<string, unknown>
  type: string;
  layer: ILayer;
}
export type LayerAttr = {
  id?: string | undefined;
  name: string;
  show: boolean;
  eleType: string;
}
export type PointLayerAttr = {
  pixelSize: number;
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
export class VectorLayer extends DcVectorLayer {
  constructor(type: string) {
    super(type)
  }
  createLayer() {

    return this
  }
  add(params: Record<string, unknown>) {

    return this
  }
  update(id: string, params: Record<string, unknown>) {
    return this
  }
  deleteById(id: string) {
    return true
  }
  getLayerById(id: string) {
    return this
  }
  getOverlayByGeoJson(type: string) {
    const id = `${type}geojson`

    const url = getGeoJson(type)
    let layer = new DC.GeoJsonLayer(id, url);
  }

}
