import Title from "antd/lib/skeleton/Title";
import { makeAutoObservable } from "mobx"
import { getPropsListByType } from "../api/layerReq";
import { LayerProps, OverlayProps } from "../types/DCProps";
import { TypeProps } from "../types/Overlay";
export class HcEditor {
  private viewer: {
    popup: any; addLayer: (arg0: { addOverlay: (arg0: any) => void; clear: () => void; }) => void; 
}
  private layerGroup: {
    getLayer(type: string): any; addLayer: (arg0: any) => void; 
  }
  private plot: any
  private layer: LayerProps
  private open1 = false
  private currentOverlay: any;
  
  constructor() {
    makeAutoObservable(this)
    
  }
  get Viewer(){
    return this.viewer
  }
  get LayerGroup() {
    return this.layerGroup
  }
  get Open1(){
    return this.open1
  }
  get CurrentOverlay(){
    return this.currentOverlay
  }
  init(viewer: any) {
    const content = `<div id="popup"><div>`
    this.viewer = viewer
    let popup = this.viewer.popup
    popup.setContent(content)
    this.open1 = false
    this.layerGroup = new DC.LayerGroup('layerGroup')
    viewer.addLayerGroup(this.layerGroup)
    this.plot = new DC.Plot(this.viewer)
  }
  createLayer(layerId:string){
    
    let layer = new DC.VectorLayer(layerId)
    this.layerGroup.addLayer(layer)
    return layer
  }
  setOverlayAttr(overlay: any, parm: TypeProps){
    overlay.attr = {
      type: parm.type, 
      name: "",
      eleType: parm.eleType,
      position: [
        111,
        23
      ],
      points:[],
      property: [
      ]
    }
    
    parm.eleType === "polyline" && (overlay.attr.points=[])
  }
  editorComplete(overlay: any){
    console.log(overlay)
  }
  async diolog(e: any){
    this.viewer.popup.setPosition(e.position)
  }
  draw(parm: TypeProps) {
    let plot = this.plot
    plot && plot.draw(parm.eleType, (overlay: any) => {

      if (overlay) {
        
        // parm.icon && (overlay.icon = parm.icon)
        let layer = this.layerGroup.getLayer(parm.type)
        layer.addOverlay(overlay)
        plot.edit(overlay)
        this.setOverlayAttr(overlay,parm)
        overlay.on(DC.MouseEventType.CLICK, () => {
          plot.edit(overlay, ()=>{
            this.editorComplete(overlay)
          })
        })
        overlay.on(DC.MouseEventType.RIGHT_CLICK, (e:any) => {
          // let popup = this.viewer.popup
          // // popup.setContent(Property.refs)
          // popup.setPosition(e.position)
          // debugger
          // console.log(Property)
          this.diolog(e)
          this.open1=!this.open1
          this.currentOverlay = overlay
        })
      }
    })
  }
  // removeAll() {
  //   this.layer.clear()
  // }
}
export const hcEditor = new HcEditor()
