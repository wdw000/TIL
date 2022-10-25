"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const dom_class_1 = require("./dom-class");
const node_assert_1 = __importDefault(require("node:assert"));
class Parser {
    pos;
    input;
    constructor(input, pos) {
        this.input = input;
        this.pos = pos;
    }
    getChar() {
        return this.input[this.pos];
    }
    startWith(str) {
        const charArray = Array.from(str);
        let currentPos = this.pos;
        return charArray.every((char) => {
            return this.input[currentPos++] === char;
        });
    }
    isEndofInput() {
        return this.pos >= this.input.length;
    }
    makeInputIterator = function* (input, start = 0) {
        for (let i = start; i < input.length; i++) {
            yield input[i];
        }
    };
    consumeChar() {
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
        this.consumeWhile((char) => {
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
        return this.consumeWhile(function (char) {
            if (numberArray.indexOf(parseInt(char)) !== -1 ||
                lowerAlpha.indexOf(char) !== -1 ||
                upperAlpha.indexOf(char) !== -1) {
                return true;
            }
            return false;
        });
    }
    parseNode() {
        if (this.getChar() === "<")
            return this.parseElement();
        return this.parseText();
    }
    parseText() {
        return (0, dom_class_1.createText)(this.consumeWhile(function (char) {
            if (char !== "<")
                return true;
            return false;
        }));
    }
    parseElement() {
        (0, node_assert_1.default)(this.consumeChar() === "<", "char is not <");
        const tagName = this.parseTagName();
        const attributes = this.parseAttributes();
        (0, node_assert_1.default)(this.consumeChar() === ">", "char is not >");
        const children = this.parseNodes();
        (0, node_assert_1.default)(this.consumeChar() === "<", "char is not <");
        (0, node_assert_1.default)(this.consumeChar() === "/", "char is not /");
        (0, node_assert_1.default)(this.parseTagName() === tagName, "There is no tag name in closing tag");
        (0, node_assert_1.default)(this.consumeChar() === ">", "char is not >");
        return (0, dom_class_1.createElement)(tagName, attributes, children);
    }
    parseAttr() {
        const name = this.parseTagName();
        (0, node_assert_1.default)(this.consumeChar() === "=", "there is no = between attribute name and attribute value");
        const value = this.parseAttrValue();
        return { name, value };
    }
    parseAttrValue() {
        const openQuote = this.consumeChar();
        (0, node_assert_1.default)(openQuote === '"', "open quote error");
        const value = this.consumeWhile(function (char) {
            if (char !== openQuote)
                return true;
            return false;
        });
        (0, node_assert_1.default)(this.consumeChar() === openQuote, "close quote error");
        return value;
    }
    parseAttributes() {
        let attributes = {};
        while (true) {
            this.consumeWhitespace();
            if (this.getChar() === ">")
                break;
            const { name, value } = this.parseAttr();
            attributes[name] = value;
        }
        return attributes;
    }
    parseNodes() {
        let nodes = [];
        while (true) {
            this.consumeWhitespace();
            if (this.isEndofInput() || this.startWith("</"))
                break;
            nodes.push(this.parseNode());
        }
        return nodes;
    }
    parse() {
        const nodes = this.parseNodes();
        if (nodes.length === 1)
            return nodes.pop();
        return (0, dom_class_1.createElement)("html", {}, nodes);
    }
}
exports.Parser = Parser;
