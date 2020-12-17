"use strict";

exports.__esModule = true;
exports.default = void 0;

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _propTypes = require("prop-types");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var AppContainer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(AppContainer, _React$Component);

  function AppContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      mainKey: 1
    };
    return _this;
  }

  var _proto = AppContainer.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      rootTag: this.props.rootTag
    };
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        WrapperComponent = _this$props.WrapperComponent;

    var innerView = _react.default.createElement(_View.default, {
      children: children,
      key: this.state.mainKey,
      pointerEvents: "box-none",
      style: styles.appContainer
    });

    if (WrapperComponent) {
      innerView = _react.default.createElement(WrapperComponent, null, innerView);
    }

    return _react.default.createElement(_View.default, {
      pointerEvents: "box-none",
      style: styles.appContainer
    }, innerView);
  };

  return AppContainer;
}(_react.default.Component);

exports.default = AppContainer;
AppContainer.childContextTypes = {
  rootTag: _propTypes.any
};

var styles = _StyleSheet.default.create({
  appContainer: {
    flex: 1
  }
});

module.exports = exports.default;