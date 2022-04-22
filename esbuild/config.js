import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import autoprefixer from "autoprefixer";
import browserslist from "browserslist";
import cssnano from "cssnano";
import { resolveToEsbuildTarget } from "esbuild-plugin-browserslist";
import { clean } from "esbuild-plugin-clean";
import { copy } from "esbuild-plugin-copy";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import { optimize as optimizeSVG } from "svgo";
import tailwindcss from "tailwindcss";

const target = resolveToEsbuildTarget(browserslist("defaults"), {
  printUnknownTargets: false,
});

const DESTINATION_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "dist",
);

/**
 * @returns {import('esbuild').Plugin}
 */
function postCSS() {
  return {
    name: "plugin-postcss",
    setup(build) {
      /** @type {import('postcss').AcceptedPlugin[]} */
      const postcssPlugins = [tailwindcss(), autoprefixer()];
      if (build.initialOptions.minify)
        postcssPlugins.push(
          cssnano({
            preset: [
              "default",
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          }),
        );
      const processor = postcss(postcssPlugins);

      build.onLoad({ filter: /\.css$/i }, async ({ path }) => {
        const content = await readFile(path, { encoding: "utf-8" });
        const result = await processor.process(content, { from: path });

        return {
          contents: result.toString(),
          loader: "css",
        };
      });
    },
  };
}

/**
 * @returns {import('esbuild').Plugin}
 */
function svgo() {
  return {
    name: "svgo",
    setup(build) {
      if (!build.initialOptions.minify) return;

      build.onLoad({ filter: /\.svg$/i }, async ({ path }) => {
        const raw = await readFile(path, "utf-8");
        const result = optimizeSVG(raw);
        if ("data" in result)
          return { contents: result.data, loader: "dataurl" };
        throw new Error(result.error);
      });
    },
  };
}

export default /** @type {import('esbuild').BuildOptions} */ ({
  bundle: true,
  entryPoints: [
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "src",
      "main.tsx",
    ),
  ],
  outdir: DESTINATION_DIR,
  loader: { ".svg": "dataurl", ".png": "dataurl", ".woff2": "file" },
  logLevel: "info",
  plugins: [
    clean({
      patterns: [path.join(DESTINATION_DIR, "*.{js,css,map}")],
    }),
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
    }),
    NodeModulesPolyfillPlugin(),
    postCSS(),
    svgo(),
    copy({
      verbose: false,
      once: true,
      assets: {
        from: ["./src/static/*", "./semaphore/*"],
        to: ".",
      },
    }),
  ],
  sourcemap: true,
  format: "esm",
  splitting: true,
  target,
  define: { global: "window" },
});
