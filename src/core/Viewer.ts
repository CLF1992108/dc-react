import { Viewer as DCViewer } from "dc"
import { MapOptions } from "./type"

export class Viewer extends DCViewer {
  constructor(id: string) {
    super(id)
  }
  handleBaseLayer(options: MapOptions[]) {
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
      let opts = {
        iconUrl: iconUrl,
        name: iconName
      } as unknown as JSON
      this.addBaseLayer(layers, opts)

    }))

    return this
  }
}

