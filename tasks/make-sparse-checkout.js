/**
 * @fileoverview Makes a sparse checkout of the Node.js core repo.
 * @module tasks/make-sparse-checkout
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  const { sync } = require('cross-spawn');
  const { echo } = require('shelljs');
  const repomap = require('../repomap.json');

  let checkoutList = [];
  const opts = { stdio: 'inherit' };

  // Add the Node.js core repo remote.
  console.log('Adding the `node-core` remote...');
  sync('git', ['remote', 'add',
               '--track', 'master',
               '--master', 'master',
               '--no-tags', 'node-core', 'https://github.com/nodejs/node.git'],
       opts);

  // Enable sparse checkout (allows pulling in key files from other repos).
  console.log('Locally enabling sparse checkout...');
  sync('git', ['config',
               '--local', 'core.sparseCheckout', 'true'],
       opts);

  // Fetch the Node.js core repo's master branch.
  // WARNING: this step is slow, blame GitHub for not supporting partial clone!
  console.log('Fetching the Node core master branch...');
  sync('git', ['fetch',
               '--no-tags', '--prune', '--depth=1', 'node-core', 'master'],
       opts);

  // Add the dependencies specified in the repomap to the checkout list.
  checkoutList = [
    ...repomap.jsSampleSrcs,
    ...repomap.mdSampleSrcs,
    ...repomap.upstreamInfra,
    ...repomap.localInfra // If not included, it disappears during merge!
  ];
  // eslint-disable-next-line quotes
  echo(checkoutList.join("\n")).to('.git/info/sparse-checkout');

  // Finally, make a sparse merge of the repo's master branch.
  sync('git', ['merge',
               '--allow-unrelated-histories', '--no-commit', '--progress',
               '--strategy', 'recursive', '-X', 'ours', 'node-core/master'],
       opts);
})();
