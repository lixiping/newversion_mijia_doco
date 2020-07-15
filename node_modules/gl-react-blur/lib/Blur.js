"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Blur1D = require("./Blur1D");

var _Blur1D2 = _interopRequireDefault(_Blur1D);

var _directionForPassDefault = require("./directionForPassDefault");

var _directionForPassDefault2 = _interopRequireDefault(_directionForPassDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Blur = function Blur(_ref) {
  var width = _ref.width,
      height = _ref.height,
      pixelRatio = _ref.pixelRatio,
      factor = _ref.factor,
      children = _ref.children,
      passes = _ref.passes,
      directionForPass = _ref.directionForPass;

  var rec = function rec(pass) {
    return pass <= 0 ? children : _react2.default.createElement(
      _Blur1D2.default,
      {
        width: width,
        height: height,
        pixelRatio: pixelRatio,
        direction: directionForPass(pass, factor, passes)
      },
      rec(pass - 1)
    );
  };
  return rec(passes);
};

Blur.defaultProps = {
  passes: 2,
  directionForPass: _directionForPassDefault2.default
};

Blur.propTypes = {
  factor: _propTypes2.default.number.isRequired,
  children: _propTypes2.default.any.isRequired,
  passes: _propTypes2.default.number,
  directionForPass: _propTypes2.default.func,
  width: _propTypes2.default.any,
  height: _propTypes2.default.any,
  pixelRatio: _propTypes2.default.number
};

exports.default = Blur;
//# sourceMappingURL=Blur.js.map