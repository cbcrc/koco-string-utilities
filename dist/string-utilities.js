(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'url-slug', 'he'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('url-slug'), require('he'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.urlSlug, global.he);
    global.stringUtilities = mod.exports;
  }
})(this, function (exports, _urlSlug, _he) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _urlSlug2 = _interopRequireDefault(_urlSlug);

  var _he2 = _interopRequireDefault(_he);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var StringUtilities = function () {
    function StringUtilities() {
      _classCallCheck(this, StringUtilities);
    }

    _createClass(StringUtilities, [{
      key: 'equalsIgnoreCase',
      value: function equalsIgnoreCase(first, second) {
        return (first || '').toLowerCase() === (second || '').toLowerCase();
      }
    }, {
      key: 'caseInsensitiveCmp',
      value: function caseInsensitiveCmp(left, right) {
        return this.equalsIgnoreCase(left, right);
      }
    }, {
      key: 'startsWithIgnoreCase',
      value: function startsWithIgnoreCase(first, second) {
        first = first || '';
        second = second || '';
        return this.equalsIgnoreCase(first.substr(0, second.length), second);
      }
    }, {
      key: 'capitaliseFirstLetter',
      value: function capitaliseFirstLetter(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }, {
      key: 'uncapitaliseFirstLetter',
      value: function uncapitaliseFirstLetter(value) {
        return value.charAt(0).toLowerCase() + value.slice(1);
      }
    }, {
      key: 'stripHtmlFromText',
      value: function stripHtmlFromText(text) {
        return text.replace(/&nbsp;/g, ' ').replace(/<(?:.|\n)*?>/g, '');
      }
    }, {
      key: 'containsHtmlInText',
      value: function containsHtmlInText(text) {
        var nbsps = text.match(/&nbsp;/g);
        var tags = text.match(/<(?:.|\n)*?>/g);

        return nbsps || tags;
      }
    }, {
      key: 'trimRight',
      value: function trimRight(text, charlist) {
        if (!text) {
          return '';
        }

        if (text.toString) {
          text = text.toString();
        }

        if (charlist === undefined) {
          charlist = '\s';
        }

        return text.replace(new RegExp('[' + charlist + ']+$'), '');
      }
    }, {
      key: 'toSlug',
      value: function toSlug(text) {
        if (!text) {
          return '';
        }

        return (0, _urlSlug2.default)(this.decodeHtmlEntities(this.stripHtmlFromText(text)));
      }
    }, {
      key: 'encodeHtmlEntities',
      value: function encodeHtmlEntities(text) {
        return _he2.default.encode(text, {
          useNamedReferences: false
        });
      }
    }, {
      key: 'decodeHtmlEntities',
      value: function decodeHtmlEntities(text) {
        return _he2.default.decode(text);
      }
    }]);

    return StringUtilities;
  }();

  exports.default = new StringUtilities();
});