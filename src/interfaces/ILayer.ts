import { Viewer } from "dc";

export interface ILayer {
  id?: string | undefined;
  show: boolean;
  attr: Record<string, unknown>
  type: string;
  layer: ILayer;

  createLayer(): ILayer;
  addTo(viewer: Viewer): void;
  add(params: Record<string, unknown>): ILayer;
  update(id: string, params: Record<string, unknown>): ILayer;
  deleteById(id: string): boolean;
  getLayerById(id: string): ILayer;
}
