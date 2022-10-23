"use strict";
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
function createElement(name, attrs, children) {
    return new WangdoNode({
        children: children,
        nodeType: new ElementData(name, attrs),
    });
}
