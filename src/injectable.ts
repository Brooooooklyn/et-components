'use strict'
import {Utils} from 'teambition-sdk'

const injectorMap = new Map<string, any>()

export function buildInjectable(context, injects: any[]) {
  if (!(injects instanceof Array)) return
  const results = []
  Utils.forEach(injects, (Factory) => {
    const factoryName = Factory.name
    let result = injectorMap.get(factoryName)
    if (!result) {
      result = new Factory()
      injectorMap.set(factoryName, result)
    }
    results.push(result)
    bindContext(context, result)
  })
  return results
}

function bindObjectContext (res: any, context: any) {
  if (res && typeof res.onChange === 'function') {
    const originOnchange = res.onChange
    res.onChange = function (patch) {
      const result = originOnchange.apply(res, arguments)
      if (!context || !context.$$template) return result
      context.$$template.update()
      return result
    }
  }else if (res instanceof Array) {
    Utils.forEach(res, val => {
      bindObjectContext(val, context)
    })
  }
}

function bindContext(context: any, instance: any) {
  const keys = Object.keys(Object.getPrototypeOf(instance))
  Utils.forEach(keys, (propertyName) => {
    const property = instance[propertyName]
    if (typeof property !== 'function') return
    instance[propertyName] = function () {
      const result = property.apply(instance, arguments)
      if (typeof result === 'undefined') return
      if (result instanceof Promise) {
        result.then(res => {
          bindObjectContext(res, context)
        })
      }
      return result
    }
  })
}
