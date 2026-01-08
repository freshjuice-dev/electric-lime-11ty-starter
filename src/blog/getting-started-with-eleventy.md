---
title: Getting Started with Eleventy
description: Learn how to set up your first Eleventy project and understand the basics of this powerful static site generator.
date: 2025-01-15
author: john-doe
slug: getting-started-with-eleventy
image: /assets/images/pexels-pixabay-52536.jpg
image_alt: Code on a computer screen
tags:
  - tutorial
  - eleventy
---

Eleventy (or 11ty) is a simpler static site generator. It's zero-config by default but can be customized to fit your needs.

## Why Eleventy?

There are many static site generators out there, but Eleventy stands out for several reasons:

1. **Zero client-side JavaScript** by default
2. **Flexible templating** - supports multiple template languages
3. **Fast build times** - builds are measured in milliseconds
4. **Simple data cascade** - easy to understand data flow

## Getting Started

First, create a new directory and initialize a Node.js project:

```bash
mkdir my-site
cd my-site
npm init -y
npm install @11ty/eleventy
```

## Your First Page

Create an `index.md` file:

```markdown
# Hello World

Welcome to my site built with Eleventy!
```

Run the build:

```bash
npx eleventy --serve
```

That's it! You now have a working Eleventy site.

## Next Steps

- Explore different template languages
- Set up layouts for consistent styling
- Add data files for dynamic content
- Configure collections for blog posts
