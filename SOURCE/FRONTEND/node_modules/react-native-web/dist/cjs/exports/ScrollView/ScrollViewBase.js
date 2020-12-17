"use strict";

exports.__esModule = true;
exports.default = void 0;

var _debounce = _interopRequireDefault(require("debounce"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var normalizeScrollEvent = function normalizeScrollEvent(e) {
  return {
    nativeEvent: {
      contentOffset: {
        get x() {
          return e.target.scrollLeft;
        },

        get y() {
          return e.target.scrollTop;
        }

      },
      contentSize: {
        get height() {
          return e.target.scrollHeight;
        },

        get width() {
          return e.target.scrollWidth;
        }

      },
      layoutMeasurement: {
        get height() {
          return e.target.offsetHeight;
        },

        get width() {
          return e.target.offsetWidth;
        }

      }
    },
    timeStamp: Date.now()
  };
};
/**
 * Encapsulates the Web-specific scroll throttling and disabling logic
 */


var ScrollViewBase =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ScrollViewBase, _React$Component);

  function ScrollViewBase() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._debouncedOnScrollEnd = (0, _debounce.default)(_this._handleScrollEnd, 100);
    _this._state = {
      isScrolling: false,
      scrollLastTick: 0
    };

    _this._createPreventableScrollHandler = function (handler) {
      return function (e) {
        if (_this.props.scrollEnabled) {
          if (handler) {
            handler(e);
          }
        }
      };
    };

    _this._handleScroll = function (e) {
      e.persist();
      e.stopPropagation();
      var _this$props$scrollEve = _this.props.scrollEventThrottle,
          scrollEventThrottle = _this$props$scrollEve === void 0 ? 0 : _this$props$scrollEve; // A scroll happened, so the scroll bumps the debounce.

      _this._debouncedOnScrollEnd(e);

      if (_this._state.isScrolling) {
        // Scroll last tick may have changed, check if we need to notify
        if (_this._shouldEmitScrollEvent(_this._state.scrollLastTick, scrollEventThrottle)) {
          _this._handleScrollTick(e);
        }
      } else {
        // Weren't scrolling, so we must have just started
        _this._handleScrollStart(e);
      }
    };

    _this._setViewRef = function (element) {
      _this._viewRef = element;
    };

    return _this;
  }

  var _proto = ScrollViewBase.prototype;

  _proto.setNativeProps = function setNativeProps(props) {
    if (this._viewRef) {
      this._viewRef.setNativeProps(props);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        accessibilityLabel = _this$props.accessibilityLabel,
        accessibilityRelationship = _this$props.accessibilityRelationship,
        accessibilityRole = _this$props.accessibilityRole,
        accessibilityState = _this$props.accessibilityState,
        children = _this$props.children,
        importantForAccessibility = _this$props.importantForAccessibility,
        nativeID = _this$props.nativeID,
        onLayout = _this$props.onLayout,
        pointerEvents = _this$props.pointerEvents,
        _this$props$scrollEna = _this$props.scrollEnabled,
        scrollEnabled = _this$props$scrollEna === void 0 ? true : _this$props$scrollEna,
        showsHorizontalScrollIndicator = _this$props.showsHorizontalScrollIndicator,
        showsVerticalScrollIndicator = _this$props.showsVerticalScrollIndicator,
        style = _this$props.style,
        testID = _this$props.testID;
    var hideScrollbar = showsHorizontalScrollIndicator === false || showsVerticalScrollIndicator === false;
    return _react.default.createElement(_View.default, {
      accessibilityLabel: accessibilityLabel,
      accessibilityRelationship: accessibilityRelationship,
      accessibilityRole: accessibilityRole,
      accessibilityState: accessibilityState,
      children: children,
      importantForAccessibility: importantForAccessibility,
      nativeID: nativeID,
      onLayout: onLayout,
      onScroll: this._handleScroll,
      onTouchMove: this._createPreventableScrollHandler(this.props.onTouchMove),
      onWheel: this._createPreventableScrollHandler(this.props.onWheel),
      pointerEvents: pointerEvents,
      ref: this._setViewRef,
      style: [style, !scrollEnabled && styles.scrollDisabled, hideScrollbar && styles.hideScrollbar],
      testID: testID
    });
  };

  _proto._handleScrollStart = function _handleScrollStart(e) {
    this._state.isScrolling = true;
    this._state.scrollLastTick = Date.now();
  };

  _proto._handleScrollTick = function _handleScrollTick(e) {
    var onScroll = this.props.onScroll;
    this._state.scrollLastTick = Date.now();

    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  };

  _proto._handleScrollEnd = function _handleScrollEnd(e) {
    var onScroll = this.props.onScroll;
    this._state.isScrolling = false;

    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  };

  _proto._shouldEmitScrollEvent = function _shouldEmitScrollEvent(lastTick, eventThrottle) {
    var timeSinceLastTick = Date.now() - lastTick;
    return eventThrottle > 0 && timeSinceLastTick >= eventThrottle;
  };

  return ScrollViewBase;
}(_react.default.Component); // Chrome doesn't support e.preventDefault in this case; touch-action must be
// used to disable scrolling.
// https://developers.google.com/web/updates/2017/01/scrolling-intervention


exports.default = ScrollViewBase;

var styles = _StyleSheet.default.create({
  scrollDisabled: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    touchAction: 'none'
  },
  hideScrollbar: {
    scrollbarWidth: 'none'
  }
});

module.exports = exports.default;