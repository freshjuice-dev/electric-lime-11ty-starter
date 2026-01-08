---
title: Modern CSS Techniques You Should Know
description: Explore powerful CSS features that have landed in browsers recently - from container queries to cascade layers.
date: 2024-12-28
author: john-doe
slug: modern-css-techniques
image: /assets/images/pexels-wendyaffieplaas-1178610.jpg
image_alt: Abstract geometric shapes
tags:
  - css
  - web-development
---

CSS has evolved dramatically in recent years. Let's explore some game-changing features now available in all modern browsers.

## Container Queries

Finally! Style elements based on their container size, not just the viewport.

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}
```

## Cascade Layers

Take control of specificity with `@layer`:

```css
@layer reset, base, components, utilities;

@layer components {
  .button {
    background: blue;
  }
}

@layer utilities {
  .bg-red {
    background: red; /* Always wins over components */
  }
}
```

## :has() Selector

The "parent selector" we've always wanted:

```css
/* Style a card that contains an image */
.card:has(img) {
  padding-top: 0;
}

/* Style labels for required inputs */
label:has(+ input:required) {
  font-weight: bold;
}
```

## Subgrid

Nested grids that align with their parent:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.grid-item {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
```

## Color Functions

Modern color manipulation:

```css
.element {
  /* Relative color syntax */
  background: oklch(from var(--primary) l c h / 50%);

  /* Color mixing */
  border-color: color-mix(in oklch, var(--primary) 70%, black);
}
```

## Scroll-Driven Animations

Animate elements based on scroll position:

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fade-in linear;
  animation-timeline: view();
}
```

The future of CSS is here, and it's more powerful than ever!
