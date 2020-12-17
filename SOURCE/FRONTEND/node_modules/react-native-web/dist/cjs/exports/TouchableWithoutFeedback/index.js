/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

exports.__esModule = true;
exports.default = void 0;

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _ensurePositiveDelayProps = _interopRequireDefault(require("../Touchable/ensurePositiveDelayProps"));

var React = _interopRequireWildcard(require("react"));

var _Touchable = _interopRequireDefault(require("../Touchable"));

var _View = _interopRequireDefault(require("../View"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PRESS_RETENTION_OFFSET = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 30
};
var OVERRIDE_PROPS = ['accessibilityLabel', 'accessibilityHint', 'accessibilityIgnoresInvertColors', 'accessibilityRole', 'accessibilityState', 'hitSlop', 'nativeID', 'onBlur', 'onFocus', 'onLayout', 'testID'];

/**
 * Do not use unless you have a very good reason. All elements that
 * respond to press should have a visual feedback when touched.
 *
 * TouchableWithoutFeedback supports only one child.
 * If you wish to have several child components, wrap them in a View.
 */
// eslint-disable-next-line react/prefer-es6-class
var TouchableWithoutFeedback = (0, _createReactClass.default)({
  displayName: 'TouchableWithoutFeedback',
  mixins: [_Touchable.default.Mixin],
  getInitialState: function getInitialState() {
    return this.touchableGetInitialState();
  },
  componentDidMount: function componentDidMount() {
    (0, _ensurePositiveDelayProps.default)(this.props);
  },
  UNSAFE_componentWillReceiveProps: function UNSAFE_componentWillReceiveProps(nextProps) {
    (0, _ensurePositiveDelayProps.default)(nextProps);
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandlePress: function touchableHandlePress(e) {
    this.props.onPress && this.props.onPress(e);
  },
  touchableHandleActivePressIn: function touchableHandleActivePressIn(e) {
    this.props.onPressIn && this.props.onPressIn(e);
  },
  touchableHandleActivePressOut: function touchableHandleActivePressOut(e) {
    this.props.onPressOut && this.props.onPressOut(e);
  },
  touchableHandleLongPress: function touchableHandleLongPress(e) {
    this.props.onLongPress && this.props.onLongPress(e);
  },
  touchableGetPressRectOffset: function touchableGetPressRectOffset() {
    // $FlowFixMe Invalid prop usage
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },
  touchableGetHitSlop: function touchableGetHitSlop() {
    return this.props.hitSlop;
  },
  touchableGetHighlightDelayMS: function touchableGetHighlightDelayMS() {
    return this.props.delayPressIn || 0;
  },
  touchableGetLongPressDelayMS: function touchableGetLongPressDelayMS() {
    return this.props.delayLongPress === 0 ? 0 : this.props.delayLongPress || 500;
  },
  touchableGetPressOutDelayMS: function touchableGetPressOutDelayMS() {
    return this.props.delayPressOut || 0;
  },
  render: function render() {
    // Note(avik): remove dynamic typecast once Flow has been upgraded
    // $FlowFixMe(>=0.41.0)
    // eslint-disable-next-line
    var child = React.Children.only(this.props.children);
    var children = child.props.children;

    if (_Touchable.default.TOUCH_TARGET_DEBUG && child.type === _View.default) {
      children = React.Children.toArray(children);
      children.push(_Touchable.default.renderDebugView({
        color: 'red',
        hitSlop: this.props.hitSlop
      }));
    }

    var overrides = {};

    for (var _iterator = OVERRIDE_PROPS, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var prop = _ref;

      if (this.props[prop] !== undefined) {
        overrides[prop] = this.props[prop];
      }
    }

    return React.cloneElement(child, _objectSpread({}, overrides, {
      accessible: this.props.accessible !== false,
      //clickable:
      //  this.props.clickable !== false && this.props.onPress !== undefined,
      //onClick: this.touchableHandlePress,
      onKeyDown: this.touchableHandleKeyEvent,
      onKeyUp: this.touchableHandleKeyEvent,
      onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
      onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
      onResponderGrant: this.touchableHandleResponderGrant,
      onResponderMove: this.touchableHandleResponderMove,
      onResponderRelease: this.touchableHandleResponderRelease,
      onResponderTerminate: this.touchableHandleResponderTerminate,
      children: children
    }));
  }
});
var _default = TouchableWithoutFeedback;
exports.default = _default;
module.exports = exports.default;