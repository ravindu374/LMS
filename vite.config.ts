import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Emits <link rel="preconnect"> for the API origin (Render) so the browser
 * has DNS + TLS ready before the first request fires. Render's free tier
 * already costs a cold start; this saves the handshake on top of it.
 */
function preconnectApi(apiUrl: string): Plugin {
  return {
    name: "preconnect-api",
    transformIndexHtml() {
      if (!apiUrl) return [];

      let origin: string;
      try {
        origin = new URL(apiUrl).origin;
      } catch {
        return []; // relative or malformed URL - nothing to preconnect to
      }

      return [
        {
          tag: "link",
          attrs: { rel: "preconnect", href: origin, crossorigin: "" },
          // Not head-prepend: keeps <meta charset> as the first tag in head.
          injectTo: "head" as const,
        },
        {
          tag: "link",
          attrs: { rel: "dns-prefetch", href: origin },
          // Not head-prepend: keeps <meta charset> as the first tag in head.
          injectTo: "head" as const,
        },
      ];
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [
      react(),
      tailwindcss(),
      preconnectApi(env.VITE_API_URL ?? ""),
    ],

    build: {
      // Vercel serves over HTTP/2, so many small cached chunks beat one big one.
      rollupOptions: {
        output: {
          advancedChunks: {
            groups: [
              {
                // Changes rarely -> stays in the browser cache across deploys.
                name: "react-vendor",
                test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
              },
              {
                name: "chart-vendor",
                test: /[\\/]node_modules[\\/](recharts|d3-.*|victory-.*|decimal\.js-light|internmap|eventemitter3)[\\/]/,
              },
            ],
          },
        },
      },

      // Route chunks are small; warn only if something genuinely bloats.
      chunkSizeWarningLimit: 300,

      // Inline anything under 8kb as a data URI (saves a request).
      assetsInlineLimit: 8192,
    },

    // Warm the deps the first dev page load needs.
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "axios",
      ],
    },
  };
});
