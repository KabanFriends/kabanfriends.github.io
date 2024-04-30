import { defineConfig } from 'astro/config';
import compress from "astro-compress";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://kabanfriends.github.io',
  integrations: [
    compress(),
    mdx(),
    sitemap({
      filter: (page) =>
        !page.startsWith("https://kabanfriends.github.io/skin") &&
        !page.startsWith("https://kabanfriends.github.io/test") &&
        !page.startsWith("https://kabanfriends.github.io/mildescape/escape")
    })
  ]
});