import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  {
    files: ["babel.config.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    files: ["*.test.js", "src/*.test.js"],
    env: {
      jest: true,
    },
  },
];
