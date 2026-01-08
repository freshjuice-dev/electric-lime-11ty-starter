export default {
  layout: "layouts/page.njk",
  eleventyComputed: {
    permalink: (data) => {
      // Respect explicit permalink in front matter
      if (data.permalink) return data.permalink;
      // Use slug if provided, otherwise use fileSlug
      const slug = data.slug || data.page.fileSlug;
      // Index page goes to root
      if (slug === "index") return "/index.html";
      return `/${slug}/`;
    },
  },
};
