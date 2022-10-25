export class WangdoNode {
  children: WangdoNode[];
  nodeType: string | ElementData;

  constructor({ children, nodeType }) {
    this.children = children;
    this.nodeType = nodeType;
  }
}

class ElementData {
  tagName: string;
  attributes: object;

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

export function createText(data: string) {
  return new WangdoNode({ children: [], nodeType: data });
}

export function createElement(
  name: string,
  attrs: object,
  children: WangdoNode[]
) {
  return new WangdoNode({
    children,
    nodeType: new ElementData({ tagName: name, attributes: attrs }),
  });
}
