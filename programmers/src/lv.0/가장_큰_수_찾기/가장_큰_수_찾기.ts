/*
문제 설명
정수 배열 array가 매개변수로 주어질 때, 가장 큰 수와 그 수의 인덱스를 담은 배열을 return 하도록 solution 함수를 완성해보세요.

제한사항
1 ≤ array의 길이 ≤ 100
0 ≤ array 원소 ≤ 1,000
array에 중복된 숫자는 없습니다.

입출력 예 설명
입출력 예 #1

1, 8, 3 중 가장 큰 수는 8이고 인덱스 1에 있습니다.
입출력 예 #2

9, 10, 11, 8 중 가장 큰 수는 11이고 인덱스 2에 있습니다.
*/
function solution(array: number[]) {
  const result: number[] = [array[0], 0];

  for (let index = 1; index < array.length; index++) {
    if (result[0] < array[index]) {
      result[0] = array[index];
      result[1] = index;
    }
  }

  return result;
}

export {};
