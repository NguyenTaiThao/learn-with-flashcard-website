"use strict";

exports.__esModule = true;
exports.default = void 0;

var _applyNativeMethods = _interopRequireDefault(require("../../modules/applyNativeMethods"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _css = _interopRequireDefault(require("../StyleSheet/css"));

var _AssetRegistry = require("../../modules/AssetRegistry");

var _resolveShadowValue = _interopRequireDefault(require("../StyleSheet/resolveShadowValue"));

var _ImageLoader = _interopRequireDefault(require("../../modules/ImageLoader"));

var _ImageUriCache = _interopRequireDefault(require("./ImageUriCache"));

var _PixelRatio = _interopRequireDefault(require("../PixelRatio"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextAncestorContext = _interopRequireDefault(require("../Text/TextAncestorContext"));

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var STATUS_ERRORED = 'ERRORED';
var STATUS_LOADED = 'LOADED';
var STATUS_LOADING = 'LOADING';
var STATUS_PENDING = 'PENDING';
var STATUS_IDLE = 'IDLE';

var getImageState = function getImageState(uri, shouldDisplaySource) {
  return shouldDisplaySource ? STATUS_LOADED : uri ? STATUS_PENDING : STATUS_IDLE;
};

var resolveAssetDimensions = function resolveAssetDimensions(source) {
  if (typeof source === 'number') {
    var _getAssetByID = (0, _AssetRegistry.getAssetByID)(source),
        height = _getAssetByID.height,
        width = _getAssetByID.width;

    return {
      height: height,
      width: width
    };
  } else if (typeof source === 'object') {
    var _height = source.height,
        _width = source.width;
    return {
      height: _height,
      width: _width
    };
  }
};

var svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

var resolveAssetUri = function resolveAssetUri(source) {
  var uri = '';

  if (typeof source === 'number') {
    // get the URI from the packager
    var asset = (0, _AssetRegistry.getAssetByID)(source);
    var scale = asset.scales[0];

    if (asset.scales.length > 1) {
      var preferredScale = _PixelRatio.default.get(); // Get the scale which is closest to the preferred scale


      scale = asset.scales.reduce(function (prev, curr) {
        return Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev;
      });
    }

    var scaleSuffix = scale !== 1 ? "@" + scale + "x" : '';
    uri = asset ? asset.httpServerLocation + "/" + asset.name + scaleSuffix + "." + asset.type : '';
  } else if (typeof source === 'string') {
    uri = source;
  } else if (source && typeof source.uri === 'string') {
    uri = source.uri;
  }

  if (uri) {
    var match = uri.match(svgDataUriPattern); // inline SVG markup may contain characters (e.g., #, ") that need to be escaped

    if (match) {
      var prefix = match[1],
          svg = match[2];
      var encodedSvg = encodeURIComponent(svg);
      return "" + prefix + encodedSvg;
    }
  }

  return uri;
};

var filterId = 0;

var createTintColorSVG = function createTintColorSVG(tintColor, id) {
  return tintColor && id != null ? _react.default.createElement("svg", {
    style: {
      position: 'absolute',
      height: 0,
      visibility: 'hidden',
      width: 0
    }
  }, _react.default.createElement("defs", null, _react.default.createElement("filter", {
    id: "tint-" + id
  }, _react.default.createElement("feFlood", {
    floodColor: "" + tintColor
  }), _react.default.createElement("feComposite", {
    in2: "SourceAlpha",
    operator: "atop"
  })))) : null;
};

var Image =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Image, _React$Component);

  Image.getSize = function getSize(uri, success, failure) {
    _ImageLoader.default.getSize(uri, success, failure);
  };

  Image.prefetch = function prefetch(uri) {
    return _ImageLoader.default.prefetch(uri).then(function () {
      // Add the uri to the cache so it can be immediately displayed when used
      // but also immediately remove it to correctly reflect that it has no active references
      _ImageUriCache.default.add(uri);

      _ImageUriCache.default.remove(uri);
    });
  };

  Image.queryCache = function queryCache(uris) {
    var result = {};
    uris.forEach(function (u) {
      if (_ImageUriCache.default.has(u)) {
        result[u] = 'disk/memory';
      }
    });
    return Promise.resolve(result);
  };

  function Image(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this; // If an image has been loaded before, render it immediately

    _this._filterId = 0;
    _this._imageRef = null;
    _this._imageRequestId = null;
    _this._imageState = null;
    _this._isMounted = false;

    _this._createLayoutHandler = function (resizeMode) {
      var onLayout = _this.props.onLayout;

      if (resizeMode === 'center' || resizeMode === 'repeat' || onLayout) {
        return function (e) {
          var layout = e.nativeEvent.layout;
          onLayout && onLayout(e);

          _this.setState(function () {
            return {
              layout: layout
            };
          });
        };
      }
    };

    _this._getBackgroundSize = function (resizeMode) {
      if (_this._imageRef && (resizeMode === 'center' || resizeMode === 'repeat')) {
        var _this$_imageRef = _this._imageRef,
            naturalHeight = _this$_imageRef.naturalHeight,
            naturalWidth = _this$_imageRef.naturalWidth;
        var _this$state$layout = _this.state.layout,
            height = _this$state$layout.height,
            width = _this$state$layout.width;

        if (naturalHeight && naturalWidth && height && width) {
          var scaleFactor = Math.min(1, width / naturalWidth, height / naturalHeight);
          var x = Math.ceil(scaleFactor * naturalWidth);
          var y = Math.ceil(scaleFactor * naturalHeight);
          return {
            backgroundSize: x + "px " + y + "px"
          };
        }
      }
    };

    _this._onError = function () {
      var _this$props = _this.props,
          onError = _this$props.onError,
          source = _this$props.source;

      _this._updateImageState(STATUS_ERRORED);

      if (onError) {
        onError({
          nativeEvent: {
            error: "Failed to load resource " + resolveAssetUri(source) + " (404)"
          }
        });
      }

      _this._onLoadEnd();
    };

    _this._onLoad = function (e) {
      var _this$props2 = _this.props,
          onLoad = _this$props2.onLoad,
          source = _this$props2.source;
      var event = {
        nativeEvent: e
      };

      _ImageUriCache.default.add(resolveAssetUri(source));

      _this._updateImageState(STATUS_LOADED);

      if (onLoad) {
        onLoad(event);
      }

      _this._onLoadEnd();
    };

    _this._setImageRef = function (ref) {
      _this._imageRef = ref;
    };

    var uri = resolveAssetUri(props.source);

    var shouldDisplaySource = _ImageUriCache.default.has(uri);

    _this.state = {
      layout: {},
      shouldDisplaySource: shouldDisplaySource
    };
    _this._imageState = getImageState(uri, shouldDisplaySource);
    _this._filterId = filterId;
    filterId++;
    return _this;
  }

  var _proto = Image.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;

    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    } else if (this._imageState === STATUS_LOADED) {
      this._onLoad({
        target: this._imageRef
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevUri = resolveAssetUri(prevProps.source);
    var uri = resolveAssetUri(this.props.source);
    var hasDefaultSource = this.props.defaultSource != null;

    if (prevUri !== uri) {
      _ImageUriCache.default.remove(prevUri);

      var isPreviouslyLoaded = _ImageUriCache.default.has(uri);

      isPreviouslyLoaded && _ImageUriCache.default.add(uri);

      this._updateImageState(getImageState(uri, isPreviouslyLoaded), hasDefaultSource);
    } else if (hasDefaultSource && prevProps.defaultSource !== this.props.defaultSource) {
      this._updateImageState(this._imageState, hasDefaultSource);
    }

    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var uri = resolveAssetUri(this.props.source);

    _ImageUriCache.default.remove(uri);

    this._destroyImageLoader();

    this._isMounted = false;
  };

  _proto.renderImage = function renderImage(hasTextAncestor) {
    var shouldDisplaySource = this.state.shouldDisplaySource;
    var _this$props3 = this.props,
        accessibilityLabel = _this$props3.accessibilityLabel,
        accessibilityRelationship = _this$props3.accessibilityRelationship,
        accessibilityRole = _this$props3.accessibilityRole,
        accessibilityState = _this$props3.accessibilityState,
        accessible = _this$props3.accessible,
        blurRadius = _this$props3.blurRadius,
        defaultSource = _this$props3.defaultSource,
        draggable = _this$props3.draggable,
        importantForAccessibility = _this$props3.importantForAccessibility,
        nativeID = _this$props3.nativeID,
        pointerEvents = _this$props3.pointerEvents,
        resizeMode = _this$props3.resizeMode,
        source = _this$props3.source,
        testID = _this$props3.testID;

    if (process.env.NODE_ENV !== 'production') {
      if (this.props.children) {
        throw new Error('The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.');
      }
    }

    var selectedSource = shouldDisplaySource ? source : defaultSource;
    var displayImageUri = resolveAssetUri(selectedSource);
    var imageSizeStyle = resolveAssetDimensions(selectedSource);
    var backgroundImage = displayImageUri ? "url(\"" + displayImageUri + "\")" : null;

    var flatStyle = _objectSpread({}, _StyleSheet.default.flatten(this.props.style));

    var finalResizeMode = resizeMode || flatStyle.resizeMode || 'cover'; // CSS filters

    var filters = [];
    var tintColor = flatStyle.tintColor;

    if (flatStyle.filter) {
      filters.push(flatStyle.filter);
    }

    if (blurRadius) {
      filters.push("blur(" + blurRadius + "px)");
    }

    if (flatStyle.shadowOffset) {
      var shadowString = (0, _resolveShadowValue.default)(flatStyle);

      if (shadowString) {
        filters.push("drop-shadow(" + shadowString + ")");
      }
    }

    if (flatStyle.tintColor) {
      filters.push("url(#tint-" + this._filterId + ")");
    } // these styles were converted to filters


    delete flatStyle.shadowColor;
    delete flatStyle.shadowOpacity;
    delete flatStyle.shadowOffset;
    delete flatStyle.shadowRadius;
    delete flatStyle.tintColor; // these styles are not supported on View

    delete flatStyle.overlayColor;
    delete flatStyle.resizeMode; // Accessibility image allows users to trigger the browser's image context menu

    var hiddenImage = displayImageUri ? (0, _createElement.default)('img', {
      alt: accessibilityLabel || '',
      classList: [classes.accessibilityImage],
      draggable: draggable || false,
      ref: this._setImageRef,
      src: displayImageUri
    }) : null;
    return _react.default.createElement(_View.default, {
      accessibilityLabel: accessibilityLabel,
      accessibilityRelationship: accessibilityRelationship,
      accessibilityRole: accessibilityRole,
      accessibilityState: accessibilityState,
      accessible: accessible,
      importantForAccessibility: importantForAccessibility,
      nativeID: nativeID,
      onLayout: this._createLayoutHandler(finalResizeMode),
      pointerEvents: pointerEvents,
      style: [styles.root, hasTextAncestor && styles.inline, imageSizeStyle, flatStyle],
      testID: testID
    }, _react.default.createElement(_View.default, {
      style: [styles.image, resizeModeStyles[finalResizeMode], this._getBackgroundSize(finalResizeMode), backgroundImage && {
        backgroundImage: backgroundImage
      }, filters.length > 0 && {
        filter: filters.join(' ')
      }]
    }), hiddenImage, createTintColorSVG(tintColor, this._filterId));
  };

  _proto.render = function render() {
    var _this2 = this;

    return _react.default.createElement(_TextAncestorContext.default.Consumer, null, function (hasTextAncestor) {
      return _this2.renderImage(hasTextAncestor);
    });
  };

  _proto._createImageLoader = function _createImageLoader() {
    var source = this.props.source;

    this._destroyImageLoader();

    var uri = resolveAssetUri(source);
    this._imageRequestId = _ImageLoader.default.load(uri, this._onLoad, this._onError);

    this._onLoadStart();
  };

  _proto._destroyImageLoader = function _destroyImageLoader() {
    if (this._imageRequestId) {
      _ImageLoader.default.abort(this._imageRequestId);

      this._imageRequestId = null;
    }
  };

  _proto._onLoadEnd = function _onLoadEnd() {
    var onLoadEnd = this.props.onLoadEnd;

    if (onLoadEnd) {
      onLoadEnd();
    }
  };

  _proto._onLoadStart = function _onLoadStart() {
    var _this$props4 = this.props,
        defaultSource = _this$props4.defaultSource,
        onLoadStart = _this$props4.onLoadStart;

    this._updateImageState(STATUS_LOADING, defaultSource != null);

    if (onLoadStart) {
      onLoadStart();
    }
  };

  _proto._updateImageState = function _updateImageState(status, hasDefaultSource) {
    if (hasDefaultSource === void 0) {
      hasDefaultSource = false;
    }

    this._imageState = status;
    var shouldDisplaySource = this._imageState === STATUS_LOADED || this._imageState === STATUS_LOADING && !hasDefaultSource; // only triggers a re-render when the image is loading and has no default image (to support PJPEG), loaded, or failed

    if (shouldDisplaySource !== this.state.shouldDisplaySource) {
      if (this._isMounted) {
        this.setState(function () {
          return {
            shouldDisplaySource: shouldDisplaySource
          };
        });
      }
    }
  };

  return Image;
}(_react.default.Component);

Image.displayName = 'Image';

var classes = _css.default.create({
  accessibilityImage: _objectSpread({}, _StyleSheet.default.absoluteFillObject, {
    height: '100%',
    opacity: 0,
    width: '100%',
    zIndex: -1
  })
});

var styles = _StyleSheet.default.create({
  root: {
    flexBasis: 'auto',
    overflow: 'hidden',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  },
  image: _objectSpread({}, _StyleSheet.default.absoluteFillObject, {
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    zIndex: -1
  })
});

var resizeModeStyles = _StyleSheet.default.create({
  center: {
    backgroundSize: 'auto'
  },
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundPosition: '0 0',
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundPosition: '0 0',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});

var _default = (0, _applyNativeMethods.default)(Image);

exports.default = _default;
module.exports = exports.default;