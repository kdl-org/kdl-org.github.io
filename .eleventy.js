const {
  Worker,
  receiveMessageOnPort,
  MessageChannel,
} = require("worker_threads");

function wait_highlight(...args) {
  const worker = new Worker("./highlight_worker.js");
  const signal = new Int32Array(new SharedArrayBuffer(4));
  signal[0] = 0;
  try {
    const subChannel = new MessageChannel();
    worker.postMessage({ signal, port: subChannel.port1, args }, [
        subChannel.port1
    ]);
    Atomics.wait(signal, 0, 0);
    return receiveMessageOnPort(subChannel.port2).message.result;
  } finally {
    worker.unref();
  }
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addMarkdownHighlighter(wait_highlight);

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
