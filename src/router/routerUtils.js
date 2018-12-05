import router from './router'
import {copy} from '../util/objectUtil'

export function addQueryParams(queryParams, historyPush) {
    let route = getRoute()
    setQueryParams(extend(route.query, queryParams), historyPush)
}

function extend(parent, child) {
    let parentCopy = copy(parent)
    let childCopy = copy(child)

    Object.keys(childCopy).forEach(key => {
        parentCopy[key] = childCopy[key]
    })

    return parentCopy
}

export function setQueryParams(queryParams, historyPush) {
    let route = getRoute()
    let arg = {
        name: route.name,
        query: deleteNullProperties(queryParams)
    }

    if (historyPush && historyPush != null) {
        router.push(arg)
    }
    else {
        router.replace(arg)
    }
}

export function queryParamOrDefault(name, defaultValue, converter) {
    let route = getRoute()
    let param = route.query[name]
    if (param != null) {
        if (converter) {
            return converter(param)
        }
        else {
            return param
        }
    }
    else {
        return defaultValue
    }
}

function getRoute() {
    return router.app.$route
}

function deleteNullProperties(obj) {
    let copied = copy(obj)
    for (let propName in copied) {
        if (copied[propName] === null || copied[propName] === undefined) {
            delete copied[propName];
        }
    }

    return copied
}