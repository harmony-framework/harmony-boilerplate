

## Development Guidelines & Code Guards

The rules that being used in this boilerplate will cover most of the common human-mistakes while coding.

For example, passing all the props down-stream to child components its not allowed, this rule will improve the performance of your website since you make sure that your component will be rendered only with the required props.

```json

"rules": {
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
    "react/sort-comp": ["off"],
    "react/prefer-stateless-function": ["off"],
    "import/no-named-as-default": ["off"],
    "arrow-body-style": ["off"],
    "import/order": ["off"],
    "func-names": ["off"],
    "guard-for-in": ["off"],
    "lines-between-class-members": ["off"],
    "import/prefer-default-export": "off",
    "import/no-default-export": "off",
    "react/jsx-one-expression-per-line": ["off"],
    "class-methods-use-this": ["off"],
    "max-len": ["error", { "code": 120 }],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "no-trailing-spaces": ["error", { "skipBlankLines": true, "ignoreComments": true }],
    "react/jsx-props-no-spreadings": ["off"],
    "linebreak-style": 0,
    "global-require": 0,
    "eslint-linebreak-style": [0, "error", "windows"],
    "indent": ["error", "tab", { "SwitchCase": 1 }],
    "no-tabs": ["error", { "allowIndentationTabs": true }],
    "react/jsx-indent-props": ["error", "tab"],
    "react/jsx-indent": ["error", "tab"],
    "@typescript-eslint/indent": ["error", "tab"],
    "comma-dangle": ["error", "only-multiline"],
    "no-console": 1
  }

```