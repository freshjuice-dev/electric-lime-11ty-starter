import { minify as minifyHTML } from "html-minifier-terser";
import { parseHTML } from "linkedom";

/**
 * Eleventy transforms configuration
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  // Wrap tables in <table-saw> for responsive tables
  eleventyConfig.addTransform("table-saw", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    // Quick check if there are any tables to process
    if (!content.includes("<table")) {
      return content;
    }

    const { document } = parseHTML(content);
    const tables = document.querySelectorAll("table:not(table-saw table)");

    if (tables.length === 0) {
      return content;
    }

    tables.forEach((table) => {
      // Skip if already wrapped
      if (table.parentElement?.tagName?.toLowerCase() === "table-saw") {
        return;
      }

      // Skip if table has data-table-saw="none" attribute
      if (table.getAttribute("data-table-saw") === "none") {
        return;
      }

      const tableSaw = document.createElement("table-saw");
      table.parentNode.insertBefore(tableSaw, table);
      tableSaw.appendChild(table);
    });

    return document.toString();
  });

  // Make code blocks keyboard accessible
  eleventyConfig.addTransform("a11y-pre", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      // Add tabindex="0" to pre elements for keyboard accessibility
      return content.replace(/<pre([^>]*)>/g, (match, attrs) => {
        if (attrs.includes("tabindex")) return match;
        return `<pre${attrs} tabindex="0">`;
      });
    }
    return content;
  });

  // HTML/XML/JSON minification in production
  eleventyConfig.addTransform("minify", async function (content, outputPath) {
    if (process.env.NODE_ENV !== "production" || !outputPath) {
      return content;
    }

    if (outputPath.endsWith(".json")) {
      try {
        return JSON.stringify(JSON.parse(content));
      } catch {
        return content;
      }
    }

    if (outputPath.endsWith(".html")) {
      // Pre-process Alpine.js directives before minification
      // Removes comments and flattens multi-line directives
      const alpineDirectives = [
        "x-data",
        "x-init",
        "x-show",
        "x-if",
        "x-for",
        "x-on",
        "x-bind",
        "x-model",
        "x-effect",
        "x-intersect",
      ];
      const directiveRegex = new RegExp(
        `\\b(${alpineDirectives.map((name) => `${name}(?:[:.][^=\\s"]+)?`).join("|")})="([\\s\\S]*?)"`,
        "g"
      );

      const cleaned = content.replace(directiveRegex, (match, attrName, rawValue) => {
        // Remove inline JS-style comments (// ...) but not URLs (http://)
        const noComments = rawValue.replace(/(^|[^:])\/\/.*$/gm, "$1");
        // Flatten to single line
        const flattened = noComments
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .join(" ");
        return `${attrName}="${flattened}"`;
      });

      return minifyHTML(cleaned, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: false,
        minifyJS: true,
        minifyCSS: true,
        keepClosingSlash: true,
        processScripts: ["application/ld+json"],
        removeAttributeQuotes: false, // Important for Alpine.js
        removeEmptyAttributes: false, // Important for Alpine.js
      });
    }

    if (outputPath.endsWith(".xml")) {
      return minifyHTML(content, {
        removeComments: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
      });
    }

    return content;
  });
}
