"use strict";

exports.__esModule = true;
exports.default = void 0;

var _applyLayout = _interopRequireDefault(require("../../modules/applyLayout"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _createElement = _interopRequireDefault(require("../createElement"));

var _css = _interopRequireDefault(require("../StyleSheet/css"));

var _filterSupportedProps = _interopRequireDefault(require("../View/filterSupportedProps"));

var _findNodeHandle = _interopRequireDefault(require("../findNodeHandle"));

var _react = _interopRequireDefault(require("react"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextInputState = _interopRequireDefault(require("../../modules/TextInputState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var isAndroid = _ExecutionEnvironment.canUseDOM && /Android/i.test(navigator && navigator.userAgent);
var emptyObject = {};
/**
 * React Native events differ from W3C events.
 */

var normalizeEventHandler = function normalizeEventHandler(handler) {
  return function (e) {
    if (handler) {
      e.nativeEvent.text = e.target.value;
      return handler(e);
    }
  };
};
/**
 * Determines whether a 'selection' prop differs from a node's existing
 * selection state.
 */


var isSelectionStale = function isSelectionStale(node, selection) {
  if (node != null && selection != null) {
    var selectionEnd = node.selectionEnd,
        selectionStart = node.selectionStart;
    var start = selection.start,
        end = selection.end;
    return start !== selectionStart || end !== selectionEnd;
  }

  return false;
};
/**
 * Certain input types do no support 'selectSelectionRange' and will throw an
 * error.
 */


var setSelection = function setSelection(node, selection) {
  try {
    if (node != null && selection != null && isSelectionStale(node, selection)) {
      var start = selection.start,
          end = selection.end; // workaround for Blink on Android: see https://github.com/text-mask/text-mask/issues/300

      if (isAndroid) {
        setTimeout(function () {
          return node.setSelectionRange(start, end || start);
        }, 10);
      } else {
        node.setSelectionRange(start, end || start);
      }
    }
  } catch (e) {}
};

var TextInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TextInput, _React$Component);

  function TextInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this._handleBlur = function (e) {
      var onBlur = _this.props.onBlur;
      _TextInputState.default._currentlyFocusedNode = null;

      if (onBlur) {
        onBlur(e);
      }
    };

    _this._handleContentSizeChange = function () {
      var _this$props = _this.props,
          onContentSizeChange = _this$props.onContentSizeChange,
          multiline = _this$props.multiline;

      if (multiline && onContentSizeChange) {
        var newHeight = _this._node.scrollHeight;
        var newWidth = _this._node.scrollWidth;

        if (newHeight !== _this._nodeHeight || newWidth !== _this._nodeWidth) {
          _this._nodeHeight = newHeight;
          _this._nodeWidth = newWidth;
          onContentSizeChange({
            nativeEvent: {
              contentSize: {
                height: _this._nodeHeight,
                width: _this._nodeWidth
              }
            }
          });
        }
      }
    };

    _this._handleChange = function (e) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          onChangeText = _this$props2.onChangeText;
      var text = e.nativeEvent.text;

      _this._handleContentSizeChange();

      if (onChange) {
        onChange(e);
      }

      if (onChangeText) {
        onChangeText(text);
      }

      _this._handleSelectionChange(e);
    };

    _this._handleFocus = function (e) {
      var _this$props3 = _this.props,
          clearTextOnFocus = _this$props3.clearTextOnFocus,
          onFocus = _this$props3.onFocus,
          selectTextOnFocus = _this$props3.selectTextOnFocus;
      var node = _this._node;
      _TextInputState.default._currentlyFocusedNode = _this._node;

      if (onFocus) {
        onFocus(e);
      }

      if (clearTextOnFocus) {
        _this.clear();
      }

      if (selectTextOnFocus) {
        node && node.select();
      }
    };

    _this._handleKeyDown = function (e) {
      // Prevent key events bubbling (see #612)
      e.stopPropagation(); // Backspace, Escape, Tab, Cmd+Enter, and Arrow keys only fire 'keydown'
      // DOM events

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Backspace' || e.key === 'Escape' || e.key === 'Enter' && e.metaKey || e.key === 'Tab') {
        _this._handleKeyPress(e);
      }
    };

    _this._handleKeyPress = function (e) {
      var _this$props4 = _this.props,
          blurOnSubmit = _this$props4.blurOnSubmit,
          multiline = _this$props4.multiline,
          onKeyPress = _this$props4.onKeyPress,
          onSubmitEditing = _this$props4.onSubmitEditing;
      var blurOnSubmitDefault = !multiline;
      var shouldBlurOnSubmit = blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;

      if (onKeyPress) {
        var keyValue = e.key;

        if (keyValue) {
          e.nativeEvent = {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            key: keyValue,
            metaKey: e.metaKey,
            shiftKey: e.shiftKey,
            target: e.target
          };
          onKeyPress(e);
        }
      }

      if (!e.isDefaultPrevented() && e.key === 'Enter' && !e.shiftKey) {
        if ((blurOnSubmit || !multiline) && onSubmitEditing) {
          // prevent "Enter" from inserting a newline
          e.preventDefault();
          e.nativeEvent = {
            target: e.target,
            text: e.target.value
          };
          onSubmitEditing(e);
        }

        if (shouldBlurOnSubmit) {
          // $FlowFixMe
          _this.blur();
        }
      }
    };

    _this._handleSelectionChange = function (e) {
      var _this$props5 = _this.props,
          onSelectionChange = _this$props5.onSelectionChange,
          _this$props5$selectio = _this$props5.selection,
          selection = _this$props5$selectio === void 0 ? emptyObject : _this$props5$selectio;

      if (onSelectionChange) {
        try {
          var node = e.target;

          if (isSelectionStale(node, selection)) {
            var selectionStart = node.selectionStart,
                selectionEnd = node.selectionEnd;
            e.nativeEvent.selection = {
              start: selectionStart,
              end: selectionEnd
            };
            onSelectionChange(e);
          }
        } catch (e) {}
      }
    };

    _this._setNode = function (component) {
      _this._node = (0, _findNodeHandle.default)(component);

      if (_this._node) {
        _this._handleContentSizeChange();
      }
    };

    return _this;
  }

  var _proto = TextInput.prototype;

  _proto.clear = function clear() {
    this._node.value = '';
  };

  _proto.isFocused = function isFocused() {
    return _TextInputState.default.currentlyFocusedField() === this._node;
  };

  _proto.componentDidMount = function componentDidMount() {
    setSelection(this._node, this.props.selection);

    if (document.activeElement === this._node) {
      _TextInputState.default._currentlyFocusedNode = this._node;
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    setSelection(this._node, this.props.selection);
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        _this$props6$autoCapi = _this$props6.autoCapitalize,
        autoCapitalize = _this$props6$autoCapi === void 0 ? 'sentences' : _this$props6$autoCapi,
        autoComplete = _this$props6.autoComplete,
        autoCompleteType = _this$props6.autoCompleteType,
        _this$props6$autoCorr = _this$props6.autoCorrect,
        autoCorrect = _this$props6$autoCorr === void 0 ? true : _this$props6$autoCorr,
        autoFocus = _this$props6.autoFocus,
        defaultValue = _this$props6.defaultValue,
        disabled = _this$props6.disabled,
        _this$props6$editable = _this$props6.editable,
        editable = _this$props6$editable === void 0 ? true : _this$props6$editable,
        _this$props6$keyboard = _this$props6.keyboardType,
        keyboardType = _this$props6$keyboard === void 0 ? 'default' : _this$props6$keyboard,
        maxLength = _this$props6.maxLength,
        _this$props6$multilin = _this$props6.multiline,
        multiline = _this$props6$multilin === void 0 ? false : _this$props6$multilin,
        _this$props6$numberOf = _this$props6.numberOfLines,
        numberOfLines = _this$props6$numberOf === void 0 ? 1 : _this$props6$numberOf,
        placeholder = _this$props6.placeholder,
        placeholderTextColor = _this$props6.placeholderTextColor,
        returnKeyType = _this$props6.returnKeyType,
        _this$props6$secureTe = _this$props6.secureTextEntry,
        secureTextEntry = _this$props6$secureTe === void 0 ? false : _this$props6$secureTe,
        spellCheck = _this$props6.spellCheck,
        style = _this$props6.style,
        value = _this$props6.value;
    var type;

    switch (keyboardType) {
      case 'email-address':
        type = 'email';
        break;

      case 'number-pad':
      case 'numeric':
        type = 'number';
        break;

      case 'phone-pad':
        type = 'tel';
        break;

      case 'search':
      case 'web-search':
        type = 'search';
        break;

      case 'url':
        type = 'url';
        break;

      default:
        type = 'text';
    }

    if (secureTextEntry) {
      type = 'password';
    }

    var component = multiline ? 'textarea' : 'input';
    var supportedProps = (0, _filterSupportedProps.default)(this.props);
    Object.assign(supportedProps, {
      autoCapitalize: autoCapitalize,
      autoComplete: autoComplete || autoCompleteType || 'on',
      autoCorrect: autoCorrect ? 'on' : 'off',
      autoFocus: autoFocus,
      classList: [classes.textinput],
      defaultValue: defaultValue,
      dir: 'auto',
      disabled: disabled,
      enterkeyhint: returnKeyType,
      maxLength: maxLength,
      onBlur: normalizeEventHandler(this._handleBlur),
      onChange: normalizeEventHandler(this._handleChange),
      onFocus: normalizeEventHandler(this._handleFocus),
      onKeyDown: this._handleKeyDown,
      onKeyPress: this._handleKeyPress,
      onSelect: normalizeEventHandler(this._handleSelectionChange),
      placeholder: placeholder,
      readOnly: !editable,
      ref: this._setNode,
      spellCheck: spellCheck != null ? spellCheck : autoCorrect,
      style: _StyleSheet.default.compose(style, placeholderTextColor && {
        placeholderTextColor: placeholderTextColor
      }),
      value: value
    });

    if (multiline) {
      supportedProps.rows = numberOfLines;
    } else {
      supportedProps.type = type;
    }

    return (0, _createElement.default)(component, supportedProps);
  };

  return TextInput;
}(_react.default.Component);

TextInput.displayName = 'TextInput';
TextInput.State = _TextInputState.default;

var classes = _css.default.create({
  textinput: {
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    border: '0 solid black',
    borderRadius: 0,
    boxSizing: 'border-box',
    font: '14px System',
    margin: 0,
    padding: 0,
    resize: 'none'
  }
});

var _default = (0, _applyLayout.default)((0, _applyNativeMethods.default)(TextInput));

exports.default = _default;
module.exports = exports.default;