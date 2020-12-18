module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/CNAME");

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
