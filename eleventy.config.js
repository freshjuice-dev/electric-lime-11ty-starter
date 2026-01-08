import collections from "./config/collections.js";
import filters from "./config/filters.js";
import shortcodes from "./config/shortcodes.js";
import transforms from "./config/transforms.js";
import plugins from "./config/plugins.js";

export default function (eleventyConfig) {
  // Collections
  collections(eleventyConfig);

  // Filters
  filters(eleventyConfig);

  // Shortcodes
  shortcodes(eleventyConfig);

  // Transforms
  transforms(eleventyConfig);

  // Plugins
  plugins(eleventyConfig);

  // Pass-through copies
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Watch targets
  eleventyConfig.addWatchTarget("./src/assets/css/");
  eleventyConfig.addWatchTarget("./src/assets/js/");

  // Server options
  eleventyConfig.setServerOptions({
    port: 8080,
    watch: ["_site/assets/css/**/*.css", "_site/assets/js/**/*.js"],
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
