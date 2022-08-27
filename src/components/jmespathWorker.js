const worker = new Worker(new URL('./jmespath.worker.js', import.meta.url));

/**
 *
 * @param {string} jsonStr
 * @param {string} expression
 */
function search({jsonStr, expression}) {
    worker.postMessage({jsonStr, expression})
}

export {worker, search}