"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _createElement = _interopRequireDefault(require("../createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var PickerItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PickerItem, _React$Component);

  function PickerItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PickerItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        color = _this$props.color,
        label = _this$props.label,
        testID = _this$props.testID,
        value = _this$props.value;
    var style = {
      color: color
    };
    return (0, _createElement.default)('option', {
      style: style,
      testID: testID,
      value: value
    }, label);
  };

  return PickerItem;
}(_react.default.Component);

exports.default = PickerItem;
module.exports = exports.default;