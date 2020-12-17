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
import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import filterSupportedProps from './filterSupportedProps';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import React from 'react';

var calculateHitSlopStyle = function calculateHitSlopStyle(hitSlop) {
  var hitStyle = {};

  for (var prop in hitSlop) {
    if (hitSlop.hasOwnProperty(prop)) {
      var value = hitSlop[prop];
      hitStyle[prop] = value > 0 ? -1 * value : 0;
    }
  }

  return hitStyle;
};

var View =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(View, _React$Component);

  function View() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = View.prototype;

  _proto.renderView = function renderView(hasTextAncestor) {
    var hitSlop = this.props.hitSlop;
    var supportedProps = filterSupportedProps(this.props);

    if (process.env.NODE_ENV !== 'production') {
      React.Children.toArray(this.props.children).forEach(function (item) {
        if (typeof item === 'string') {
          console.error("Unexpected text node: " + item + ". A text node cannot be a child of a <View>.");
        }
      });
    }

    supportedProps.classList = [classes.view];
    supportedProps.ref = this.props.forwardedRef;
    supportedProps.style = StyleSheet.compose(hasTextAncestor && styles.inline, this.props.style);

    if (hitSlop) {
      var hitSlopStyle = calculateHitSlopStyle(hitSlop);
      var hitSlopChild = createElement('span', {
        classList: [classes.hitSlop],
        style: hitSlopStyle
      });
      supportedProps.children = React.Children.toArray([hitSlopChild, supportedProps.children]);
    }

    return createElement('div', supportedProps);
  };

  _proto.render = function render() {
    var _this = this;

    return React.createElement(TextAncestorContext.Consumer, null, function (hasTextAncestor) {
      return _this.renderView(hasTextAncestor);
    });
  };

  return View;
}(React.Component);

View.displayName = 'View';
var classes = css.create({
  view: {
    alignItems: 'stretch',
    border: '0 solid black',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    position: 'relative',
    zIndex: 0
  },
  // this zIndex-ordering positions the hitSlop above the View but behind
  // its children
  hitSlop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  }
});
var styles = StyleSheet.create({
  inline: {
    display: 'inline-flex'
  }
});
export default applyLayout(applyNativeMethods(View));