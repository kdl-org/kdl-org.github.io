const { parentPort } = require("worker_threads");
const shiki = require("shiki");
const path = require("path");

async function shiki_highlight(code, lang) {
  const highlighter = await shiki.getHighlighter({
    theme: "nord",
    langs: [
      {
        id: "kdl",
        scopeName: "source.kdl",
        path: path.join(process.cwd(), "kdl.tmLanguage.json"),
      },
    ],
  });
  return highlighter.codeToHtml(code, lang);
}

parentPort.addListener("message", async ({ signal, port, args }) => {
  // This is the async function that we want to run "synchronously"
  const result = await shiki_highlight(...args);

  // Post the result to the main thread before unlocking "signal"
  port.postMessage({ result });
  port.close();

  // Change the value of signal[0] to 1
  Atomics.store(signal, 0, 1);
  // This will unlock the main thread when we notify it
  Atomics.notify(signal, 0);
});
