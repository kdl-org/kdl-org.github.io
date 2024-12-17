import { createHighlighter } from "shiki";
import path from "node:path";
import { readFile } from "node:fs/promises";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addMarkdownHighlighter(shikiHighlight);

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};

const kdlGrammar = JSON.parse(await readFile(path.join(process.cwd(), "kdl.tmLanguage.json"), "utf8"));

const highlighter = await createHighlighter({
  themes: ["nord"],
  langs: [
    {
      name: "kdl",
      scopeName: "source.kdl",
      ...kdlGrammar
    },
  ],
});

function shikiHighlight(code, lang) {
  return highlighter.codeToHtml(code, { lang, theme: "nord" });
}