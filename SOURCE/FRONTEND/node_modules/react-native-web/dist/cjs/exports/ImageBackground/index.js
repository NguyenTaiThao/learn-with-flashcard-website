"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ensureComponentIsNative = _interopRequireDefault(require("../../modules/ensureComponentIsNative"));

var _Image = _interopRequireDefault(require("../Image"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var emptyObject = {};
/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */

var ImageBackground =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ImageBackground, _React$Component);

  function ImageBackground() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._viewRef = null;

    _this._captureRef = function (ref) {
      _this._viewRef = ref;
    };

    return _this;
  }

  var _proto = ImageBackground.prototype;

  _proto.setNativeProps = function setNativeProps(props) {
    // Work-around flow
    var viewRef = this._viewRef;

    if (viewRef) {
      (0, _ensureComponentIsNative.default)(viewRef);
      viewRef.setNativeProps(props);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        _this$props$style = _this$props.style,
        style = _this$props$style === void 0 ? emptyObject : _this$props$style,
        imageStyle = _this$props.imageStyle,
        imageRef = _this$props.imageRef,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "style", "imageStyle", "imageRef"]);

    var _StyleSheet$flatten = _StyleSheet.default.flatten(style),
        height = _StyleSheet$flatten.height,
        width = _StyleSheet$flatten.width;

    return _react.default.createElement(_View.default, {
      ref: this._captureRef,
      style: style
    }, _react.default.createElement(_Image.default, _extends({}, props, {
      ref: imageRef,
      style: [_StyleSheet.default.absoluteFill, {
        // Temporary Workaround:
        // Current (imperfect yet) implementation of <Image> overwrites width and height styles
        // (which is not quite correct), and these styles conflict with explicitly set styles
        // of <ImageBackground> and with our internal layout model here.
        // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
        // This workaround should be removed after implementing proper support of
        // intrinsic content size of the <Image>.
        width: width,
        height: height,
        zIndex: -1
      }, imageStyle]
    })), children);
  };

  return ImageBackground;
}(_react.default.Component);

var _default = ImageBackground;
exports.default = _default;
module.exports = exports.default;