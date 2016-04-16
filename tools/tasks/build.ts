'use strict'
import * as fs from 'fs'
import {bundle} from './webpack'

bundle().then(res => {
  console.log(res)
})
