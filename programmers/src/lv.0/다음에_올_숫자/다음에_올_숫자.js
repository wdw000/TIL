"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function solution(common) {
    const temp = common[1] - common[0];
    if (temp === common[2] - common[1]) {
        return common[common.length - 1] + temp;
    }
    else {
        return (common[common.length - 1] * common[1]) / common[0];
    }
}
