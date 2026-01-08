import { createHighlighter } from "shiki";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginPhosphorIcons from "eleventy-plugin-phosphoricons";
import pluginSpeculationRules from "eleventy-plugin-speculation-rules";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

/**
 * Eleventy plugins configuration
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  // Add YAML support for data files
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

  // Phosphor Icons
  eleventyConfig.addPlugin(pluginPhosphorIcons, {
    class: "phicon",
    size: 32,
    fill: "currentColor",
  });

  // Image optimization transform
  // https://www.11ty.dev/docs/plugins/image/#eleventy-transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // Build speed boost: https://www.zachleat.com/web/faster-builds-with-eleventy-img/
    urlPath: "/img/",
    outputDir: ".cache/@11ty/img/",
    failOnError: false,

    // File extensions to process in _site folder
    extensions: "html",

    // Output formats for each image
    formats: ["avif", "webp", "auto"],

    // Output image widths
    widths: [320, 640, 960, 1200],

    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "100vw",
    },
  });

  // Copy cached images to output after build
  eleventyConfig.on("eleventy.after", () => {
    const cacheDir = ".cache/@11ty/img/";
    if (fs.existsSync(cacheDir)) {
      fs.cpSync(cacheDir, path.join(eleventyConfig.directories.output, "/img/"), {
        recursive: true,
      });
    }
  });

  // Shiki syntax highlighting - initialize before build
  let shikiHighlighter;

  eleventyConfig.on("eleventy.before", async () => {
    shikiHighlighter = await createHighlighter({
      themes: ["light-plus"],
      langs: [
        "javascript",
        "typescript",
        "html",
        "css",
        "json",
        "bash",
        "shell",
        "markdown",
        "yaml",
        "xml",
        "php",
        "python",
        "ruby",
        "go",
        "rust",
        "sql",
        "graphql",
        "diff",
        "text",
        "plaintext",
      ],
    });
  });

  eleventyConfig.amendLibrary("md", function (mdLib) {
    mdLib.renderer.rules.fence = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      const lang = token.info.trim() || "text";
      const code = token.content.trimEnd();

      // Use Shiki if highlighter is ready and language is supported
      if (shikiHighlighter) {
        try {
          const loadedLangs = shikiHighlighter.getLoadedLanguages();
          const langToUse = loadedLangs.includes(lang) ? lang : "text";

          return shikiHighlighter.codeToHtml(code, {
            lang: langToUse,
            theme: "light-plus",
          });
        } catch (e) {
          console.log("tokens, idx, options, env, self", tokens, idx, options, env, self);
          console.warn(`Shiki error for lang "${lang}":`, e.message);
        }
      }

      // Fallback: escape HTML
      const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      return `<pre class="shiki"><code class="language-${lang}">${escaped}</code></pre>`;
    };
  });

  // Add bundle plugin for CSS/JS
  eleventyConfig.addBundle("css");
  eleventyConfig.addBundle("js");

  // Speculation Rules for prefetching/prerendering
  eleventyConfig.addPlugin(pluginSpeculationRules);
}
