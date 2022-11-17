"use strict";
exports.__esModule = true;
var parser_class_1 = require("./parser-class");
var html = "<html><body id=\"body\"></body></html>";
var test = new parser_class_1.Parser(html, 0);
var result = test.parse();
console.log(result);
