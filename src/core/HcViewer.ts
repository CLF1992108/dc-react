import { MapOptions } from "./type"

class HcViewer {
  private viewer
  constructor(viewer: any) {
    this.viewer = viewer
  }
  set Viewer(v) {
    this.viewer = v
  }
  get Viewer() {
    return this.viewer
  }
  addBaseLayer(options: MapOptions[]) {
    options.forEach((option => {
      let { iconUrl, iconName, style, crs, cva, url, key, type } = option,
        layers: any[] = [],
        cvaLayer

      const layer = DC.ImageryLayerFactory.createImageryLayer(type, {
        url,
        style,
        key,
        crs,
      })
      layers.push(layer)

      if (cva) {
        cvaLayer = DC.ImageryLayerFactory.createImageryLayer(type, {
          url,
          style: "cva",
          key,
          crs,
        })
        layers.push(cvaLayer)
      }

      this.viewer.addBaseLayer(layers, {
        iconUrl,
        name: iconName
      })

    }))

    return this
  }
}

export default HcViewer
