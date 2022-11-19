import { Widget } from "../interfaces";
import { TypeProps } from "../types/Overlay";
class HcOverlay extends Widget {
  add(overlay: any, layer: any) {
    layer.addOverlay(overlay)
    return overlay
  }
  setOverlayAttr(overlay: any, parm: TypeProps) {
    overlay.attr = {
      type: parm.type,
      name: parm.name,
      eleType: parm.eleType,
      position: [
        111,
        23
      ],
      points: [],
      property: [
      ]
    }

    parm.eleType === "polyline" && (overlay.attr.points = [])
  }
}
export const hcOverlay = new HcOverlay()
