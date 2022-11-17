"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Parser = void 0;
var dom_class_1 = require("./dom-class");
var node_assert_1 = require("node:assert");
var Parser = /** @class */ (function () {
    function Parser(input, pos) {
        this.makeInputIterator = function (input, start) {
            var i;
            if (start === void 0) { start = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = start;
                        _a.label = 1;
                    case 1:
                        if (!(i < input.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, input[i]];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        };
        this.input = input;
        this.pos = pos;
    }
    Parser.prototype.getChar = function () {
        return this.input[this.pos];
    };
    Parser.prototype.startWith = function (str) {
        var _this = this;
        var charArray = Array.from(str);
        var currentPos = this.pos;
        return charArray.every(function (char) {
            return _this.input[currentPos++] === char;
        });
    };
    Parser.prototype.isEndofInput = function () {
        return this.pos >= this.input.length;
    };
    Parser.prototype.consumeChar = function () {
        var inputIterator = this.makeInputIterator(this.input, this.pos);
        var currentChar = inputIterator.next().value;
        this.pos += 1;
        return currentChar;
    };
    Parser.prototype.consumeWhile = function (test) {
        var result = "";
        while (!this.isEndofInput() && test(this.getChar())) {
            result += this.consumeChar();
        }
        return result;
    };
    Parser.prototype.consumeWhitespace = function () {
        this.consumeWhile(function (char) {
            if (char === " ") {
                return true;
            }
            return false;
        });
    };
    Parser.prototype.parseTagName = function () {
        var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        var lowerAlpha = [
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
        var upperAlpha = lowerAlpha.map(function (char) {
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
    };
    Parser.prototype.parseNode = function () {
        if (this.getChar() === "<")
            return this.parseElement();
        return this.parseText();
    };
    Parser.prototype.parseText = function () {
        return (0, dom_class_1.createText)(this.consumeWhile(function (char) {
            if (char !== "<")
                return true;
            return false;
        }));
    };
    Parser.prototype.parseElement = function () {
        (0, node_assert_1["default"])(this.consumeChar() === "<", "char is not <");
        var tagName = this.parseTagName();
        var attributes = this.parseAttributes();
        (0, node_assert_1["default"])(this.consumeChar() === ">", "char is not >");
        var children = this.parseNodes();
        (0, node_assert_1["default"])(this.consumeChar() === "<", "char is not <");
        (0, node_assert_1["default"])(this.consumeChar() === "/", "char is not /");
        (0, node_assert_1["default"])(this.parseTagName() === tagName, "There is no tag name in closing tag");
        (0, node_assert_1["default"])(this.consumeChar() === ">", "char is not >");
        return (0, dom_class_1.createElement)(tagName, attributes, children);
    };
    Parser.prototype.parseAttr = function () {
        var name = this.parseTagName();
        (0, node_assert_1["default"])(this.consumeChar() === "=", "there is no = between attribute name and attribute value");
        var value = this.parseAttrValue();
        return { name: name, value: value };
    };
    Parser.prototype.parseAttrValue = function () {
        var openQuote = this.consumeChar();
        (0, node_assert_1["default"])(openQuote === '"', "open quote error");
        var value = this.consumeWhile(function (char) {
            if (char !== openQuote)
                return true;
            return false;
        });
        (0, node_assert_1["default"])(this.consumeChar() === openQuote, "close quote error");
        return value;
    };
    Parser.prototype.parseAttributes = function () {
        var attributes = {};
        while (true) {
            this.consumeWhitespace();
            if (this.getChar() === ">")
                break;
            var _a = this.parseAttr(), name_1 = _a.name, value = _a.value;
            attributes[name_1] = value;
        }
        return attributes;
    };
    Parser.prototype.parseNodes = function () {
        var nodes = [];
        while (true) {
            this.consumeWhitespace();
            if (this.isEndofInput() || this.startWith("</"))
                break;
            nodes.push(this.parseNode());
        }
        return nodes;
    };
    Parser.prototype.parse = function () {
        var nodes = this.parseNodes();
        if (nodes.length === 1)
            return nodes.pop();
        return (0, dom_class_1.createElement)("html", {}, nodes);
    };
    return Parser;
}());
exports.Parser = Parser;
