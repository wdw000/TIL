"use strict";
exports.__esModule = true;
exports.createElement = exports.createText = exports.WangdoNode = void 0;
var WangdoNode = /** @class */ (function () {
    function WangdoNode(_a) {
        var children = _a.children, nodeType = _a.nodeType;
        this.children = children;
        this.nodeType = nodeType;
    }
    return WangdoNode;
}());
exports.WangdoNode = WangdoNode;
var ElementData = /** @class */ (function () {
    function ElementData(_a) {
        var tagName = _a.tagName, attributes = _a.attributes;
        this.tagName = tagName;
        this.attributes = attributes;
    }
    ElementData.prototype.getID = function () {
        return this.attributes["id"];
    };
    ElementData.prototype.getClasses = function () {
        return this.attributes["class"];
    };
    return ElementData;
}());
function createText(data) {
    return new WangdoNode({ children: [], nodeType: data });
}
exports.createText = createText;
function createElement(name, attrs, children) {
    return new WangdoNode({
        children: children,
        nodeType: new ElementData({ tagName: name, attributes: attrs })
    });
}
exports.createElement = createElement;
