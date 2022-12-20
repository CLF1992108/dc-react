import { GeoJsonLayer as DcGeoJsonLayer } from "dc";
import { getGeoJson } from "../../api/gisReq";

export type GeometryProps = {
  coordinates: [],
  type: string
}
export type FeatureProps = {
  type: string,
  properties: Record<string, unknown>,
  geometry: GeometryProps
}
export type GeoJsonProps = {
  type: string,
  features: FeatureProps[]
}
export class GeoJsonLayer {
  constructor() {

  }
  async getGeoJsonLayer(type: string) {
    // let geojson, layer, vectorLayer: VectorLayer;

    // geojson = await getGeoJson(type);
    // vectorLayer = new VectorLayer(type);
    // layer = new DcGeoJsonLayer(type + "Geojson", JSON.stringify(geojson))
    // layer.eachOverlay((item: any) => {
    //   if (item.polyline) {
    //     let polyline = DC.Polyline.fromEntity(item)
    //     vectorLayer.addOverlay(polyline)
    //   } else if (item.polygon) {
    //     //todo
    //     let polygon = DC.Polygon.fromEntity(item)
    //     vectorLayer.addOverlay(polygon)
    //   } else if (item.billboard) {
    //     //todo
    //     let billboard = DC.Billboard.fromEntity(item)
    //     vectorLayer.addOverlay(billboard)
    //   }

    // }, {})
  }
}
