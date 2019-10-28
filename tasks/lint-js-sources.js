/**
 * @fileoverview Lints the sample's JavaScript sources.
 * @module tasks/lint-js-sources
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  const { jsSampleSrcs } = require('../repomap.json');
  const { spawn } = require('cross-spawn');

  const opts = { stdio: 'inherit' };

  spawn('node', ['tools/node_modules/eslint/bin/eslint.js',
                 '--no-ignore', '--cache',
                 '--report-unused-disable-directives',
                 ...jsSampleSrcs], opts);
})();
