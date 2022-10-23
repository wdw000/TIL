interface WangdoNodeType {
  children: WangdoNodeType[];
  nodeType: NodeType;
}

interface ElementDataType {
  tagName: string;
  attributes: AttrMap;
}

type NodeType = string | ElementDataType;

type AttrMap = Map<string, string>;

function WangdoNode(param: WangdoNodeType) {
  this.children = param.children;
  this.nodeType = param.nodeType;
}

function ElementData(tagName: string, attributes: AttrMap) {
  this.tagName = tagName;
  this.attributes = attributes;
}

function createText(data: string) {
  return new WangdoNode({ children: [], nodeType: data });
}

function createElement(
  name: string,
  attrs: AttrMap,
  children: WangdoNodeType["children"]
) {
  return new WangdoNode({
    children: children,
    nodeType: new ElementData(name, attrs),
  });
}
