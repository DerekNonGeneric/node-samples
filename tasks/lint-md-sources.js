/**
 * @fileoverview Lints the sample's Markdown sources.
 * @module tasks/lint-md-sources
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  const { mdSampleSrcs } = require('../repomap.json');
  const { spawn } = require('cross-spawn');

  const opts = { stdio: 'inherit' };

  spawn('node', ['tools/lint-md.js',
                 '-q', '-f', '--no-stdout', ...mdSampleSrcs], opts);
})();
