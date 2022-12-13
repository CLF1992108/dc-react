import { MapOptions } from "../core/type"
import { ILayer } from "./ILayer"

interface IViewer {
  addHcBaseLayer(options: MapOptions[]): void
  addLayer(layer: ILayer): ILayer
}
export default IViewer
