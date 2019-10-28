/**
 * @fileoverview Makes a commit after the fix has been made.
 * @module tasks/make-post-fix-commit
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  const { sync } = require('cross-spawn');
  const repomap = require('../repomap.json');

  const opts = { stdio: 'inherit' };

  // Add the sample JavaScript sources.
  repomap.jsSampleSrcs.map((path) => {
    return sync('git', ['add', path], opts);
  });

  // Add the sample Markdown sources.
  repomap.mdSampleSrcs.map((path) => {
    return sync('git', ['add', path], opts);
  });

  sync('git', ['commit',
               '-m', 'chore: Post-fix commit'], opts);
})();
