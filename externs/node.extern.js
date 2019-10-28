/**
 * @fileoverview Externs for the Node builtins. 😉
 * @module externs/node.extern.js
 * @author Derek Lewis

 */

/* eslint-disable no-var */

'use strict';

/** @const */
var process = {};

/**
 * @return {string}
 * @nosideeffects
 */
process.cwd = function() {};

/** @const */
var path = {};

/**
 * @param {string} p
 * @return {string}
 * @nosideeffects
 */
path.extname;

/** @const */
var module = {};

/** @type {Array<string>} */
module.builtinModules;
