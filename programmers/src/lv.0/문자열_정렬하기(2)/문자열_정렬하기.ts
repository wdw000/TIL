function solution(my_string: string) {
  const input = Array.from(my_string.toLocaleLowerCase());

  return input.sort().join("");
}

export {};
