function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import AccessibilityUtil from '../AccessibilityUtil';
import css from '../../exports/StyleSheet/css';
import StyleSheet from '../../exports/StyleSheet';
import styleResolver from '../../exports/StyleSheet/styleResolver';
import { STYLE_GROUPS } from '../../exports/StyleSheet/constants';
var emptyObject = {}; // Reset styles for heading, link, and list DOM elements

var classes = css.create({
  reset: {
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    listStyle: 'none',
    margin: 0,
    textAlign: 'inherit',
    textDecoration: 'none'
  },
  cursor: {
    cursor: 'pointer'
  }
}, STYLE_GROUPS.classicReset);
var pointerEventsStyles = StyleSheet.create({
  auto: {
    pointerEvents: 'auto'
  },
  'box-none': {
    pointerEvents: 'box-none'
  },
  'box-only': {
    pointerEvents: 'box-only'
  },
  none: {
    pointerEvents: 'none'
  }
});

var defaultStyleResolver = function defaultStyleResolver(style, classList) {
  return styleResolver.resolve(style, classList);
};

var createDOMProps = function createDOMProps(component, props, styleResolver) {
  if (!styleResolver) {
    styleResolver = defaultStyleResolver;
  }

  if (!props) {
    props = emptyObject;
  }

  var _props = props,
      accessibilityLabel = _props.accessibilityLabel,
      accessibilityLiveRegion = _props.accessibilityLiveRegion,
      accessibilityRelationship = _props.accessibilityRelationship,
      accessibilityState = _props.accessibilityState,
      classList = _props.classList,
      deprecatedClassName = _props.className,
      providedDisabled = _props.disabled,
      importantForAccessibility = _props.importantForAccessibility,
      nativeID = _props.nativeID,
      pointerEvents = _props.pointerEvents,
      providedStyle = _props.style,
      testID = _props.testID,
      accessible = _props.accessible,
      accessibilityRole = _props.accessibilityRole,
      domProps = _objectWithoutPropertiesLoose(_props, ["accessibilityLabel", "accessibilityLiveRegion", "accessibilityRelationship", "accessibilityState", "classList", "className", "disabled", "importantForAccessibility", "nativeID", "pointerEvents", "style", "testID", "accessible", "accessibilityRole"]);

  var disabled = accessibilityState != null && accessibilityState.disabled === true || providedDisabled;
  var role = AccessibilityUtil.propsToAriaRole(props); // accessibilityLabel

  if (accessibilityLabel != null) {
    domProps['aria-label'] = accessibilityLabel;
  } // accessibilityLiveRegion


  if (accessibilityLiveRegion != null) {
    domProps['aria-live'] = accessibilityLiveRegion === 'none' ? 'off' : accessibilityLiveRegion;
  } // accessibilityRelationship


  if (accessibilityRelationship != null) {
    for (var prop in accessibilityRelationship) {
      var value = accessibilityRelationship[prop];

      if (value != null) {
        domProps["aria-" + prop] = value;
      }
    }
  } // accessibilityRole


  if (role != null) {
    domProps.role = role;
  } // accessibilityState


  if (accessibilityState != null) {
    for (var _prop in accessibilityState) {
      var _value = accessibilityState[_prop];

      if (_value != null) {
        if (_prop === 'disabled' || _prop === 'hidden') {
          if (_value === true) {
            domProps["aria-" + _prop] = _value; // also set prop directly to pick up host component behaviour

            domProps[_prop] = _value;
          }
        } else {
          domProps["aria-" + _prop] = _value;
        }
      }
    }
  } // legacy fallbacks


  if (importantForAccessibility === 'no-hide-descendants') {
    domProps['aria-hidden'] = true;
  }

  if (disabled === true) {
    domProps['aria-disabled'] = true;
    domProps.disabled = true;
  } // FOCUS
  // Assume that 'link' is focusable by default (uses <a>).
  // Assume that 'button' is not (uses <div role='button'>) but must be treated as such.


  var focusable = !disabled && importantForAccessibility !== 'no' && importantForAccessibility !== 'no-hide-descendants';

  if (role === 'link' || component === 'a' || component === 'button' || component === 'input' || component === 'select' || component === 'textarea') {
    if (accessible === false || !focusable) {
      domProps.tabIndex = '-1';
    } else {
      domProps['data-focusable'] = true;
    }
  } else if (AccessibilityUtil.buttonLikeRoles[role] || role === 'textbox') {
    if (accessible !== false && focusable) {
      domProps['data-focusable'] = true;
      domProps.tabIndex = '0';
    }
  } else {
    if (accessible === true && focusable) {
      domProps['data-focusable'] = true;
      domProps.tabIndex = '0';
    }
  } // STYLE


  var reactNativeStyle = StyleSheet.compose(pointerEvents && pointerEventsStyles[pointerEvents], providedStyle); // Additional style resets for interactive elements

  var needsCursor = (role === 'button' || role === 'link') && !disabled;
  var needsReset = component === 'a' || component === 'button' || component === 'li' || component === 'ul' || role === 'heading'; // Classic CSS styles

  var finalClassList = [deprecatedClassName, needsReset && classes.reset, needsCursor && classes.cursor, classList]; // Resolve styles

  var _styleResolver = styleResolver(reactNativeStyle, finalClassList),
      className = _styleResolver.className,
      style = _styleResolver.style;

  if (className != null && className !== '') {
    domProps.className = className;
  }

  if (style) {
    domProps.style = style;
  } // OTHER
  // Native element ID


  if (nativeID && nativeID.constructor === String) {
    domProps.id = nativeID;
  } // Link security
  // https://mathiasbynens.github.io/rel-noopener/
  // Note: using "noreferrer" doesn't impact referrer tracking for https
  // transfers (i.e., from https to https).


  if (component === 'a' && domProps.target === '_blank') {
    domProps.rel = (domProps.rel || '') + " noopener noreferrer";
  } // Automated test IDs


  if (testID && testID.constructor === String) {
    domProps['data-testid'] = testID;
  }

  return domProps;
};

export default createDOMProps;