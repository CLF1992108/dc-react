import { makeAutoObservable } from "mobx"
export class HcEditor {
  private viewer: { addLayer: (arg0: { addOverlay: (arg0: any) => void; clear: () => void; }) => void; }
  private layer: { addOverlay: (arg0: any) => void; clear: () => void }
  private plot: any
  constructor() {
    makeAutoObservable(this)
  }
  get Layer() {
    return this.layer
  }
  init(viewer: any) {
    this.viewer = viewer
    this.layer = new DC.VectorLayer('layer')
    this.viewer.addLayer(this.layer)
    this.plot = new DC.Plot(this.viewer)

  }
  draw(type: any, icon: string) {
    let plot = this.plot

    plot && plot.draw(type, (overlay: any) => {
      if (overlay) {
        icon && (overlay.icon = icon)
        this.layer.addOverlay(overlay)
        plot.edit(overlay)
        overlay.on(DC.MouseEventType.CLICK, () => {
          plot.edit(overlay)
        })
      }
    })
  }
  removeAll() {
    this.layer.clear()
  }
}
export const hcEditor = new HcEditor()
