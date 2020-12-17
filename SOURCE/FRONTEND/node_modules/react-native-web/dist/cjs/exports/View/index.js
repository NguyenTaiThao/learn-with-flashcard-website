"use strict";

exports.__esModule = true;
exports.default = void 0;

var _applyLayout = _interopRequireDefault(require("../../modules/applyLayout"));

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _css = _interopRequireDefault(require("../StyleSheet/css"));

var _filterSupportedProps = _interopRequireDefault(require("./filterSupportedProps"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextAncestorContext = _interopRequireDefault(require("../Text/TextAncestorContext"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
    var supportedProps = (0, _filterSupportedProps.default)(this.props);

    if (process.env.NODE_ENV !== 'production') {
      _react.default.Children.toArray(this.props.children).forEach(function (item) {
        if (typeof item === 'string') {
          console.error("Unexpected text node: " + item + ". A text node cannot be a child of a <View>.");
        }
      });
    }

    supportedProps.classList = [classes.view];
    supportedProps.ref = this.props.forwardedRef;
    supportedProps.style = _StyleSheet.default.compose(hasTextAncestor && styles.inline, this.props.style);

    if (hitSlop) {
      var hitSlopStyle = calculateHitSlopStyle(hitSlop);
      var hitSlopChild = (0, _createElement.default)('span', {
        classList: [classes.hitSlop],
        style: hitSlopStyle
      });
      supportedProps.children = _react.default.Children.toArray([hitSlopChild, supportedProps.children]);
    }

    return (0, _createElement.default)('div', supportedProps);
  };

  _proto.render = function render() {
    var _this = this;

    return _react.default.createElement(_TextAncestorContext.default.Consumer, null, function (hasTextAncestor) {
      return _this.renderView(hasTextAncestor);
    });
  };

  return View;
}(_react.default.Component);

View.displayName = 'View';

var classes = _css.default.create({
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

var styles = _StyleSheet.default.create({
  inline: {
    display: 'inline-flex'
  }
});

var _default = (0, _applyLayout.default)((0, _applyNativeMethods.default)(View));

exports.default = _default;
module.exports = exports.default;