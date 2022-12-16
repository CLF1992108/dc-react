import { addOverlay, deleteOverlay, updateOverlay } from "../api/gisReq";
import { HcWidget } from "../interfaces";
import { hcEditor } from "../store/HcEditor";
import { TypeProps } from "../types/Overlay";
import PubSub from 'pubsub-js'
class HcOverlay extends HcWidget {
  constructor() {
    super();
    let mySubscriber = function (msg: string, data: any) {
      let layer = hcEditor.getLayer(data.type)
      let overlay = layer.getOverlaysByAttr('id', data.id)
      hcEditor.Viewer.flyTo(overlay[0], 2)
    };
    PubSub.subscribe('FLY_TO_OVERLAY', mySubscriber);
  }
  override async add(overlay: any, layer: any, parm: TypeProps) {
    let plot = hcEditor.Plot
    this.setOverlayAttr(overlay, parm)
    let id = await addOverlay(overlay.attr)
    if (!id) {
      return alert("添加失败")
    }
    overlay.attr.id = id
    console.log(overlay.attr.id)
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
