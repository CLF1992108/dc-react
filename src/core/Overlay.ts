import { Billboard, Overlay, Polygon, Polyline } from "dc";
import { addOverlay, deleteOverlay, updateOverlay } from "../api/layerReq";
import { HcWidget } from "../interfaces";
import { hcEditor } from "../store/HcEditor";
import { TypeProps } from "../types/Overlay";
class HcOverlay extends HcWidget {
  override async add(overlay: any, layer: any, parm: TypeProps) {
    let plot = hcEditor.Plot
    this.setOverlayAttr(overlay, parm)
    let id = await addOverlay(overlay.attr)
    if (!id) {
      return alert("添加失败")
    }
    layer.addOverlay(overlay)
    plot.edit(overlay)
    overlay.icon = parm.icon
    overlay.setStyle({
      width: layer?.attr?.width,
      "material": new Cesium.Color.fromCssColorString(parm.color), //颜色
    })
    overlay.on(DC.MouseEventType.CLICK, () => {
      plot.edit(overlay, () => {
        hcOverlay.update(overlay)
      })
    })
    overlay.on(DC.MouseEventType.RIGHT_CLICK, (e: any) => {
      hcEditor.CurrentOverlay = overlay
      hcEditor.Open = false
      hcEditor.diolog(e, overlay)
    })
    return overlay
  }
  override update(params: Record<string, unknown>) {
    updateOverlay(params)
    return true
  }
  override delete(overlay: any) {
    const layer = hcEditor.getLayer(overlay.attr.type)
    layer.removeOverlay(overlay)
    deleteOverlay({})

  }
  override setOverlayAttr(overlay: any, parm: TypeProps) {
    overlay.attr = {
      type: parm.type,
      name: parm.name,
      eleType: parm.eleType,
      position: overlay.position,
      positions: overlay.positions,
      property: {}
    }
  }
}
export const hcOverlay = new HcOverlay()
