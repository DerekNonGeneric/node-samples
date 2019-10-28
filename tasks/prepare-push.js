/**
 * @fileoverview Prepares the branch before pushing pre and post-fix commits.
 * @module tasks/prepare-push
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  const { sync } = require('cross-spawn');

  const opts = { stdio: 'inherit' };

  // Unshallow the node-core remote (necessary due to GitHub limitations).
  console.log('Unshallowing the `node-core` remote...');
  sync('git', ['fetch',
               '--unshallow', 'node-core'],
       opts);
})();
