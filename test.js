import path from "path";
import { build as viteBuild } from "vite";
import requireFromString from "require-from-string";
import { renderToString } from "react-dom/server";
import React from "react";

import { transformSync } from "@babel/core";

async function test() {
  const componentPath = "src/components/SEO.jsx";
  const resolvedComponentPath = path.join(process.cwd(), componentPath);

  const { output } = await viteBuild({
    root: process.cwd(),
    build: {
      ssr: true,
      write: false,
      rollupOptions: {
        input: resolvedComponentPath,
      },
    },
  });

  const transpiledCode = transformSync(output[0].code, {
    configFile: path.resolve(path.dirname("."), "babel.config.cjs"),
  }).code;

  // const { default: Component } = requireFromString(transpiledCode); // in case of default export
  const { SEO: Component } = requireFromString(transpiledCode);
  const html = renderToString(React.createElement(Component));
  console.log("Component: ", Component);
  console.log("html: ", html);
}

test();
