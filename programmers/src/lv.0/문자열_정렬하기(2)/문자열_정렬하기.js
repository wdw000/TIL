"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function solution(my_string) {
    const input = Array.from(my_string.toLocaleLowerCase());
    return input.sort().join("");
}
