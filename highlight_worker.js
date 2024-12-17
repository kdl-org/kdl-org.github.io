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
  console.log("highlighting...");
  const ret = highlighter.codeToHtml(code, lang);
  console.log("highlighted!");
  return ret;
}

parentPort.addListener("message", async ({ signal, port, args }) => {
  // This is the async function that we want to run "synchronously"
  const result = await shiki_highlight(...args);

  // Post the result to the main thread before unlocking "signal"
  console.log("posting result...");
  port.postMessage({ result });
  console.log("posted result");
  port.close();
  console.log("port closed");

  // Change the value of signal[0] to 1
  Atomics.store(signal, 0, 1);
  // This will unlock the main thread when we notify it
  Atomics.notify(signal, 0);
});
