// When the web worker receives a worker. look at the data and uppercase it, and send it back
import jmespath from 'jmespath'

self.onmessage = function (e) {
    self.postMessage(JSON.stringify(jmespath.search(JSON.parse(e.data.jsonStr), e.data.expression), null, 2));
}
