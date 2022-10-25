"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("./dom");
function Parser(pos, input) {
  this.pos = pos;
  this.input = input;
  //현재 문자 읽기
  this.getChar = function () {
    return this.input[this.pos];
  };
  //다음 문자가 주어진 문자열로 시작하는지 확인
  this.startWith = function (str) {
    const arrayStr = Array.from(str);
    let currentPos = this.pos;
    return arrayStr.every((char) => {
      return this.input[currentPos++] === char;
    });
  };
  // 모든 입력을 소비하면 true 반환
  this.isEndInput = () => {
    return this.pos >= this.input.length;
  };
  // 이터레이터를 반환
  this.makeInputIterator = function* (input, start = 0) {
    for (let i = start; i < input.length; i++) {
      yield input[i];
    }
  };
  // 현재 위치의 문자를 소비한다.
  this.consumeChar = () => {
    const iter = this.makeInputIterator(this.input, this.pos);
    const currentChar = iter.next().value;
    this.pos += 1;
    return currentChar;
  };
  this.consumeWhile = (test) => {
    let result = "";
    while (!this.isEndInput() && test(this.getChar())) {
      result += this.consumeChar();
    }
    return result;
  };
  this.consumeWhitespace = () => {
    this.consumeWhile((char) => {
      if (char === " ") {
        return true;
      } else {
        return false;
      }
    });
  };
  this.parseTagName = () => {
    const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const lowerAlpha = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    const upperAlpha = lowerAlpha.map((char) => {
      return char.toUpperCase();
    });
    return this.consumeWhile(function (char) {
      if (
        numberArray.indexOf(parseInt(char)) !== -1 ||
        lowerAlpha.indexOf(char) !== -1 ||
        upperAlpha.indexOf(char) !== -1
      ) {
        return true;
      }
      return false;
    });
  };
  this.parseNode = () => {
    if (this.getChar() === "<") {
      return this.parseElement();
    }
    return this.parseText();
  };
  this.parseText = () => {
    return (0, dom_1.createText)(
      this.consumeWhile((char) => {
        if (char !== "<") {
          return true;
        }
        return false;
      })
    );
  };
  this.parseElement = () => {
    console.assert(this.consumeChar() === "<", "char is not <");
    const tagName = this.parseTagName();
    const attrs = this.parseAttributes();
    console.assert(this.consumeChar() === ">", "char is not >");
    const children = this.parseNodes();
    console.assert(this.consumeChar() === "<", "char is not <");
    console.assert(this.consumeChar() === "/", "char is not /");
    console.assert(
      this.parseTagName() === tagName,
      "There is no tage name in closing tag"
    );
    console.assert(this.consumeChar() === ">", "char is not >");
    return (0, dom_1.createElement)(tagName, attrs, children);
  };
  this.parseAttr = () => {
    const name = this.parseTagName();
    console.assert(
      this.consumeChar() === "=",
      "there is no '=' between attribute name and attribute value"
    );
    const value = this.parseAttrValue();
    return { name, value };
  };
  this.parseAttrValue = () => {
    const openQuote = this.consumeChar();
    console.assert(openQuote === '"', "open quote error");
    const value = this.consumeWhile((char) => {
      if (char !== openQuote) {
        return true;
      }
      return false;
    });
    console.assert(this.consumeChar() === openQuote, "close quote error");
    return value;
  };
  this.parseAttributes = () => {
    let attributes = {};
    while (true) {
      this.consumeWhitespace();
      if (this.getChar() === ">") break;
      const { name, value } = this.parseAttr();
      attributes[name] = value;
    }
    return attributes;
  };
  this.parseNodes = () => {
    let nodes = [];
    while (true) {
      this.consumeWhitespace();
      if (this.isEndInput() || this.startWith("</")) break;
      nodes.push(this.parseNode());
    }
    return nodes;
  };
  this.parse = () => {
    const nodes = this.parseNodes();
    if (nodes.length === 1) return nodes.pop();
    return (0, dom_1.createElement)("html", {}, nodes);
  };
}
const html = `<html><body><h1>Title</h1><div id="main" class="test"><p>Hello<em>world</em>!</p></div></body></html>`;
const parser = new Parser(0, html);
const root = parser.parse();
console.log(root);
