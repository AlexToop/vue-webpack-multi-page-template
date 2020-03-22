# vue-webpack-multi-page-template
A template to make setting up simple Vue Webpack projects easier when using multiple entry points.

## Adding linting

When initializing eslint I would strongly recommend adding Vue support.

```
npm install eslint --save-dev
```

```
npx eslint --init
```

Add the following to your package.json

```
"lint": "eslint src/**/*.js src/**/*.vue --fix"
```