import { addLayer, delLayer, editLayer, getGeoJson, getLayerList, LayerProps, PointLayerAttr, PolygonLayerAttr, PolylineLayerAttr } from "../../api/gisReq";
import { hcEditor } from "../../store/HcEditor";
import { VectorLayer as DcVectorLayer } from "dc";
export class VectorLayer {
  uuid?: number | undefined;
  pid?: number | undefined;
  sceneId: number;
  name: string;
  type: string;
  property: string | PointLayerAttr | PolylineLayerAttr | PolygonLayerAttr;
  panelField: string | Record<string, string | number | boolean>[];
  layer: DcVectorLayer
  constructor(params: LayerProps) {
    this.layer = new DC.VectorLayer(params.id)
    params.id && (this.uuid = params.id)
    this.sceneId = params.sceneId
    this.name = params.name
    this.type = params.type
    this.property = params.property
    this.panelField = params.panelField
    this.layer.addTo(hcEditor.Viewer)
  }
  set UUID(v: number | undefined) {
    this.uuid = v
  }
  get UUID() {
    return this.uuid;
  }
  set Pid(v: number | undefined) {
    this.pid = v
  }
  get Pid() {
    return this.pid;
  }
  set SceneId(v: number) {
    this.sceneId = v
  }
  get SceneId() {
    return this.sceneId;
  }
  set Name(v: string) {
    this.name = v
  }
  get Name() {
    return this.name;
  }
  set Property(v: string | PointLayerAttr | PolylineLayerAttr | PolygonLayerAttr) {
    this.property = v
  }
  get Property() {
    return this.property
  }
  set PanelField(v: string | Record<string, string | number | boolean>[]) {
    this.panelField = v
  }
  get PanelField() {
    return this.panelField
  }
  set Layer(v: DcVectorLayer) {
    this.layer = v
  }
  get Layer() {
    return this.layer
  }
  async add() {
    const params = {
      name: this.name,
      sceneId: this.sceneId,
      type: this.type,
      property: this.property,
      panelField: this.panelField
    }
    let res = await addLayer(params)
    return this
  }
  async edit() {
    const params = {
      name: this.name,
      sceneId: this.sceneId,
      type: this.type,
      property: this.property,
      panelField: this.panelField
    }
    if (this.uuid) {
      let res = await editLayer(this.uuid, params)
    }

    return this
  }
  static async deleteById(id: string) {
    let res = await delLayer(id);
    return res
  }
  static async getLayerById(id: string) {
    const filter = { id }
    let res = await getLayerList({ filter: JSON.stringify(filter) })
    return res
  }
  static async getAllLayers() {
    let res = await getLayerList({})
    console.log(res)
    return res
  }
  getOverlayByGeoJson(type: string) {
    const id = `${type}geojson`

    const url = getGeoJson(type)
    let layer = new DC.GeoJsonLayer(id, url);
  }


}
