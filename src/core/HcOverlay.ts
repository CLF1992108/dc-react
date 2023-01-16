import { addMaterial, addMaterialLocal, deleteOverlay, delMaterial, editMaterial, LayerProps, MaterialProps, updateOverlay } from "../api/gisReq";
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
    let id = await addMaterial(overlay.attr)
    if (!id) {
      return PubSub.publish("MSG", {
        severity: "error",
        content: "添加失败"
      })
    }
    PubSub.publish("MSG", {
      severity: "success",
      content: "添加成功"
    })
    PubSub.publish("REFRESH_OVERLAY")
    overlay.attr.id = id
    overlay.attr.name = overlay.attr.name + id
    layer.addOverlay(overlay)
    plot.edit(overlay)
    if (parm.type === "point") {
      overlay.icon = parm.property['icon']
      overlay.size = [parm.property['pixelSize'], parm.property['pixelSize']]
    } else if (parm.type === "line") {

      overlay.setStyle({
        width: parm.property['width'],
        material: new Cesium.Color.fromCssColorString(parm.property['material']), //颜色
      })
      if (parm.property['brighten']) {
        overlay.setStyle({
          width: parm.property['width'],

          material: new DC.PolylineLightingMaterialProperty({
            color: new Cesium.Color.fromCssColorString(parm.property['material']),
          })
        })
      }
      if (parm.property['brightenflow']) {
        overlay.setStyle({
          width: parm.property['width'],

          material: new DC.PolylineLightingTrailMaterialProperty({
            color: new Cesium.Color.fromCssColorString(parm.property['material']),
          })
        })
      }
    } else {
      overlay.setStyle({
        height: 1, //高度
        material: new Cesium.Color.fromCssColorString(parm.property['material']), //颜色
        outline: parm.property['outline'], //是否显示边框
        outlineColor: new Cesium.Color.fromCssColorString(parm.property['outlineColor']), //是否显示边框
      })
    }
    overlay.on(DC.MouseEventType.CLICK, () => {
      if (layer.attr['property']['brightenflow']) {
        PubSub.publish('MSG', {
          severity: 'error',
          content: '发光流动线不可编辑，先取消选择',
        });
        return;
      }
      plot.edit(overlay, () => {
        hcOverlay.update(overlay.attr)
      })
    })
    overlay.on(DC.MouseEventType.RIGHT_CLICK, (e: any) => {
      hcEditor.CurrentOverlay = overlay
      hcEditor.Open = false
      hcEditor.diolog(e, overlay)
    })
    return overlay
  }
  async update(params: MaterialProps) {
    if (params.type === "point") {
      if (typeof params.point !== "string") {
        let coordinates = (params.point as any).coordinates

        params.point = `${coordinates[0]} ${coordinates[1]}`
      }
    } else if (params.type === "line") {
      if (typeof params.line !== "string") {
        let posStr = ""
        let coordinates = (params.line as any).coordinates

        Array.isArray(coordinates) && coordinates.forEach((p: any, index: number) => {
          if (index !== (coordinates.length - 1)) {
            posStr = posStr + `${p[0]} ${p[1]},`
          } else {
            posStr = posStr + `${p[0]} ${p[1]}`
          }

        })
        params.line = posStr
      }
    } else {
      if (typeof params.plane !== "string") {
        let posStr = ""
        let coordinates = (params.plane as any).coordinates[0]
        Array.isArray(coordinates) && coordinates.forEach((p: any, index: number) => {
          if (index !== (coordinates.length - 1)) {
            posStr = posStr + `${p[0]} ${p[1]},`
          } else {
            posStr = posStr + `${p[0]} ${p[1]}`
          }

        })
        params.plane = posStr
      }
    }
    let b = params.id && await editMaterial(params.id, params)
    return b
  }
  async delete(item: any) {
    let b = await delMaterial(item.id)
    if (b) {
      let layer = hcEditor.getLayer(item.layerId)
      let overlay = layer.getOverlaysByAttr('id', item.id)[0]
      layer.removeOverlay(overlay)
      PubSub.publish('REFRESH_OVERLAY');
    }

    return b
  }

  setOverlayAttr(overlay: any, parm: LayerProps) {
    let pos = overlay?.position, posStr = "", altStr = "";
    overlay.attr = {
      sceneId: Number(urlSearch("guid")),
      layerId: parm.id,
      name: parm.name,
      type: parm.type,
      point: pos ? `${pos.lng} ${pos.lat} ` : "",
      property: "",
      panelVal: "",
    }
    Array.isArray(overlay?.positions) && overlay?.positions.forEach((p: any, index: number) => {
      if (index !== (overlay?.positions.length - 1)) {
        console.log(overlay?.positions.length, index)
        posStr = posStr + `${p.lng} ${p.lat},`
        altStr = altStr + `${p.alt}, `
      } else {
        posStr = posStr + `${p.lng} ${p.lat}`
        altStr = altStr + `${p.alt} `
      }

    })
    if (parm.type === "point") {
      altStr = pos.alt
    }
    if (parm.type === "line") {
      overlay.attr.line = posStr

    } else if (parm.type === "plane") {

      overlay.attr.plane = posStr + `, ${overlay?.positions[0]?.lng} ${overlay?.positions[0]?.lat}`
    }
    overlay.attr.height = altStr
  }
}
export const hcOverlay = new HcOverlay()
