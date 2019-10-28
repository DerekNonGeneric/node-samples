/**
 * @fileoverview Opening gambit provisions project & runs check roulette.
 *     Subsequent checks: `npm test`.
 * @module tasks/bootstrap
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  console.log('Fetching upstream Node.js dependencies...');
  require('./make-sparse-checkout');

  console.log('Preparing the Node.js core linters...');
  require('./prepare-node-core-linters');

  console.log('Running source check roulette...');
  require('./run-check-roulette');
})();
