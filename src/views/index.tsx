import React, { Component } from 'react'
import { Viewer } from '../components/Viewer'
import HcViewer from '../core/HCViewer'

export interface AppProps {}
const App: React.FC<AppProps> = (AppProps) => {
  const _onViewerCreated = (viewer: any) => {
    let viewerApi = new HcViewer(viewer)
    viewerApi.addBaseLayer()
    global.viewerApi = viewerApi
  }
  return (
    <div className="home">
      <Viewer onViewerCreated={_onViewerCreated} />
    </div>
  )
}

export default App
