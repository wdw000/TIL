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
var dom_1 = require("./dom");
var node_assert_1 = require("node:assert");
function Parser(pos, input) {
    var _this = this;
    this.pos = pos;
    this.input = input;
    //현재 문자 읽기
    this.getChar = function () {
        return this.input[this.pos];
    };
    //다음 문자가 주어진 문자열로 시작하는지 확인
    this.startWith = function (str) {
        var _this = this;
        var arrayStr = Array.from(str);
        var currentPos = this.pos;
        return arrayStr.every(function (char) {
            return _this.input[currentPos++] === char;
        });
    };
    // 모든 입력을 소비하면 true 반환
    this.isEndInput = function () {
        return _this.pos >= _this.input.length;
    };
    // 이터레이터를 반환
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
    // 현재 위치의 문자를 소비한다.
    this.consumeChar = function () {
        var iter = _this.makeInputIterator(_this.input, _this.pos);
        var currentChar = iter.next().value;
        _this.pos += 1;
        return currentChar;
    };
    this.consumeWhile = function (test) {
        var result = "";
        while (!_this.isEndInput() && test(_this.getChar())) {
            result += _this.consumeChar();
        }
        return result;
    };
    this.consumeWhitespace = function () {
        _this.consumeWhile(function (char) {
            if (char === " ") {
                return true;
            }
            else {
                return false;
            }
        });
    };
    this.parseTagName = function () {
        var reg = /[a-zA-Z0-9]/;
        return _this.consumeWhile(function (char) {
            return reg.test(char);
        });
    };
    this.parseNode = function () {
        if (_this.getChar() === "<") {
            return _this.parseElement();
        }
        return _this.parseText();
    };
    this.parseText = function () {
        return (0, dom_1.createText)(_this.consumeWhile(function (char) {
            if (char !== "<") {
                return true;
            }
            return false;
        }));
    };
    this.parseElement = function () {
        (0, node_assert_1["default"])(_this.consumeChar() === "<", "char is not <");
        var tagName = _this.parseTagName();
        var attrs = _this.parseAttributes();
        (0, node_assert_1["default"])(_this.consumeChar() === ">", "char is not >");
        var children = _this.parseNodes();
        (0, node_assert_1["default"])(_this.consumeChar() === "<", "char is not <");
        (0, node_assert_1["default"])(_this.consumeChar() === "/", "char is not /");
        (0, node_assert_1["default"])(_this.parseTagName() === tagName, "There is no tage name in closing tag");
        (0, node_assert_1["default"])(_this.consumeChar() === ">", "char is not >");
        return (0, dom_1.createElement)(tagName, attrs, children);
    };
    this.parseAttr = function () {
        var name = _this.parseTagName();
        (0, node_assert_1["default"])(_this.consumeChar() === "=", "there is no '=' between attribute name and attribute value");
        var value = _this.parseAttrValue();
        return { name: name, value: value };
    };
    this.parseAttrValue = function () {
        var openQuote = _this.consumeChar();
        (0, node_assert_1["default"])(openQuote === '"', "open quote error");
        var value = _this.consumeWhile(function (char) {
            if (char !== openQuote) {
                return true;
            }
            return false;
        });
        (0, node_assert_1["default"])(_this.consumeChar() === openQuote, "close quote error");
        return value;
    };
    this.parseAttributes = function () {
        var attributes = {};
        while (true) {
            _this.consumeWhitespace();
            if (_this.getChar() === ">")
                break;
            var _a = _this.parseAttr(), name_1 = _a.name, value = _a.value;
            attributes[name_1] = value;
        }
        return attributes;
    };
    this.parseNodes = function () {
        var nodes = [];
        while (true) {
            _this.consumeWhitespace();
            if (_this.isEndInput() || _this.startWith("</"))
                break;
            nodes.push(_this.parseNode());
        }
        return nodes;
    };
    this.parse = function () {
        var nodes = _this.parseNodes();
        if (nodes.length === 1)
            return nodes.pop();
        return (0, dom_1.createElement)("html", {}, nodes);
    };
}
exports["default"] = Parser;
var html = "<html id=\"root\" class=\"test\"><body><h1>Title</h1><div id=\"main\" class=\"test\"><p>Hello<em>world</em>!</p></div></body></html>";
var parser = new Parser(0, html);
console.log(parser.parse());
