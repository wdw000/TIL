function solution(num: number, total: number) {
  const result = Array<number>(num);

  if (total % num === 0) {
    const temp = (num - 1) / 2;

    for (let i = 0; i < result.length; i++) {}
  } else {
    let temp = num;
  }

  return result;
}

console.log(solution(3, 12));

export {};
