/**
 * @fileoverview Typecheck sample's sources w/ TypeScript & Closure compilers.
 * @module tasks/typecheck-sources
 * @author Derek Lewis
 */

'use strict';

module.exports = (() => {
  const { basename, join, resolve } = require('path');
  const { cp } = require('shelljs');
  const { jsSampleSrcs } = require('../repomap.json');
  const { spawn } = require('cross-spawn');
  const projectRootDir = resolve('.');
  const tmpSrcDir = require('tempy').directory();

  const compilerOpts = {
    clFlags: [ // Closure compiler CLI args.
      '--compilation_level=ADVANCED_OPTIMIZATIONS',
      '--warning_level=VERBOSE',
      '--checks_only',
      '--jscomp_error=strictCheckTypes',  // Our main concern.
      '--jscomp_off=moduleLoad',          // Closure won't resolve the builtins.
      '--jscomp_off=undefinedVars',       // ESLint performs this check anyways.
      '--externs=externs/node.extern.js', // Annotated symbols w/o implemention.
      '--language_out=ECMASCRIPT_NEXT',   // No emissions, yet required.
      '--module_resolution=node',
      '--process_common_js_modules',
    ],
    tsFlags: [ // TypeScript compiler CLI args.
      '--allowJs',
      '--checkJs',
      '--noEmit',
      '--strict',
      '--module', 'esnext',
      '--moduleResolution', 'node',
      '--allowSyntheticDefaultImports',
    ],
    clSrcPathArgs: jsSampleSrcs.map((path) => {
      return '--js=' + path;
    }),
    tsSrcPathArgs: jsSampleSrcs.map((srcPath) => {
      let srcBaseName = basename(srcPath);

      if (/\.mjs$/.test(srcBaseName))
        srcBaseName = srcBaseName.replace('.mjs', '.js');

      const tmpSrcPath = resolve(tmpSrcDir, srcBaseName);
      cp(join(projectRootDir, srcPath), tmpSrcPath);

      return tmpSrcPath;
    }),
  };

  spawn('npx', ['tsc',
                ...compilerOpts.tsFlags, ...compilerOpts.tsSrcPathArgs],
        { stdio: 'inherit' });
  spawn('npx', ['google-closure-compiler',
                ...compilerOpts.clFlags, ...compilerOpts.clSrcPathArgs],
        { stdio: 'inherit' });
})();
