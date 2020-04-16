# preact-app

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and preact-render-spy 
npm run test
```

## Sass Usage

When you run `npm run dev` or `npm run serve`, the "typed-scss-module" library will automatically watch 
your stylesheets with the `.scss` extension and generate the appropriate declarations files for them.
However, a declarations file will only be generated when the stylesheet contains at least one
class-based or id-based declaration block with valid declarations as the block content.

When you run `npm run build`, the "typed-scss-module" library will run one more time to ensure that 
all `.scss` stylesheets have appropriate declaration files before production build.

You may also run `npx tsm src` in the root directory of the project to manually generate declaration 
files without watching the stylesheets. Use `npx tsm src -w` to watch the stylesheets manually.


For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).