"use strict";

exports.__esModule = true;
exports.default = void 0;

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var createSvgCircle = function createSvgCircle(style) {
  return _react.default.createElement("circle", {
    cx: "16",
    cy: "16",
    fill: "none",
    r: "14",
    strokeWidth: "4",
    style: style
  });
};

var ActivityIndicator =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ActivityIndicator, _React$Component);

  function ActivityIndicator() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ActivityIndicator.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$animating = _this$props.animating,
        animating = _this$props$animating === void 0 ? true : _this$props$animating,
        _this$props$color = _this$props.color,
        color = _this$props$color === void 0 ? '#1976D2' : _this$props$color,
        _this$props$hidesWhen = _this$props.hidesWhenStopped,
        hidesWhenStopped = _this$props$hidesWhen === void 0 ? true : _this$props$hidesWhen,
        _this$props$size = _this$props.size,
        size = _this$props$size === void 0 ? 'small' : _this$props$size,
        style = _this$props.style,
        other = _objectWithoutPropertiesLoose(_this$props, ["animating", "color", "hidesWhenStopped", "size", "style"]);

    var svg = _react.default.createElement("svg", {
      height: "100%",
      viewBox: "0 0 32 32",
      width: "100%"
    }, createSvgCircle({
      stroke: color,
      opacity: 0.2
    }), createSvgCircle({
      stroke: color,
      strokeDasharray: 80,
      strokeDashoffset: 60
    }));

    return _react.default.createElement(_View.default, _extends({}, other, {
      accessibilityRole: "progressbar",
      "aria-valuemax": "1",
      "aria-valuemin": "0",
      style: [styles.container, style]
    }), _react.default.createElement(_View.default, {
      children: svg,
      style: [typeof size === 'number' ? {
        height: size,
        width: size
      } : indicatorSizes[size], styles.animation, !animating && styles.animationPause, !animating && hidesWhenStopped && styles.hidesWhenStopped]
    }));
  };

  return ActivityIndicator;
}(_react.default.Component);

ActivityIndicator.displayName = 'ActivityIndicator';

var styles = _StyleSheet.default.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  hidesWhenStopped: {
    visibility: 'hidden'
  },
  animation: {
    animationDuration: '0.75s',
    animationKeyframes: [{
      '0%': {
        transform: [{
          rotate: '0deg'
        }]
      },
      '100%': {
        transform: [{
          rotate: '360deg'
        }]
      }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  animationPause: {
    animationPlayState: 'paused'
  }
});

var indicatorSizes = _StyleSheet.default.create({
  small: {
    width: 20,
    height: 20
  },
  large: {
    width: 36,
    height: 36
  }
});

var _default = (0, _applyNativeMethods.default)(ActivityIndicator);

exports.default = _default;
module.exports = exports.default;