export const compareArrays = (a: Array<number>, b: Array<number>) =>
    a.length === b.length &&
    a.every((element: number, index: number) => element === b[index]);