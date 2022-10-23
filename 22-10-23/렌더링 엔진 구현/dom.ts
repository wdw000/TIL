interface WangdoNode {
  children: Array<WangdoNode>;
  nodeType: string;
}

interface ElementData {
  tagName: string;
  attributes: AttrMap;
}

type AttrMap = Map<string, string>;

type NodeType = string | ElementData;

function WangdoNode(children: WangdoNode, nodeType: NodeType) {
  this.children = children;
  this.nodeType = nodeType;
}

function ElementData(tagName: string, attributes: AttrMap) {
  this.tagName = tagName;
  this.attributes = attributes;
}
