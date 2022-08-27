<template>
  <div class="editor" ref="editor-container"></div>
</template>

<script>
import {basicSetup, EditorView} from "codemirror"
import {EditorState} from '@codemirror/state';
import {json} from "@codemirror/lang-json";
import {LanguageSupport, LRLanguage} from "@codemirror/language"
import {basicLight} from "cm6-theme-basic-light"

export default {
  name: "JsonEditor",
  props: {
    value: String,
    readonly: Boolean
  },
  updated() {
    if (this.readonly) {
      this.editorView.dispatch({changes: {from: 0, to: this.editorView.state.doc.length, insert: this.value}})
    }
  },
  mounted() {
    console.log(new LanguageSupport(LRLanguage.define({
      parser: {
        configure() {
        }
      }
    })))
    const extensions = [basicSetup, basicLight, json()
      , EditorView.updateListener.of(e => {
        this.$emit('update:value', e.state.doc.toString())
      })]
    if (this.readonly) {
      extensions.unshift(EditorView.contentAttributes.of({contenteditable: "false"}));
    }
    this.editorState = EditorState.create({
      doc: this.value,
      extensions,

    })
    this.editorView = new EditorView({
      state: this.editorState,

      parent: this.$refs["editor-container"]
    })

  }

}
</script>
<style>
.cm-editor {
  height: 100%;
}
</style>
<style scoped>
.editor {
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: sans-serif;
}

</style>