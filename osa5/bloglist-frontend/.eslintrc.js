/* eslint-disable linebreak-style */

module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest/globals": true,
  },
  "globals": {
    "window": true,
    "module": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  "ignorePatterns": ["dist", ".eslintrc.cjs"],
  "parserOptions": { "ecmaVersion": "latest", "sourceType": "module" },
  "settings": { "react": { "version": "18.2" } },
  "plugins": ["react-refresh", "jest"],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": 0

  }
}
