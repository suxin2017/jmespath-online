<template>
  <div id="container">
    <splitpanes class="default-theme">
      <pane>
        <JsonEditor v-model:value="jsonValue" readonly/>
      </pane>
      <pane>
        <splitpanes class="default-theme" horizontal>
          <pane>
            <JsonEditor v-model:value="expression"></JsonEditor>
          </pane>
          <pane>
            <JsonEditor :value="result" readonly></JsonEditor>
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import {Pane, Splitpanes} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import JsonEditor from "@/components/JsonEditor";
import {search, worker} from "@/components/jmespathWorker";


export default {
  name: 'App',
  data: function () {
    return {
      jsonValue: '{"foo": {"bar": {"baz": [0, 1, 2, 3, 4]}}}',
      expression: 'foo.bar.baz[2]',
      result: ''
    };
  },
  components: {
    JsonEditor,
    Splitpanes,
    Pane
  },
  mounted() {
    fetch("https://raw.githubusercontent.com/json-iterator/test-data/master/large-file.json").then(res => {
      {
        res.text().then(text => {
          this.jsonValue = text
        })
      }
    })
    worker.addEventListener('message', (e) => {
      this.result = e.data
    })
  },
  watch: {
    expression() {
      search({jsonStr: this.jsonValue, expression: this.expression});
    }
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#container {
  height: 100vh;
  width: 100vw;
}

.splitpanes__pane {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
