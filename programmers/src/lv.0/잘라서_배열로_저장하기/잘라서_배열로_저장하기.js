"use strict";
/*
문제 설명
문자열 my_str과 n이 매개변수로 주어질 때, my_str을 길이 n씩 잘라서 저장한 배열을 return하도록 solution 함수를 완성해주세요.

제한사항
1 ≤ my_str의 길이 ≤ 100
1 ≤ n ≤ my_str의 길이
my_str은 알파벳 소문자, 대문자, 숫자로 이루어져 있습니다.

입출력 예 설명
입출력 예 #1

"abc1Addfggg4556b" 를 길이 6씩 잘라 배열에 저장한 ["abc1Ad", "dfggg4", "556b"]를 return해야 합니다.
입출력 예 #2

"abcdef123" 를 길이 3씩 잘라 배열에 저장한 ["abc", "def", "123"]를 return해야 합니다.
*/
Object.defineProperty(exports, "__esModule", { value: true });
function solution(my_str, n) {
    const result = [];
    let idx = 0;
    while (idx < my_str.length) {
        const cutWord = my_str.slice(idx, idx + n);
        result.push(cutWord);
        idx += n;
    }
    return result;
}
