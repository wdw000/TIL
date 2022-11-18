"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function solution(num, total) {
  const temp = total % num;
  return temp;
}
console.log(solution(4, 16));
