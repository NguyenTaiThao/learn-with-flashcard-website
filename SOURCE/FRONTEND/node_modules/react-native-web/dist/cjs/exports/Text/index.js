"use strict";

exports.__esModule = true;
exports.default = void 0;

var _applyLayout = _interopRequireDefault(require("../../modules/applyLayout"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _css = _interopRequireDefault(require("../StyleSheet/css"));

var _filterSupportedProps = _interopRequireDefault(require("../View/filterSupportedProps"));

var _react = _interopRequireDefault(require("react"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextAncestorContext = _interopRequireDefault(require("./TextAncestorContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Text =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Text, _React$Component);

  function Text() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Text.prototype;

  _proto.renderText = function renderText(hasTextAncestor) {
    var _this$props = this.props,
        dir = _this$props.dir,
        forwardedRef = _this$props.forwardedRef,
        numberOfLines = _this$props.numberOfLines,
        onPress = _this$props.onPress,
        selectable = _this$props.selectable,
        style = _this$props.style;
    var supportedProps = (0, _filterSupportedProps.default)(this.props);

    if (onPress) {
      supportedProps.accessible = true;
      supportedProps.onClick = this._createPressHandler(onPress);
      supportedProps.onKeyDown = this._createEnterHandler(onPress);
    }

    supportedProps.classList = [classes.text, hasTextAncestor === true && classes.textHasAncestor, numberOfLines === 1 && classes.textOneLine, numberOfLines != null && numberOfLines > 1 && classes.textMultiLine]; // allow browsers to automatically infer the language writing direction

    supportedProps.dir = dir !== undefined ? dir : 'auto';
    supportedProps.ref = forwardedRef;
    supportedProps.style = [style, numberOfLines != null && numberOfLines > 1 && {
      WebkitLineClamp: numberOfLines
    }, selectable === false && styles.notSelectable, onPress && styles.pressable];
    var component = hasTextAncestor ? 'span' : 'div';
    return (0, _createElement.default)(component, supportedProps);
  };

  _proto.render = function render() {
    var _this = this;

    return _react.default.createElement(_TextAncestorContext.default.Consumer, null, function (hasTextAncestor) {
      var element = _this.renderText(hasTextAncestor);

      return hasTextAncestor ? element : _react.default.createElement(_TextAncestorContext.default.Provider, {
        value: true
      }, element);
    });
  };

  _proto._createEnterHandler = function _createEnterHandler(fn) {
    return function (e) {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  };

  _proto._createPressHandler = function _createPressHandler(fn) {
    return function (e) {
      e.stopPropagation();
      fn && fn(e);
    };
  };

  return Text;
}(_react.default.Component);

Text.displayName = 'Text';

var classes = _css.default.create({
  text: {
    border: '0 solid black',
    boxSizing: 'border-box',
    color: 'black',
    display: 'inline',
    font: '14px System',
    margin: 0,
    padding: 0,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  textHasAncestor: {
    color: 'inherit',
    font: 'inherit',
    whiteSpace: 'inherit'
  },
  textOneLine: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  // See #13
  textMultiLine: {
    display: '-webkit-box',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical'
  }
});

var styles = _StyleSheet.default.create({
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  }
});

var _default = (0, _applyLayout.default)((0, _applyNativeMethods.default)(Text));

exports.default = _default;
module.exports = exports.default;