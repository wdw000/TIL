"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.createText = exports.WangdoNode = void 0;
class WangdoNode {
    children;
    nodeType;
    constructor({ children, nodeType }) {
        this.children = children;
        this.nodeType = nodeType;
    }
}
exports.WangdoNode = WangdoNode;
class ElementData {
    tagName;
    attributes;
    constructor({ tagName, attributes }) {
        this.tagName = tagName;
        this.attributes = attributes;
    }
    getID() {
        return this.attributes["id"];
    }
    getClasses() {
        return this.attributes["class"];
    }
}
function createText(data) {
    return new WangdoNode({ children: [], nodeType: data });
}
exports.createText = createText;
function createElement(name, attrs, children) {
    return new WangdoNode({
        children,
        nodeType: new ElementData({ tagName: name, attributes: attrs }),
    });
}
exports.createElement = createElement;
