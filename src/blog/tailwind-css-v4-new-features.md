---
title: What's New in Tailwind CSS v4
description: Explore the exciting new features in Tailwind CSS v4, including the @theme system, native CSS variables, and improved performance.
date: 2025-01-10
author: jane-smith
slug: tailwind-css-v4-new-features
image: /assets/images/pexels-nietjuhart-2820144.jpg
image_alt: Abstract colorful design
tags:
  - css
  - tailwind
---

Tailwind CSS v4 brings a major overhaul to how we write and customize our styles. Let's explore the key changes.

## The New @theme System

Gone is the `tailwind.config.js` file. In v4, you define your theme directly in CSS using the `@theme` directive:

```css
@theme {
  --color-primary-500: oklch(0.768 0.233 130.85);
  --font-sans: "Inter", sans-serif;
}
```

This approach has several advantages:

- **Native CSS variables** - your theme values are real CSS custom properties
- **Better IDE support** - CSS tooling just works
- **Simpler configuration** - no JavaScript, just CSS

## The @utility Directive

Creating custom utilities is now done with `@utility`:

```css
@utility card {
  @apply bg-white rounded-xl shadow-sm p-6;
}
```

This creates a utility class that behaves just like built-in Tailwind classes.

## Custom Variants

Need a custom variant? Use `@custom-variant`:

```css
@custom-variant hc (&:where(.high-contrast, .high-contrast *));
```

Now you can use `hc:text-black` to apply styles only in high contrast mode.

## Performance Improvements

Tailwind v4 is significantly faster:

- **4x faster** in development
- **Smaller output** with improved dead code elimination
- **Better caching** for incremental builds

## Migration Tips

If you're coming from v3:

1. Move theme values from `tailwind.config.js` to `@theme` in CSS
2. Update custom plugins to use `@utility` syntax
3. Review deprecated utilities
4. Test thoroughly - some defaults have changed

The future of Tailwind is CSS-native, and v4 is a huge step in that direction.
