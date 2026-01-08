/**
 * Eleventy shortcodes configuration
 * @param {import('@11ty/eleventy').UserConfig} eleventyConfig
 */
export default function (eleventyConfig) {
  // Year shortcode
  eleventyConfig.addShortcode("year", () => {
    return new Date().getFullYear().toString();
  });

  // YouTube embed shortcode using lite-youtube-embed
  const findYouTubeVideoId = (url) => {
    const regex = /(?:v=|v\/|youtu\.be\/|embed\/|watch\?v=)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : url;
  };

  eleventyConfig.addShortcode("youTube", function (videoId, videoTitle = "YouTube video") {
    if (videoId.startsWith("https://") || videoId.startsWith("http://")) {
      videoId = findYouTubeVideoId(videoId);
    }
    return `<lite-youtube videoid="${videoId}" playlabel="${videoTitle}" class="mx-auto rounded-lg shadow-lg" style="background-image: url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg');"></lite-youtube>`;
  });
}
