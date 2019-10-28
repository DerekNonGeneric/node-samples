/**
 * @fileoverview Runs the source check roulette — all check suites.
 * @module tasks/run-check-roulette
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  console.log("Linting sample's Markdown sources...");
  require('./lint-md-sources');

  console.log("Linting sample's JavaScript sources...");
  require('./lint-js-sources');

  console.log("Typechecking sample's JavaScript sources...");
  require('./typecheck-sources');
})();
