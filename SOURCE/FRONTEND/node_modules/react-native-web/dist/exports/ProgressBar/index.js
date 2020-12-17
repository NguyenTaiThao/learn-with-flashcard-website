function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import applyNativeMethods from '../../modules/applyNativeMethods';
import StyleSheet from '../StyleSheet';
import View from '../View';
import React from 'react';

var ProgressBar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ProgressBar, _React$Component);

  function ProgressBar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this._setProgressRef = function (element) {
      _this._progressElement = element;
    };

    _this._updateProgressWidth = function () {
      var _this$props = _this.props,
          _this$props$indetermi = _this$props.indeterminate,
          indeterminate = _this$props$indetermi === void 0 ? false : _this$props$indetermi,
          _this$props$progress = _this$props.progress,
          progress = _this$props$progress === void 0 ? 0 : _this$props$progress;
      var percentageProgress = indeterminate ? 50 : progress * 100;
      var width = indeterminate ? '25%' : percentageProgress + "%";

      if (_this._progressElement) {
        _this._progressElement.setNativeProps({
          style: {
            width: width
          }
        });
      }
    };

    return _this;
  }

  var _proto = ProgressBar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._updateProgressWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this._updateProgressWidth();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        _this$props2$color = _this$props2.color,
        color = _this$props2$color === void 0 ? '#1976D2' : _this$props2$color,
        _this$props2$indeterm = _this$props2.indeterminate,
        indeterminate = _this$props2$indeterm === void 0 ? false : _this$props2$indeterm,
        _this$props2$progress = _this$props2.progress,
        progress = _this$props2$progress === void 0 ? 0 : _this$props2$progress,
        _this$props2$trackCol = _this$props2.trackColor,
        trackColor = _this$props2$trackCol === void 0 ? 'transparent' : _this$props2$trackCol,
        style = _this$props2.style,
        other = _objectWithoutPropertiesLoose(_this$props2, ["color", "indeterminate", "progress", "trackColor", "style"]);

    var percentageProgress = progress * 100;
    return React.createElement(View, _extends({}, other, {
      accessibilityRole: "progressbar",
      "aria-valuemax": "100",
      "aria-valuemin": "0",
      "aria-valuenow": indeterminate ? null : percentageProgress,
      style: [styles.track, style, {
        backgroundColor: trackColor
      }]
    }), React.createElement(View, {
      ref: this._setProgressRef,
      style: [styles.progress, indeterminate && styles.animation, {
        backgroundColor: color
      }]
    }));
  };

  return ProgressBar;
}(React.Component);

ProgressBar.displayName = 'ProgressBar';
var styles = StyleSheet.create({
  track: {
    height: 5,
    overflow: 'hidden',
    userSelect: 'none',
    zIndex: 0
  },
  progress: {
    height: '100%',
    zIndex: -1
  },
  animation: {
    animationDuration: '1s',
    animationKeyframes: [{
      '0%': {
        transform: [{
          translateX: '-100%'
        }]
      },
      '100%': {
        transform: [{
          translateX: '400%'
        }]
      }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});
export default applyNativeMethods(ProgressBar);