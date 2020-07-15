"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BlurV1D = require("./BlurV1D");

var _BlurV1D2 = _interopRequireDefault(_BlurV1D);

var _directionForPassDefault = require("./directionForPassDefault");

var _directionForPassDefault2 = _interopRequireDefault(_directionForPassDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlurV = function BlurV(_ref) {
  var width = _ref.width,
      height = _ref.height,
      map = _ref.map,
      pixelRatio = _ref.pixelRatio,
      factor = _ref.factor,
      children = _ref.children,
      passes = _ref.passes,
      directionForPass = _ref.directionForPass;

  var rec = function rec(pass) {
    return pass <= 0 ? children : _react2.default.createElement(
      _BlurV1D2.default,
      {
        width: width,
        height: height,
        map: map,
        pixelRatio: pixelRatio,
        direction: directionForPass(pass, factor, passes)
      },
      rec(pass - 1)
    );
  };
  return rec(passes);
};

BlurV.defaultProps = {
  passes: 2,
  directionForPass: _directionForPassDefault2.default
};

BlurV.propTypes = {
  factor: _propTypes2.default.number.isRequired,
  children: _propTypes2.default.any.isRequired,
  passes: _propTypes2.default.number,
  directionForPass: _propTypes2.default.func,
  map: _propTypes2.default.any.isRequired,
  width: _propTypes2.default.any,
  height: _propTypes2.default.any,
  pixelRatio: _propTypes2.default.number
};

exports.default = BlurV;
//# sourceMappingURL=BlurV.js.map