import { TypeProps } from "../types/Overlay";

export class Widget {
  name: string;
  icon: string;
  json: Record<string, unknown> = {}
  position: [];
  constructor() { }
  render() {
    //json -panel
  }
  render2d() { }
  render3d() { }
  add(overlay: any, layer: any) { }
  update() { }
  delete() { }
  setOverlayAttr(overlay: any, parm: TypeProps) { }

}
class Widget2 extends Widget {
  points: []
}
