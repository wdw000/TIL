import { createElement, createText, WangdoNodeType } from "./dom";
import assert from "node:assert";

function Parser(pos: Number, input: string) {
  this.pos = pos;
  this.input = input;

  //현재 문자 읽기
  this.getChar = function (): string {
    return this.input[this.pos];
  };

  //다음 문자가 주어진 문자열로 시작하는지 확인
  this.startWith = function (str: string): boolean {
    const arrayStr = Array.from(str);
    let currentPos = this.pos;

    return arrayStr.every((char) => {
      return this.input[currentPos++] === char;
    });
  };

  // 모든 입력을 소비하면 true 반환
  this.isEndInput = (): boolean => {
    return this.pos >= this.input.length;
  };

  // 이터레이터를 반환
  this.makeInputIterator = function* (input: string, start = 0): Generator {
    for (let i = start; i < input.length; i++) {
      yield input[i];
    }
  };

  // 현재 위치의 문자를 소비한다.
  this.consumeChar = (): string => {
    const iter = this.makeInputIterator(this.input, this.pos);
    const currentChar = iter.next().value;

    this.pos += 1;
    return currentChar;
  };

  this.consumeWhile = (test: (char: string) => boolean): string => {
    let result = "";

    while (!this.isEndInput() && test(this.getChar())) {
      result += this.consumeChar();
    }

    return result;
  };

  this.consumeWhitespace = () => {
    this.consumeWhile((char: string) => {
      if (char === " ") {
        return true;
      } else {
        return false;
      }
    });
  };

  this.parseTagName = () => {
    const reg = /[a-zA-Z0-9]/;

    return this.consumeWhile((char: string) => {
      return reg.test(char);
    });
  };

  this.parseNode = () => {
    if (this.getChar() === "<") {
      return this.parseElement();
    }

    return this.parseText();
  };

  this.parseText = () => {
    return createText(
      this.consumeWhile((char: string) => {
        if (char !== "<") {
          return true;
        }

        return false;
      })
    );
  };

  this.parseElement = () => {
    assert(this.consumeChar() === "<", "char is not <");

    const tagName = this.parseTagName();
    const attrs = this.parseAttributes();

    assert(this.consumeChar() === ">", "char is not >");

    const children = this.parseNodes();

    assert(this.consumeChar() === "<", "char is not <");
    assert(this.consumeChar() === "/", "char is not /");
    assert(
      this.parseTagName() === tagName,
      "There is no tage name in closing tag"
    );
    assert(this.consumeChar() === ">", "char is not >");

    return createElement(tagName, attrs, children);
  };

  this.parseAttr = () => {
    const name = this.parseTagName();

    assert(
      this.consumeChar() === "=",
      "there is no '=' between attribute name and attribute value"
    );

    const value = this.parseAttrValue();

    return { name, value };
  };

  this.parseAttrValue = () => {
    const openQuote = this.consumeChar();

    assert(openQuote === '"', "open quote error");

    const value = this.consumeWhile((char: string) => {
      if (char !== openQuote) {
        return true;
      }

      return false;
    });

    assert(this.consumeChar() === openQuote, "close quote error");

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
    let nodes: WangdoNodeType[] = [];

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

    return createElement("html", {}, nodes);
  };
}

const html = `<html id="root" class="test"><body><h1>Title</h1><div id="main" class="test"><p>Hello<em>world</em>!</p></div></body></html>`;
const parser = new Parser(0, html);

console.log(parser.parse());
