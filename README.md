# vue-webpack-multi-page-template
A template to make setting up simple Vue Webpack projects easier when using multiple entry points.

## Optional: Add linting

When initializing eslint I would strongly recommend adding Vue support. (The example code included should also have JavaScript modules support.)

```
npm install eslint --save-dev
```

```
npx eslint --init
```

Add the following to your package.json

```
"lint": "eslint --ignore-path .gitignore --ext js,vue --fix ."
```