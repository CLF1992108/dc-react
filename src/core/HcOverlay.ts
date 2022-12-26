import { addMaterial, addMaterialLocal, deleteOverlay, LayerProps, updateOverlay } from "../api/gisReq";
import { hcEditor } from "../store/HcEditor";
import PubSub from 'pubsub-js'
import { urlSearch } from "../utils/util";
class HcOverlay {
  constructor() {
    let mySubscriber = function (msg: string, data: any) {
      let layer = hcEditor.getLayer(data.layerId)
      let overlay = layer.getOverlaysByAttr('id', data.id)
      hcEditor.Viewer.flyTo(overlay[0], 2)
    };
    PubSub.subscribe('FLY_TO_OVERLAY', mySubscriber);
  }
  async add(overlay: any, layer: any, parm: LayerProps) {
    let plot = hcEditor.Plot
    this.setOverlayAttr(overlay, parm)
    let id = await addMaterialLocal(overlay.attr)
    if (!id) {
      return PubSub.publish("MSG", {
        severity: "error",
        content: "添加失败"
      })
    }
    PubSub.publish("MSG", {
      severity: "error",
      content: "添加成功"
    })
    PubSub.publish("REFRESH_OVERLAY")
    overlay.attr.id = id
    debugger
    overlay.attr.name = overlay.attr.name + id
    console.log(overlay.attr.id)
    layer.addOverlay(overlay)
    plot.edit(overlay)
    overlay.icon = parm.property['icon']
    overlay.setStyle({
      width: layer?.attr?.width,
      "material": new Cesium.Color.fromCssColorString(parm.property['color']), //颜色
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
  update(params: Record<string, unknown>) {
    updateOverlay(params)
    return true
  }
  delete(overlay: any) {
    const layer = hcEditor.getLayer(overlay.attr.type)
    layer.removeOverlay(overlay)
    deleteOverlay({})

  }
  setOverlayAttr(overlay: any, parm: LayerProps) {
    let pos = overlay?.position;
    let posArr = overlay?.positions && overlay?.positions.map((p: any) => [p.lng, p.lat, p.alt]);

    overlay.attr = {
      sceneId: urlSearch("guid"),
      layerId: parm.id,
      uuid: "",
      name: parm.name,
      type: parm.type,
      point: pos ? [pos.lng, pos.lat, pos.alt] : "",
      line: posArr ? posArr : "",
      plane: posArr ? posArr : "",
      property: "",
      panelVal: "",
    }
    console.log("====", overlay.attr)
  }
}
export const hcOverlay = new HcOverlay()
