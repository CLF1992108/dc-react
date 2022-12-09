import { ILayer } from "../interfaces/ILayer";

export class Layer implements ILayer {
  id?: string | undefined;
  name = "";
  color = "";
  width = 0;
  constructor() { }
  add(params: Record<string, unknown>) {
    return this
  }
  update(id: string, params: Record<string, unknown>) {
    return this
  }
  deleteById(id: string) {
    return true
  }
  getLayerById(id: string) {
    return this
  }

}

