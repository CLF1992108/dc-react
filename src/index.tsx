import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { DcLoader, HttpLoader } from './loader'
import RouteList from './router'
import './themes/index.scss'
;(() => {
  let loaderPromise = new Promise((resolve) => {
    new DcLoader().load()
    new HttpLoader().load()
    resolve(true)
  })
  Promise.all([axios.get('config/config.json'), loaderPromise]).then(
    ([res]) => {
      global.Config = res.data
      const el_root = document.getElementById('root')
      ReactDOM.render(<RouteList />, el_root)
    }
  )
})()
