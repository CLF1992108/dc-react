import { Overlay } from "dc";

// export type OverlayProps = {
//   overlayId: string;
//   id: string;
//   show: Boolean;
//   attr: {};
//   state: string;
//   type: string;
//   checked: boolean;
//   contextMenu: []
// }
export type LayerProps = {
  id: string;
  show: Boolean;
  attr: {};
  state: string;
  type: string;
  checked: boolean;
  addOverlay: (overlay: Overlay) => LayerProps;
}
