import { createElement, createText, WangdoNode } from "./dom-class";
import assert from "node:assert";

export class Parser {
  pos: number;
  input: string;

  constructor(input: string, pos: number) {
    this.input = input;
    this.pos = pos;
  }

  getChar() {
    return this.input[this.pos];
  }

  startWith(str: string) {
    const charArray = Array.from(str);
    let currentPos = this.pos;

    return charArray.every((char: string) => {
      return this.input[currentPos++] === char;
    });
  }

  isEndofInput() {
    return this.pos >= this.input.length;
  }

  makeInputIterator = function* (input: string, start = 0): Generator {
    for (let i = start; i < input.length; i++) {
      yield input[i];
    }
  };

  consumeChar(): string {
    const inputIterator = this.makeInputIterator(this.input, this.pos);
    const currentChar = inputIterator.next().value;
    this.pos += 1;

    return currentChar;
  }

  consumeWhile(test) {
    let result = "";

    while (!this.isEndofInput() && test(this.getChar())) {
      result += this.consumeChar();
    }

    return result;
  }

  consumeWhitespace() {
    this.consumeWhile((char: string) => {
      if (char === " ") {
        return true;
      }

      return false;
    });
  }

  parseTagName() {
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

    return this.consumeWhile(function (char: string) {
      if (
        numberArray.indexOf(parseInt(char)) !== -1 ||
        lowerAlpha.indexOf(char) !== -1 ||
        upperAlpha.indexOf(char) !== -1
      ) {
        return true;
      }
      return false;
    });
  }

  parseNode() {
    if (this.getChar() === "<") return this.parseElement();

    return this.parseText();
  }

  parseText() {
    return createText(
      this.consumeWhile(function (char: string) {
        if (char !== "<") return true;

        return false;
      })
    );
  }

  parseElement() {
    assert(this.consumeChar() === "<", "char is not <");

    const tagName = this.parseTagName();
    const attributes = this.parseAttributes();

    assert(this.consumeChar() === ">", "char is not >");

    const children = this.parseNodes();

    assert(this.consumeChar() === "<", "char is not <");
    assert(this.consumeChar() === "/", "char is not /");
    assert(
      this.parseTagName() === tagName,
      "There is no tag name in closing tag"
    );
    assert(this.consumeChar() === ">", "char is not >");

    return createElement(tagName, attributes, children);
  }

  parseAttr() {
    const name = this.parseTagName();

    assert(
      this.consumeChar() === "=",
      "there is no = between attribute name and attribute value"
    );

    const value = this.parseAttrValue();

    return { name, value };
  }

  parseAttrValue() {
    const openQuote = this.consumeChar();

    assert(openQuote === '"', "open quote error");

    const value = this.consumeWhile(function (char: string) {
      if (char !== openQuote) return true;

      return false;
    });

    assert(this.consumeChar() === openQuote, "close quote error");

    return value;
  }

  parseAttributes() {
    let attributes = {};

    while (true) {
      this.consumeWhitespace();

      if (this.getChar() === ">") break;

      const { name, value } = this.parseAttr();
      attributes[name] = value;
    }

    return attributes;
  }

  parseNodes() {
    let nodes: WangdoNode[] = [];

    while (true) {
      this.consumeWhitespace();

      if (this.isEndofInput() || this.startWith("</")) break;

      nodes.push(this.parseNode());
    }

    return nodes;
  }

  parse() {
    const nodes = this.parseNodes();

    if (nodes.length === 1) return nodes.pop();

    return createElement("html", {}, nodes);
  }
}
