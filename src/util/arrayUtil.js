export function clearArray(array) {
    array.splice(0, array.length)
}

export function distinct(array) {
    let distinctKeys = {}, result = []
    for (let i = 0, l = array.length; i < l; ++i) {
        if (!distinctKeys.hasOwnProperty(array[i])) {
            result.push(array[i])
            distinctKeys[array[i]] = 1
        }
    }

    return result;
}