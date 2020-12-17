"use strict";

exports.__esModule = true;
exports.default = void 0;

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _multiplyStyleLengthValue = _interopRequireDefault(require("../../modules/multiplyStyleLengthValue"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _UIManager = _interopRequireDefault(require("../UIManager"));

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var emptyObject = {};
var thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';
var thumbFocusedBoxShadow = thumbDefaultBoxShadow + ", 0 0 0 10px rgba(0,0,0,0.1)";

var Switch =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Switch, _React$Component);

  function Switch() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this._handleChange = function (event) {
      var onValueChange = _this.props.onValueChange;
      onValueChange && onValueChange(event.nativeEvent.target.checked);
    };

    _this._handleFocusState = function (event) {
      var isFocused = event.nativeEvent.type === 'focus';
      var boxShadow = isFocused ? thumbFocusedBoxShadow : thumbDefaultBoxShadow;

      if (_this._thumbElement) {
        _this._thumbElement.setNativeProps({
          style: {
            boxShadow: boxShadow
          }
        });
      }
    };

    _this._setCheckboxRef = function (element) {
      _this._checkboxElement = element;
    };

    _this._setThumbRef = function (element) {
      _this._thumbElement = element;
    };

    return _this;
  }

  var _proto = Switch.prototype;

  _proto.blur = function blur() {
    _UIManager.default.blur(this._checkboxElement);
  };

  _proto.focus = function focus() {
    _UIManager.default.focus(this._checkboxElement);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        accessibilityLabel = _this$props.accessibilityLabel,
        _this$props$activeThu = _this$props.activeThumbColor,
        activeThumbColor = _this$props$activeThu === void 0 ? '#009688' : _this$props$activeThu,
        _this$props$activeTra = _this$props.activeTrackColor,
        activeTrackColor = _this$props$activeTra === void 0 ? '#A3D3CF' : _this$props$activeTra,
        _this$props$disabled = _this$props.disabled,
        disabled = _this$props$disabled === void 0 ? false : _this$props$disabled,
        onValueChange = _this$props.onValueChange,
        _this$props$style = _this$props.style,
        style = _this$props$style === void 0 ? emptyObject : _this$props$style,
        _this$props$thumbColo = _this$props.thumbColor,
        thumbColor = _this$props$thumbColo === void 0 ? '#FAFAFA' : _this$props$thumbColo,
        _this$props$trackColo = _this$props.trackColor,
        trackColor = _this$props$trackColo === void 0 ? '#939393' : _this$props$trackColo,
        _this$props$value = _this$props.value,
        value = _this$props$value === void 0 ? false : _this$props$value,
        other = _objectWithoutPropertiesLoose(_this$props, ["accessibilityLabel", "activeThumbColor", "activeTrackColor", "disabled", "onValueChange", "style", "thumbColor", "trackColor", "value"]);

    var _StyleSheet$flatten = _StyleSheet.default.flatten(style),
        styleHeight = _StyleSheet$flatten.height,
        styleWidth = _StyleSheet$flatten.width;

    var height = styleHeight || 20;
    var minWidth = (0, _multiplyStyleLengthValue.default)(height, 2);
    var width = styleWidth > minWidth ? styleWidth : minWidth;
    var trackBorderRadius = (0, _multiplyStyleLengthValue.default)(height, 0.5);
    var trackCurrentColor = value ? trackColor != null && typeof trackColor === 'object' && trackColor.true || activeTrackColor : trackColor != null && typeof trackColor === 'object' && trackColor.false || trackColor;
    var thumbCurrentColor = value ? activeThumbColor : thumbColor;
    var thumbHeight = height;
    var thumbWidth = thumbHeight;
    var rootStyle = [styles.root, style, disabled && styles.cursorDefault, {
      height: height,
      width: width
    }];
    var trackStyle = [styles.track, {
      backgroundColor: disabled ? '#D5D5D5' : trackCurrentColor,
      borderRadius: trackBorderRadius
    }];
    var thumbStyle = [styles.thumb, value && styles.thumbActive, {
      backgroundColor: disabled ? '#BDBDBD' : thumbCurrentColor,
      height: thumbHeight,
      marginStart: value ? (0, _multiplyStyleLengthValue.default)(thumbWidth, -1) : 0,
      width: thumbWidth
    }];
    var nativeControl = (0, _createElement.default)('input', {
      accessibilityLabel: accessibilityLabel,
      checked: value,
      disabled: disabled,
      onBlur: this._handleFocusState,
      onChange: this._handleChange,
      onFocus: this._handleFocusState,
      ref: this._setCheckboxRef,
      style: [styles.nativeControl, styles.cursorInherit],
      type: 'checkbox'
    });
    return _react.default.createElement(_View.default, _extends({}, other, {
      style: rootStyle
    }), _react.default.createElement(_View.default, {
      style: trackStyle
    }), _react.default.createElement(_View.default, {
      ref: this._setThumbRef,
      style: thumbStyle
    }), nativeControl);
  };

  return Switch;
}(_react.default.Component);

Switch.displayName = 'Switch';

var styles = _StyleSheet.default.create({
  root: {
    cursor: 'pointer',
    userSelect: 'none'
  },
  cursorDefault: {
    cursor: 'default'
  },
  cursorInherit: {
    cursor: 'inherit'
  },
  track: _objectSpread({}, _StyleSheet.default.absoluteFillObject, {
    height: '70%',
    margin: 'auto',
    transitionDuration: '0.1s',
    width: '100%'
  }),
  thumb: {
    alignSelf: 'flex-start',
    borderRadius: '100%',
    boxShadow: thumbDefaultBoxShadow,
    start: '0%',
    transform: [{
      translateZ: 0
    }],
    transitionDuration: '0.1s'
  },
  thumbActive: {
    start: '100%'
  },
  nativeControl: _objectSpread({}, _StyleSheet.default.absoluteFillObject, {
    height: '100%',
    margin: 0,
    opacity: 0,
    padding: 0,
    width: '100%'
  })
});

var _default = (0, _applyNativeMethods.default)(Switch);

exports.default = _default;
module.exports = exports.default;