"use strict";

exports.__esModule = true;
exports.default = void 0;

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var RefreshControl =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(RefreshControl, _React$Component);

  function RefreshControl() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RefreshControl.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        colors = _this$props.colors,
        enabled = _this$props.enabled,
        onRefresh = _this$props.onRefresh,
        progressBackgroundColor = _this$props.progressBackgroundColor,
        progressViewOffset = _this$props.progressViewOffset,
        refreshing = _this$props.refreshing,
        size = _this$props.size,
        tintColor = _this$props.tintColor,
        title = _this$props.title,
        titleColor = _this$props.titleColor,
        rest = _objectWithoutPropertiesLoose(_this$props, ["colors", "enabled", "onRefresh", "progressBackgroundColor", "progressViewOffset", "refreshing", "size", "tintColor", "title", "titleColor"]);

    return _react.default.createElement(_View.default, rest);
  };

  return RefreshControl;
}(_react.default.Component);

var _default = RefreshControl;
exports.default = _default;
module.exports = exports.default;