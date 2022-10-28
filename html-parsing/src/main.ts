import { Parser } from "./parser-class";

const html = `<html><body id="body"></body></html>`;

const test = new Parser(html, 0);
const result = test.parse();


