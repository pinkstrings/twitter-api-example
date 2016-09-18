#!/usr/bin/env node
/* eslint-disable */
require('../babelify'); // babel registration (runtime transpilation for node)

// Define isomorphic constants
global.__CLIENT__ = false;
global.__SERVER__ = true;

require('../src/server');
