# vue-webpack-multi-page-template
A template to make setting up simple Vue Webpack projects easier when using multiple entry points.

## Adding linting

```
npm install eslint eslint-plugin-vue --save-dev
```

```
printf '%s\n' '{' '  "extends": [' '    "eslint:recommended",' '    "plugin:vue/base"' '  ]' '}' >.eslintrc.json
```

add npm script
```
"lint": "eslint src/**/*.js src/**/*.vue"
```