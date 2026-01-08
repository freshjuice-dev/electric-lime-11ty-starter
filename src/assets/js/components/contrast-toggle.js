/**
 * Contrast Toggle Web Component
 * High contrast mode toggle with localStorage persistence
 */
class ContrastToggle extends HTMLElement {
  connectedCallback() {
    this.isHighContrast =
      localStorage.getItem("highContrast") === "true" ||
      (localStorage.getItem("highContrast") === null &&
        window.matchMedia("(prefers-contrast: more)").matches);

    // Create button
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.className =
      "inline-flex items-center gap-2 text-xs text-zinc-400 hc:text-zinc-900 hover:text-zinc-300 hc:hover:text-zinc-700 transition-colors cursor-pointer";
    this.button.setAttribute("aria-label", "Toggle high contrast mode");
    this.button.addEventListener("click", () => this.toggle());

    // Create toggle track
    this.track = document.createElement("span");
    this.track.className = "relative w-7 h-4 rounded-full transition-colors";

    // Create toggle thumb
    this.thumb = document.createElement("span");
    this.thumb.className =
      "absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform";

    // Create label
    this.label = document.createElement("span");
    this.label.textContent = "High Contrast";

    // Assemble
    this.track.appendChild(this.thumb);
    this.button.append(this.track, this.label);
    this.appendChild(this.button);

    this.updateState();
  }

  toggle() {
    this.isHighContrast = !this.isHighContrast;
    localStorage.setItem("highContrast", this.isHighContrast);
    document.documentElement.classList.toggle("high-contrast", this.isHighContrast);
    this.updateState();
  }

  updateState() {
    this.track.className = `relative w-7 h-4 rounded-full transition-colors ${
      this.isHighContrast ? "bg-primary-600" : "bg-zinc-700"
    }`;
    this.thumb.className = `absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${
      this.isHighContrast ? "translate-x-3" : ""
    }`;
    this.button.setAttribute("aria-pressed", this.isHighContrast);
  }
}

customElements.define("contrast-toggle", ContrastToggle);
