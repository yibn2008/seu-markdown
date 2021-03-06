var share = require('../util/share');
var md = require('marked');

exports.markdown = md.parse;

var hlRenderer = new md.Renderer();
hlRenderer.heading = share.header;
hlRenderer.code = share.blockcode;

var hlMarkdown = function (src) {
    var opt = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: true,
        sanitize: false,
        smartLists: true,
        renderer: hlRenderer
    };
    return md(src, opt);
};

exports.render = function (text) {
    return share.normalRender(text, hlMarkdown);
};


var tocRenderer = new md.Renderer();
tocRenderer.heading = share.tocHeader;

var tocMarkdown = function (src) {
    var opt = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: true,
        sanitize: false,
        smartLists: true,
        renderer: tocRenderer
    };
    return md(src, opt);
};

exports.toc = function (text, level) {
    return share.tocRender(text, level, tocMarkdown);
};


var iframeRenderer = new md.Renderer();
iframeRenderer.blockcode = share.iframeBlockcode;
var iframeMarkdown = function (src) {
    var opt = {
        gfm: true,
        tables: false,
        breaks: false,
        pedantic: true,
        sanitize: false,
        smartLists: false,
        renderer: iframeRenderer
    };
    return md(src, opt);
};
exports.iframes = function (text) {
    return share.iframeRender(text, iframeMarkdown);
};
