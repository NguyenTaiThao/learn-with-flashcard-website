function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import applyNativeMethods from '../../modules/applyNativeMethods';
import { Component } from 'react';
import createElement from '../createElement';
import PickerItem from './PickerItem';
import StyleSheet from '../StyleSheet';

var Picker =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Picker, _Component);

  function Picker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._handleChange = function (e) {
      var onValueChange = _this.props.onValueChange;
      var _e$target = e.target,
          selectedIndex = _e$target.selectedIndex,
          value = _e$target.value;

      if (onValueChange) {
        onValueChange(value, selectedIndex);
      }
    };

    return _this;
  }

  var _proto = Picker.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        enabled = _this$props.enabled,
        selectedValue = _this$props.selectedValue,
        style = _this$props.style,
        testID = _this$props.testID,
        itemStyle = _this$props.itemStyle,
        mode = _this$props.mode,
        prompt = _this$props.prompt,
        onValueChange = _this$props.onValueChange,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["children", "enabled", "selectedValue", "style", "testID", "itemStyle", "mode", "prompt", "onValueChange"]);

    return createElement('select', _objectSpread({
      children: children,
      disabled: enabled === false ? true : undefined,
      onChange: this._handleChange,
      style: [styles.initial, style],
      testID: testID,
      value: selectedValue
    }, otherProps));
  };

  return Picker;
}(Component);

Picker.Item = PickerItem;
var styles = StyleSheet.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0
  }
});
export default applyNativeMethods(Picker);