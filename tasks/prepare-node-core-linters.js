/**
 * @fileoverview Prepares Node core linters for project workspace use.
 * @module tasks/prepare-rollup-md-lint
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  const { sync } = require('cross-spawn');
  const { cp, sed } = require('shelljs');

  // Prepare Markdown linter.

  const opts = {
    stdio: 'inherit',
    cwd: 'tools/node-lint-md-cli-rollup',
  };

  sync('npm', ['install'], opts);
  sync('npm', ['run', 'build-node'], opts);

  // Prepare JavaScript linter.

  cp('node_modules/eslint-plugin-node-core/package.json',
     'tools/node_modules/eslint-plugin-node-core/'
  );

  sed('-i', 'module.exports.RULES_DIR',
      "path.resolve('tools', 'eslint-rules')",
      'tools/node_modules/eslint-plugin-node-core/index.js'
  );

  cp(
    'tools/node_modules/eslint-plugin-node-core/index.js',
    'node_modules/eslint-plugin-node-core/'
  );
})();
