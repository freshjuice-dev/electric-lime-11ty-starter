/**
 * Electric Lime - Main JavaScript
 * Alpine.js setup with high contrast mode support
 */

import Alpine from "alpinejs";
import collapse from "@alpinejs/collapse";
import intersect from "@alpinejs/intersect";
import "lite-youtube-embed";
import "@zachleat/table-saw";
import "./components/contrast-toggle.js";

// Register Alpine plugins
Alpine.plugin(collapse);
Alpine.plugin(intersect);

// Make Alpine available globally
window.Alpine = Alpine;

/**
 * Accordion component
 */
Alpine.data("accordion", (initialOpen = null) => {
  return {
    openItem: initialOpen,

    toggle(index) {
      this.openItem = this.openItem === index ? null : index;
    },

    isOpen(index) {
      return this.openItem === index;
    },
  };
});

/**
 * Initialize range inputs (for Chrome/Safari progress fill)
 */
function initRangeInputs() {
  // Firefox has native ::-moz-range-progress, skip it
  if (navigator.userAgent.includes("Firefox")) return;

  const updateProgress = (input) => {
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const value = parseFloat(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, var(--color-primary-600) ${percent}%, var(--color-zinc-200) ${percent}%)`;
  };

  document.querySelectorAll('input[type="range"]').forEach((input) => {
    updateProgress(input);
    input.addEventListener("input", () => updateProgress(input));
  });
}

/**
 * DOM ready handler
 */
document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Add loaded class for CSS transitions
    document.body.classList.add("loaded");

    // Start Alpine
    Alpine.start();

    // Initialize range inputs
    initRangeInputs();

    // Electric Lime console branding
    console.log(
      "%c Electric Lime %c 11ty Starter ",
      "background: linear-gradient(135deg, #65a30d 0%, #4d7c0f 100%); color: white; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 8px 0 0 8px;",
      "background: #18181b; color: #65a30d; font-size: 16px; font-weight: bold; padding: 8px 12px; border-radius: 0 8px 8px 0;"
    );
    console.log(
      "%c Made with love by FreshJuice Team %c https://freshjuice.dev",
      "color: #71717a; font-size: 12px;",
      "color: #65a30d; font-size: 12px;"
    );
  },
  { once: true }
);
