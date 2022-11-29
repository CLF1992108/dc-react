import { TypeProps } from "../types/Overlay";

export class HcWidget {
  name: string = "";
  icon: string = "";
  json: Record<string, unknown> = {}
  position: [] = [];
  constructor() { }
  render() {
    //json -panel
  }
  render2d() { }
  render3d() { }
  add(overlay: any, layer: any, parm: TypeProps) { }
  update(params: Record<string, unknown>) { }
  delete(overlay: any) { }
  setOverlayAttr(overlay: any, parm: TypeProps) { }

}

