import { makeAutoObservable } from "mobx"
import { getPropsListByType } from "../api/layerReq";
import { hcOverlay } from "../core/Overlay";
import { LayerProps, OverlayProps } from "../types/DCProps";
import { TypeProps } from "../types/Overlay";
export class HcEditor {
  private viewer: {
    popup: any; addLayer: (arg0: { addOverlay: (arg0: any) => void; clear: () => void; }) => void;
  }
  private layerGroup: {
    getLayer(type: string): any; addLayer: (arg0: any) => void;
  }
  private plot: any
  private layer: LayerProps
  private open = false
  private currentOverlay: any;

  constructor() {
    makeAutoObservable(this)

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
  get CurrentOverlay() {
    return this.currentOverlay
  }
  init(viewer: any) {

    const content = `<div id="popup"><div>`
    this.viewer = viewer
    let popup = this.viewer.popup
    popup.setContent(content)
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

  editorComplete(overlay: any) {
    console.log(overlay)
  }
  diolog(e: any, overlay: any) {
    this.open = true
    this.currentOverlay = overlay
    this.viewer.popup.showAt(e.position)
  }
  popupHide() {
    this.viewer?.popup.hide()
  }
  draw(parm: TypeProps) {
    let plot = this.plot
    plot && plot.draw(parm.eleType, (overlay: any) => {

      if (overlay) {
        // parm.icon && (overlay.icon = parm.icon)
        let layer = this.layerGroup.getLayer(parm.type)

        hcOverlay.setOverlayAttr(overlay, parm)
        hcOverlay.add(overlay, layer)
        plot.edit(overlay)
        overlay.setStyle({
          width: layer?.attr?.width,
          "material": new Cesium.Color.fromCssColorString(parm.color), //颜色
        })
        overlay.on(DC.MouseEventType.CLICK, () => {
          plot.edit(overlay, () => {
            this.editorComplete(overlay)
          })
        })
        overlay.on(DC.MouseEventType.RIGHT_CLICK, (e: any) => {
          this.open = false
          this.diolog(e, overlay)
        })
      }
    }
      // , {
      //   "color": parm.color, // 自定义的中心点图标
      // }
    )
  }
  // removeAll() {
  //   this.layer.clear()
  // }
}
export const hcEditor = new HcEditor()
