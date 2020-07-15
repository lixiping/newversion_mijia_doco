"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glReact = require("gl-react");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shaders = _glReact.Shaders.create({
  blur1D: {
    // blur9: from https://github.com/Jam3/glsl-fast-gaussian-blur
    frag: "precision highp float;\nvarying vec2 uv;\nuniform sampler2D t;\nuniform vec2 direction, resolution;\n\nvec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 off1 = vec2(1.3846153846) * direction;\n  vec2 off2 = vec2(3.2307692308) * direction;\n  color += texture2D(image, uv) * 0.2270270270;\n  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;\n  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;\n  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;\n  return color;\n}\n\nvoid main () {\n  gl_FragColor = blur9(t, uv, resolution, direction);\n}"
  }
});

var Blur1D = function Blur1D(_ref) {
  var width = _ref.width,
      height = _ref.height,
      pixelRatio = _ref.pixelRatio,
      direction = _ref.direction,
      t = _ref.children;
  return _react2.default.createElement(_glReact.Node, {
    shader: shaders.blur1D,
    width: width,
    height: height,
    pixelRatio: pixelRatio,
    uniforms: {
      direction: direction,
      resolution: _glReact.Uniform.Resolution,
      t: t
    }
  });
};

Blur1D.propTypes = {
  direction: _propTypes2.default.array.isRequired,
  children: _propTypes2.default.any.isRequired
};

exports.default = Blur1D;
//# sourceMappingURL=Blur1D.js.map