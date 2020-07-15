"use strict";

var createComponent = require("./createComponent");
var createSurface = require("./createSurface");
var Node = require("./Node");
var Shaders = require("./Shaders");
var Uniform = require("./Uniform");
var runtime = require("./runtime");

var mod = {
  createComponent: createComponent,
  createSurface: createSurface,
  Node: Node,
  Shaders: Shaders,
  Uniform: Uniform,
  runtime: runtime
};

Object.defineProperty(mod, "GLSL", {
  enumerable: false,
  get: function get() {
    throw new Error("You are trying to use GLSL from gl-react v2 but this feature is only available in gl-react v3. Please upgrade gl-react OR downgrade any library that expect gl-react v3.");
  }
});

module.exports = mod;
//# sourceMappingURL=index.js.map