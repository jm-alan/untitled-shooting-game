import eslint from "@eslint/js";
import tslint from "typescript-eslint";
import { dirname } from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";

const baseDirectory = dirname(fileURLToPath(import.meta.url));

const eslintShouldHaveDoneMoreToSupportThisFuckingChange = new FlatCompat({
  baseDirectory,
});

export default tslint.config(
  eslint.configs.recommended,
  tslint.configs.recommended,
  eslintShouldHaveDoneMoreToSupportThisFuckingChange.extends(
    "plugin:eslint-plugin-react/all",
    "plugin:eslint-plugin-react-hooks/recommended",
    "plugin:@react-three/recommended",
  ),
  {
    rules: {
      "react/no-unknown-property": "off",
      "react/no-array-index-key": "off",
      "react/jsx-indent": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-indent-props": "off",
      "react/jsx-newline": "off",
      "react/forbid-component-props": "off",
      "react/jsx-sort-props": "off",
      "react/jsx-no-bind": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-no-literals": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/hook-use-state": "off",
      "react/jsx-max-depth": "off",
      "react/jsx-props-no-spreading": "off",
      "react/sort-default-props": "off",
      "react/jsx-curly-newline": "off",
      "react/require-default-props": "off",
      "react/jsx-child-element-spacing": "off",
      "react-hooks/exhaustive-deps": [
        "error",
        {
          additionalHooks: "useCoords",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
);
