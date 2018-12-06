import {distinct} from "../util/arrayUtil";

class LimitedArrayStorage {
    getAll(key) {
        let items = window.localStorage.getItem(key)
        if (items) {
            return JSON.parse(items)
        }
        else {
            return []
        }
    }

    put(key, item, maxSize) {
        let items = this.getAll(key)
        items.unshift(item)
        items = distinct(items)

        let toDelete = items.length - maxSize
        if (toDelete > 0) {
            items.splice(maxSize, toDelete)
        }

        this._save(key, items)
    }

    _save(key, item) {
        window.localStorage.setItem(key, JSON.stringify(item))
    }
}

export default new LimitedArrayStorage()