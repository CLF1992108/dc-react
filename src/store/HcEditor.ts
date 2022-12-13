import { LayerGroup as DCLayerGroup, Overlay as DCOverlay, Plot, Viewer as DCViewer } from "dc";
import { makeAutoObservable } from "mobx"
import { hcOverlay } from "../core/HcOverlay";
import { TypeProps } from "../types/Overlay";
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
  createLayer(layerId: string) {

    let layer = new DC.VectorLayer(layerId)
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
  draw(parm: TypeProps) {
    let plot = this.plot
    plot && plot.draw(parm.eleType, (overlay: DCOverlay) => {
      if (overlay) {
        let layer = this.layerGroup.getLayer(parm.type)
        hcOverlay.add(overlay, layer, parm)
      }
    })
  }
}
export const hcEditor = new HcEditor()
