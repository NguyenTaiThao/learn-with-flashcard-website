/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import applyNativeMethods from '../../modules/applyNativeMethods';
import createReactClass from 'create-react-class';
import ensurePositiveDelayProps from '../Touchable/ensurePositiveDelayProps';
import * as React from 'react';
import StyleSheet from '../StyleSheet';
import Touchable from '../Touchable';
import View from '../View';
var DEFAULT_PROPS = {
  activeOpacity: 0.85,
  delayPressOut: 100,
  underlayColor: 'black'
};
var PRESS_RETENTION_OFFSET = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 30
};

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, which allows
 * the underlay color to show through, darkening or tinting the view.
 *
 * The underlay comes from wrapping the child in a new View, which can affect
 * layout, and sometimes cause unwanted visual artifacts if not used correctly,
 * for example if the backgroundColor of the wrapped view isn't explicitly set
 * to an opaque color.
 *
 * TouchableHighlight must have one child (not zero or more than one).
 * If you wish to have several child components, wrap them in a View.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableHighlight onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton.png')}
 *       />
 *     </TouchableHighlight>
 *   );
 * },
 * ```
 *
 *
 * ### Example
 *
 * ```ReactNativeWebPlayer
 * import React, { Component } from 'react'
 * import {
 *   AppRegistry,
 *   StyleSheet,
 *   TouchableHighlight,
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
 *     return (
 *       <View style={styles.container}>
 *         <TouchableHighlight
 *          style={styles.button}
 *          onPress={this.onPress}
 *         >
 *          <Text> Touch Here </Text>
 *         </TouchableHighlight>
 *         <View style={[styles.countContainer]}>
 *           <Text style={[styles.countText]}>
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
var TouchableHighlight = createReactClass({
  displayName: 'TouchableHighlight',
  mixins: [Touchable.Mixin.withoutDefaultFocusAndBlur],
  getDefaultProps: function getDefaultProps() {
    return DEFAULT_PROPS;
  },
  getInitialState: function getInitialState() {
    this._isMounted = false;

    if (this.props.testOnly_pressed) {
      return _objectSpread({}, this.touchableGetInitialState(), {
        extraChildStyle: {
          opacity: this.props.activeOpacity
        },
        extraUnderlayStyle: {
          backgroundColor: this.props.underlayColor
        }
      });
    } else {
      return _objectSpread({}, this.touchableGetInitialState(), {
        extraChildStyle: null,
        extraUnderlayStyle: null
      });
    }
  },
  componentDidMount: function componentDidMount() {
    this._isMounted = true;
    ensurePositiveDelayProps(this.props);
  },
  componentWillUnmount: function componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this._hideTimeout);
  },
  UNSAFE_componentWillReceiveProps: function UNSAFE_componentWillReceiveProps(nextProps) {
    ensurePositiveDelayProps(nextProps);
  },

  /*
  viewConfig: {
    uiViewClassName: 'RCTView',
    validAttributes: ReactNativeViewAttributes.RCTView,
  },
  */

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function touchableHandleActivePressIn(e) {
    clearTimeout(this._hideTimeout);
    this._hideTimeout = null;

    this._showUnderlay();

    this.props.onPressIn && this.props.onPressIn(e);
  },
  touchableHandleActivePressOut: function touchableHandleActivePressOut(e) {
    if (!this._hideTimeout) {
      this._hideUnderlay();
    }

    this.props.onPressOut && this.props.onPressOut(e);
  },
  touchableHandleFocus: function touchableHandleFocus(e) {
    this.props.onFocus && this.props.onFocus(e);
  },
  touchableHandleBlur: function touchableHandleBlur(e) {
    this.props.onBlur && this.props.onBlur(e);
  },
  touchableHandlePress: function touchableHandlePress(e) {
    clearTimeout(this._hideTimeout);

    this._showUnderlay();

    this._hideTimeout = setTimeout(this._hideUnderlay, this.props.delayPressOut);
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
    return this.props.delayPressIn;
  },
  touchableGetLongPressDelayMS: function touchableGetLongPressDelayMS() {
    return this.props.delayLongPress;
  },
  touchableGetPressOutDelayMS: function touchableGetPressOutDelayMS() {
    return this.props.delayPressOut;
  },
  _showUnderlay: function _showUnderlay() {
    if (!this._isMounted || !this._hasPressHandler()) {
      return;
    }

    this.setState({
      extraChildStyle: {
        opacity: this.props.activeOpacity
      },
      extraUnderlayStyle: {
        backgroundColor: this.props.underlayColor
      }
    });
    this.props.onShowUnderlay && this.props.onShowUnderlay();
  },
  _hideUnderlay: function _hideUnderlay() {
    clearTimeout(this._hideTimeout);
    this._hideTimeout = null;

    if (this.props.testOnly_pressed) {
      return;
    }

    if (this._hasPressHandler()) {
      this.setState({
        extraChildStyle: null,
        extraUnderlayStyle: null
      });
      this.props.onHideUnderlay && this.props.onHideUnderlay();
    }
  },
  _hasPressHandler: function _hasPressHandler() {
    return !!(this.props.onPress || this.props.onPressIn || this.props.onPressOut || this.props.onLongPress);
  },
  render: function render() {
    var child = React.Children.only(this.props.children);
    return React.createElement(View, _extends({}, this.props, {
      accessibilityHint: this.props.accessibilityHint,
      accessibilityLabel: this.props.accessibilityLabel,
      accessibilityRole: this.props.accessibilityRole,
      accessibilityState: this.props.accessibilityState,
      accessible: this.props.accessible !== false,
      hitSlop: this.props.hitSlop,
      nativeID: this.props.nativeID,
      onKeyDown: this.touchableHandleKeyEvent //isTVSelectable={true}
      //tvParallaxProperties={this.props.tvParallaxProperties}
      //hasTVPreferredFocus={this.props.hasTVPreferredFocus}
      //nextFocusDown={this.props.nextFocusDown}
      //nextFocusForward={this.props.nextFocusForward}
      //nextFocusLeft={this.props.nextFocusLeft}
      //nextFocusRight={this.props.nextFocusRight}
      //nextFocusUp={this.props.nextFocusUp}
      //clickable={
      //  this.props.clickable !== false && this.props.onPress !== undefined
      //}
      //onClick={this.touchableHandlePress}
      ,
      onKeyUp: this.touchableHandleKeyEvent,
      onLayout: this.props.onLayout,
      onResponderGrant: this.touchableHandleResponderGrant,
      onResponderMove: this.touchableHandleResponderMove,
      onResponderRelease: this.touchableHandleResponderRelease,
      onResponderTerminate: this.touchableHandleResponderTerminate,
      onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
      onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
      style: [styles.root, this.props.style, !this.props.disabled && styles.actionable, this.state.extraUnderlayStyle],
      testID: this.props.testID
    }), React.cloneElement(child, {
      style: StyleSheet.compose(child.props.style, this.state.extraChildStyle)
    }), Touchable.renderDebugView({
      color: 'green',
      hitSlop: this.props.hitSlop
    }));
  }
});
var styles = StyleSheet.create({
  root: {
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});
export default applyNativeMethods(TouchableHighlight);