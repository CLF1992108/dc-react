
// import { Viewer as DCViewer } from "dc"
import { addLayer, delLayer, editLayer, getGeoJson, getLayerList, LayerProps, PointLayerAttr, PolygonLayerAttr, PolylineLayerAttr } from "../../api/gisReq";
import { hcEditor } from "../../store/HcEditor";


export class Layer {
  uuid?: number | undefined;
  pid?: number | undefined;
  sceneId: number;
  name: string;
  type: string;
  property: string | PointLayerAttr | PolylineLayerAttr | PolygonLayerAttr;
  panelField: string | Record<string, string | number | boolean>[];
  layer
  constructor(params: LayerProps) {
    this.layer = new DC.Layer()
    params.id && (this.uuid = params.id)
    this.sceneId = params.sceneId
    this.name = params.name
    this.type = params.type
    this.property = params.property
    this.panelField = params.panelField
    // this.addTo(hcEditor.Viewer)
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
  async deleteById(id: string) {
    let res = await delLayer(id);
    return res
  }
  async getLayerById(id: string) {
    const filter = { id }
    let res = await getLayerList({ filter: JSON.stringify(filter) })
    return res
  }
  static async getAllLayers() {
    let res = await getLayerList({})
    return res
  }
  getOverlayByGeoJson(type: string) {
    const id = `${type}geojson`

    const url = getGeoJson(type)
    let layer = new DC.GeoJsonLayer(id, url);
  }

}
