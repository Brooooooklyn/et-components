'use strict'
import * as path from 'path'
import * as browserSync from 'browser-sync'
import * as opn from 'opn'
import {bundle} from './webpack'

const reload = browserSync.reload

let initBrowserSync = false

bundle(true).then(result => {
  console.log(result)
  if (initBrowserSync) return reload()
  initBrowserSync = true
  browserSync({
    notify: false,
    port: 5001,
    socket: {
      domain: 'http://localhost:5001'
    },
    open: false,
    server: {
      baseDir: ['www'],
      routes: {}
    }
  })
  opn('http://project.ci', {app: 'google chrome'})
})
