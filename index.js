'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var config = require('../../src/magnolia.config');

var nodeName = config.default.mgnlTools.nodeName;
var pageUrl = config.default.mgnlTools.pageUrl;
var templateDefinitionsUrl = config.default.mgnlTools.templateDefinitionsUrl;
var languages = config.default.mgnlTools.languages.split(' ');
var inMgnlEditor =
  typeof window !== 'undefined' &&
  window.self !== window.top &&
  window.location.search.indexOf('mgnlPreview=false') > -1;

var removeCurrentLanguage = function removeCurrentLanguage(string, currentLanguage) {
  return string.replace(new RegExp('/' + currentLanguage + '($|/)'), '/');
};

var mgnlTools = {
  getLanguages: function getLanguages() {
    return languages;
  },
  getCurrentLanguage: function getCurrentLanguage() {
    for (var i = 0; i < languages.length; i++) {
      var language = languages[i];

      if (new RegExp('/' + language + '($|/)').test(window.location.pathname)) {
        return language;
      }
    }

    return languages[0];
  },
  changeLanguage: function changeLanguage(newLanguage) {
    var pathname = window.location.pathname;
    var currentLanguage = mgnlTools.getCurrentLanguage();
    pathname = removeCurrentLanguage(pathname, currentLanguage);

    if (languages[0] !== newLanguage) {
      if (pathname.indexOf(nodeName) > -1) {
        pathname = pathname.replace(new RegExp(nodeName), '/' + newLanguage + nodeName);
      } else {
        pathname = '/' + newLanguage + pathname;
      }
    }

    window.location.href = window.location.origin + pathname + window.location.search;
  },
  getRouterBasename: function getRouterBasename() {
    var pathname = window.location.pathname;

    if (pathname.indexOf(nodeName) > -1) {
      return pathname.replace(new RegExp(nodeName + '.*'), '') + nodeName;
    }

    var currentLanguage = mgnlTools.getCurrentLanguage();
    return languages[0] === currentLanguage ? '/' : '/' + currentLanguage;
  },
  getPage: async function getPage() {
    var currentLanguage = mgnlTools.getCurrentLanguage();
    var url = pageUrl + nodeName + window.location.pathname.replace(new RegExp('(.*' + nodeName + '|.html)', 'g'), '');

    if (currentLanguage !== languages[0]) {
      url = removeCurrentLanguage(url, currentLanguage);
      url += '?lang=' + currentLanguage;
    }

    var contentRes = await fetch(url);
    var content = await contentRes.json();
    var templateDefinitions = {};

    if (inMgnlEditor) {
      var templateDefinitionsRes = await fetch(templateDefinitionsUrl + '/' + content['mgnl:template']);
      templateDefinitions = await templateDefinitionsRes.json();
    }

    return {
      templateDefinitions: templateDefinitions,
      content: content,
      config: config.default,
    };
  },
  refresh: function refresh() {
    if (inMgnlEditor) window.parent.mgnlRefresh();
  },
};
var _default = mgnlTools;
exports.default = _default;