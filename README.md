# node-samples

Boilerplate for adding embedded samples in the Node.js docs.
Loosely based on [amp-samples](https://github.com/DerekNonGeneric/amp-samples).

## Features

* JSDoc type annotations checked w/ both the TypeScript & Closure compilers
* JavaScript & Markdown linted using the Node.js core ESLint & remark plugins
* Source files checked to conform w/ rules specified in the Node.js core repo

## Instructions

1. Fork this repository
2. Create a new branch for your documentation samples
3. Clone your forked repository and checkout your new branch
4. Add pre-existing sources from the Node.js core repo to the `repomap.json` file
5. Run `npm install` to bootstrap the project workspace & run initial checks
6. Correct failing lint/typechecks discovered when running `npm test`

**Warning**: Local files not added to `repomap.json` vanish while bootstrapping!

**Tip**: See branch `dummy-loader` for a demo.

P.S. PRs adding type annotations to the Node builtins extern file are welcome!
