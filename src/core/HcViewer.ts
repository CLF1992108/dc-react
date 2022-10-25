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

  addBaseLayer() {
    let baseLayer = DC.ImageryLayerFactory.createAmapImageryLayer({
      style: 'img',
    })
    this.viewer.addBaseLayer(baseLayer)
    return this
  }
}

export default HcViewer
