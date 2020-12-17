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

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _ensurePositiveDelayProps = _interopRequireDefault(require("../Touchable/ensurePositiveDelayProps"));

var React = _interopRequireWildcard(require("react"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _Touchable = _interopRequireDefault(require("../Touchable"));

var _View = _interopRequireDefault(require("../View"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flattenStyle = _StyleSheet.default.flatten;
var PRESS_RETENTION_OFFSET = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 30
};

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 *
 * Opacity is controlled by wrapping the children in an Animated.View, which is
 * added to the view hiearchy.  Be aware that this can affect layout.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableOpacity onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton.png')}
 *       />
 *     </TouchableOpacity>
 *   );
 * },
 * ```
 * ### Example
 *
 * ```ReactNativeWebPlayer
 * import React, { Component } from 'react'
 * import {
 *   AppRegistry,
 *   StyleSheet,
 *   TouchableOpacity,
 *   Text,
 *   View,
 * } from 'react-native'
 *
 * class App extends Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = { count: 0 }
 *   }
 *
 *   onPress = () => {
 *     this.setState({
 *       count: this.state.count+1
 *     })
 *   }
 *
 *  render() {
 *    return (
 *      <View style={styles.container}>
 *        <TouchableOpacity
 *          style={styles.button}
 *          onPress={this.onPress}
 *        >
 *          <Text> Touch Here </Text>
 *        </TouchableOpacity>
 *        <View style={[styles.countContainer]}>
 *          <Text style={[styles.countText]}>
 *             { this.state.count !== 0 ? this.state.count: null}
 *           </Text>
 *         </View>
 *       </View>
 *     )
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     justifyContent: 'center',
 *     paddingHorizontal: 10
 *   },
 *   button: {
 *     alignItems: 'center',
 *     backgroundColor: '#DDDDDD',
 *     padding: 10
 *   },
 *   countContainer: {
 *     alignItems: 'center',
 *     padding: 10
 *   },
 *   countText: {
 *     color: '#FF00FF'
 *   }
 * })
 *
 * AppRegistry.registerComponent('App', () => App)
 * ```
 *
 */
// eslint-disable-next-line react/prefer-es6-class
var TouchableOpacity = (0, _createReactClass.default)({
  displayName: 'TouchableOpacity',
  mixins: [_Touchable.default.Mixin.withoutDefaultFocusAndBlur],
  getDefaultProps: function getDefaultProps() {
    return {
      activeOpacity: 0.2
    };
  },
  getInitialState: function getInitialState() {
    return _objectSpread({}, this.touchableGetInitialState(), {
      anim: this._getChildStyleOpacityWithDefault()
    });
  },
  componentDidMount: function componentDidMount() {
    (0, _ensurePositiveDelayProps.default)(this.props);
  },
  UNSAFE_componentWillReceiveProps: function UNSAFE_componentWillReceiveProps(nextProps) {
    (0, _ensurePositiveDelayProps.default)(nextProps);
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (this.props.disabled !== prevProps.disabled) {
      this._opacityInactive(250);
    }
  },

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo: function setOpacityTo(value, duration) {
    this.setNativeProps({
      style: {
        opacity: value,
        transitionDuration: duration ? duration / 1000 + "s" : '0s'
      }
    });
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function touchableHandleActivePressIn(e) {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }

    this.props.onPressIn && this.props.onPressIn(e);
  },
  touchableHandleActivePressOut: function touchableHandleActivePressOut(e) {
    this._opacityInactive(250);

    this.props.onPressOut && this.props.onPressOut(e);
  },
  touchableHandleFocus: function touchableHandleFocus(e) {
    //if (Platform.isTV) {
    //  this._opacityActive(150);
    //}
    this.props.onFocus && this.props.onFocus(e);
  },
  touchableHandleBlur: function touchableHandleBlur(e) {
    //if (Platform.isTV) {
    //  this._opacityInactive(250);
    //}
    this.props.onBlur && this.props.onBlur(e);
  },
  touchableHandlePress: function touchableHandlePress(e) {
    this.props.onPress && this.props.onPress(e);
  },
  touchableHandleLongPress: function touchableHandleLongPress(e) {
    this.props.onLongPress && this.props.onLongPress(e);
  },
  touchableGetPressRectOffset: function touchableGetPressRectOffset() {
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
    return this.props.delayPressOut;
  },
  _opacityActive: function _opacityActive(duration) {
    this.setOpacityTo(this.props.activeOpacity, duration);
  },
  _opacityInactive: function _opacityInactive(duration) {
    this.setOpacityTo(this._getChildStyleOpacityWithDefault(), duration);
  },
  _getChildStyleOpacityWithDefault: function _getChildStyleOpacityWithDefault() {
    var childStyle = flattenStyle(this.props.style) || {};
    return childStyle.opacity == null ? 1 : childStyle.opacity;
  },
  render: function render() {
    return React.createElement(_View.default, _extends({}, this.props, {
      accessibilityHint: this.props.accessibilityHint,
      accessibilityLabel: this.props.accessibilityLabel,
      accessibilityRole: this.props.accessibilityRole,
      accessibilityState: this.props.accessibilityState,
      accessible: this.props.accessible !== false,
      hitSlop: this.props.hitSlop,
      nativeID: this.props.nativeID,
      onKeyDown: this.touchableHandleKeyEvent,
      onKeyUp: this.touchableHandleKeyEvent,
      onLayout: this.props.onLayout,
      onResponderGrant: this.touchableHandleResponderGrant //isTVSelectable={true}
      //nextFocusDown={this.props.nextFocusDown}
      //nextFocusForward={this.props.nextFocusForward}
      //nextFocusLeft={this.props.nextFocusLeft}
      //nextFocusRight={this.props.nextFocusRight}
      //nextFocusUp={this.props.nextFocusUp}
      //hasTVPreferredFocus={this.props.hasTVPreferredFocus}
      //tvParallaxProperties={this.props.tvParallaxProperties}
      ,
      onResponderMove: this.touchableHandleResponderMove //clickable={
      //  this.props.clickable !== false && this.props.onPress !== undefined
      //}
      //onClick={this.touchableHandlePress}
      ,
      onResponderRelease: this.touchableHandleResponderRelease,
      onResponderTerminate: this.touchableHandleResponderTerminate,
      onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
      onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
      style: [styles.root, !this.props.disabled && styles.actionable, this.props.style, {
        opacity: this.state.anim
      }],
      testID: this.props.testID
    }), this.props.children, _Touchable.default.renderDebugView({
      color: 'cyan',
      hitSlop: this.props.hitSlop
    }));
  }
});

var styles = _StyleSheet.default.create({
  root: {
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});

var _default = (0, _applyNativeMethods.default)(TouchableOpacity);

exports.default = _default;
module.exports = exports.default;