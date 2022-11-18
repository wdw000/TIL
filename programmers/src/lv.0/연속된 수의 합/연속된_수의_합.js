"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function solution(num, total) {
  const result = Array(num);
  const idx = Math.ceil((num - 1) / 2);
  let temp = Math.ceil(total / num);

  for (let i = 0; i < result.length; i++) {
    if (i < idx) {
      result[i] = temp - idx + i;
    } else if (i === idx) {
      result[i] = temp;
    } else {
      result[i] = temp + i - idx;
    }
  }
  return result;
}
