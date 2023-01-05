import { LayerGroup as DCLayerGroup, Overlay as DCOverlay, Plot, Viewer as DCViewer } from "dc";
import { makeAutoObservable } from "mobx"
import { LayerProps } from "../api/gisReq";
import { hcOverlay } from "../core/HcOverlay";
export class HcEditor {
  private viewer!: DCViewer;
  private layerGroup!: DCLayerGroup;
  private plot!: Plot;
  private open = false
  private currentOverlay: any;
  private currentModule = 0

  constructor() {
    makeAutoObservable(this)
  }
  get CurrentModule() {
    return this.currentModule
  }
  set CurrentModule(v: number) {
    this.currentModule = v
  }
  get Plot() {
    return this.plot
  }
  get Viewer() {
    return this.viewer
  }
  get LayerGroup() {
    return this.layerGroup
  }
  set Open(v: boolean) {
    this.open = v
  }
  get Open() {
    return this.open
  }
  set CurrentOverlay(v: any) {
    this.currentOverlay = v
  }
  get CurrentOverlay() {
    return this.currentOverlay
  }
  init(viewer: DCViewer) {
    this.viewer = viewer
    this.open = false
    this.layerGroup = new DC.LayerGroup('layerGroup')
    viewer.addLayerGroup(this.layerGroup)
    this.plot = new DC.Plot(this.viewer)
  }
  createLayer(layerId: string, params: LayerProps) {

    let layer = new DC.VectorLayer(layerId)
    layer.attr = params;
    this.layerGroup.addLayer(layer)
    return layer
  }
  getLayer(layerId: string) {

    return this.layerGroup.getLayer(layerId)
  }
  diolog(e: any, overlay: any) {
    this.open = true
    const content = `<div id="popup"><div>`
    let popup = this.viewer.popup
    popup.setContent(content)
    this.viewer.popup.setPosition(e.surfacePosition)
  }
  popupHide() {
    this.viewer.popup.hide()
  }
  draw(parm: LayerProps) {
    let plot = this.plot,
      type = parm.type === "point" ? "billboard" : parm.type.toLocaleLowerCase()

    if (parm.type === "point") {
      type = "billboard"
    } else if (parm.type === "line") {
      type = "polyline"
    } else if (parm.type === "plane") {
      type = "polygon"
    }
    plot && plot.draw(type, (overlay: DCOverlay) => {
      if (overlay) {
        let layer = this.layerGroup.getLayer(String(parm.id))
        hcOverlay.add(overlay, layer, parm)
      }
    })
  }
}
export const hcEditor = new HcEditor()
