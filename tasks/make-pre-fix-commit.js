/**
 * @fileoverview Makes a commit before the fix has been made.
 * @module tasks/make-pre-fix-commit
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  const { sync } = require('cross-spawn');
  const repomap = require('../repomap.json');

  const opts = { stdio: 'inherit' };

  // Untrack all files.
  sync('git', ['rm',
               '--cached',
               '-rf', '.'],
       opts);

  // Re-add the local infrastructure.
  repomap.localInfra.map((path) => {
    return sync('git', ['add', path.substr(1)], opts);
  });

  // Re-add the sample JavaScript sources.
  repomap.jsSampleSrcs.map((path) => {
    return sync('git', ['add', path], opts);
  });

  // Re-add the sample Markdown sources.
  repomap.mdSampleSrcs.map((path) => {
    return sync('git', ['add', path], opts);
  });

  // Make the pre-fix commit.
  sync('git', ['commit',
               '-m', 'chore: Pre-fix commit'], opts);
})();
