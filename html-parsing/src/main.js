"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_class_1 = require("./parser-class");
const html = `<html><body id="body"></body></html>`;
const test = new parser_class_1.Parser(html, 0);
const result = test.parse();
