export interface WangdoNodeType {
  children: WangdoNodeType[];
  nodeType: NodeType;
}

interface ElementDataType {
  tagName: string;
  attributes: object;
}

type NodeType = string | ElementDataType;

function WangdoNode(param: WangdoNodeType) {
  this.children = param.children;
  this.nodeType = param.nodeType;
}

function ElementData(tagName: string, attributes: object) {
  this.tagName = tagName;
  this.attributes = attributes;
}

export function createText(data: string) {
  return new WangdoNode({ children: [], nodeType: data });
}

export function createElement(
  name: string,
  attrs: object,
  children: WangdoNodeType["children"]
) {
  return new WangdoNode({
    children: children,
    nodeType: new ElementData(name, attrs),
  });
}
