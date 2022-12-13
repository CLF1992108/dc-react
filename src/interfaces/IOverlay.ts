import { TypeProps } from "../types/Overlay";
export type Postion = {
  lng: number;
  lat: number;
  alt: number;
}
export interface IOverlay {
  name: string;
  icon: string;
  attr: Record<string, unknown>;
  position: Postion[];
  render(): void
  render2d(): void
  render3d(): void
  add(overlay: any, layer: any, parm: TypeProps): void
  update(params: Record<string, unknown>): void
  delete(overlay: any): void
  setOverlayAttr(overlay: any, parm: TypeProps): void

}
