"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.createText = void 0;
function WangdoNode(param) {
    this.children = param.children;
    this.nodeType = param.nodeType;
}
function ElementData(tagName, attributes) {
    this.tagName = tagName;
    this.attributes = attributes;
}
function createText(data) {
    return new WangdoNode({ children: [], nodeType: data });
}
exports.createText = createText;
function createElement(name, attrs, children) {
    return new WangdoNode({
        children: children,
        nodeType: new ElementData(name, attrs),
    });
}
exports.createElement = createElement;
