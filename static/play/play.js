import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker.js?url'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'
import * as KDL from "@bgotink/kdl";
import nordTheme from 'monaco-themes/themes/Nord.json'

import * as KDLMonarch from './kdl.monarch'

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		return EditorWorker
	}
}

monaco.languages.register({ id: 'kdl' })
monaco.languages.setMonarchTokensProvider('kdl', KDLMonarch.language)
monaco.languages.setLanguageConfiguration('kdl', KDLMonarch.config)

monaco.editor.defineTheme('nord', nordTheme)
monaco.editor.setTheme('nord')

function addTag(el, tag) {
  if (!tag) return
  const tagEl = document.createElement('span')
  tagEl.classList.add('tag')
  tagEl.textContent = tag
  el.append(tagEl)
}

function buildValue(value) {
  const valueEl = document.createElement('span')
  if (value === null) {
    valueEl.textContent = "null"
    valueEl.classList.add('null')
  } else if (value === true || value === false) {
    valueEl.textContent = value ? 'true' : 'false'
    valueEl.classList.add('boolean')
  } else if (typeof value === "string") {
    valueEl.textContent = JSON.stringify(value)
    valueEl.classList.add('string')
  } else {
    valueEl.textContent = value.toString()
    valueEl.classList.add('number')
  }
  return valueEl
}

/**
 * @param {KDL.Node} node
 * @returns {HTMLElement}
 */
function buildNodeTree(node) {
  const nodeEl = document.createElement('div')
  nodeEl.classList.add('node')
  nodeEl.classList.add('open')
  const nameEl = document.createElement('button')
  nameEl.addEventListener('click', () => nodeEl.classList.toggle('open'))
  nameEl.classList.add('name')
  addTag(nameEl, node.getTag())
  nameEl.append(document.createTextNode(node.getName()))
  nodeEl.append(nameEl)
  const contentEl = document.createElement('ul')
  contentEl.classList.add('content')
  node.entries.forEach((entry) => {
    if (entry.name === null) {
      const valueEl = document.createElement('li')
      valueEl.classList.add('value')
      addTag(valueEl, entry.getTag())
      valueEl.append(buildValue(entry.getValue()))
      contentEl.append(valueEl)
    } else {
      const propEl = document.createElement('li')
      propEl.classList.add('property')
      const keyEl = document.createElement('span')
      keyEl.classList.add('key')
      keyEl.textContent = entry.getName()
      propEl.append(keyEl)
      addTag(propEl, entry.getTag())
      propEl.append(buildValue(entry.getValue()))
      contentEl.append(propEl)
    }
  })
  node.children?.nodes.forEach(child => {
    contentEl.append(buildNodeTree(child))
  })
  nodeEl.append(contentEl)

  return nodeEl
}

addEventListener("DOMContentLoaded", (event) => {
  const editor = monaco.editor.create(document.getElementById('input'), {
    value: 'foo 1 "two" three=(decimal)0xff {\n  (thing)bar #true #false #null\n}',
    language: 'kdl',
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: 16,
    automaticLayout: true
  })
  const model = editor.getModel()
  const output = document.getElementById('output')

  function parse() {
    const markers = []
    try {
      let document = KDL.parse(model.getValue())
      output.classList.remove('error')

      output.innerHTML = ''
      document.nodes.forEach(node => {
        output.append(buildNodeTree(node))
      })

    } catch (error) {
      output.classList.add('error')
      if (error instanceof KDL.InvalidKdlError) {
        markers.push({
          message: error.message,
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: error.start?.line,
          startColumn: error.start?.column,
          endLineNumber: error.end?.line,
          endColumn: error.end?.column,
        })
      } else if (typeof AggregateError === 'function' && error instanceof AggregateError) {
        for (const suberror of error.errors) {
          if (suberror instanceof KDL.InvalidKdlError) {
            markers.push({
              message: suberror.message,
              severity: monaco.MarkerSeverity.Error,
              startLineNumber: suberror.start?.line,
              startColumn: suberror.start?.column,
              endLineNumber: suberror.end?.line,
              endColumn: suberror.end?.column,
            })
          } else {
            console.error(suberror);
            markers.push({
              message: "Failed to parse KDL",
              severity: monaco.MarkerSeverity.Error,
              startLineNumber: 1,
              startColumn: 1,
            })
          }
        }
      } else {
        console.error(error)
        markers.push({
          message: "Failed to parse KDL",
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: 1,
          startColumn: 1,
        })
      }
    }
    monaco.editor.setModelMarkers(model, "owner", markers)
  }

  model.onDidChangeContent(parse)

  parse()
})